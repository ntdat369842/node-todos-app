const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');
    const db  = client.db('TodoApp');

    // db.collection('Todos')
    //     .find({
    //         _id: new ObjectID('5c4686f33d36c35e37148324')
    //     })
    //     .toArray()
    //     .then((docs) => {
    //         console.log('Todos: ');
    //         console.log( JSON.stringify(docs, undefined, 2) );
    //     }, (err) => {
    //         console.log('Unable to fetch Todos', err);
    //     });

    // db.collection('Todos')
    //     .find()
    //     .count()
    //     .then((count) => {
    //         console.log(`Todos count: ${count}`);
    //     }, (err) => {
    //         console.log('Unable to fetch Todos', err);
    //     });

    db.collection('Users')
        .find({
            name: 'John Doe'
        })
        .toArray()
        .then((docs) => {
            console.log('Matched users: ');
            console.log( JSON.stringify(docs, undefined, 2) );
        }, (err) => {
            console.log('Unable to fetch users', err);
        });

    // client.close();
});