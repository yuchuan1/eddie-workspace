import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as paper from 'paper';
import { CommandManager, CreateShapeCommand, DeleteShapeCommand } from './commands';
import { GraphicsWidgetPanel } from './widget-panel';
import styles from './react-graphics-editor.module.css';

export interface ReactGraphicsEditorProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  showGrid?: boolean;
}

export function ReactGraphicsEditor({
  width = 800,
  height = 600,
  backgroundColor = '#ffffff',
  showGrid = true,
}: ReactGraphicsEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPaperInitializedRef = useRef(false);
  const [isPaperInitialized, setIsPaperInitialized] = useState(false);
  const [commandManager] = useState(() => new CommandManager());
  const [selectedItems, setSelectedItems] = useState<paper.Item[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isPaperInitializedRef.current) return;

    // Skip Paper.js initialization in test environment
    if (process.env.NODE_ENV === 'test') {
      isPaperInitializedRef.current = true;
      setIsPaperInitialized(true);
      return;
    }

    // Initialize Paper.js
    paper.setup(canvas);

    // Set canvas background
    paper.view.viewSize = new paper.Size(width, height);

    // Create a background rectangle
    const background = new paper.Path.Rectangle(new paper.Rectangle(0, 0, width, height));
    background.fillColor = new paper.Color(backgroundColor);
    background.sendToBack();

    // Add grid if enabled
    if (showGrid) {
      const gridGroup = new paper.Group();
      gridGroup.name = 'grid';

      // Vertical lines
      for (let x = 0; x <= width; x += 20) {
        const line = new paper.Path.Line(
          new paper.Point(x, 0),
          new paper.Point(x, height)
        );
        line.strokeColor = new paper.Color('#e0e0e0');
        line.strokeWidth = 1;
        gridGroup.addChild(line);
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += 20) {
        const line = new paper.Path.Line(
          new paper.Point(0, y),
          new paper.Point(width, y)
        );
        line.strokeColor = new paper.Color('#e0e0e0');
        line.strokeWidth = 1;
        gridGroup.addChild(line);
      }
    }

    // Create a sample rectangle to demonstrate Paper.js
    const sampleRect = new paper.Path.Rectangle(new paper.Rectangle(50, 50, 100, 100));
    sampleRect.fillColor = new paper.Color('#3b82f6');
    sampleRect.strokeColor = new paper.Color('#1e40af');
    sampleRect.strokeWidth = 2;

    // Create a sample circle
    const sampleCircle = new paper.Path.Circle(new paper.Point(250, 100), 50);
    sampleCircle.fillColor = new paper.Color('#ef4444');
    sampleCircle.strokeColor = new paper.Color('#dc2626');
    sampleCircle.strokeWidth = 2;

    // Create sample text
    const sampleText = new paper.PointText(new paper.Point(400, 100));
    sampleText.content = 'Graphics Editor';
    sampleText.fillColor = new paper.Color('#1f2937');
    sampleText.fontSize = 16;
    sampleText.fontFamily = 'Arial, sans-serif';

    isPaperInitializedRef.current = true;
    setIsPaperInitialized(true);

    // Cleanup function
    return () => {
      paper.project.clear();
      isPaperInitializedRef.current = false;
      setIsPaperInitialized(false);
    };
  }, [width, height, backgroundColor, showGrid]);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPaperInitializedRef.current) return;

    // Get click position relative to canvas
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const point = new paper.Point(x, y);

    // Find item at click position (excluding grid items)
    const hitResult = paper.project.hitTest(point, {
      fill: true,
      stroke: true,
      tolerance: 5,
    });

    if (hitResult && hitResult.item) {
      // Don't select grid items
      if (hitResult.item.name !== 'grid') {
        setSelectedItems([hitResult.item]);
        console.log('Selected item:', hitResult.item.constructor.name);
        return;
      }
    }

    // Click on empty space - deselect all
    setSelectedItems([]);
  }, []);

  const handleCreateRectangle = useCallback(() => {
    if (!isPaperInitialized) return;

    const position = new paper.Point(100 + Math.random() * 200, 100 + Math.random() * 200);
    const size = new paper.Size(100, 80);
    const command = new CreateShapeCommand('rectangle', position, { size });
    commandManager.execute(command);
  }, [isPaperInitialized, commandManager]);

  const handleCreateCircle = useCallback(() => {
    if (!isPaperInitialized) return;

    const position = new paper.Point(300 + Math.random() * 200, 150 + Math.random() * 100);
    const command = new CreateShapeCommand('circle', position, { radius: 40 });
    commandManager.execute(command);
  }, [isPaperInitialized, commandManager]);

  const handleCreateText = useCallback(() => {
    if (!isPaperInitialized) return;

    const position = new paper.Point(200 + Math.random() * 300, 200 + Math.random() * 100);
    const command = new CreateShapeCommand('text', position, { text: 'New Text' });
    commandManager.execute(command);
  }, [isPaperInitialized, commandManager]);

  const handleUndo = useCallback(() => {
    const undoneCommand = commandManager.undo();
    if (undoneCommand) {
      console.log('Undid:', undoneCommand.getDescription());
    }
  }, [commandManager]);

  const handleRedo = useCallback(() => {
    const redoneCommand = commandManager.redo();
    if (redoneCommand) {
      console.log('Redid:', redoneCommand.getDescription());
    }
  }, [commandManager]);

  const handleDeleteSelected = useCallback(() => {
    if (selectedItems.length === 0) return;

    const command = new DeleteShapeCommand(selectedItems);
    commandManager.execute(command);
    setSelectedItems([]);
  }, [selectedItems, commandManager]);

  const handlePropertyChange = useCallback((item: paper.Item, property: string, value: unknown) => {
    // For now, just log the property change
    // In a full implementation, this could create a command for undo/redo
    console.log(`Property changed: ${property} =`, value);
    // Trigger canvas update
    paper.view.update();
  }, []);

  // Keyboard shortcuts handler
  useEffect(() => {
    if (!isPaperInitializedRef.current) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent shortcuts when typing in input fields
      const target = event.target as HTMLElement;
      const isInput = target && (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      );
      if (isInput) return;

      // Ctrl+Z or Cmd+Z for Undo
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
        return;
      }

      // Ctrl+Y or Cmd+Y or Ctrl+Shift+Z or Cmd+Shift+Z for Redo
      if (
        ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') ||
        ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'z')
      ) {
        event.preventDefault();
        handleRedo();
        return;
      }

      // Delete or Backspace for deleting selected items
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        handleDeleteSelected();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaperInitialized, handleUndo, handleRedo, handleDeleteSelected]);

  return (
    <div className={styles['graphics-editor-container']}>
      <div className={styles['editor-main']}>
        <div className={styles['canvas-section']}>
          <div className={styles['toolbar']}>
            <button
              type="button"
              className={styles['toolbar-button']}
              onClick={handleCreateRectangle}
              disabled={!isPaperInitialized}
              title="Create Rectangle"
            >
              <span role="img" aria-label="Rectangle tool">▭</span>
            </button>
            <button
              type="button"
              className={styles['toolbar-button']}
              onClick={handleCreateCircle}
              disabled={!isPaperInitialized}
              title="Create Circle"
            >
              <span role="img" aria-label="Circle tool">○</span>
            </button>
            <button
              type="button"
              className={styles['toolbar-button']}
              onClick={handleCreateText}
              disabled={!isPaperInitialized}
              title="Create Text"
            >
              <span role="img" aria-label="Text tool">T</span>
            </button>

            <div className={styles['toolbar-separator']}></div>

            <button
              type="button"
              className={styles['toolbar-button']}
              onClick={handleUndo}
              disabled={!isPaperInitialized || !commandManager.canUndo()}
              title="Undo"
            >
              <span role="img" aria-label="Undo">↶</span>
            </button>
            <button
              type="button"
              className={styles['toolbar-button']}
              onClick={handleRedo}
              disabled={!isPaperInitialized || !commandManager.canRedo()}
              title="Redo"
            >
              <span role="img" aria-label="Redo">↷</span>
            </button>

            <div className={styles['toolbar-separator']}></div>

            <button
              type="button"
              className={styles['toolbar-button']}
              onClick={handleDeleteSelected}
              disabled={!isPaperInitialized || selectedItems.length === 0}
              title="Delete Selected"
            >
              <span role="img" aria-label="Delete">🗑️</span>
            </button>
          </div>

          <div className={styles['canvas-container']}>
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              className={styles['canvas']}
              onClick={handleCanvasClick}
            />
          </div>

          <div className={styles['status-bar']}>
            {isPaperInitialized ? 'Paper.js Ready - Graphics Editor v0.1.0' : 'Initializing...'}
          </div>
        </div>

        <GraphicsWidgetPanel
          selectedItems={selectedItems}
          onPropertyChange={handlePropertyChange}
        />
      </div>
    </div>
  );
}

export default ReactGraphicsEditor;
