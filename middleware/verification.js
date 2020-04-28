const jwt = require('jsonwebtoken');
const config = require('../config/secret');

const verification = roles => {
    return (req, rest, next) => {
        // cek authorization in header
        const tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer) {
            const token = tokenWithBearer.split(' ')[1];
            // vetification
            jwt.verify(token, config.secret, (err, decoded) => {
                if(err) {
                    return rest.status(401).send({auth: false, message:'Token is unregistered!'});
                } else {
                    if(roles == 2){
                        req.auth = decoded;
                        next();
                    }else {
                        return rest.status(401).send({auth: false, message:'You\'re cannot access this page!'});
                    }
                }
            });
        } else {
            return rest.status(401).send({auth: false, message:'You have not a token!'});
        }
    }
}

module.exports = verification;