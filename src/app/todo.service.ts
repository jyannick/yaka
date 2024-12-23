import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';

import { Todo, isATodo } from './todo';

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
    this.moveItem(index, 0);
  }

  moveToBottom(index: number) {
    this.moveItem(index, this.todos.length - 1);
  }

  moveItem(fromIndex: number, toIndex: number) {
    moveItemInArray(this.todos, fromIndex, toIndex);
    this.saveLocalStorage(); // just modifying the array does not trigger the setter
  }

  generateJsonUrl() {
    return (
      'data:text/json;charset=UTF-8,' +
      encodeURIComponent(JSON.stringify(this.todos, null, '\t'))
    );
  }

  exportJson() {
    var link = document.createElement('a');
    link.href = this.generateJsonUrl();
    link.download = 'yaka-tasks.json';
    link.click();
  }

  importJson() {
    var fileChooser = document.createElement('input');
    fileChooser.type = "file";
    fileChooser.accept = ".json";
    fileChooser.onchange = (e: Event) => {
      if (fileChooser.files){
        this.readJson(fileChooser.files[0]);
      }
    }
    fileChooser.click();
  }

  readJson(file: File) {
    var reader = new FileReader();
    reader.onload = () => {
      const importedTodos = JSON.parse(String(reader.result));
      if (!Array.isArray(importedTodos)) {
        console.log("Incorrect value for imported TODOs:", importedTodos);
        return;
      }
      let isFormatOk = true;
      importedTodos.forEach((element: any) => {
        if (!isATodo(element)){
          console.log("Incorrect value for imported TODOs:", element);
          isFormatOk = false;
        }
      });
      if (isFormatOk) {
        this.todos = importedTodos;
      }
    }
    reader.readAsText(file);
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

