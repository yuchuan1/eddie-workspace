// libs/react-graphics-editor/src/lib/commands/create-shape-command.ts

import * as paper from 'paper';
import { GraphicsCommand } from './graphics-command.interface';

export class CreateShapeCommand extends GraphicsCommand {
  private shape: paper.Item | null = null;
  private shapeType: 'rectangle' | 'circle' | 'text';
  private position: paper.Point;
  private size?: paper.Size;
  private radius?: number;
  private text?: string;

  constructor(
    shapeType: 'rectangle' | 'circle' | 'text',
    position: paper.Point,
    options: {
      size?: paper.Size;
      radius?: number;
      text?: string;
    } = {}
  ) {
    super(`Create ${shapeType}`);
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
          this.shape = new paper.Path.Rectangle(
            new paper.Rectangle(this.position, this.size)
          );
          this.shape.fillColor = new paper.Color('#3b82f6');
          this.shape.strokeColor = new paper.Color('#1e40af');
          this.shape.strokeWidth = 2;
        }
        break;

      case 'circle':
        if (this.radius) {
          this.shape = new paper.Path.Circle(this.position, this.radius);
          this.shape.fillColor = new paper.Color('#ef4444');
          this.shape.strokeColor = new paper.Color('#dc2626');
          this.shape.strokeWidth = 2;
        }
        break;

      case 'text':
        if (this.text) {
          this.shape = new paper.PointText(this.position);
          (this.shape as paper.PointText).content = this.text;
          (this.shape as paper.PointText).fillColor = new paper.Color('#1f2937');
          (this.shape as paper.PointText).fontSize = 16;
          (this.shape as paper.PointText).fontFamily = 'Arial, sans-serif';
        }
        break;
    }
  }

  undo(): void {
    if (this.shape) {
      this.shape.remove();
      this.shape = null;
    }
  }
}
