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