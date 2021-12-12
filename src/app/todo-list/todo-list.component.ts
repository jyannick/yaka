import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'yaka-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [
    { id: 1, label: 'finish this app' },
    { id: 2, label: 'enjoy' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
