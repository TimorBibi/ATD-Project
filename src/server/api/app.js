const {Map, List} = require('immutable');
const withAuth = require('../middleware').withAuth;
let CitiesModel = require('../model/cities');
let UsersModel = require('../model/user');
let RestaurantsModel = require('../model/restaurant');
let cities = require('../initCitiesDB');

let _handleError = function(err){
    if (err) return console.log(err);
};

module.exports = (app) => {
    app.get('/api/checkToken', withAuth, function(req, res) {
        console.log('app.get/api/checkToken');
        res.json({succeed: true, username: req.username});
    });
    app.get('/api/disconnect/user', function(req, res) {
        console.log('app.get/api/disconnect/user');
        res.clearCookie('token');
        res.json({succeed: true});
    });
    app.get('/api/load/cities', function(req, res) {
        console.log('app.get/api/load/cities');
        CitiesModel
            .findOne()
            .then(doc => {
                if (doc === null) { //init cities model
                    let newDoc = new CitiesModel({cities: cities.cities});
                    newDoc
                        .save(_handleError)
                        .then(() => {
                            res.json(List(newDoc));
                        })
                } else {
                    res.json(doc.cities);
                }
            })
            .catch(_handleError);
    });

    app.get('/api/load/users', function(req, res) {
        console.log('app.get/api/load/users');
        UsersModel
            .find()
            .then(doc => {
                if (doc === null) { //init users model
                    res.json({succeed: false, message:'no users'});
                    throw 'no users error';
                }
                else {
                    res.json(List(doc.map(
                        (user)=>
                            Map({username:user.username, location:user.location,
                                picture:user.picture, reviews:user.reviews}))));
                }
            })
            .catch(_handleError);
    });

    app.get('/api/load/restaurants', function(req, res) {
        console.log('app.get/api/load/restaurants');
        RestaurantsModel
            .find()
            .then(doc => {
                if (doc === null) { //init restaurants model
                   res.json(List([]));
                }
                else {
                    res.json(List(doc));
                }
            })
            .catch(_handleError);
    });
};
