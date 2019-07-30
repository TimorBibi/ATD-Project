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

const culcoldAvg = (numOfReviews, restAvg, reviewValue) => {
    if(numOfReviews - 1 ===0)
        return 0;
    return (((restAvg * numOfReviews) - reviewValue)/ (numOfReviews - 1));
};

const culcnewAvg = (numOfReviews, oldAvg, newReviewAvg, oldReviewAvg) => {
    return (((oldAvg * numOfReviews) - oldReviewAvg + newReviewAvg)/ (numOfReviews));
};

module.exports = (app) => {
    app.post('/api/submit/edit/review', function(req, res) {
        console.log('Review.post/api/submit/edit/review');
        let newReviewAvg = culcAvg([req.body.bathroom, req.body.staff, req.body.clean, req.body.food,
            req.body.driveIn, req.body.delivery,]);
        RestaurantModel
        // .findOne({name: req.body.name, location: location})
            .where('name', req.body.name)
            .where('location.city', req.body.location.city)
            .then(restaurant => {
                restaurant = restaurant[0];

                let review = restaurant.reviews.find(function (e) {
                    return (e.username === req.body.username && e.timeStamp === req.body.timeStamp);
                });

                if(review)
                {
                    const oldReviewAvg = review.avgRate;
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
                    review.avgRate = newReviewAvg;
                    restaurant.reviews.push(review);
                    restaurant.avgRate =  culcnewAvg(restaurant.reviews.length, restaurant.avgRate, newReviewAvg, oldReviewAvg);
                    restaurant.save(_handleError);
                    req.restaurant = restaurant;

                }
                else
                {
                    res.json({succeed: false, message: "Server Can't find the review"});
                    throw "Can't find the review";
                }
                console.log("HEREE1111");
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
                                console.log("HEREE222");
                                user.reviews.pull(review);
                                console.log("HEREE333");
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
                                review.avgRate = newReviewAvg;
                            }
                            user.reviews.push(review);
                            user.save(_handleError);
                        } else {
                            res.json({succeed: false, message: `Server Can't find the user: ${req.body.username}`});
                            throw "Can't find the user";
                        }
                        console.log("HEREE444");

                    })
                    .then(()=> {
                        RestaurantModel
                            .find()
                            .then(doc => {
                                req.restaurants = doc;
                                console.log("HEREE555");

                            }).then(()=>{
                            UserModel
                                .find()
                                .then(doc => {

                                    req.users = doc;
                                    res.json({succeed: true, message: '', restaurants: req.restaurants, users: req.users})
                                    console.log("HEREE666");

                                })
                        })
                    }).catch(_handleError);
            }).catch(_handleError);
    });

    app.post('/api/delete/review', function(req, res) {
        console.log('Review.post/api/delete/review');
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