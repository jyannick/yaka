import { Component, HostListener, OnInit } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'yaka-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [
    { id: 1, label: 'finish this app' },
    { id: 2, label: 'get famous' },
    { id: 3, label: 'enjoy' },
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
}
