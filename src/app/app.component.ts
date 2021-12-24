import { Component, ViewEncapsulation } from '@angular/core';
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

  constructor(private todoService: TodoService) {}

  showInput() {
    this.todoInput = true;
  }

  hideInput() {
    this.todoInput = false;
  }

  cleanAllDoneTasks() {
    this.todoService.clearAllDone();
  }
}
