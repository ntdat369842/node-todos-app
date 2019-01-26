const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// let id = '5c4b045f4adad96d24675a5daa';

// if ( !ObjectID.isValid(id) ) {
//     console.log('ID not valid');
// };

// Todo.find({
//         _id: id
//     })
//     .then((todos) => {
//         console.log('Todos', todos);
//     });

// Todo.findOne({
//         _id: id
//     })
//     .then((todo) => {
//         console.log('Todo', todo);
//     });

// Todo.findById(id)
//     .then((todo) => {

//         if (!todo) {
//             return console.log('ID not found');
//         }

//         console.log('Todo By ID', todo);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });

let id = '5c484dc19663965ce880cb09';

if ( !ObjectID.isValid(id) ) {
    console.log('ID not valid');
}

User.findById(id)
    .then((user) => {

        if (!user) {
            return console.log('ID not found');
        }

        console.log('User BY ID', user);
    })
    .catch((err) => {
        console.log(err.message);
    });