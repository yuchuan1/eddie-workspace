// libs/react-graphics-editor/src/lib/widget-panel/graphics-widget-panel.tsx

import React from 'react';
import * as paper from 'paper';
import styles from './graphics-widget-panel.module.css';

export interface GraphicsWidgetPanelProps {
  selectedItems: paper.Item[];
  onPropertyChange: (item: paper.Item, property: string, value: unknown) => void;
}

export function GraphicsWidgetPanel({
  selectedItems,
  onPropertyChange,
}: GraphicsWidgetPanelProps) {
  const selectedItem = selectedItems.length === 1 ? selectedItems[0] : null;

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    if (!selectedItem) return;

    const newPosition = selectedItem.position.clone();
    if (axis === 'x') {
      newPosition.x = value;
    } else {
      newPosition.y = value;
    }
    // Paper.js objects are mutable by design
    // eslint-disable-next-line no-param-reassign
    selectedItem.position = newPosition;
    onPropertyChange(selectedItem, 'position', newPosition);
  };

  const handleSizeChange = (axis: 'width' | 'height', value: number) => {
    if (!selectedItem || !(selectedItem instanceof paper.Path.Rectangle)) return;

    const bounds = selectedItem.bounds;
    const newBounds = new paper.Rectangle(
      bounds.x,
      bounds.y,
      axis === 'width' ? value : bounds.width,
      axis === 'height' ? value : bounds.height
    );
    // Paper.js objects are mutable by design
    // eslint-disable-next-line no-param-reassign
    selectedItem.bounds = newBounds;
    onPropertyChange(selectedItem, 'bounds', newBounds);
  };

  const handleColorChange = (colorType: 'fill' | 'stroke', color: string) => {
    if (!selectedItem) return;

    const paperColor = new paper.Color(color);
    if (colorType === 'fill') {
      // Paper.js objects are mutable by design
      // eslint-disable-next-line no-param-reassign
      selectedItem.fillColor = paperColor;
    } else {
      // Paper.js objects are mutable by design
      // eslint-disable-next-line no-param-reassign
      selectedItem.strokeColor = paperColor;
    }
    onPropertyChange(selectedItem, colorType + 'Color', paperColor);
  };

  const handleStrokeWidthChange = (width: number) => {
    if (!selectedItem) return;

    // Paper.js objects are mutable by design
    // eslint-disable-next-line no-param-reassign
    selectedItem.strokeWidth = width;
    onPropertyChange(selectedItem, 'strokeWidth', width);
  };

  const handleTextChange = (text: string) => {
    if (!selectedItem || !(selectedItem instanceof paper.PointText)) return;

    // Paper.js objects are mutable by design
    // eslint-disable-next-line no-param-reassign
    selectedItem.content = text;
    onPropertyChange(selectedItem, 'content', text);
  };

  const handleFontSizeChange = (size: number) => {
    if (!selectedItem || !(selectedItem instanceof paper.PointText)) return;

    // Paper.js objects are mutable by design
    // eslint-disable-next-line no-param-reassign
    selectedItem.fontSize = size;
    onPropertyChange(selectedItem, 'fontSize', size);
  };

  if (selectedItems.length === 0) {
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

  if (selectedItems.length > 1) {
    return (
      <div className={styles['widget-panel']}>
        <div className={styles['panel-header']}>
          <h3>Properties</h3>
        </div>
        <div className={styles['panel-content']}>
          <p className={styles['multi-selection']}>
            {selectedItems.length} items selected
          </p>
          <div className={styles['property-group']}>
            <label className={styles['property-label']}>Actions:</label>
            <button
              type="button"
              className={styles['action-button']}
              onClick={() => {
                // Group selected items
                const group = new paper.Group(selectedItems);
                onPropertyChange(group, 'grouped', true);
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
          {selectedItem instanceof paper.Path.Rectangle ? 'Rectangle' :
           selectedItem instanceof paper.Path.Circle ? 'Circle' :
           selectedItem instanceof paper.PointText ? 'Text' :
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
              value={Math.round(selectedItem.position.x)}
              onChange={(e) => handlePositionChange('x', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className={styles['property-row']}>
            <label className={styles['property-label']} htmlFor="pos-y">Y:</label>
            <input
              id="pos-y"
              type="number"
              className={styles['property-input']}
              value={Math.round(selectedItem.position.y)}
              onChange={(e) => handlePositionChange('y', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Size Properties (for rectangles) */}
        {selectedItem instanceof paper.Path.Rectangle && (
          <div className={styles['property-group']}>
            <h4 className={styles['group-title']}>Size</h4>
            <div className={styles['property-row']}>
              <label className={styles['property-label']} htmlFor="rect-width">Width:</label>
              <input
                id="rect-width"
                type="number"
                className={styles['property-input']}
                value={Math.round(selectedItem.bounds.width)}
                onChange={(e) => handleSizeChange('width', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className={styles['property-row']}>
              <label className={styles['property-label']} htmlFor="rect-height">Height:</label>
              <input
                id="rect-height"
                type="number"
                className={styles['property-input']}
                value={Math.round(selectedItem.bounds.height)}
                onChange={(e) => handleSizeChange('height', parseFloat(e.target.value) || 0)}
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
              value={selectedItem.fillColor?.toCSS(true) || '#ffffff'}
              onChange={(e) => handleColorChange('fill', e.target.value)}
            />
          </div>
          <div className={styles['property-row']}>
            <label className={styles['property-label']} htmlFor="stroke-color">Stroke:</label>
            <input
              id="stroke-color"
              type="color"
              className={styles['property-input']}
              value={selectedItem.strokeColor?.toCSS(true) || '#000000'}
              onChange={(e) => handleColorChange('stroke', e.target.value)}
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
              value={selectedItem.strokeWidth || 1}
              onChange={(e) => handleStrokeWidthChange(parseFloat(e.target.value) || 1)}
            />
          </div>
        </div>

        {/* Text Properties (for text elements) */}
        {selectedItem instanceof paper.PointText && (
          <div className={styles['property-group']}>
            <h4 className={styles['group-title']}>Text</h4>
            <div className={styles['property-row']}>
              <label className={styles['property-label']} htmlFor="text-content">Content:</label>
              <input
                id="text-content"
                type="text"
                className={styles['property-input']}
                value={selectedItem.content}
                onChange={(e) => handleTextChange(e.target.value)}
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
                value={selectedItem.fontSize}
                onChange={(e) => handleFontSizeChange(parseFloat(e.target.value) || 16)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GraphicsWidgetPanel;
