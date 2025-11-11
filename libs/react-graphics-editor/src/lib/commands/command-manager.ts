// libs/react-graphics-editor/src/lib/commands/command-manager.ts

import { IGraphicsCommand } from './graphics-command.interface';

export class CommandManager {
  private undoStack: IGraphicsCommand[] = [];
  private redoStack: IGraphicsCommand[] = [];
  private maxHistorySize = 50;

  execute(command: IGraphicsCommand): void {
    command.execute();
    this.undoStack.push(command);

    // Clear redo stack when new command is executed
    this.redoStack = [];

    // Limit history size
    if (this.undoStack.length > this.maxHistorySize) {
      this.undoStack.shift();
    }
  }

  undo(): IGraphicsCommand | null {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
      return command;
    }
    return null;
  }

  redo(): IGraphicsCommand | null {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
      return command;
    }
    return null;
  }

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }

  getUndoStack(): IGraphicsCommand[] {
    return [...this.undoStack];
  }

  getRedoStack(): IGraphicsCommand[] {
    return [...this.redoStack];
  }
}
