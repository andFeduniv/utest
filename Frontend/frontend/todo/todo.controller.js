angular.module('todo-app').controller('TodoController', TodoController);
TodoController.$inject = ['TodoService', '$http'];

function TodoController(TodoService, $http) {
    var vm = this;
    vm.newTask = new TodoService();
    vm.todoList = [];
    vm.addTask = addTask;
    vm.removeTask = removeTask;

    activate();


    function addTask() {


        if (vm.newTask.task.length > 10) {
            vm.error = 'Task is too long!';
        } else {
            vm.error = null;
            vm.newTask.done = false;
            vm.newTask.$save().then(function(data) {
                console.log(data);
                vm.todoList.push(data);
                vm.newTask = new TodoService();
            });
        }

    }

    function activate() {
        vm.todoList = TodoService.query();
    }

    function removeTask(index) {
        vm.todoList.splice(index, 1);
    }
}