import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [
    { id: 1, label: 'finish this app', done: false },
    { id: 2, label: 'get famous', done: false },
    { id: 3, label: 'enjoy', done: false },
  ];

  constructor() {}

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  addTodo(label: string): Observable<Todo> {
    const newTodo = <Todo>{
      id: this.todos[this.todos.length - 1].id + 1,
      label: label,
      done: false,
    };
    this.todos.push(newTodo);
    return of(newTodo);
  }
}
