var express = require('express'),
    bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json())
var todoList = [{
    id: 1,
    task: 'Task 1',
    done: false
}, {
    id: 2,
    task: 'Task 2',
    done: true
}, {
    id: 3, 
    task: 'Task 3',
    done: false
}]
app.get('/api/todos', function(req, res) {
    console.log('query');
    res.send(todoList);
});
app.get('/api/todos/:id', function(req, res) {
    var todo = todoList.filter((v) => v.id === parseInt(req.params.id));
    res.send(todo);
});
app.post('/api/todos', function(req, res) {
    console.log('req body', req.body);

    var newTodo = req.body;
    newTodo.id = todoList.length +1;
    todoList.push(newTodo);

    res.send(newTodo);
    // todoList.push()
})
app.use(express.static('public'));
app.listen(3000, function() {
    console.log('Listening on 3000');
})