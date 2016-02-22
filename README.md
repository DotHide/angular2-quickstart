## 项目运行
1. `$ npm install -g tsd typescript`
2. `$ npm install`
3. `$ npm start`

## Learn Angular 2 Fundamentals
这是我学习 Angular2 的项目，它涵盖了 Angular2 的一些基本概念，包括：组件（Component）、模型（Model）、服务（Service）、管道（Pipe）、传入传出（Input / Output）以及事件播散（EventEmitter）等使用方法，并介绍了项目的基本组织结构等。

> Anguar2 可使用 ES6 或 TypeScript 来编写，我这里默认使用了 TypeScript。

### 1 Component
组件中需要定义 selector 和 templete，即组件生效的标记和对应的 HTML 模板
```ts
// Component 是 Angular2 提供的组件，使用前需要先 import
import {Component} from "angular2/core";

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
```  
> 其中 templete 使用到了多行模板的用法，即使用`\``作为模板开始结束标记

定义组件后需要定义相匹配的类：
```ts
export class TodoInput {
  
}
```  
> 类名使用 UpperCamelCase，如：TodoInput，文件名及 selector 使用 DashCase，如：todo-input(.ts)

任何 Component 在使用前需要 import，如果是组件中的组件需要在 @Component 中定义 directives，如：
```ts
@Component({
  selector: 'todo-app',
  directives: [TodoInput],
  templete: '...'
})
```
### 2 Model
模型比较简单，通知只需要定义好构造函数及相关方法即可：
```ts
export class TodoModel{
  constructor(
     public title:string = "",
     public status:string = "started"
  ){}

  toggle():void{
     this.status = this.status == 
       'completed'? 'started': 'completed';
  }
}
```
> 这里构造函数的参数定义了 public，这样可以被其他类访问到

### 3 Service
服务通常需要声明 @Injectable()，一般服务也会 import 模型类
```ts
import {Injectable} from "angular2/core";
import {TodoModel} from "../models/todo-model";

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
    ...
  }

  toggleTodo(todo: TodoModel) {
    ...
  }
}
```

声明了 Injectable 之后，需要在入口函数中 inject 相关服务
```ts
bootstrap(TodoApp, [TodoService]);
```

### 4 ngFor
即 Angular 1 中的 ng-repeat，这里用法有些差异，如：
```html
<ul>
  <li *ngFor="#todo of todoService.todos">
    {{ todo }}
  </li>
</ul>
```
> 使用 ngFor 时需要在前加 * 号（* 号表示该动作将引起模板的变化），循环中的个体元素引用前需要添加 # 号，这些都是语法上的变化。

## 参考链接
* [Angular2 5 MIN Quickstart](https://angular.io/docs/ts/latest/quickstart.html)
* [Angular 2 Fundaments](https://egghead.io/series/angular-2-fundamentals)