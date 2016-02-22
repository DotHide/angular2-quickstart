### Learn Angular 2 Fundamentals
这是我学习 Angular2 的项目，它涵盖了 Angular2 的一些基本概念，包括：组件（Component）、服务（Service）、模型（Model）、管道（Pipe）、传入传出（Input / Output）以及事件播散（EventEmitter）等使用方法，并介绍了项目的基本组织结构等。

Anguar2 可使用 ES6 或 TypeScript 来编写，我这里默认使用了 TypeScript

### 1.Component
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
