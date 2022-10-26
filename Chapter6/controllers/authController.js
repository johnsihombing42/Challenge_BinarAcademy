const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const exist = await User.findOne({ where: { email: email } });
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already used!',
                    data: null
                });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: encryptedPassword
            });

            return res.status(201).json({
                status: true,
                message: 'user created!',
                data: {
                    name: user.name,
                    email: user.email
                }
            });
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'credential is not valid!',
                    data: null
                });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({
                    status: false,
                    message: 'credential is not valid!',
                    data: null
                });
            }

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            const token = jwt.sign(payload, JWT_SECRET_KEY);

            return res.status(200).json({
                status: true,
                message: 'login success!',
                data: { token }
            });

        } catch (err) {
            next(err);
        }
    },
    whoami: (req, res, next) => {
        try {
            const { user } = req;
            return res.status(200).json({
                status: true,
                message: 'success!',
                data: { name: user.name, email: user.email }
            });
        } catch (err) {
            next(err);
        }
    },
};