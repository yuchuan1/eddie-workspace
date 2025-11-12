// libs/react-graphics-editor/src/lib/widget-panel/graphics-widget-panel.tsx

import React from 'react';
import paper from 'paper';
import styles from './graphics-widget-panel.module.css';

export interface GraphicsWidgetPanelProps {
  selectedPosition: { x: number; y: number } | null;
  selectedBounds: { x: number; y: number; width: number; height: number } | null;
  selectedFillColor: string | null;
  selectedStrokeColor: string | null;
  selectedStrokeWidth: number | null;
  selectedContent: string | null;
  selectedFontSize: number | null;
  selectedItemType: string | null;
  selectedItemCount: number;
  onPropertyChange: (property: string, value: unknown) => void;
}

export function GraphicsWidgetPanel({
  selectedPosition,
  selectedBounds,
  selectedFillColor,
  selectedStrokeColor,
  selectedStrokeWidth,
  selectedContent,
  selectedFontSize,
  selectedItemType,
  selectedItemCount,
  onPropertyChange,
}: GraphicsWidgetPanelProps) {
  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    if (!selectedPosition) return;

    const newPosition = new paper.Point(selectedPosition.x, selectedPosition.y);
    if (axis === 'x') {
      newPosition.x = value;
    } else {
      newPosition.y = value;
    }
    onPropertyChange('position', newPosition);
  };

  const handleSizeChange = (axis: 'width' | 'height', value: number) => {
    if (!selectedBounds) return;

    const newBounds = new paper.Rectangle(
      selectedBounds.x,
      selectedBounds.y,
      axis === 'width' ? value : selectedBounds.width,
      axis === 'height' ? value : selectedBounds.height
    );
    onPropertyChange('bounds', newBounds);
  };

  const handleColorChange = (colorType: 'fill' | 'stroke', color: string) => {
    const paperColor = new paper.Color(color);
    onPropertyChange(colorType + 'Color', paperColor);
  };

  const handleStrokeWidthChange = (width: number) => {
    onPropertyChange('strokeWidth', width);
  };

  const handleTextChange = (text: string) => {
    onPropertyChange('content', text);
  };

  const handleFontSizeChange = (size: number) => {
    onPropertyChange('fontSize', size);
  };

  if (selectedItemCount === 0) {
    return (
      <div className={styles['widget-panel']}>
        <div className={styles['panel-header']}>
          <h3>Properties</h3>
        </div>
        <div className={styles['panel-content']}>
          <p className={styles['no-selection']}>
            Select an element to edit its properties
          </p>
        </div>
      </div>
    );
  }

  if (selectedItemCount > 1) {
    return (
      <div className={styles['widget-panel']}>
        <div className={styles['panel-header']}>
          <h3>Properties</h3>
        </div>
        <div className={styles['panel-content']}>
          <p className={styles['multi-selection']}>
            {selectedItemCount} items selected
          </p>
          <div className={styles['property-group']}>
            <label className={styles['property-label']}>Actions:</label>
            <button
              type="button"
              className={styles['action-button']}
              onClick={() => {
                // TODO: Implement grouping logic
                console.log('Grouping items');
                onPropertyChange('grouped', true);
              }}
            >
              Group Items
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['widget-panel']}>
      <div className={styles['panel-header']}>
        <h3>Properties</h3>
        <span className={styles['element-type']}>
          {selectedItemType === 'rectangle' ? 'Rectangle' :
           selectedItemType === 'circle' ? 'Circle' :
           selectedItemType === 'text' ? 'Text' :
           'Shape'}
        </span>
      </div>

      <div className={styles['panel-content']}>
        {/* Position Properties */}
        <div className={styles['property-group']}>
          <h4 className={styles['group-title']}>Position</h4>
          <div className={styles['property-row']}>
            <label className={styles['property-label']} htmlFor="pos-x">X:</label>
            <input
              id="pos-x"
              type="number"
              className={styles['property-input']}
              value={Math.round(selectedPosition?.x || 0)}
              onChange={(e) => handlePositionChange('x', parseFloat(e.target.value) || 0)}
              autoComplete="off"
              data-lpignore="true"
              inputMode="numeric"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
          <div className={styles['property-row']}>
            <label className={styles['property-label']} htmlFor="pos-y">Y:</label>
            <input
              id="pos-y"
              type="number"
              className={styles['property-input']}
              value={Math.round(selectedPosition?.y || 0)}
              onChange={(e) => handlePositionChange('y', parseFloat(e.target.value) || 0)}
              autoComplete="off"
              data-lpignore="true"
              inputMode="numeric"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>

        {/* Size Properties (for rectangles) */}
        {selectedItemType === 'rectangle' && (
          <div className={styles['property-group']}>
            <h4 className={styles['group-title']}>Size</h4>
            <div className={styles['property-row']}>
              <label className={styles['property-label']} htmlFor="rect-width">Width:</label>
              <input
                id="rect-width"
                type="number"
                className={styles['property-input']}
                value={Math.round(selectedBounds?.width || 0)}
                onChange={(e) => handleSizeChange('width', parseFloat(e.target.value) || 0)}
                autoComplete="off"
                data-lpignore="true"
                inputMode="numeric"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
            <div className={styles['property-row']}>
              <label className={styles['property-label']} htmlFor="rect-height">Height:</label>
              <input
                id="rect-height"
                type="number"
                className={styles['property-input']}
                value={Math.round(selectedBounds?.height || 0)}
                onChange={(e) => handleSizeChange('height', parseFloat(e.target.value) || 0)}
                autoComplete="off"
                data-lpignore="true"
                inputMode="numeric"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          </div>
        )}

        {/* Appearance Properties */}
        <div className={styles['property-group']}>
          <h4 className={styles['group-title']}>Appearance</h4>
          <div className={styles['property-row']}>
            <label className={styles['property-label']} htmlFor="fill-color">Fill:</label>
            <input
              id="fill-color"
              type="color"
              className={styles['property-input']}
              value={selectedFillColor || '#ffffff'}
              onChange={(e) => handleColorChange('fill', e.target.value)}
              autoComplete="off"
              data-lpignore="true"
            />
          </div>
          <div className={styles['property-row']}>
            <label className={styles['property-label']} htmlFor="stroke-color">Stroke:</label>
            <input
              id="stroke-color"
              type="color"
              className={styles['property-input']}
              value={selectedStrokeColor || '#000000'}
              onChange={(e) => handleColorChange('stroke', e.target.value)}
              autoComplete="off"
              data-lpignore="true"
            />
          </div>
          <div className={styles['property-row']}>
            <label className={styles['property-label']} htmlFor="stroke-width">Stroke Width:</label>
            <input
              id="stroke-width"
              type="number"
              className={styles['property-input']}
              min="0"
              max="20"
              value={selectedStrokeWidth || 1}
              onChange={(e) => handleStrokeWidthChange(parseFloat(e.target.value) || 1)}
              autoComplete="off"
              data-lpignore="true"
              inputMode="numeric"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>

        {/* Text Properties (for text elements) */}
        {selectedItemType === 'text' && (
          <div className={styles['property-group']}>
            <h4 className={styles['group-title']}>Text</h4>
            <div className={styles['property-row']}>
              <label className={styles['property-label']} htmlFor="text-content">Content:</label>
              <input
                id="text-content"
                type="text"
                className={styles['property-input']}
                value={selectedContent || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                data-lpignore="true"
                inputMode="text"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
            <div className={styles['property-row']}>
              <label className={styles['property-label']} htmlFor="text-size">Font Size:</label>
              <input
                id="text-size"
                type="number"
                className={styles['property-input']}
                min="8"
                max="72"
                value={selectedFontSize || 16}
                onChange={(e) => handleFontSizeChange(parseFloat(e.target.value) || 16)}
                autoComplete="off"
                data-lpignore="true"
                inputMode="numeric"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GraphicsWidgetPanel;
