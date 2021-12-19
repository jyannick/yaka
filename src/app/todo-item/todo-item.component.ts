import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'yaka-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo?: Todo;
  @Input() selected?: boolean;
  @Output() todoChange = new EventEmitter<Todo>();

  constructor() {}

  markDone() {
    this.modifyTodo((todo) => {
      todo.done = true;
      return todo;
    });
  }

  markUndone() {
    this.modifyTodo((todo) => {
      todo.done = false;
      return todo;
    });
  }

  private modifyTodo(operation: (todo: Todo) => Todo) {
    if (this.todo === undefined) {
      console.error('modifyTodo() called before initialization');
      return;
    }
    this.todo = operation(this.todo);
    this.todoChange.emit(this.todo);
  }
}
