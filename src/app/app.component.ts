import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { HELP_SCREEN } from './keyboard-shortcuts';
import { TodoService } from './todo.service';

@Component({
  selector: 'yaka-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'yaka';
  todoInput = false;

  constructor() {}

  showInput() {
    this.todoInput = true;
  }

  hideInput() {
    this.todoInput = false;
  }
}
