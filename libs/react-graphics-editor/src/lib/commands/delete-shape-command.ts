// libs/react-graphics-editor/src/lib/commands/delete-shape-command.ts

import paper from 'paper';
import { GraphicsCommand } from './graphics-command.interface';
import { GraphicsEditorService } from '../services/graphics-editor.service';

export class DeleteShapeCommand extends GraphicsCommand {
  private service: GraphicsEditorService;
  private deletedItems: paper.Item[] = [];
  private deletedData: Array<{
    item: paper.Item;
    index: number;
    parent: paper.Item | paper.Project;
  }> = [];

  constructor(service: GraphicsEditorService, items: paper.Item[]) {
    super(`Delete ${items.length} item(s)`);
    this.service = service;
    this.deletedItems = [...items];
  }

  execute(): void {
    this.service.deleteItems(this.deletedItems);
  }

  undo(): void {
    // For undo, we need to restore the items. Since the service's deleteItems
    // just calls remove() on each item, we need to re-add them to the project.
    for (const item of this.deletedItems) {
      // Re-add to the active layer
      paper.project.activeLayer.addChild(item);
    }
  }
}
