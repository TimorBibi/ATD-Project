let UserModel = require('../model/user');
let CitiesModel = require('../model/cities');
const secret =  require('../middleware').secret;
const jwt = require('jsonwebtoken');

let _handleError = function(err){
    if (err) return console.log(err);
};

module.exports = (app) => {
    app.post('/api/validate/username', function(req, res) {
        console.log('registerPage.post/api/validate/username');
        UserModel
            .findOne({username: req.body.name})
            .then(doc => {
                if (doc != null) {
                    res.json({isValid: false});
                } else {
                    res.json({isValid: true});
                }
            })
            .catch(_handleError);
    });
    app.post('/api/submit/user', function(req, res) {
        console.log('registerPage.post/api/submit/user');
        UserModel
            .findOne({username: req.body.username})//todo: change to username:??
            .then(doc => {
                if (doc === null) { //submit user
                    CitiesModel
                        .findOne()
                        .then(citiesArray => {
                            if (citiesArray === null) {
                                res.json({succeed: false});
                                throw "citiesArray not found!";
                            }
                            else {
                                let location = citiesArray.cities.find((location) => location.city === req.body.location);
                                let newUser = new UserModel({
                                    username: req.body.username,
                                    password: req.body.password,
                                    location: {city: location.city, x: location.x, y: location.y},
                                    picture: {
                                        data: req.body.picture.pictureData,
                                        contentType: req.body.picture.pictureType
                                    },
                                    reviews: [],
                                });
                                newUser
                                    .save(_handleError);
                            }

                        })
                        .then(() => {
                            const token = jwt.sign({'username': req.body.username}, secret, {
                                expiresIn: '1h'
                            });
                            res.cookie('token', token, { httpOnly: true });
                            res.json({succeed: true, username: req.body.username});
                        })
                        .catch(_handleError);
                }
            });
    });
};