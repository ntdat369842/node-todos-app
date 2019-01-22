const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB server');        
    }

    console.log('Connected to MongoDB server');
    const db  = client.db('TodoApp');

    // db.collection('Todos')
    //     .findOneAndUpdate({
    //         _id: new ObjectID('5c46aff9b7440ed0ed9689bc')
    //     }, {
    //         $set: {
    //             text: 'Do simple things'
    //         }
    //     }, {
    //         returnOriginal: false
    //     })
    //     .then((result) => {
    //         console.log(result);
    //     }, (err) => {
    //         console.log('Cant update that Todos,', err);
    //     });

    db.collection('Users')
        .findOneAndUpdate({
            _id: new ObjectID('5c468187d52bad33b8a5f851')
        }, {
            $inc: {
                age: 2
            },
            $set: {
                name: 'Tad Doe'
            }
        }, {
            returnOriginal: false
        })
        .then((result) => {
            console.log( JSON.stringify(result.value, undefined, 2) );
        }, (err) => {
            console.log('Cant update because of', err);
        })

    client.close();
})