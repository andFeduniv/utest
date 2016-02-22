angular.module('todo-app', ['ui.router', 'ngResource']);



angular.module('todo-app').config([
    '$stateProvider',
    '$httpProvider',
    '$locationProvider',
    config
]);
 
function config($stateProvider, $httpProvider, $locationProvider) {
    $stateProvider.state('home', {
        url: '',
        templateUrl: './templates/todo/todo.html',
        controller: 'TodoController',
        controllerAs: 'TodoCtrl',
        // redirectTo: 'todo',
        // auth: false
    });
}
(function() {
    'use strict';
    var appParams = {
        api: {
            todoApiUrl: '/api/todos'
        }
    };
    angular.module('todo-app').constant('AppParams', appParams);
})();
(function() {
    'use strict';
    angular.module('todo-app').factory('TodoService', TodoService);
    TodoService.$inject = ['$resource', 'AppParams'];
    /* @ngInject */
    function TodoService($resource, AppParams) {
        return $resource(AppParams.api.todoApiUrl + '/:taskId', {
            taskId: '',
        });
    }
})();
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