import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as paper from 'paper';
import { CommandManager, CreateShapeCommand, DeleteShapeCommand } from './commands';
import { GraphicsWidgetPanel } from './widget-panel';
import { GraphicsEditorService, type SelectionInfo } from './services';
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
  const [editorService] = useState(() => new GraphicsEditorService({
    width,
    height,
    backgroundColor,
    showGrid,
  }));
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

    // Initialize canvas using the service
    editorService.initializeCanvas(canvas);
    isPaperInitializedRef.current = true;
    setIsPaperInitialized(true);

    // Set up service event handlers
    editorService.setSelectionChangeHandler((selection: SelectionInfo) => {
      setSelectedItems(selection.items);
    });

    editorService.setCanvasUpdateHandler(() => {
      // Canvas has been updated
    });

    // Cleanup function
    return () => {
      editorService.destroy();
      isPaperInitializedRef.current = false;
      setIsPaperInitialized(false);
    };
  }, [width, height, backgroundColor, showGrid, editorService]);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPaperInitializedRef.current) return;

    // Get click position relative to canvas
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const point = new paper.Point(x, y);

    // Use service to select item at point
    const selectedItem = editorService.selectItemAt(point);

    if (selectedItem) {
      console.log('Selected item:', selectedItem.constructor.name);
    } else {
      console.log('Canvas clicked - no item selected');
    }
  }, [editorService]);

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
    editorService.clearSelection();
  }, [selectedItems, commandManager, editorService]);

  const handlePropertyChange = useCallback((item: paper.Item, property: string, value: unknown) => {
    // For now, just log the property change
    // In a full implementation, this could create a command for undo/redo
    console.log(`Property changed: ${property} =`, value);

    // Use service to update item properties
    try {
      switch (property) {
        case 'position':
          if (value instanceof paper.Point) {
            editorService.updateItemPosition(item, value);
          }
          break;
        case 'bounds':
          if (value instanceof paper.Rectangle) {
            editorService.updateItemSize(item, value);
          }
          break;
        case 'fillColor':
          if (value instanceof paper.Color) {
            editorService.updateItemColor(item, 'fill', value);
          }
          break;
        case 'strokeColor':
          if (value instanceof paper.Color) {
            editorService.updateItemColor(item, 'stroke', value);
          }
          break;
        case 'strokeWidth':
          if (typeof value === 'number') {
            editorService.updateItemStrokeWidth(item, value);
          }
          break;
        case 'content':
          if (typeof value === 'string') {
            editorService.updateTextContent(item, value);
          }
          break;
        case 'fontSize':
          if (typeof value === 'number') {
            editorService.updateTextFontSize(item, value);
          }
          break;
        default:
          console.warn(`Unknown property: ${property}`);
      }
    } catch (error) {
      console.error('Error updating property:', error);
    }
  }, [editorService]);

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
