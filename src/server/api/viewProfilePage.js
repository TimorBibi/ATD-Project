let CitiesModel = require('../model/cities');
let UserModel = require('../model/user');

let _handleError = function(err){
    if (err) return console.log(err);
};

module.exports = (app) => {

    app.post('/api/validate/edit/username', function(req, res) {
        console.log('viewProfilePage.post/api/validate/edit/username');
        UserModel
            .findOne({username: req.body.checkName})//new name
            .then(doc => {
                if (doc != null && doc.username !== req.body.currName) {//already taken name and not mine
                    res.json({isValid: false});
                } else {//unique name or current name
                    res.json({isValid: true});
                }
            })
            .catch(_handleError);
    });

    app.post('/api/submit/edit/user', function(req, res) {
        console.log('viewProfilePage.post/api/submit/user');
        UserModel
            .findOne({name: req.body.username})
            .then(doc => {
                if (doc !== null) { //edit user
                    CitiesModel
                        .findOne()
                        .then(citiesArray => {
                            if (citiesArray === null) {
                                res.json({succeed: false});
                                throw "citiesArray not found!";
                            }
                            else {
                                let location = citiesArray.cities.find((location) => location.city === req.body.location);
                                doc.userName = req.body.username;
                                doc.password = req.body.password;
                                doc.location= {city: location.city, x: location.x, y: location.y};
                                doc.picture = {
                                        data: req.body.picture.pictureData,
                                        contentType: req.body.picture.pictureType
                                };
                                doc.save(_handleError);
                            }
                        })
                        .then(() => {//TODO: update cookie
                            const token = jwt.sign({'username': req.body.username}, secret, {
                                expiresIn: '1h'
                            });
                            res.cookie('token', token, { httpOnly: true });
                            res.json({succeed: true, username: req.body.username});
                        })
                        .catch(_handleError);
                }
            }).catch(_handleError);

    });

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
};