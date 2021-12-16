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
  userPressedEscape(event?: Event) {
    event?.preventDefault();
    this.input ? this.hideInput() : this.selectNone();
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

  hideInput(event?: Event) {
    event?.preventDefault();
    this.input = false;
  }

  selectNone() {
    this.selectedTodo = undefined;
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

  markAsDone(index: number) {
    if (!this.todos) {
      return;
    }
    this.todos[index].done = true;
    this.todoService.save(this.todos);
  }

  unmarkAsDone(index: number) {
    if (!this.todos) {
      return;
    }
    this.todos[index].done = false;
    this.todoService.save(this.todos);
  }
}
