(function() {
    'use strict';
    var appParams = {
        api: {
            todoApiUrl: '/api/todos'
        }
    };
    angular.module('todo-app').constant('AppParams', appParams);
})();