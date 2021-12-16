import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'yaka-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo?: Todo;
  @Input() selected?: boolean;
  @Output() doneEvent = new EventEmitter();
  @Output() undoneEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitDone() {
    this.doneEvent.emit();
  }

  emitUndone() {
    this.undoneEvent.emit();
  }
}
