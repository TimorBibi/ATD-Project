const {Map, List} = require('immutable');
let CitiesModel = require('../model/cities');
let UserModel = require('../model/user');
let RestaurantModel = require('../model/restaurant');

let _handleError = function(err){
    if (err) return console.log(err);
};


const culcAvg = (values) => {
    let noZero = values.filter(val => val > 0).length;
    return (values.reduce((acc, val) => acc + val) / noZero);
};

const culcnewAvg = (numOfReviews, oldAvg, newValue) => {
    if(numOfReviews === 1)
        numOfReviews=0;
    return ((oldAvg * numOfReviews + newValue)/ (numOfReviews + 1));
};

const culcoldAvg = (numOfReviews, oldAvg, oldValue) => {
    if(numOfReviews === 1)
        return 0;
    return ((oldAvg * numOfReviews - oldValue)/ (numOfReviews - 1));
};

module.exports = (app) => {
    app.post('/api/submit/restaurant', function(req, res) {
        console.log('Restaurant.post/api/submit/restaurant');
        RestaurantModel
            .findOne({name: req.body.name}, 'location')
            .then((location) => {
                if (location && location.location.city === req.body.location) {
                    res.json({succeed: false, message: 'The restaurant already exist in this location'});
                } else {
                    CitiesModel
                        .findOne()
                        .then(citiesArray => {
                            if (!citiesArray) {
                                res.json({succeed: false, message: ''});
                                throw "Can't find the cities array";
                            }
                            else {
                                let location = citiesArray.cities.find((location) => location.city === req.body.location);
                                let newRestaurant = new RestaurantModel({
                                    name: req.body.name,
                                    location: location,
                                    reviews: [],
                                    avgRate: 0,
                                });
                                newRestaurant
                                    .save(_handleError);
                            }
                        }).then(() => {
                            res.json({succeed: true, message: "Submission succeeded"});
                    })
                    .catch(_handleError);
                }
            })
            .catch(_handleError);
    });

    app.post('/api/submit/edit/review', function(req, res) {
        console.log('Restaurants.post/api/submit/edit/review');
        let avgValue = culcAvg([req.body.bathroom, req.body.staff, req.body.clean, req.body.food,
            req.body.driveIn, req.body.delivery,]);
        RestaurantModel
            // .findOne({name: req.body.name, location: location})
                .where('name', req.body.name)
                .where('location.city', req.body.location.city)
                .then(restaurant => {
                    restaurant = restaurant[0];

                    // restaurant.reviews.findOneAndUpdate({username: req.body.username, timeStamp: req.body.timeStamp},
                    //     { $set: {bathroom: req.body.bathroom}});
                    // restaurant.save(_handleError);
                    // console.log("ddddddddd: ", restaurant.reviews);
                    let review = restaurant.reviews.find(function (e) {
                        return (e.username === req.body.username && e.timeStamp === req.body.timeStamp);
                    });

                    if(review)
                        {
                            restaurant.reviews.pull(review);
                            review.bathroom = req.body.bathroom;
                            review.staff = req.body.staff;
                            review.clean = req.body.clean;
                            review.food = req.body.food;
                            review.driveIn = req.body.driveIn;
                            review.delivery = req.body.delivery;
                            review.freeText = req.body.freeText;
                            review.picture.data = req.body.picture.pictureData;
                            review.picture.contentType = req.body.picture.pictureType;
                            review.avgRate = avgValue;
                            restaurant.reviews.push(review);
                            restaurant.avgRate =  culcnewAvg(restaurant.reviews.length, restaurant.avgRate, avgValue);
                            restaurant.save(_handleError);

                        }
                        else
                        {
                            res.json({succeed: false, message: "Server Can't find the review"});
                            throw "Can't find the review";
                        }
                })
                .then(() => {
                    UserModel
                        .findOne({username: req.body.username})
                        .then(user => {
                            if (user)
                            {
                                let review = user.reviews.find(function (e) {
                                    return (e.username === req.body.username && e.timeStamp === req.body.timeStamp);
                                });
                                if (review)
                                {
                                    user.reviews.pull(review);
                                    review.bathroom = req.body.bathroom;
                                    review.staff = req.body.staff;
                                    review.clean = req.body.clean;
                                    review.food = req.body.food;
                                    review.driveIn = req.body.driveIn;
                                    review.delivery = req.body.delivery;
                                    review.freeText = req.body.freeText;
                                    review.picture = {
                                        data: req.body.picture.pictureData,
                                        contentType: req.body.picture.pictureType
                                    };
                                    review.avgRate = avgValue;
                                }
                                user.reviews.push(review);
                                user.save(_handleError);
                                res.json({succeed: true, message: '', review: review})

                            } else {
                              res.json({succeed: false, message: `Server Can't find the user: ${req.body.username}`});
                              throw "Can't find the user";
                            }
                        }).catch(_handleError);
                }).catch(_handleError);
    });

    app.post('/api/delete/review', function(req, res) {
        console.log('Restaurants.post/api/delete/review');
        RestaurantModel
            .where('name', req.body.review.name)
            .where('location.city', req.body.review.location.city)
            .then(restaurant => {
                restaurant = restaurant[0];
                let review = restaurant.reviews.find(function (e) {
                    return (e.username === req.body.review.username && e.timeStamp === req.body.review.timeStamp);
                });
                if(review)
                {
                    restaurant.avgRate =  culcoldAvg(restaurant.reviews.length, restaurant.avgRate, review.avgRate);
                    restaurant.reviews.pull(review);
                    restaurant.save(_handleError);
                }
                else
                {
                    res.json({succeed: false, message: "Server Can't find the review"});
                    throw "Can't find the review";
                }
            })
            .then(() => {
                UserModel
                    .findOne({username: req.body.review.username})
                    .then(user => {
                        if (user)
                        {
                            let review = user.reviews.find(function (e) {
                                return (e.username === req.body.review.username && e.timeStamp === req.body.review.timeStamp);
                            });
                            if (review)
                            {
                                user.reviews.pull(review);
                                user.save(_handleError);
                                res.json({succeed: true, message: '', review: review})
                            }
                        } else {
                            res.json({succeed: false, message: `Server Can't find the user: ${req.body.review.username}`});
                            throw "Can't find the user";
                        }
                    }).catch(_handleError);
            }).catch(_handleError);
    });
};