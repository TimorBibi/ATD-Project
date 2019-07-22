let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let restaurantSchema = new Schema({
    name: String,
    location: {city: String, x: Number, y: Number},
    reviews: [],
    avgRate: Number,
});

module.exports = mongoose.model('RestaurantModel', restaurantSchema);
