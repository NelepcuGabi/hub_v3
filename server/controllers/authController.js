const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const createError = require('../utils/appError');
const bcrypt = require('bcryptjs');

// Helper function to create a token and set it as a cookie
const createSendToken = (user, statusCode, res) => {
    const token = jwt.sign({ _id: user._id }, "jwttelecomauth", {
        expiresIn: '90d',
    });

    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        httpOnly: true,
        // Uncomment the following line in production to use HTTPS
        // secure: process.env.NODE_ENV === 'production',
    };

    cookie = res.cookie('jwt', token, cookieOptions);

    // Remove the password from the output
    

    res.status(statusCode).json({
        status: 'success',
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};

// Register
exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(new createError("User already exists!", 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        createSendToken(newUser, 201, res);

    } catch (error) {
        next(error);
    }
};

// Login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return next(new createError('Incorrect email or password!', 404));

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new createError('Incorrect email or password!', 401));
        }

        createSendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
};
