## Get Started
请按以下姿势打开项目：

1. `$ npm install -g tsd typescript`
2. `$ npm install`
3. `$ npm start`

## Learn Angular 2 Fundamentals
Angular2 是 Google 用于构建基于浏览器的复杂应用的下一代 MV* 框架。该项目是我学习 Angular2 的入门项目，我觉得它很友好地表达了 Angular2 的有趣实现方式，并更易于了解和入门。它涵盖了 Angular2 的一些基本概念，包括：组件（Component）、模型（Model）、服务（Service）、管道（Pipe）、传入传出（Input / Output）以及事件播散（EventEmitter）等使用方法，并介绍了项目的基本组织结构等。

> Anguar2 可使用 ES6 或 TypeScript 来编写，我在这里使用了 TypeScript。

以下罗列的是该项目中的几个重要概念：

### 1 Component
在 Angular2 中，Component 是我们在页面中构建自定义元素和业务逻辑的主要方式。在 Angular1 中，我们则是通过 directives，controllers 以及 scope 来实现，而现在所有的这一切都结合到了 Component 中。Component 中需要定义 selector 和 templete，即组件生效的标记和对应的 HTML 模板
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
其中 templete 使用到了多行模板的用法，即使用`\``作为模板开始结束标记

定义组件后需要定义相匹配的类：
```ts
export class TodoInput {
  
}
```  
类名使用 UpperCamelCase，如：TodoInput，文件名及 selector 使用 DashCase，如：todo-input(.ts)

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
这里构造函数的参数定义了 public，这样可以被其他类访问到

### 3 Service
服务通常需要声明 `@Injectable()`，一般服务也会 import 模型类
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

声明了 `Injectable` 之后，需要在入口函数中 inject 相关服务
```ts
bootstrap(TodoApp, [TodoService]);
```

### 4 ngFor
即 Angular 1 中的 `ng-repeat`，这里用法有些差异，如：
```html
<ul>
  <li *ngFor="#todo of todoService.todos">
    {{ todo }}
  </li>
</ul>
```
使用 ngFor 时需要在前加 * 号（* 号表示该动作将引起模板的变化），循环中的个体元素引用前需要添加 # 号，这些都是语法上的变化。

### 5 ngModel
`ngModel` 用于双向绑定，使用 `[(ngModel)]=` 来定义，`[()]` 专门用于定义双向绑定。
```ts
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
  constructor() {}
}
```
使用 ngModel 前需要在 class 中定义变量，变量可以是任何类型。

### 6 Pipe
利用 Pipe 来筛选（filter）数据，与 Angualr1 十分类似，这里还是使用 `|` 符号来定义筛选，如：
```ts
// todo-list.ts
...
@Component({
  selector: 'todo-list',
  pipes: [SearchPipe],
  directives: [TodoItemRender],
  template: `<div>
    <ul>
      <li *ngFor="#todo of todoService.todos | search ">
      <todo-item-render [todo]="todo" (toggle)="todoService.toggleTodo($event)">
      </todo-item-render>
      </li>
    </ul>
  </div>`
})

// search-pipe.ts
...
@Pipe({
  name: 'search'
})

export class SearchPipe {
  transform(items) {
    // 定义转换逻辑，用于结果输出，这里是筛选出以 s 字符开头的项目
    return value.filter((item) => {
      return item.title.startsWith('s');
    });
  }
}
```
使用 Pipe 时需要先在 Component 中定义 pipes 属性，然后在 html 中使用 Pipe 的 name。

当然，这里的 Pipe 还可以传递参数，仍然以上面的为例，可以传参设定 search 的内容，如：
```ts
// search-pipe.ts
...
@Pipe({
  name: 'search'
})

export class SearchPipe {
  // 增加 term 参数
  transform(items, [term]) {
    // 定义转换逻辑，用于结果输出，这里是筛选出以 s 字符开头的项目
    return value.filter((item) => {
      return item.title.startsWith(term);
    });
  }
}
```
这里分两步修改，首先修改 SearchPipe 类中的方法，增加 term 参数，然后再修改使用处的代码
```ts
// todo-list.ts
...
@Component({
  selector: 'todo-list',
  pipes: [SearchPipe],
  directives: [TodoItemRender],
  template: `<div>
    <ul>
      <li *ngFor="#todo of todoService.todos | search = 's' ">
      <todo-item-render [todo]="todo" (toggle)="todoService.toggleTodo($event)">
      </todo-item-render>
      </li>
    </ul>
  </div>`
})
```
这里我们先看到 search 进行了赋值，我们进一步把这个赋值变为一个输入项（@Input），这也是 Angular2 中特殊用法：
```ts
// todo-list.ts
import {Component, Input} from "angular2/core";
...
@Component({
  selector: 'todo-list',
  pipes: [SearchPipe],
  directives: [TodoItemRender],
  template: `<div>
    <ul>
      <li *ngFor="#todo of todoService.todos | search = term ">
      <todo-item-render [todo]="todo" (toggle)="todoService.toggleTodo($event)">
      </todo-item-render>
      </li>
    </ul>
  </div>`
})

export class TodoList {
  @Input() term; // 定义该项是从外部输入的
  constructor(public todoService: TodoService) {
     
  }
}
```
由此，需要在使用 TodoList 组件的地方（即外部），定义相关的属性。
```html
<search-box (update)="term = $event"></search-box>
...
<todo-list [term]="term"></todo-list>
```
这里表示从搜索框输入过来的值（前一个 term），被赋值到了 todo-list 的 `[term]` 属性中，并传递到 TodoList 类的输入项中去

7 EventEmitter
事件散播，又一个 Angular2 的新特性，用于将组件内部的事件向上散播，如：
```ts
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
```
这里的 toggle 是 EventEmitter 对象，被声明为 Output 后，可以将按钮的 click 事件向上散播成为 todo-list 中该组件的 toggle 事件，其中的 `$event` 就是 TodoItemRender 类中声明的 todo（此 todo 又是来自外部输入），而后再触发 toggle 事件对应的业务逻辑。


## 参考链接
* [Angular2 5 MIN Quickstart](https://angular.io/docs/ts/latest/quickstart.html)
* [Angular 2 Fundaments](https://egghead.io/series/angular-2-fundamentals)