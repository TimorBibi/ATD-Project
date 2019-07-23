let CitiesModel = require('../model/cities');
let RestaurantModel = require('../model/restaurant');
let ReviewModel = require('../model/review');
let UserModel = require('../model/user');

let _handleError = function(err){
    if (err) return console.log(err);
};

const culcAvg = (values) => {
    let noZero = values.filter(val => val > 0).length;
    return (values.reduce((acc, val) => acc + val) / noZero);
};

const culcnewAvg = (numOfReviews, oldAvg, newValue) => {
    return ((oldAvg * numOfReviews + newValue)/ (numOfReviews + 1));
};

module.exports = (app) => {
    app.post('/api/submit/review', function(req, res) {
        console.log('AddReview.post/api/submit/review');
        CitiesModel
            .findOne()
            .then(citiesArray => {
                if (!citiesArray) {
                    res.json({succeed: false, message: 'Server Can\'t find the cities array'});
                    throw "Can't find the cities array";
                } else {
                    req.body.location = citiesArray.cities.find((location) => location.city === req.body.location);
                    return req.body.location;
                }
            }).then(location => {
            RestaurantModel
                // .findOne({name: req.body.name, location: location})
                .where('name', req.body.name)
                .where('location.city', location.city)
                .then(restaurant => {
                    let avgValue = culcAvg([req.body.bathroom, req.body.staff, req.body.clean, req.body.food,
                        req.body.driveIn, req.body.delivery,]);
                    console.log("FREE TEXT: ", req.body.freeText);
                    req.review = new ReviewModel({
                        username: req.body.username,
                        name: req.body.name,
                        location: req.body.location,
                        bathroom: req.body.bathroom,
                        staff: req.body.staff,
                        clean: req.body.clean,
                        food: req.body.food,
                        driveIn: req.body.driveIn,
                        delivery: req.body.delivery,
                        freeText: req.body.freeText,
                        picture: req.body.picture,
                        timeStamp: req.body.timeStamp,
                        avgRate: avgValue,
                    });
                    if (restaurant.length > 0) {
                        restaurant = restaurant[0];
                        let newAvg = culcnewAvg(restaurant.reviews.length, restaurant.avgRate, avgValue);
                        restaurant.reviews.push(req.review);
                        restaurant.avgRate = newAvg;
                        restaurant.save(_handleError);
                    } else {
                        let newRestaurant = new RestaurantModel({
                            name: req.body.name,
                            location: req.body.location,
                            reviews: [req.review],
                            avgRate: avgValue,
                        });
                        newRestaurant.save(_handleError);
                    }
                })
                .then(() => {
                    UserModel
                        .findOne({username: req.body.username})
                        .then(user => {
                            if (user) {
                                user.reviews.push(req.review);
                                user.save(_handleError);
                                res.json({succeed: true, message: ''})

                            } else {
                                res.json({succeed: false, message: `Server Can't find the user: ${req.body.username}`});
                                throw "Can't find the user";
                            }
                        })
                }).catch(_handleError);
        }).catch(_handleError);
    });
};
