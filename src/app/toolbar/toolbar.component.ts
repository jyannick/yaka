import { Component, HostListener } from '@angular/core';
import { HELP_SCREEN } from '../keyboard-shortcuts';
import { TodoService } from '../todo.service';

@Component({
  selector: 'yaka-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  helpScreen = false;

  constructor(private todoService: TodoService) {}

  goToWebsite() {
    window.open('https://github.com/jyannick/yaka');
  }

  @HostListener(`document:keydown.${HELP_SCREEN}`, ['$event'])
  toggleHelpScreen(event?: Event) {
    event?.preventDefault();
    this.helpScreen = !this.helpScreen;
  }

  cleanAllDoneTasks() {
    this.todoService.clearAllDone();
  }
}
