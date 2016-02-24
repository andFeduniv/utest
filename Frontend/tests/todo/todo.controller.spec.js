describe('TodoController', function() {
	var ctrl,
		$rootScope,
		$httpBackend,
		$scope,
		TodoService,
		AppParams,
		createController;

	beforeEach(function() {
		module('todo-app');

		inject(function($controller, $injector) {
			$rootScope = $injector.get('$rootScope');
			$httpBackend = $injector.get('$httpBackend');
			$scope = $rootScope.$new();
			// ctrl = $controller('TodoController');
			TodoService = $injector.get('TodoService');
			AppParams = $injector.get('AppParams');

			authRequestHandler = $httpBackend.when('GET', AppParams.api.todoApiUrl)
                            .respond([
                            	{ id: 1, task: 'Jasmine', done: 0 },
                            	{ id: 2, task: 'Jasmine 2', done: 1}	
                            ]);

			createController = function() {
				return $controller('TodoController');
			}
		});
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	})

	describe('Todos functionality', function() {

		it('Should fetch todoList from api when controller is created', function() {
			$httpBackend.expectGET(AppParams.api.todoApiUrl);

			var ctrl = createController();

			$httpBackend.flush();
		});

		it('Should send new task to server, receive its ID and add it to todoList' , function() {

			var ctrl = createController();
			$httpBackend.flush();

			var oldLen = ctrl.todoList.length;

			ctrl.newTask = new TodoService();

			ctrl.newTask.task = 'Jasmine ';

			var mockObj = {
				id: 1,
				task: ctrl.newTask.task,
				done: false
			};

			mockObj.id = 1;
			mockObj.task = ctrl.newTask.task;
			mockObj.done = false;

			$httpBackend.whenPOST(AppParams.api.todoApiUrl)
			.respond(mockObj);

			ctrl.addTask();
			$httpBackend.flush();

			var newLen = ctrl.todoList.length;

			expect(ctrl.error).toBeNull();
			expect(newLen).toEqual(oldLen + 1);
		});

		it('Should set the error message if length of the new task is > 10', function() {
			var ctrl = createController();
			$httpBackend.flush();

			var oldLen = ctrl.todoList.length;

			ctrl.newTask = new TodoService();

			ctrl.newTask.task = 'Jasmine 1234567890';

			ctrl.addTask();
			var newLen = ctrl.todoList.length;

			expect(ctrl.error).toEqual('Task is too long! AAAAAAAAA');
			expect(newLen).toEqual(oldLen);		
		});
	})

	describe('Initialization', function() {
		// it('Should instantiate newTask to empty string', function() {
		// 	expect(ctrl.newTask).toEqual('');
		// });

		// it('Should init todoList to contain 2 tasks', function() {
		// 	expect(ctrl.todoList.length).toEqual(2);
		// });
	})
})