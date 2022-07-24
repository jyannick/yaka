import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  RemixIconModule,
  RiDeleteBin2Line,
  RiKeyboardLine,
  RiCloseLine,
  RiQuestionLine,
  RiQuestionMark,
} from 'angular-remix-icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { AutofocusDirective } from './autofocus.directive';
import { HelpScreenComponent } from './help-screen/help-screen.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const icons = {
  RiDeleteBin2Line,
  RiKeyboardLine,
  RiCloseLine,
  RiQuestionLine,
  RiQuestionMark,
};

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoInputComponent,
    AutofocusDirective,
    HelpScreenComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RemixIconModule.configure(icons),
    DragDropModule,
    PickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
