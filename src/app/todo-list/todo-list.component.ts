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

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.selectedTodo = 1;
    this.todoService.getTodos().subscribe((todos) => (this.todos = todos));
  }

  @HostListener('document:keydown.arrowdown')
  selectNextTodo() {
    if (!this.todos || !this.selectedTodo) {
      return;
    }
    if (this.selectedTodo < this.todos[this.todos.length - 1].id) {
      this.selectedTodo++;
    }
  }

  @HostListener('document:keydown.arrowup')
  selectPreviousTodo() {
    if (!this.todos || !this.selectedTodo) {
      return;
    }
    if (this.selectedTodo > this.todos[0].id) {
      this.selectedTodo--;
    }
  }

  @HostListener('document:keydown.control.arrowright')
  markAsDone() {
    if (!this.todos || !this.selectedTodo) {
      return;
    }
    var selected = this.todos.find((t) => t.id === this.selectedTodo);
    if (selected) {
      selected.done = true;
    }
  }

  @HostListener('document:keydown.control.arrowleft')
  unmarkAsDone() {
    if (!this.todos || !this.selectedTodo) {
      return;
    }
    var selected = this.todos.find((t) => t.id === this.selectedTodo);
    if (selected) {
      selected.done = false;
    }
  }

  newTodo(label: string) {
    this.todoService.addTodo(label).subscribe();
  }
}
