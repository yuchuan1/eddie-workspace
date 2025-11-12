export interface IGraphicsCommand {
    execute(): void;
    undo(): void;
    getDescription(): string;
}
export type { IGraphicsCommand };
export declare abstract class GraphicsCommand implements IGraphicsCommand {
    protected description: string;
    constructor(description: string);
    abstract execute(): void;
    abstract undo(): void;
    getDescription(): string;
}
