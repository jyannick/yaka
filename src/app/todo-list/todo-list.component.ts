import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'yaka-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  @Output() isInputDisplayedChange = new EventEmitter<boolean>();
  isEditing: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
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

  @HostListener('document:keydown.arrowdown', ['$event'])
  @HostListener('document:keydown.control.j', ['$event'])
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

  @HostListener('document:keydown.arrowup', ['$event'])
  @HostListener('document:keydown.control.k', ['$event'])
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

  @HostListener('document:keydown.escape', ['$event'])
  userPressedEscape(event?: Event) {
    event?.preventDefault();
    this.isInputDisplayed ? this.hideInput() : this.selectNone();
  }

  @HostListener('document:keydown.control.d', ['$event'])
  markSelectionAsDone(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined) {
      return;
    }
    this.markAsDone(this.selectedTodo);
  }

  @HostListener('document:keydown.control.shift.d', ['$event'])
  unmarkSelectionAsDone(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined) {
      return;
    }
    this.unmarkAsDone(this.selectedTodo);
  }

  @HostListener('document:keydown.control.e', ['$event'])
  editSelectionLabel(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo === undefined) {
      return;
    }
    this.isEditing = true;
  }

  @HostListener('document:keydown.control.space', ['$event'])
  toggleInput(event?: Event) {
    event?.preventDefault();
    if (this.isInputDisplayed) {
      this.hideInput();
    } else {
      this.showInput();
    }
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

  @HostListener('document:keydown.control.delete', ['$event'])
  deleteSelectedTodoIfDone(event?: Event) {
    event?.preventDefault();
    if (this.selectedTodo !== undefined) {
      this.todoService.deleteIfDone(this.selectedTodo);
    }
  }

  @HostListener('document:keydown.control.shift.delete', ['$event'])
  clearAllDone(event?: Event) {
    event?.preventDefault();
    this.selectNone();
    this.todoService.clearAllDone().subscribe((todos) => (this.todos = todos));
  }

  newTodo(label: string) {
    this.todoService.addTodo(label).subscribe();
    this.isInputDisplayed = false;
  }

  markAsDone(index: number) {
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

  save() {
    this.todoService.save(this.todos);
  }
}
