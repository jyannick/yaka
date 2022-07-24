export const TOGGLE_TASK_INPUT = 'control.space';
export const NEXT_ITEM = 'arrowdown';
export const NEXT_ITEM2 = 'control.n';
export const PREVIOUS_ITEM = 'arrowup';
export const PREVIOUS_ITEM2 = 'control.p';
export const CANCEL = 'escape';
export const MARK_AS_DONE = 'control.d';
export const UNMARK_AS_DONE = 'alt.shift.d';
export const MARK_AS_PAUSED = 'alt.p';
export const UNMARK_AS_PAUSED = 'control.shift.p';
export const MOVE_ITEM_UP = 'control.arrowup';
export const MOVE_ITEM_DOWN = 'control.arrowdown';
export const MOVE_ITEM_TOP = 'control.shift.arrowup';
export const MOVE_ITEM_BOTTOM = 'control.shift.arrowdown';
export const EDIT = 'control.e';
export const EMOJI = 'control.j';
export const DELETE_SELECTION = 'control.delete';
export const DELETE_ALL = 'control.shift.delete';
export const EXPORT_JSON = 'control.shift.e';
export const HELP_SCREEN = 'control.h';

export interface Action {
  name: string;
  shortcut: string;
  details: string;
}

export const ACTIONS: Action[] = [
  {
    name: 'new item',
    shortcut: TOGGLE_TASK_INPUT,
    details: 'type in the new item label and press return to validate',
  },
  {
    name: 'select next item',
    shortcut: NEXT_ITEM,
    details: `alternative shortcut: ${NEXT_ITEM2}`,
  },
  {
    name: 'select previous item',
    shortcut: PREVIOUS_ITEM,
    details: `alternative shortcut: ${PREVIOUS_ITEM2}`,
  },
  {
    name: 'cancel',
    shortcut: CANCEL,
    details: 'cancel current action, or remove current selection',
  },
  {
    name: 'mark as done',
    shortcut: MARK_AS_DONE,
    details: 'applies to currently selected item',
  },
  {
    name: 'unmark as done',
    shortcut: UNMARK_AS_DONE,
    details: 'applies to currently selected item',
  },
  {
    name: 'mark as paused',
    shortcut: MARK_AS_PAUSED,
    details: 'applies to currently selected item',
  },
  {
    name: 'unmark as paused',
    shortcut: UNMARK_AS_PAUSED,
    details: 'applies to currently selected item',
  },
  {
    name: 'move up',
    shortcut: MOVE_ITEM_UP,
    details: 'applies to currently selected item',
  },
  {
    name: 'move down',
    shortcut: MOVE_ITEM_DOWN,
    details: 'applies to currently selected item',
  },
  {
    name: 'move to top of list',
    shortcut: MOVE_ITEM_TOP,
    details: 'applies to currently selected item',
  },
  {
    name: 'move to bottom of list',
    shortcut: MOVE_ITEM_BOTTOM,
    details: 'applies to currently selected item',
  },
  {
    name: 'edit',
    shortcut: EDIT,
    details: 'applies to currently selected item',
  },
  {
    name: 'add emoji',
    shortcut: EMOJI,
    details: 'insert at current cursor position',
  },
  {
    name: 'delete selected item',
    shortcut: DELETE_SELECTION,
    details: 'only if the item is done, to prevent mistakes',
  },
  {
    name: 'cleanup all done items',
    shortcut: DELETE_ALL,
    details: 'all done items will be lost forever',
  },
  {
    name: 'download JSON',
    shortcut: EXPORT_JSON,
    details: 'all items will be exported to a file',
  },
  {
    name: 'show this help screen',
    shortcut: HELP_SCREEN,
    details: 'press again to go back to the main screen',
  },
];
