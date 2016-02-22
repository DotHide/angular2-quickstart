System.register([], function(exports_1) {
    var TodoModel;
    return {
        setters:[],
        execute: function() {
            TodoModel = (function () {
                function TodoModel(title, status) {
                    if (title === void 0) { title = ""; }
                    if (status === void 0) { status = "started"; }
                    this.title = title;
                    this.status = status;
                }
                TodoModel.prototype.toggle = function () {
                    this.status = this.status ==
                        'completed' ? 'started' : 'completed';
                };
                return TodoModel;
            })();
            exports_1("TodoModel", TodoModel);
        }
    }
});
