const withAuth = require('../middleware').withAuth;
let CitiesModel = require('../model/cities');
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
                            res.json(newDoc);
                        })
                } else {
                    res.json(doc.cities);
                }
            })
            .catch(_handleError);
    });
};
