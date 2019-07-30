let CitiesModel = require('../model/cities');
let UserModel = require('../model/user');
let RestaurantModel = require('../model/restaurant');
const {Map, List} = require('immutable');
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
                            }
                            else {
                                let location = citiesArray.cities.find((location) => location.city === req.body.location);
                                doc.username = req.body.username;
                                doc.password = req.body.password;
                                doc.location= {city: location.city, x: location.x, y: location.y};
                                doc.picture.data = req.body.picture.data;
                                doc.picture.contentType = req.body.picture.contentType;
                                //todo: check if reviews are null
                                if(doc.reviews.length > 0)
                                    doc.reviews = doc.reviews.map((review)=> review.username = req.body.currentUsername);

                                doc.save(_handleError);
                            }
                        }).then(()=>{
                        // RestaurantModel
                        //     .update(
                        //      {'reviews.username': req.oldusername},
                        //      {
                        //         reviews: {username: req.body.username}
                        //      }
                        //     )
                            // .find({'reviews.username': req.oldusername})
                            // .then(restaurants =>{
                            //     if(restaurants.length > 0)
                            //     {

                                    // restaurants = restaurants.map(
                                    //     function(rest)
                                    //     {
                                    //     rest.reviews.map((review)=>
                                    //     (review.username === req.oldusername?
                                    //         review.username = req.body.username: review));
                                    //     });
                                    //
                                    // restaurants[0].save(_handleError);
                                // }

                                // restaurant.reviews = restaurant.reviews.map((review)=>
                                // review.username === req.user.userName? review.username = req.user.userName: review);
                                // restaurant.save(_handleError);
                            // })
                        }).then(() => {//TODO: update cookie
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

};