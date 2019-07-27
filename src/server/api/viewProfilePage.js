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
    app.post('/api/submit/edit/userreview', function(req, res) {
        console.log('ViewProfilePage.post/api/submit/edit/review');
        let avgValue = culcAvg([req.body.bathroom, req.body.staff, req.body.clean, req.body.food,
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
        console.log('ViewProfilePage.post/api/delete/userreview');
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

    app.post('/api/validate/edit/username', function(req, res) {
        console.log('viewProfilePage.post/api/validate/username');
        UserModel
            .findOne({username: req.body.checkName})
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
};