let CitiesModel = require('../model/cities');
let UserModel = require('../model/user');
let RestaurantModel = require('../model/restaurant');
const secret =  require('../middleware').secret;
const jwt = require('jsonwebtoken');

let _handleError = function(err){
    if (err) return console.log(err);
};


module.exports = (app) => {

    app.post('/api/get/password', function(req, res) {
        console.log('viewProfilePage.post/api/get/password');
        UserModel
            .findOne({username: req.body.user.username})
            .then(doc => {
                if (doc != null) {
                    res.json({password: doc.password});
                }
            })
            .catch(_handleError);
    });

    app.post('/api/validate/edit/username', function(req, res) {
        console.log('viewProfilePage.post/api/validate/edit/username');
        UserModel
            .findOne({username: req.body.checkName})//new name
            .then(doc => {
                if (doc != null && doc.username !== req.body.currName) {//already taken name and not mine
                    res.json({isValid: false});//todo: change back to false!!!!
                } else {//unique name or current name
                    res.json({isValid: true});
                }
            })
            .catch(_handleError);
    });

    app.post('/api/edit/user', function(req, res) {
        console.log('viewProfilePage.post/api/edit/user');
        UserModel
            .findOne({username: req.body.currentUsername})
            .then(doc => {
                if (doc !== null) { //edit user
                    CitiesModel
                        .findOne()
                        .then(citiesArray => {
                            if (citiesArray === null) {
                                res.json({succeed: false});
                                throw "citiesArray not found!";
                            } else {
                                let location = citiesArray.cities.find((location) => location.city === req.body.location);
                                doc.username = req.body.username;
                                doc.password = req.body.password;
                                doc.location = {city: location.city, x: location.x, y: location.y};
                                doc.picture = {
                                    data: req.body.picture.pictureData,
                                    contentType: req.body.picture.pictureType
                                };
                                doc.reviews.map((review, index) => {
                                    let newRev = review;
                                    newRev.username = req.body.username;
                                    doc.reviews.set(index, newRev);
                                });
                                doc.save(_handleError);
                            }
                        }).then(() => {
                        RestaurantModel
                            .find({'reviews.username': req.body.currentUsername})
                            .then((restaurants) => {
                                restaurants.map((restaurant) => {
                                    restaurant.reviews = restaurant.reviews.map((review, revIndex) => {
                                        if (review.username === req.body.currentUsername) {
                                            let newRev = review;
                                            newRev.username = req.body.username;
                                            restaurant.reviews.set(revIndex, newRev);
                                            return newRev;
                                        }
                                    });
                                    restaurant.save(_handleError());
                                });
                            }).then(() => {// update cookie
                            const token = jwt.sign({'username': req.body.username}, secret, {
                                expiresIn: '1h'
                            });
                            res.cookie('token', token, {httpOnly: true});
                            res.json({succeed: true, username: req.body.username});
                        })
                            .catch(_handleError);
                    }).catch(_handleError);
                }
            }).catch(_handleError);
    });
};