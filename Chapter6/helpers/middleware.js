const jwt = require('jsonwebtoken');
const {
    JWT_SECRET_KEY
} = process.env;

module.exports = {
    mustLogin: (req, res, next) => {
        try {
            const token = req.headers['authorization'];
            if (!token) {
                return res.status(401).json({
                    status: false,
                    message: 'you\'re not authorized!',
                    data: null
                });
            }

            const decoded = jwt.verify(token, JWT_SECRET_KEY);
            req.user = decoded;
            next();
            
        } catch (err) {
            if (err.message == 'jwt malformed') {
                return res.status(401).json({
                    status: false,
                    message: 'you\'re not authorized!',
                    data: null
                });
            }

            next(err);
        }
    }
};
