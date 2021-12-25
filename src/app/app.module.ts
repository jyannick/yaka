import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  RemixIconModule,
  RiDeleteBin2Fill,
  RiGitBranchFill,
  RiCloseFill,
  RiQuestionFill,
} from 'angular-remix-icon';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { AutofocusDirective } from './autofocus.directive';
import { HelpScreenComponent } from './help-screen/help-screen.component';

const icons = {
  RiDeleteBin2Fill,
  RiGitBranchFill,
  RiCloseFill,
  RiQuestionFill,
};

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoInputComponent,
    AutofocusDirective,
    HelpScreenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RemixIconModule.configure(icons),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}