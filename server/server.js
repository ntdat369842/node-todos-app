let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

let newTodo = new Todo({
    text: 'Cook dinner'
});

// newTodo.save()
//     .then((doc) => {
//         console.log('Saved Todo', doc);
//     }, (err) => {
//         console.log('Unable to save Todo');
//     });

let newTodo_2 = new Todo({
    text: 'Eat dinner',
    completed: true,
    completedAt: new Date().valueOf()
});

newTodo_2.save()
    .then((doc) => {
        console.log('Saved Todo', doc);
    }, (err) => {
        console.log('Unable to save Todo');
    });
