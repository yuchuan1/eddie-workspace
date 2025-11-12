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
export declare class GraphicsEditorService {
    private canvas;
    private commandManager;
    private selectedItems;
    private options;
    private onSelectionChange?;
    private onCanvasUpdate?;
    private updateTimeoutId;
    private readonly UPDATE_DEBOUNCE_MS;
    constructor(options: CanvasOptions);
    initializeCanvas(canvasElement: HTMLCanvasElement): void;
    private createBackground;
    private createGrid;
    private createSampleElements;
    selectItemAt(point: paper.Point): paper.Item | null;
    selectItems(items: paper.Item[]): void;
    setSelection(items: paper.Item[]): void;
    clearSelection(): void;
    getSelection(): SelectionInfo;
    private getSelectionBounds;
    private notifySelectionChange;
    addRectangle(position: paper.Point, size: paper.Size): paper.Path.Rectangle;
    addCircle(center: paper.Point, radius: number): paper.Path.Circle;
    addText(position: paper.Point, content: string): paper.PointText;
    deleteItems(items: paper.Item[]): void;
    updateItemPosition(item: paper.Item, position: paper.Point): void;
    updateItemSize(item: paper.Item, bounds: paper.Rectangle): void;
    updateItemColor(item: paper.Item, colorType: 'fill' | 'stroke', color: paper.Color): void;
    updateItemStrokeWidth(item: paper.Item, width: number): void;
    updateTextContent(item: paper.Item, content: string): void;
    updateTextFontSize(item: paper.Item, size: number): void;
    updateCanvas(): void;
    private performCanvasUpdate;
    resizeCanvas(width: number, height: number): void;
    clearCanvas(): void;
    setSelectionChangeHandler(handler: (selection: SelectionInfo) => void): void;
    setCanvasUpdateHandler(handler: () => void): void;
    getCanvasBounds(): paper.Rectangle;
    getAllItems(): paper.Item[];
    getItemsInBounds(bounds: paper.Rectangle): paper.Item[];
    updateSelectedItemPosition(position: paper.Point): void;
    updateSelectedItemSize(bounds: paper.Rectangle): void;
    updateSelectedItemColor(colorType: 'fill' | 'stroke', color: paper.Color): void;
    updateSelectedItemStrokeWidth(width: number): void;
    updateSelectedItemContent(content: string): void;
    updateSelectedItemFontSize(size: number): void;
    destroy(): void;
}
