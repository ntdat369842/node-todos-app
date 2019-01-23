let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useMongoClient: true
});

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
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
    text: "Say Hi"
});

// newTodo_2.save()
//     .then((doc) => {
//         console.log('Saved Todo');
//         console.log( JSON.stringify(doc, undefined, 2) );
//     }, (err) => {
//         console.log('Unable to save Todo', err.message);
//     });

let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    }
});

let newUser = new User({
    email: ''
})

newUser.save()
    .then((doc) => {
        console.log('Saved user');
        console.log( JSON.stringify(doc, undefined, 2) );
    }, (err) => {
        console.log('Unable to save User,', err.message);
    })