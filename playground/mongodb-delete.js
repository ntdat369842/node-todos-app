const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB server');        
    }

    console.log('Connected to MongoDB server');
    const db  = client.db('TodoApp');

    //deleteMany

    // db.collection('Todos')
    //     .deleteMany({
    //         text: 'Eat lunch'
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     }, (err) => {
    //         console.log('Cant delete that Todos', err);
    //     });

    //deleteOne

    // db.collection('Todos')
    //     .deleteOne({
    //         text: 'Do stupid things'
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     }, (err) => {
    //         console.log('Cant delete that Todos', err);
    //     });

    //findOneAndDelete

    // db.collection('Todos')
    //     .findOneAndDelete({
    //         completed: false
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     }, (err) => {
    //         console.log('Cant delete that Todos', err);
    //     });

    // db.collection('Users')
    //     .deleteMany({
    //         name: 'John Doe'
    //     })
    //     .then((result) => {
    //         console.log(result.result);
    //     }, (err) => {
    //         console.log('Cant delete that Todos', err);            
    //     });

    // db.collection('Users')
    //     .deleteOne({
    //         name: 'Jane Doe'
    //     })
    //     .then((result) => {
    //         console.log(result.result);
    //     }, (err) => {
    //         console.log('Cant delete that Todos', err);
    //     });

    db.collection('Users')
        .findOneAndDelete({
            // location: 'rg'
            _id: new ObjectID('5c468d2c3d36c35e371484bc')
        })
        .then((result) => {
            console.log(result.value);
        }, (err) => {
            console.log('Cant delete that Todos', err);
        });

    client.close();
})