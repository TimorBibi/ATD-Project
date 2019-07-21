let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let citiesSchema = new Schema({
    cities: [{
        city: String,
        x: Number,
        y: Number
    }]
});

module.exports = mongoose.model('CitiesModel', citiesSchema);
