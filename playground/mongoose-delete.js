const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({})
//     .then((res) => {
//         console.log(res);
//     });

let id = '5c4c2b7052868377cc1c5906';

Todo.findOneAndRemove({
        _id: id
    })
    .then((todo) => {
        console.log(todo);
    });

// let id = '5c4c2b6c52868377cc1c5905';

// Todo.findByIdAndRemove(id)
//     .then((todo) => {
//         console.log(todo);
//     });