import { TreeViewItem, _InternalItem } from "../types";

export function useTreeViewItemMouseActions() {
    const addHoverClass = (event: DragEvent): void => {
        const target = event.currentTarget as HTMLElement;

        if (target) {
            target.classList.add('drag-over')
        }
    }

    const removeHoverClass =(event: DragEvent): void => {
        const target = event.currentTarget as HTMLElement;

        if (target) {
            target.classList.remove('drag-over');
        }
    }

    const onDragNode = (item: TreeViewItem, event: DragEvent): void => {
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', JSON.stringify(item));
        }
    }

    const onDropNode = (dropHost: _InternalItem, event: DragEvent, isDropValid: (item1: _InternalItem, item2: _InternalItem) => boolean): void => {
        if (event.dataTransfer) {
            const droppedNode = JSON.parse(event.dataTransfer.getData('text/plain')) as _InternalItem;

            removeHoverClass(event)

            if (droppedNode.id === dropHost.id) {
                return
            }
            
            if (!isDropValid(droppedNode, dropHost)) return;
        }
    }


    return {
        addHoverClass,
        removeHoverClass,
        onDragNode,
        onDropNode
    }
}