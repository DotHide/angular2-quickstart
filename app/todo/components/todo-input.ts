import {Component} from 'angular2/core';
import {TodoService} from "../services/todo-service";
import {TodoModel} from "../models/todo-model";

@Component({
  selector: 'todo-input',
  template: `
  <div>
    <form (submit)="onSubmit()">
    <input type="text" [(ngModel)]="todoItem.title">
    </form>
  </div>
  `
})

export class TodoInput {
  todoItem:TodoModel = new TodoModel();
  constructor(public todoService: TodoService) {

  }
  onSubmit() {
    this.todoService.addTodoItem(this.todoItem);
    this.todoItem = new TodoModel();
  }
}
