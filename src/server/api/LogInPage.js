const secret =  require('../middleware').secret;
const jwt = require('jsonwebtoken');
let UserModel = require('../model/user');

let _handleError = function(err){
    if (err) return console.log(err);
};

module.exports = (app) => {
    app.post('/api/validate/user', function(req, res) {
        console.log('LogInPage.post/api/validate/user');
        UserModel
            .findOne({username: req.body.username})
            .then(doc => {
                if (doc != null) {
                    if (doc.password !== req.body.password){
                        res.json({succeed: false, reason: 'password', message: 'Wrong password.'});
                    } else {
                        const token = jwt.sign({'username': req.body.username}, secret, {
                            expiresIn: '1h'
                        });
                        res.cookie('token', token, { httpOnly: true })
                        res.json({succeed: true, username: req.body.username});
                    }
                } else {
                    res.json({succeed: false, reason:'username', message: 'Unknown username.'});
                }
            })
            .catch(_handleError);
    });
};