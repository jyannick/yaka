import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Todo } from './todo';

const LOCAL_STORAGE_ITEM = 'yaka-todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos?: Todo[];

  constructor() {
    this.loadLocalStorage();
  }

  getTodos(): Observable<Todo[]> {
    if (!this.todos) {
      console.error('getTodos() called before loading data');
      return of();
    }
    return of(this.todos);
  }

  save(todos: Todo[]) {
    this.todos = todos;
    this.saveLocalStorage();
  }

  addTodo(label: string): Observable<Todo> {
    if (!this.todos) {
      console.error('addTodo() called before loading data');
      return of();
    }
    const newTodo = <Todo>{
      id: this.todos[this.todos.length - 1].id + 1,
      label: label,
      done: false,
    };
    this.todos.push(newTodo);
    this.saveLocalStorage();
    return of(newTodo);
  }

  clearAll(): Observable<Todo[]> {
    localStorage.removeItem(LOCAL_STORAGE_ITEM);
    this.loadLocalStorage();
    return this.getTodos();
  }

  private loadLocalStorage() {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_ITEM);
    this.todos = savedTodos
      ? JSON.parse(savedTodos)
      : [{ id: 1, label: 'add new tasks', done: false }];
  }

  private saveLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(this.todos));
  }
}
