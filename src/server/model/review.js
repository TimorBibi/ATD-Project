let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewScheme = new Schema({
    username: String,
    name: String,
    location: {city: String, x: Number, y: Number},
    bathroom: Number,
    staff: Number,
    clean: Number,
    food: Number,
    driveIn: Number,
    delivery: Number,
    freeText: String,
    picture: {data: String, contentType: String },
    timeStamp: String,
    avgRate: Number,
});

module.exports = mongoose.model('ReviewModel', reviewScheme);
