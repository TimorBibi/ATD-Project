let ReviewsModel = require('../model/restaurantReview');


let _handleError = function(err){
    console.log("before if "+ err);
    if (err) return console.log(err);
};

module.exports = (app) => {
    // app.get('/api/load/names', function(req, res) {
    //     console.log('restreview.get/api/load/names');
    //     ReviewsModel
    //         .findOne()
    //         .then(doc => {
    //             res.json(doc.name);
    //             res.end();
    //         });
    //
    // });
    app.post('/api/add/review', function(req, res) {
        console.log('add review');
        console.log(req.body.name);

        ReviewsModel
            .findOne({name: req.body.name})
            .then(doc => {
                console.log(doc);
                if (doc === null) {
                    console.log('doc === null');
                    let newDoc = new ReviewsModel({name:req.body.name});
                    newDoc.save(newDoc)
                        .then(()=>{
                            console.log('newDoc: ' + newDoc);
                            res.json(newDoc);
                            res.end();
                        })
                }else {//the value already exists
                    res.json({name: "else"});
                    res.end();
                    // console.log(doc.name);
                    // doc.name = req.body.name;
                    // doc.save(_handleError);
                }
            });
    });
};