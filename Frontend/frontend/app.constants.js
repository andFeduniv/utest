(function() {
    'use strict';
    var appParams = {
        api: {
            todoApiUrl: '/utest/web/todos'
        }
    };
    angular.module('todo-app').constant('AppParams', appParams);
})();