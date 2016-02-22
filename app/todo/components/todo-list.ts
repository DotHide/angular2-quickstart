import {Component, Input} from "angular2/core";
import {TodoService} from "../services/todo-service";
import {TodoItemRender} from "../components/todo-item-render";
import {StartedPipe} from "../pipes/started-pipe";
import {SearchPipe} from "../pipes/search-pipe";

@Component({
  selector: 'todo-list',
  pipes: [StartedPipe, SearchPipe],
  directives: [TodoItemRender],
  template: `<div>
    <ul>
      <li *ngFor="#todo of todoService.todos
       | started : status 
       | search : term ">
      <todo-item-render [todo]="todo" (toggle)="todoService.toggleTodo($event)">
      </todo-item-render>
      </li>
    </ul>
  </div>`
})

export class TodoList {
  @Input() status;
  @Input() term;
  constructor(public todoService: TodoService) {
     
  }
}
