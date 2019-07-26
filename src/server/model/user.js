let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// let ReviewModel = require('./review');

let userSchema = new Schema({
    username: String,
    password: String,
    location: {city: String, x: Number, y: Number},
    picture: {data: String, contentType: String},
    reviews: [],
});

module.exports = mongoose.model('UserModel', userSchema);
