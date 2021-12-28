export const TOGGLE_TASK_INPUT = 'control.space';
export const NEXT_ITEM = 'arrowdown';
export const NEXT_ITEM2 = 'control.j';
export const PREVIOUS_ITEM = 'arrowup';
export const PREVIOUS_ITEM2 = 'control.k';
export const CANCEL = 'escape';
export const MARK_AS_DONE = 'control.d';
export const UNMARK_AS_DONE = 'control.shift.d';
export const EDIT = 'control.e';
export const DELETE_SELECTION = 'control.delete';
export const DELETE_ALL = 'control.shift.delete';
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
    name: 'edit',
    shortcut: EDIT,
    details: 'applies to currently selected item',
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
    name: 'show this help screen',
    shortcut: HELP_SCREEN,
    details: 'press again to go back to the main screen',
  },
];
