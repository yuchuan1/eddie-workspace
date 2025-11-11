// libs/react-graphics-editor/src/lib/commands/graphics-command.interface.ts

export interface IGraphicsCommand {
  execute(): void;
  undo(): void;
  getDescription(): string;
}

export abstract class GraphicsCommand implements IGraphicsCommand {
  protected description: string;

  constructor(description: string) {
    this.description = description;
  }

  abstract execute(): void;
  abstract undo(): void;

  getDescription(): string {
    return this.description;
  }
}
