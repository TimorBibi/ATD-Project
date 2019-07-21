const withAuth = require('../middleware').withAuth;

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
};
