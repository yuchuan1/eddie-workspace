// libs/react-graphics-editor/src/lib/services/graphics-editor.service.ts

import paper from 'paper';
import { CommandManager } from '../commands';

export interface CanvasOptions {
  width: number;
  height: number;
  backgroundColor: string;
  showGrid: boolean;
}

export interface SelectionInfo {
  items: paper.Item[];
  bounds: paper.Rectangle | null;
  center: paper.Point | null;
}

export class GraphicsEditorService {
  private canvas: HTMLCanvasElement | null = null;
  private commandManager: CommandManager;
  private selectedItems: paper.Item[] = [];
  private options: CanvasOptions;
  private onSelectionChange?: (selection: SelectionInfo) => void;
  private onCanvasUpdate?: () => void;
  private updateTimeoutId: number | null = null;
  private readonly UPDATE_DEBOUNCE_MS = 16; // ~60fps

  constructor(options: CanvasOptions) {
    this.options = options;
    this.commandManager = new CommandManager();
  }

  // Canvas Management
  initializeCanvas(canvasElement: HTMLCanvasElement): void {
    this.canvas = canvasElement;

    // Initialize Paper.js
    paper.setup(canvasElement);

    // Set canvas properties
    paper.view.viewSize = new paper.Size(this.options.width, this.options.height);

    // Create background
    this.createBackground();

    // Create grid if enabled
    if (this.options.showGrid) {
      this.createGrid();
    }

    // Create sample elements
    this.createSampleElements();

    console.log('Graphics Editor Service: Canvas initialized');
  }

  private createBackground(): void {
    const background = new paper.Path.Rectangle(
      new paper.Rectangle(0, 0, this.options.width, this.options.height)
    );
    background.fillColor = new paper.Color(this.options.backgroundColor);
    background.sendToBack();
  }

  private createGrid(): void {
    const gridGroup = new paper.Group();
    gridGroup.name = 'grid';

    // Vertical lines
    for (let x = 0; x <= this.options.width; x += 20) {
      const line = new paper.Path.Line(
        new paper.Point(x, 0),
        new paper.Point(x, this.options.height)
      );
      line.strokeColor = new paper.Color('#e0e0e0');
      line.strokeWidth = 1;
      gridGroup.addChild(line);
    }

    // Horizontal lines
    for (let y = 0; y <= this.options.height; y += 20) {
      const line = new paper.Path.Line(
        new paper.Point(0, y),
        new paper.Point(this.options.width, y)
      );
      line.strokeColor = new paper.Color('#e0e0e0');
      line.strokeWidth = 1;
      gridGroup.addChild(line);
    }
  }

  private createSampleElements(): void {
    // Rectangle
    const rectangle = new paper.Path.Rectangle(new paper.Rectangle(50, 50, 100, 80));
    rectangle.fillColor = new paper.Color('#3b82f6');
    rectangle.strokeColor = new paper.Color('#1e40af');
    rectangle.strokeWidth = 2;

    // Circle
    const circle = new paper.Path.Circle(new paper.Point(250, 100), 40);
    circle.fillColor = new paper.Color('#ef4444');
    circle.strokeColor = new paper.Color('#dc2626');
    circle.strokeWidth = 2;

    // Text
    const text = new paper.PointText(new paper.Point(400, 100));
    text.content = 'Graphics Editor';
    text.fillColor = new paper.Color('#1f2937');
    text.fontSize = 16;
    text.fontFamily = 'Arial, sans-serif';
  }

  // Selection Management
  selectItemAt(point: paper.Point): paper.Item | null {
    const hitResult = paper.project.hitTest(point, {
      fill: true,
      stroke: true,
      tolerance: 5,
    });

    if (hitResult && hitResult.item && hitResult.item.name !== 'grid') {
      this.setSelection([hitResult.item]);
      return hitResult.item;
    }

    this.clearSelection();
    return null;
  }

  selectItems(items: paper.Item[]): void {
    this.setSelection(items);
  }

  setSelection(items: paper.Item[]): void {
    this.selectedItems = [...items];
    this.notifySelectionChange();
  }

  clearSelection(): void {
    this.selectedItems = [];
    this.notifySelectionChange();
  }

  getSelection(): SelectionInfo {
    if (this.selectedItems.length === 0) {
      return { items: [], bounds: null, center: null };
    }

    const bounds = this.getSelectionBounds();
    const center = bounds ? bounds.center : null;

    return {
      items: [...this.selectedItems],
      bounds,
      center,
    };
  }

  private getSelectionBounds(): paper.Rectangle | null {
    if (this.selectedItems.length === 0) return null;

    let bounds = this.selectedItems[0].bounds;

    for (let i = 1; i < this.selectedItems.length; i++) {
      bounds = bounds.unite(this.selectedItems[i].bounds);
    }

    return bounds;
  }

  private notifySelectionChange(): void {
    if (this.onSelectionChange) {
      this.onSelectionChange(this.getSelection());
    }
  }

  // Element Management
  addRectangle(position: paper.Point, size: paper.Size): paper.Path.Rectangle {
    const rectangle = new paper.Path.Rectangle(new paper.Rectangle(position, size));
    rectangle.fillColor = new paper.Color('#3b82f6');
    rectangle.strokeColor = new paper.Color('#1e40af');
    rectangle.strokeWidth = 2;
    return rectangle;
  }

  addCircle(center: paper.Point, radius: number): paper.Path.Circle {
    const circle = new paper.Path.Circle(center, radius);
    circle.fillColor = new paper.Color('#ef4444');
    circle.strokeColor = new paper.Color('#dc2626');
    circle.strokeWidth = 2;
    return circle;
  }

  addText(position: paper.Point, content: string): paper.PointText {
    const text = new paper.PointText(position);
    text.content = content;
    text.fillColor = new paper.Color('#1f2937');
    text.fontSize = 16;
    text.fontFamily = 'Arial, sans-serif';
    return text;
  }

  deleteItems(items: paper.Item[]): void {
    items.forEach(item => item.remove());
  }

  // Property Updates
  updateItemPosition(item: paper.Item, position: paper.Point): void {
    item.position = position;
    this.updateCanvas();
  }

  updateItemSize(item: paper.Item, bounds: paper.Rectangle): void {
    if (item instanceof paper.Path.Rectangle) {
      item.bounds = bounds;
      this.updateCanvas();
    }
  }

  updateItemColor(item: paper.Item, colorType: 'fill' | 'stroke', color: paper.Color): void {
    if (colorType === 'fill') {
      item.fillColor = color;
    } else {
      item.strokeColor = color;
    }
    this.updateCanvas();
  }

  updateItemStrokeWidth(item: paper.Item, width: number): void {
    item.strokeWidth = width;
    this.updateCanvas();
  }

  updateTextContent(item: paper.Item, content: string): void {
    if (item instanceof paper.PointText) {
      item.content = content;
      this.updateCanvas();
    }
  }

  updateTextFontSize(item: paper.Item, size: number): void {
    if (item instanceof paper.PointText) {
      item.fontSize = size;
      this.updateCanvas();
    }
  }

  // Canvas Operations
  updateCanvas(): void {
    // Debounce canvas updates to prevent excessive redraws
    if (this.updateTimeoutId !== null) {
      window.clearTimeout(this.updateTimeoutId);
    }

    this.updateTimeoutId = window.setTimeout(() => {
      this.performCanvasUpdate();
      this.updateTimeoutId = null;
    }, this.UPDATE_DEBOUNCE_MS);
  }

  private performCanvasUpdate(): void {
    paper.view.update();
    if (this.onCanvasUpdate) {
      this.onCanvasUpdate();
    }
  }

  resizeCanvas(width: number, height: number): void {
    this.options.width = width;
    this.options.height = height;

    if (paper.view) {
      paper.view.viewSize = new paper.Size(width, height);
      this.updateCanvas();
    }
  }

  clearCanvas(): void {
    paper.project.clear();
    this.clearSelection();
    if (this.canvas) {
      this.initializeCanvas(this.canvas);
    }
  }

  // Event Handlers
  setSelectionChangeHandler(handler: (selection: SelectionInfo) => void): void {
    this.onSelectionChange = handler;
  }

  setCanvasUpdateHandler(handler: () => void): void {
    this.onCanvasUpdate = handler;
  }

  // Utility Methods
  getCanvasBounds(): paper.Rectangle {
    return new paper.Rectangle(0, 0, this.options.width, this.options.height);
  }

  getAllItems(): paper.Item[] {
    return paper.project.getItems({
      recursive: true,
    }).filter(item => item.name !== 'grid' && !item.hasChildren());
  }

  getItemsInBounds(bounds: paper.Rectangle): paper.Item[] {
    return this.getAllItems().filter(item =>
      item.bounds.intersects(bounds)
    );
  }

  updateSelectedItemPosition(position: paper.Point): void {
    if (this.selectedItems.length === 1) {
      this.updateItemPosition(this.selectedItems[0], position);
    }
  }

  updateSelectedItemSize(bounds: paper.Rectangle): void {
    if (this.selectedItems.length === 1) {
      this.updateItemSize(this.selectedItems[0], bounds);
    }
  }

  updateSelectedItemColor(colorType: 'fill' | 'stroke', color: paper.Color): void {
    if (this.selectedItems.length === 1) {
      this.updateItemColor(this.selectedItems[0], colorType, color);
    }
  }

  updateSelectedItemStrokeWidth(width: number): void {
    if (this.selectedItems.length === 1) {
      this.updateItemStrokeWidth(this.selectedItems[0], width);
    }
  }

  updateSelectedItemContent(content: string): void {
    if (this.selectedItems.length === 1) {
      this.updateTextContent(this.selectedItems[0], content);
    }
  }

  updateSelectedItemFontSize(size: number): void {
    if (this.selectedItems.length === 1) {
      this.updateTextFontSize(this.selectedItems[0], size);
    }
  }

  // Cleanup
  destroy(): void {
    // Clear any pending update timeout
    if (this.updateTimeoutId !== null) {
      window.clearTimeout(this.updateTimeoutId);
      this.updateTimeoutId = null;
    }

    if (paper.project) {
      paper.project.clear();
    }
    this.clearSelection();
    this.onSelectionChange = undefined;
    this.onCanvasUpdate = undefined;
  }
}
