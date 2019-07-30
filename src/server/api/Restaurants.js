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
    app.post('/api/submit/restaurant', function (req, res) {
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
                            } else {
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
}