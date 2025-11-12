// libs/react-graphics-editor/src/lib/commands/update-property-command.ts

import paper from 'paper';
import { GraphicsCommand } from './graphics-command.interface';
import { GraphicsEditorService } from '../services/graphics-editor.service';

export class UpdatePropertyCommand extends GraphicsCommand {
  private service: GraphicsEditorService;
  private property: string;
  private newValue: unknown;
  private oldValue: unknown;

  constructor(service: GraphicsEditorService, property: string, newValue: unknown) {
    super(`Update ${property}`);
    this.service = service;
    this.property = property;
    this.newValue = newValue;

    // Store the current value for undo
    this.oldValue = this.getCurrentValue();
  }

  private getCurrentValue(): unknown {
    if (this.service.selectedItems.length !== 1) return null;

    const item = this.service.selectedItems[0];
    switch (this.property) {
      case 'position':
        return item.position.clone();
      case 'bounds':
        return item instanceof paper.Path.Rectangle ? item.bounds.clone() : null;
      case 'fillColor':
        return item.fillColor?.clone() || null;
      case 'strokeColor':
        return item.strokeColor?.clone() || null;
      case 'strokeWidth':
        return item.strokeWidth;
      case 'content':
        return item instanceof paper.PointText ? item.content : null;
      case 'fontSize':
        return item instanceof paper.PointText ? item.fontSize : null;
      default:
        return null;
    }
  }

  execute(): void {
    this.applyValue(this.newValue);
  }

  undo(): void {
    this.applyValue(this.oldValue);
  }

  private applyValue(value: unknown): void {
    switch (this.property) {
      case 'position':
        if (value instanceof paper.Point) {
          this.service.updateSelectedItemPosition(value);
        }
        break;
      case 'bounds':
        if (value instanceof paper.Rectangle) {
          this.service.updateSelectedItemSize(value);
        }
        break;
      case 'fillColor':
        if (value instanceof paper.Color || value === null) {
          this.service.updateSelectedItemColor('fill', value);
        }
        break;
      case 'strokeColor':
        if (value instanceof paper.Color || value === null) {
          this.service.updateSelectedItemColor('stroke', value);
        }
        break;
      case 'strokeWidth':
        if (typeof value === 'number') {
          this.service.updateSelectedItemStrokeWidth(value);
        }
        break;
      case 'content':
        if (typeof value === 'string') {
          this.service.updateSelectedItemContent(value);
        }
        break;
      case 'fontSize':
        if (typeof value === 'number') {
          this.service.updateSelectedItemFontSize(value);
        }
        break;
    }
  }
}
