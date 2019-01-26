let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://sazerac:ae4Zqig2nYcHk8z@ds113375.mlab.com:13375/mongo-data' || 'mongodb://localhost:27017/TodoApp', {
    useMongoClient: true
});



module.exports = {
    mongoose
}