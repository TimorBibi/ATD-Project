const jwt = require('jsonwebtoken');

const secret = '6d7h8r9c';
module.exports.secret = secret;

const withAuthFunc = function(req, res, next) {
    console.log("middleware.get pre api/checkToken");
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
        res.json({validUser: false, reason: 'Unauthorized: No token provided'});
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.json({validUser: false, reason: 'Unauthorized: Invalid token'});
            } else {
                req.username = decoded.username;
                next();
            }
        });
    }
};

module.exports.withAuth = withAuthFunc;