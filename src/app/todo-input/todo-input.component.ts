import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'yaka-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
})
export class TodoInputComponent {
  @Output() newTodo = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();
  label?: string;

  constructor() {}

  createTodo() {
    if (this.label) {
      this.newTodo.emit(this.label);
      this.label = undefined;
    }
  }

  emitCancel() {
    this.cancel.emit();
  }
}
