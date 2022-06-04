import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'yaka-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('flash', [
      state('idle1', style({})),
      state('idle2', style({})),
      transition('idle1 <=> idle2', [style({ backgroundColor: "green" }), animate(400)])]),
  ],
})
export class AppComponent {
  title = 'yaka';
  todoInput = false;
  flashToggle = false; // flash when switching state

  constructor() { }

  showInput() {
    this.todoInput = true;
  }

  hideInput() {
    this.todoInput = false;
  }

  flash() {
    this.flashToggle = !this.flashToggle;
  }
}
