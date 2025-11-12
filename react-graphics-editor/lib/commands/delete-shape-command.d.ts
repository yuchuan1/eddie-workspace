import { GraphicsCommand } from './graphics-command.interface';
import { GraphicsEditorService } from '../services/graphics-editor.service';
export declare class DeleteShapeCommand extends GraphicsCommand {
    private service;
    private deletedItems;
    private deletedData;
    constructor(service: GraphicsEditorService, items: paper.Item[]);
    execute(): void;
    undo(): void;
}
