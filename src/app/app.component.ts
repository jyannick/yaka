import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'yaka-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'yaka';
  todoInput = false;

  showInput() {
    this.todoInput = true;
  }

  hideInput() {
    this.todoInput = false;
  }
}
