import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from '@angular/core';
import { EMOJI } from '../keyboard-shortcuts';
import { Todo } from '../todo';

@Component({
  selector: 'yaka-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
    ]),
  ],
})
export class TodoItemComponent {
  @Input() selected?: boolean;

  @Input() todo?: Todo;
  @Output() todoChange = new EventEmitter<Todo>();
  @Output() flash = new EventEmitter<void>();

  private _isEditing: boolean = false;
  private _isEmojiPickerDisplayed: boolean = false; 

  @Input()
  public get isEditing(): boolean {
    return this._isEditing;
  }

  public set isEditing(isEditing: boolean) {
    this._isEditing = isEditing;
    this.isEditingChange.emit(isEditing);
  }

  @Output() isEditingChange = new EventEmitter<boolean>();

  @ViewChild('todoEditor')
  todoEditor!: ElementRef;

  public get isEmojiPickerDisplayed(): boolean|undefined {
    return this.selected && this._isEditing && this._isEmojiPickerDisplayed;
  }

  constructor() {}

  markDone() {
    this.modifyTodo((todo) => {
      if (!todo.done) {
        this.flash.emit();
      }
      todo.done = true;
      return todo;
    });
  }

  markUndone() {
    this.modifyTodo((todo) => {
      todo.done = false;
      return todo;
    });
  }

  markUnpaused() {
    this.modifyTodo((todo) => {
      todo.paused = false;
      return todo;
    })
  }

  edit() {
    if (this.selected) {
      this.isEditing = true;
    }
  }

  private modifyTodo(operation: (todo: Todo) => Todo) {
    if (this.todo === undefined) {
      console.error('modifyTodo() called before initialization');
      return;
    }
    this.todo = operation(this.todo);
    this.emitTodoChange();
  }

  saveLabel() {
    this.isEditing = false;
    this.emitTodoChange();
  }

  emitTodoChange() {
    this.todoChange.emit(this.todo);
  }

  displayEditor() {
    return this.selected && this.isEditing;
  }

  @HostListener(`document:keydown.${EMOJI}`, ['$event'])
  userPressedEmoji(event?: Event) {
    event?.preventDefault();
    if (this.isEditing) {
      this.toggleEmojiPicker();
    }
  }

  toggleEmojiPicker() {
    this._isEmojiPickerDisplayed = !this._isEmojiPickerDisplayed;
  }

  addEmoji(event: any) {
    var cursorIndex = this.todoEditor.nativeElement.selectionStart;
    this.modifyTodo((todo) => {
      todo.label =  todo.label.slice(0, cursorIndex) + event.emoji.native + todo.label.slice(cursorIndex);
      return todo;
    })
    this._isEmojiPickerDisplayed = false;
    this.todoEditor.nativeElement.focus();
    this.todoEditor.nativeElement.setSelectionRange(cursorIndex+1, cursorIndex+1); // FIXME does not seem to work
  }
}
