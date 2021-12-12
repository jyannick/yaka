import { Component, HostListener, OnInit } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'yaka-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [
    { id: 1, label: 'finish this app', done: false },
    { id: 2, label: 'get famous', done: false },
    { id: 3, label: 'enjoy', done: false },
  ];

  selectedTodo?: number;

  constructor() {}

  ngOnInit(): void {
    this.selectedTodo = 1;
  }

  @HostListener('document:keydown.arrowdown')
  @HostListener('document:keydown.n')
  selectNextTodo() {
    if (!this.selectedTodo) {
      return;
    }
    if (this.selectedTodo < this.todos[this.todos.length - 1].id) {
      this.selectedTodo++;
    }
  }

  @HostListener('document:keydown.arrowup')
  @HostListener('document:keydown.p')
  selectPreviousTodo() {
    if (!this.selectedTodo) {
      return;
    }
    if (this.selectedTodo > this.todos[0].id) {
      this.selectedTodo--;
    }
  }

  @HostListener('document:keydown.control.arrowright')
  @HostListener('document:keydown.enter')
  markAsDone() {
    if (!this.selectedTodo) {
      return;
    }
    var selected = this.todos.find((t) => t.id === this.selectedTodo);
    if (selected) {
      selected.done = true;
    }
  }

  @HostListener('document:keydown.control.arrowleft')
  @HostListener('document:keydown.shift.enter')
  unmarkAsDone() {
    if (!this.selectedTodo) {
      return;
    }
    var selected = this.todos.find((t) => t.id === this.selectedTodo);
    if (selected) {
      selected.done = false;
    }
  }
}
