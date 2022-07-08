import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import {
  CANCEL,
  DELETE_ALL,
  DELETE_SELECTION,
  EDIT,
  EXPORT_JSON,
  MARK_AS_DONE,
  NEXT_ITEM,
  NEXT_ITEM2,
  PREVIOUS_ITEM,
  PREVIOUS_ITEM2,
  TOGGLE_TASK_INPUT,
  UNMARK_AS_DONE,
  MOVE_ITEM_UP,
  MOVE_ITEM_DOWN,
  MOVE_ITEM_TOP,
  MOVE_ITEM_BOTTOM,
  UNMARK_AS_PAUSED,
  MARK_AS_PAUSED,
} from '../keyboard-shortcuts';

@Component({
  selector: 'yaka-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  @Output() isInputDisplayedChange = new EventEmitter<boolean>();
  @Output() flash = new EventEmitter<void>();
  isEditing: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService
      .getTodosObservable()
      .subscribe((todos) => (this.todos = todos));
  }

  _selectedTodo?: number;

  get selectedTodo(): number | undefined {
    return this._selectedTodo;
  }

  set selectedTodo(index: number | undefined) {
    if (index !== this.selectedTodo) {
      this.isEditing = false;
      this.isInputDisplayed = false;
    }
    this._selectedTodo = index;
  }

  _isInputDisplayed = false;

  get isInputDisplayed() {
    return this._isInputDisplayed;
  }

  @Input()
  set isInputDisplayed(newValue: boolean) {
    this._isInputDisplayed = newValue;
    this._selectedTodo = undefined;
    this.isInputDisplayedChange.emit(newValue);
  }

  @HostListener(`document:keydown.${NEXT_ITEM}`, ['$event'])
  @HostListener(`document:keydown.${NEXT_ITEM2}`, ['$event'])
  selectNextTodo(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined) {
      this.selectedTodo = 0;
      return;
    }
    if (this.selectedTodo === this.todos.length - 1) {
      this.selectedTodo = undefined;
      return;
    }
    this.selectedTodo++;
  }

  @HostListener(`document:keydown.${PREVIOUS_ITEM}`, ['$event'])
  @HostListener(`document:keydown.${PREVIOUS_ITEM2}`, ['$event'])
  selectPreviousTodo(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined) {
      this.selectedTodo = this.todos.length - 1;
      return;
    }
    if (this.selectedTodo === 0) {
      this.selectedTodo = undefined;
      return;
    }
    this.selectedTodo--;
  }

  selectTodo(index: number | undefined) {
    if (index !== this.selectedTodo) {
      this.isEditing = false;
    }
    this.selectedTodo = index;
  }

  @HostListener(`document:keydown.${CANCEL}`, ['$event'])
  userPressedEscape(event?: Event) {
    event?.preventDefault();
    this.isInputDisplayed ? this.hideInput() : this.selectNone();
  }

  @HostListener(`document:keydown.${MARK_AS_DONE}`, ['$event'])
  markSelectionAsDone(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined) {
      return;
    }
    this.markAsDone(this.selectedTodo);
  }

  @HostListener(`document:keydown.${UNMARK_AS_DONE}`, ['$event'])
  unmarkSelectionAsDone(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined) {
      return;
    }
    this.unmarkAsDone(this.selectedTodo);
  }

  @HostListener(`document:keydown.${MARK_AS_PAUSED}`, ['$event'])
  markSelectionAsPaused(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined) {
      return;
    }
    this.markAsPaused(this.selectedTodo);
  }

  @HostListener(`document:keydown.${UNMARK_AS_PAUSED}`, ['$event'])
  unmarkSelectionAsPaused(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined) {
      return;
    }
    this.unmarkAsPaused(this.selectedTodo);
  }

  @HostListener(`document:keydown.${EDIT}`, ['$event'])
  editSelectionLabel(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined) {
      return;
    }
    this.isEditing = true;
  }

  @HostListener(`document:keydown.${TOGGLE_TASK_INPUT}`, ['$event'])
  toggleInput(event?: Event) {
    event?.preventDefault();
    if (this.isInputDisplayed) {
      this.hideInput();
    } else {
      this.showInput();
    }
  }

  @HostListener(`document:keydown.${MOVE_ITEM_UP}`, ['$event'])
  moveSelectedItemUp(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined || this.selectedTodo === 0) {
      return;
    }
    this.todoService.moveItem(this.selectedTodo, this.selectedTodo - 1);
    this.selectedTodo--;
  }

  @HostListener(`document:keydown.${MOVE_ITEM_DOWN}`, ['$event'])
  moveSelectedItemDown(event?: Event) {
    event?.preventDefault();
    if (
      this.selectedTodo === undefined ||
      this.selectedTodo === this.todos.length - 1
    ) {
      return;
    }
    this.todoService.moveItem(this.selectedTodo, this.selectedTodo + 1);
    this.selectedTodo++;
  }

  @HostListener(`document:keydown.${MOVE_ITEM_TOP}`, ['$event'])
  moveSelectedItemToTop(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined || this.selectedTodo === 0) {
      return;
    }
    this.todoService.moveToTop(this.selectedTodo);
    this.selectedTodo = 0;
  }

  @HostListener(`document:keydown.${MOVE_ITEM_BOTTOM}`, ['$event'])
  moveSelectedItemToBottom(event?: Event) {
    event?.preventDefault();
    if (
      this.selectedTodo === undefined ||
      this.selectedTodo === this.todos.length - 1
    ) {
      return;
    }
    this.todoService.moveToBottom(this.selectedTodo);
    this.selectedTodo = this.todos.length - 1;
  }

  showInput(event?: Event) {
    event?.preventDefault();
    this.selectNone();
    this.isInputDisplayed = true;
  }

  hideInput(event?: Event) {
    event?.preventDefault();
    this.isInputDisplayed = false;
  }

  selectNone() {
    this.selectTodo(undefined);
  }

  @HostListener(`document:keydown.${DELETE_SELECTION}`, ['$event'])
  deleteSelectedTodoIfDone(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo !== undefined) {
      this.todoService.deleteIfDone(this.selectedTodo);
    }
  }

  @HostListener(`document:keydown.${DELETE_ALL}`, ['$event'])
  clearAllDone(event?: Event) {
    event?.preventDefault();
    this.selectNone();
    this.todoService.clearAllDone().subscribe((todos) => (this.todos = todos));
  }

  @HostListener(`document:keydown.${EXPORT_JSON}`, ['$event'])
  exportJson(event?: Event) {
    event?.preventDefault();
    var link = document.createElement('a');
    link.href = this.generateJsonUrl();
    link.download = 'yaka-tasks.json';
    link.click();
  }

  newTodo(label: string) {
    this.todoService.addTodo(label);
    this.isInputDisplayed = false;
  }

  markAsDone(index: number) {
    if (!this.todos[index].done) {
      this.flash.emit();
    }
    this.todos[index].done = true;
    this.save();
  }

  unmarkAsDone(index: number) {
    if (!this.todos) {
      return;
    }
    this.todos[index].done = false;
    this.save();
  }

  markAsPaused(index: number) {
    if (!this.todos) {
      return;
    }
    this.todos[index].paused = true;
    this.save();
  }

  unmarkAsPaused(index: number) {
    if (!this.todos) {
      return;
    }
    this.todos[index].paused = false;
    this.save();
  }

  save() {
    this.todoService.save(this.todos);
  }

  generateJsonUrl() {
    return (
      'data:text/json;charset=UTF-8,' +
      encodeURIComponent(JSON.stringify(this.todos, null, '\t'))
    );
  }

  dragAndDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.save();
    if (this.selectedTodo !== undefined) {
      if (this.selectedTodo === event.previousIndex) {
        this.selectedTodo = event.currentIndex;
      } else if (
        this.selectedTodo <= event.previousIndex &&
        event.currentIndex <= this.selectedTodo
      ) {
        this.selectedTodo++;
      } else if (
        this.selectedTodo >= event.previousIndex &&
        event.currentIndex >= this.selectedTodo
      ) {
        this.selectedTodo--;
      }
    }
  }
}
