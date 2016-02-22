System.register(["angular2/core", "../models/todo-model", "lodash"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, todo_model_1, _;
    var TodoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_model_1_1) {
                todo_model_1 = todo_model_1_1;
            },
            function (_1) {
                _ = _1;
            }],
        execute: function() {
            TodoService = (function () {
                function TodoService() {
                    this.todos = [
                        new todo_model_1.TodoModel("arm"),
                        new todo_model_1.TodoModel("battle"),
                        new todo_model_1.TodoModel("code", "completed"),
                        new todo_model_1.TodoModel("eat"),
                        new todo_model_1.TodoModel("fly"),
                        new todo_model_1.TodoModel("sleep", "completed")
                    ];
                }
                TodoService.prototype.addTodoItem = function (item) {
                    this.todos = this.todos.concat([item]);
                };
                TodoService.prototype.toggleTodo = function (todo) {
                    todo.toggle();
                    this.todos =
                        _.map(this.todos, function (n) {
                            return n;
                        });
                };
                TodoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TodoService);
                return TodoService;
            })();
            exports_1("TodoService", TodoService);
        }
    }
});
