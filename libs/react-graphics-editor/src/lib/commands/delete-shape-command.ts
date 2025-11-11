// libs/react-graphics-editor/src/lib/commands/delete-shape-command.ts

import * as paper from 'paper';
import { GraphicsCommand } from './graphics-command.interface';

export class DeleteShapeCommand extends GraphicsCommand {
  private deletedItems: paper.Item[] = [];
  private deletedData: Array<{
    item: paper.Item;
    index: number;
    parent: paper.Item | paper.Project;
  }> = [];

  constructor(items: paper.Item[]) {
    super(`Delete ${items.length} item(s)`);
    this.deletedItems = [...items];
  }

  execute(): void {
    this.deletedData = [];

    for (const item of this.deletedItems) {
      // Store the item's data for undo
      const data = {
        item: item,
        index: item.index,
        parent: item.parent || paper.project,
      };
      this.deletedData.push(data);

      // Remove the item
      item.remove();
    }
  }

  undo(): void {
    for (const data of this.deletedData) {
      // Restore the item to its original position
      if (data.parent instanceof paper.Layer || data.parent instanceof paper.Group) {
        data.parent.insertChild(data.index, data.item);
      } else {
        // If parent was project, add to active layer
        paper.project.activeLayer.addChild(data.item);
      }
    }

    this.deletedData = [];
  }
}
