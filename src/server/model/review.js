let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewScheme = new Schema({

});

module.exports = mongoose.model('ReviewModel', reviewScheme);
