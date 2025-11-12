import { IGraphicsCommand } from './graphics-command.interface';
export declare class CommandManager {
    private undoStack;
    private redoStack;
    private maxHistorySize;
    execute(command: IGraphicsCommand): void;
    undo(): IGraphicsCommand | null;
    redo(): IGraphicsCommand | null;
    canUndo(): boolean;
    canRedo(): boolean;
    clear(): void;
    getUndoStack(): IGraphicsCommand[];
    getRedoStack(): IGraphicsCommand[];
}
