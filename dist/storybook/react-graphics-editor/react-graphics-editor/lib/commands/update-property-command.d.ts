import { GraphicsCommand } from './graphics-command.interface';
import { GraphicsEditorService } from '../services/graphics-editor.service';
export declare class UpdatePropertyCommand extends GraphicsCommand {
    private service;
    private property;
    private newValue;
    private oldValue;
    constructor(service: GraphicsEditorService, property: string, newValue: unknown);
    private getCurrentValue;
    execute(): void;
    undo(): void;
    private applyValue;
}
