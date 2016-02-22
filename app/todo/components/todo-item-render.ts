import {Component, Input, Output, EventEmitter} from "angular2/core";

@Component({
  selector: 'todo-item-render',
  template: `
  <style>
    .completed {
      text-decoration: line-through;
    }
  </style>
  <span [ngClass]="todo.status">{{ todo.title }}</span>
  <button (click)="toggle.emit(todo)">Toggle</button>
  `
})
export class TodoItemRender {
  @Input() todo;
  @Output() toggle = new EventEmitter();
}