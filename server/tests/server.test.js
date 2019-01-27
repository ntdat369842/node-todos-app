const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        })
        .then(() => {
            done();
        });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text})
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
    });

    it('should not create todo with invalid data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .expect((res) => {
                expect(res.body.message).toBe("Todo validation failed: text: Path `text` is required.");
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(2);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
    })
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .expect((res) => {
                expect(res.body).toBeFalsy;
            })
            .end(done);
    });

    it('should return 404 if id not valid', (done) => {
        request(app)
            .get(`/todos/1234`)
            .expect(404)
            .expect((res) => {
                expect(res.body).toBeFalsy;                
            })
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let id = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }


                Todo.findById(id)
                    .then((todo) => {
                        expect(todo).toBe(null);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            })
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .expect((res) => {
                expect(res.body).toBeFalsy;
            })
            .end(done);
    });

    it('should return 404 if id not valid', (done) => {
        request(app)
            .delete('/todos/1234')
            .expect(404)
            .expect((res) => {
                expect(res.body).toBeFalsy;
            })
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update a todo', (done) => {
        let id = todos[0]._id.toHexString();
        let body = {
            text: "Updated text",
            completed: true
        };

        request(app)
            .patch(`/todos/${id}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
                expect(res.body.todo.text).toBe(body.text);
                expect(res.body.todo.completed).toBe(body.completed);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Todo.findById(id)
                    .then((todo) => {
                        expect(todo.text).toBe(body.text);
                        expect(todo.completed).toBe(body.completed);
                        expect(typeof todo.completedAt).toBe('number');
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
    });

    it('should clear completedAt prop when completed false', (done) => {
        let id = todos[1]._id.toHexString();
        let body = {
            completed: false
        };

        request(app)
            .patch(`/todos/${id}`)
            .expect(200)
            .send(body)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
                expect(res.body.todo.completed).toBe(body.completed);
                expect(res.body.todo.completedAt).toBe(null);
            })
            .end((err, res) => {

                if (err) {
                    return done(err);
                }

                Todo.findById(id)
                    .then((todo) => {
                        expect(todo.completed).toBe(body.completed);
                        expect(todo.completedAt).toBe(null);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            })
    });

    it('should return 404 if todo not found', (done) => {
        request(app)
            .patch(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .expect((res) => {
                expect(res.body).toBeFalsy;
            })
            .end(done);
    });

    it('should return 404 if id not valid', (done) => {
        request(app)
            .patch(`/todos/1234`)
            .expect(404)
            .expect((res) => {
                expect(res.body).toBeFalsy;
            })
            .end(done);
    });
});