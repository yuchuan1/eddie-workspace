import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import paper from 'paper';
import { CommandManager, CreateShapeCommand, DeleteShapeCommand, UpdatePropertyCommand } from './commands';
import { GraphicsWidgetPanel } from './widget-panel';
import { GraphicsEditorService, type SelectionInfo } from './services';
import { validateGraphicsFile, parseSVGContent, readFileAsText, createImageFromFile } from './utils';
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
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionRect, setSelectionRect] = useState<paper.Rectangle | null>(null);
  const [selectionStart, setSelectionStart] = useState<paper.Point | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPoint, setDragStartPoint] = useState<paper.Point | null>(null);
  const [dragOffset, setDragOffset] = useState<paper.Point | null>(null);
  const [propertyChangeTrigger, setPropertyChangeTrigger] = useState(0);
  const selectedItemProps = useMemo(() => {
    if (selectedItems.length !== 1) {
      return {
        selectedPosition: null,
        selectedBounds: null,
        selectedFillColor: null,
        selectedStrokeColor: null,
        selectedStrokeWidth: null,
        selectedContent: null,
        selectedFontSize: null,
        selectedItemType: null,
        selectedItemCount: selectedItems.length,
      };
    }

    const item = selectedItems[0];
    return {
      selectedPosition: {
        x: item.position.x,
        y: item.position.y,
      },
      selectedBounds: item instanceof paper.Path.Rectangle ? {
        x: item.bounds.x,
        y: item.bounds.y,
        width: item.bounds.width,
        height: item.bounds.height,
      } : null,
      selectedFillColor: item.fillColor?.toCSS(true) || null,
      selectedStrokeColor: item.strokeColor?.toCSS(true) || null,
      selectedStrokeWidth: item.strokeWidth || null,
      selectedContent: item instanceof paper.PointText ? item.content : null,
      selectedFontSize: item instanceof paper.PointText ? item.fontSize : null,
      selectedItemType: item instanceof paper.Path.Rectangle ? 'rectangle' : item instanceof paper.Path.Circle ? 'circle' : item instanceof paper.PointText ? 'text' : 'shape',
      selectedItemCount: selectedItems.length,
    };
  }, [selectedItems, propertyChangeTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isPaperInitializedRef.current) return;

    // Skip Paper.js initialization in test environment
    if (process.env.NODE_ENV === 'test' || typeof window === 'undefined') {
      isPaperInitializedRef.current = true;
      // Don't set state in test environment to avoid cascading renders
      return;
    }

    // Initialize canvas using the service
    editorService.initializeCanvas(canvas);
    isPaperInitializedRef.current = true;
    // eslint-disable-next-line
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
    };
  }, [width, height, backgroundColor, showGrid, editorService]);

  const handleCanvasMouseDown = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPaperInitializedRef.current || process.env.NODE_ENV === 'test') return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const point = new paper.Point(x, y);

    // Start selection rectangle if not clicking on an item
    const hitResult = paper.project.hitTest(point, {
      fill: true,
      stroke: true,
      tolerance: 5,
    });

    if (!hitResult || !hitResult.item || hitResult.item.name === 'grid') {
      // Start selection rectangle
      setIsSelecting(true);
      setSelectionStart(point);
      setSelectionRect(new paper.Rectangle(point, new paper.Size(0, 0)));
    } else {
      // Clicked on an item - select it as the single item and start dragging
      setSelectedItems([hitResult.item]);
      setIsDragging(true);
      setDragStartPoint(point);
      setDragOffset(hitResult.item.position.subtract(point));
    }
  }, []);

  const handleCanvasMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging && dragStartPoint && dragOffset && selectedItems.length === 1) {
      // Handle item dragging
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const currentPoint = new paper.Point(x, y);

      const newPosition = currentPoint.add(dragOffset);
      const item = selectedItems[0];
      editorService.updateItemPosition(item, newPosition);
      return;
    }

    if (!isSelecting || !selectionStart) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const currentPoint = new paper.Point(x, y);

    // Update selection rectangle
    const newRect = new paper.Rectangle(
      selectionStart,
      currentPoint.subtract(selectionStart)
    );
    setSelectionRect(newRect);
  }, [isDragging, dragStartPoint, dragOffset, selectedItems, isSelecting, selectionStart, editorService]);

  const handleCanvasMouseUp = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      // Stop dragging
      setIsDragging(false);
      setDragStartPoint(null);
      setDragOffset(null);
      return;
    }

    if (!isSelecting) {
      // Handle regular click selection
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const point = new paper.Point(x, y);

      const selectedItem = editorService.selectItemAt(point);

      if (selectedItem) {
        // Item selected
      } else {
        console.log('Canvas clicked - no item selected');
      }
      return;
    }

    // Finish selection rectangle
    setIsSelecting(false);

    if (selectionRect && selectionRect.width > 5 && selectionRect.height > 5) {
      // Find all items within selection rectangle
      const itemsInBounds = editorService.getItemsInBounds(selectionRect);
      if (itemsInBounds.length > 0) {
        if (event.shiftKey) {
          // Add to existing selection
          const newSelection = [...selectedItems];
          itemsInBounds.forEach(item => {
            if (!newSelection.includes(item)) {
              newSelection.push(item);
            }
          });
          setSelectedItems(newSelection);
        } else {
          // Replace selection
          setSelectedItems(itemsInBounds);
        }
        console.log(`Selected ${itemsInBounds.length} items with rectangle`);
      }
    }

    setSelectionRect(null);
    setSelectionStart(null);
  }, [isDragging, isSelecting, selectionRect, selectedItems, editorService]);

  // Drag and Drop Handlers
  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    setDragError(null);

    if (!isPaperInitialized) return;

    const files = Array.from(event.dataTransfer.files);
    if (files.length === 0) return;

    for (const file of files) {
      try {
        // Validate file
        const validation = validateGraphicsFile(file);
        if (!validation.valid) {
          setDragError(validation.error || 'Invalid file');
          continue;
        }

        // Process file based on type
        if (file.type === 'image/svg+xml') {
          // Handle SVG files
          const svgContent = await readFileAsText(file);
          const parseResult = parseSVGContent(svgContent);

          if (parseResult.success && parseResult.items) {
            // Add parsed items to canvas
            parseResult.items.forEach(item => {
              // Position randomly for demonstration
              item.position = item.position.add(
                Math.random() * 100 - 50,
                Math.random() * 100 - 50
              );
            });
            console.log(`Imported SVG with ${parseResult.items.length} elements`);
          } else {
            setDragError(parseResult.error || 'Failed to parse SVG');
          }
        } else if (file.type.startsWith('image/')) {
          // Handle image files
          await createImageFromFile(file);
          // Raster is automatically positioned and added to the Paper.js project
          console.log('Imported image:', file.name);
        }

      } catch (error) {
        console.error('Error processing dropped file:', error);
        setDragError(`Failed to process ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Update canvas
    editorService.updateCanvas();
  }, [isPaperInitialized, editorService]);

  const handleCreateRectangle = useCallback(() => {
    if (!isPaperInitializedRef.current || process.env.NODE_ENV === 'test') return;

    const command = new CreateShapeCommand(editorService, 'rectangle', new paper.Point(100, 100), {
      size: new paper.Size(100, 80),
    });
    commandManager.execute(command);
    // Select the newly created item
    const items = editorService.getAllItems();
    if (items.length > 0) {
      setSelectedItems([items[items.length - 1]]);
    }
  }, [editorService, commandManager]);

  const handleCreateCircle = useCallback(() => {
    if (!isPaperInitializedRef.current || process.env.NODE_ENV === 'test') return;

    const command = new CreateShapeCommand(editorService, 'circle', new paper.Point(200, 150), {
      radius: 50,
    });
    commandManager.execute(command);
    // Select the newly created item
    const items = editorService.getAllItems();
    if (items.length > 0) {
      setSelectedItems([items[items.length - 1]]);
    }
  }, [editorService, commandManager]);

  const handleCreateText = useCallback(() => {
    if (!isPaperInitializedRef.current || process.env.NODE_ENV === 'test') return;

    const command = new CreateShapeCommand(editorService, 'text', new paper.Point(150, 200), {
      text: 'Hello World',
    });
    commandManager.execute(command);
    // Select the newly created item
    const items = editorService.getAllItems();
    if (items.length > 0) {
      setSelectedItems([items[items.length - 1]]);
    }
  }, [editorService, commandManager]);

  const handleUndo = useCallback(() => {
    commandManager.undo();
    // Trigger re-render after undo
    setPropertyChangeTrigger(prev => prev + 1);
  }, [commandManager]);

  const handleRedo = useCallback(() => {
    commandManager.redo();
    // Trigger re-render after redo
    setPropertyChangeTrigger(prev => prev + 1);
  }, [commandManager]);

  const handleDeleteSelected = useCallback(() => {
    if (selectedItems.length === 0) return;

    const command = new DeleteShapeCommand(editorService, selectedItems);
    commandManager.execute(command);
    // Clear selection after delete
    setSelectedItems([]);
  }, [selectedItems, editorService, commandManager]);

  const handlePropertyChange = useCallback((property: string, value: unknown) => {
    const command = new UpdatePropertyCommand(editorService, property, value);
    commandManager.execute(command);
    // Trigger re-render by updating property change trigger
    setPropertyChangeTrigger(prev => prev + 1);
  }, [editorService, commandManager]);

  useEffect(() => {
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
  }, [handleUndo, handleRedo, handleDeleteSelected]);

  return (
    <div className={styles['graphics-editor-container']}>
      <div
        className={`${styles['editor-main']} ${isDragOver ? styles['drag-over'] : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
              className={`${styles['canvas']} ${isSelecting ? styles['selecting'] : ''}`}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={() => {
                if (isSelecting) {
                  setIsSelecting(false);
                  setSelectionRect(null);
                  setSelectionStart(null);
                }
              }}
            />
            {isSelecting && selectionRect && (
              <div
                className={styles['selection-rectangle']}
                style={{
                  '--left': `${Math.min(selectionRect.x, selectionRect.x + selectionRect.width)}px`,
                  '--top': `${Math.min(selectionRect.y, selectionRect.y + selectionRect.height)}px`,
                  '--width': `${Math.abs(selectionRect.width)}px`,
                  '--height': `${Math.abs(selectionRect.height)}px`,
                } as React.CSSProperties}
              />
            )}
            {isDragOver && (
              <div className={styles['drag-overlay']}>
                <div className={styles['drag-message']}>
                  <span className={styles['drag-icon']} role="img" aria-label="Folder">📁</span>
                  <span>Drop files here to import</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles['status-bar']}>
            {dragError ? (
              <span className={styles['error-message']}>{dragError}</span>
            ) : (
              `${isPaperInitialized ? 'Paper.js Ready - Graphics Editor v0.1.0' : 'Initializing...'}`
            )}
          </div>
        </div>

        <GraphicsWidgetPanel
          selectedPosition={selectedItemProps.selectedPosition}
          selectedBounds={selectedItemProps.selectedBounds}
          selectedFillColor={selectedItemProps.selectedFillColor}
          selectedStrokeColor={selectedItemProps.selectedStrokeColor}
          selectedStrokeWidth={selectedItemProps.selectedStrokeWidth}
          selectedContent={selectedItemProps.selectedContent}
          selectedFontSize={selectedItemProps.selectedFontSize}
          selectedItemType={selectedItemProps.selectedItemType}
          selectedItemCount={selectedItemProps.selectedItemCount}
          onPropertyChange={handlePropertyChange}
        />
      </div>
    </div>
  );
}

export default React.memo(ReactGraphicsEditor);
