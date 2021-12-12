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
    this.selectedTodo = 1;
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  @HostListener('document:keydown.control.j', ['$event'])
  selectNextTodo(event?: Event) {
    event?.preventDefault();
    if (!this.todos || !this.selectedTodo) {
      return;
    }
    if (this.selectedTodo < this.todos[this.todos.length - 1].id) {
      this.selectedTodo++;
    }
  }

  @HostListener('document:keydown.arrowup', ['$event'])
  @HostListener('document:keydown.control.k', ['$event'])
  selectPreviousTodo(event?: Event) {
    event?.preventDefault();
    if (!this.todos || !this.selectedTodo) {
      return;
    }
    if (this.selectedTodo > this.todos[0].id) {
      this.selectedTodo--;
    }
  }

  @HostListener('document:keydown.control.d', ['$event'])
  markAsDone(event?: Event) {
    event?.preventDefault();
    if (!this.todos || !this.selectedTodo) {
      return;
    }
    var selected = this.todos.find((t) => t.id === this.selectedTodo);
    if (selected) {
      selected.done = true;
    }
  }

  @HostListener('document:keydown.control.shift.d', ['$event'])
  unmarkAsDone(event?: Event) {
    event?.preventDefault();
    if (!this.todos || !this.selectedTodo) {
      return;
    }
    var selected = this.todos.find((t) => t.id === this.selectedTodo);
    if (selected) {
      selected.done = false;
    }
  }

  @HostListener('document:keydown.control.arrowdown', ['$event'])
  showInput(event?: Event) {
    event?.preventDefault();
    this.input = true;
  }

  @HostListener('document:keydown.control.arrowup', ['$event'])
  hideInput(event?: Event) {
    event?.preventDefault();
    this.input = false;
  }

  newTodo(label: string) {
    this.todoService.addTodo(label).subscribe();
    this.input = false;
  }
}
