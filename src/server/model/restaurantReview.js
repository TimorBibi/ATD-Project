let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let restaurantReviewSchema = new Schema({
    name: String
});

module.exports = mongoose.model('RestModel', restaurantReviewSchema);