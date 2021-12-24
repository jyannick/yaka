import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Todo } from './todo';

const LOCAL_STORAGE_ITEM = 'yaka-todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$ = new BehaviorSubject<Todo[]>([]);

  constructor() {
    this.loadLocalStorage();
  }

  private get todos(): Todo[] {
    return this.todos$.value;
  }

  private set todos(todos: Todo[]) {
    this.todos$.next(todos);
    this.saveLocalStorage();
  }

  getTodosObservable(): Observable<Todo[]> {
    return this.todos$.asObservable();
  }

  save(todos: Todo[]) {
    this.todos = todos;
  }

  addTodo(label: string) {
    const newTodo = <Todo>{
      id: this.generateId(),
      label: label,
      done: false,
    };
    this.todos.push(newTodo);
    this.saveLocalStorage(); // adding an element to the array does not trigger the setter
  }

  deleteIfDone(index: number) {
    if (this.todos[index].done) {
      this.todos.splice(index, 1);
    }
  }

  clearAllDone(): Observable<Todo[]> {
    const notDoneTodos = this.todos.filter((todo) => todo.done === false);
    this.todos = notDoneTodos;
    return this.getTodosObservable();
  }

  private loadLocalStorage() {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_ITEM);
    this.todos = savedTodos
      ? JSON.parse(savedTodos)
      : [{ id: 1, label: 'add new tasks', done: false }];
  }

  private saveLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_ITEM, JSON.stringify(this.todos$.value));
  }

  private generateId(): number {
    const todos = this.todos$.value;
    return todos?.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  }
}
