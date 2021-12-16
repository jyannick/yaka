import { Component, HostListener, OnInit } from '@angular/core';

import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'yaka-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  selectedTodo?: number;
  todos?: Todo[];
  input: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  @HostListener('document:keydown.control.j', ['$event'])
  selectNextTodo(event?: Event) {
    event?.preventDefault();
    if (!this.todos) {
      return;
    }
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
    if (!this.todos) {
      return;
    }
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

  @HostListener('document:keydown.escape', ['$event'])
  selectNone(event?: Event) {
    event?.preventDefault();
    this.selectedTodo = undefined;
  }

  @HostListener('document:keydown.control.d', ['$event'])
  markAsDone(event?: Event) {
    event?.preventDefault();
    if (!this.todos || this.selectedTodo === undefined) {
      return;
    }
    var selected = this.todos[this.selectedTodo];
    if (selected) {
      selected.done = true;
      this.todoService.save(this.todos);
    }
  }

  @HostListener('document:keydown.control.shift.d', ['$event'])
  unmarkAsDone(event?: Event) {
    event?.preventDefault();
    if (!this.todos || !this.selectedTodo) {
      return;
    }
    var selected = this.todos[this.selectedTodo];
    if (selected) {
      selected.done = false;
      this.todoService.save(this.todos);
    }
  }

  @HostListener('document:keydown.control.space', ['$event'])
  toggleInput(event?: Event) {
    event?.preventDefault();
    if (this.input) {
      this.hideInput();
    } else {
      this.showInput();
    }
  }

  showInput(event?: Event) {
    event?.preventDefault();
    this.selectNone();
    this.input = true;
  }

  @HostListener('document:keydown.escape', ['$event'])
  hideInput(event?: Event) {
    event?.preventDefault();
    this.input = false;
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
    this.input = false;
  }
}
