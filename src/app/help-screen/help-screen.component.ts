import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Action, ACTIONS } from '../keyboard-shortcuts';

@Component({
  selector: 'yaka-help-screen',
  templateUrl: './help-screen.component.html',
  styleUrls: ['./help-screen.component.css'],
})
export class HelpScreenComponent {
  actions: Action[];
  _isDisplayed = false;

  constructor() {
    this.actions = ACTIONS;
  }

  get isDisplayed() {
    return this._isDisplayed;
  }

  @Input()
  set isDisplayed(newValue: boolean) {
    this._isDisplayed = newValue;
    this.isDisplayedChange.emit(newValue);
  }

  @Output() isDisplayedChange = new EventEmitter<boolean>();

  close() {
    this.isDisplayed = false;
  }
}
