import {Injectable} from "angular2/core";
import {TodoModel} from "../models/todo-model";
import * as _ from "lodash";

@Injectable()
export class TodoService {
  todos:TodoModel[] = [
    new TodoModel("arm"),
    new TodoModel("battle"),
    new TodoModel("code", "completed"),
    new TodoModel("eat"),
    new TodoModel("fly"),
    new TodoModel("sleep", "completed")
  ];

  addTodoItem(item:TodoModel) {
    this.todos = [...this.todos, item];
  }

  toggleTodo(todo: TodoModel) {
     todo.toggle();
     this.todos = 
       _.map(this.todos, function(n){
         return n;
       });
  }
}
