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