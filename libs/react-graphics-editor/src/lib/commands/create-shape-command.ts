// libs/react-graphics-editor/src/lib/commands/create-shape-command.ts

import paper from 'paper';
import { GraphicsCommand } from './graphics-command.interface';
import { GraphicsEditorService } from '../services/graphics-editor.service';

export class CreateShapeCommand extends GraphicsCommand {
  private service: GraphicsEditorService;
  private shape: paper.Item | null = null;
  private shapeType: 'rectangle' | 'circle' | 'text';
  private position: paper.Point;
  private size?: paper.Size;
  private radius?: number;
  private text?: string;

  constructor(
    service: GraphicsEditorService,
    shapeType: 'rectangle' | 'circle' | 'text',
    position: paper.Point,
    options: {
      size?: paper.Size;
      radius?: number;
      text?: string;
    } = {}
  ) {
    super(`Create ${shapeType}`);
    this.service = service;
    this.shapeType = shapeType;
    this.position = position;
    this.size = options.size;
    this.radius = options.radius;
    this.text = options.text;
  }

  execute(): void {
    switch (this.shapeType) {
      case 'rectangle':
        if (this.size) {
          this.shape = this.service.addRectangle(this.position, this.size);
        }
        break;

      case 'circle':
        if (this.radius) {
          this.shape = this.service.addCircle(this.position, this.radius);
        }
        break;

      case 'text':
        if (this.text) {
          this.shape = this.service.addText(this.position, this.text);
        }
        break;
    }
  }

  undo(): void {
    if (this.shape) {
      this.service.deleteItems([this.shape]);
      this.shape = null;
    }
  }
}
