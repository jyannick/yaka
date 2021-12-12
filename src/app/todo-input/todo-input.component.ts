import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'yaka-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
})
export class TodoInputComponent implements OnInit {
  @Output() newTodo = new EventEmitter<string>();
  @Output() cancel = new EventEmitter();
  label?: string;

  constructor() {}

  ngOnInit(): void {}

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
