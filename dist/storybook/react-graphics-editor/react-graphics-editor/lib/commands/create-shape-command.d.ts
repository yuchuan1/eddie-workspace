import { GraphicsCommand } from './graphics-command.interface';
import { GraphicsEditorService } from '../services/graphics-editor.service';
export declare class CreateShapeCommand extends GraphicsCommand {
    private service;
    private shape;
    private shapeType;
    private position;
    private size?;
    private radius?;
    private text?;
    constructor(service: GraphicsEditorService, shapeType: 'rectangle' | 'circle' | 'text', position: paper.Point, options?: {
        size?: paper.Size;
        radius?: number;
        text?: string;
    });
    execute(): void;
    undo(): void;
}
