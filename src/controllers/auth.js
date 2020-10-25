const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');
const {jwtSecret}  = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

exports.login = async (req, res) => {
    const candidate = await User.findOne({username: req.body.username});

    if (candidate) {
        const isValid = bcrypt.compareSync(req.body.password, candidate.password);
        if (isValid) {
            // Generate token
            const token = jwt.sign({
                username: candidate.username,
                userId: candidate._id
            }, jwtSecret, {expiresIn: 60 * 60});

            return res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            return res.status(401).json({
                message: 'Invalid username or password.'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Invalid username or password.'
        });
    }
};

exports.register = async (req, res) => {
    const candidate = await User.findOne({username: req.body.username});
    if (candidate) {
        return res.status(409).json({
            message: 'username already exists.'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const user = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt)
        });
        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            errorHandler(res, e);
        }
    }
};
