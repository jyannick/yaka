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
    this.saveLocalStorage(); // just modifying the array does not trigger the setter
  }

  deleteIfDone(index: number) {
    if (this.todos[index].done) {
      this.todos.splice(index, 1);
      this.saveLocalStorage(); // just modifying the array does not trigger the setter
    }
  }

  clearAllDone(): Observable<Todo[]> {
    const notDoneTodos = this.todos.filter((todo) => todo.done === false);
    this.todos = notDoneTodos;
    return this.getTodosObservable();
  }

  moveToTop(index: number) {
    if (index < 0 || this.todos.length <= index) {
      console.error(
        `Error in 'moveToTop': index ${index} not inside array ${this.todos}`
      );
      return;
    }
    const itemToMove = this.todos[index];
    this.todos.splice(index, 1);
    const newArray = [itemToMove, ...this.todos];
    this.todos = newArray;
  }

  moveToBottom(index: number) {
    if (index < 0 || this.todos.length <= index) {
      console.error(
        `Error in 'moveToBottom': index ${index} not inside array ${this.todos}`
      );
      return;
    }
    const itemToMove = this.todos[index];
    this.todos.splice(index, 1);
    const newArray = [...this.todos, itemToMove];
    this.todos = newArray;
  }

  swapPositions(index_before: number, index_after: number) {
    [this.todos[index_before], this.todos[index_after]] = [
      this.todos[index_after],
      this.todos[index_before],
    ];
    this.saveLocalStorage(); // just modifying the array does not trigger the setter
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
