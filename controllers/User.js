const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (request, response) => {
    try {
        // Get user data from request body
        const { name, email, password } = request.body;

        // Generate a token for the new user
        const token = generateToken(name, email);

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password,
            token
        });

        // Redirect to the home page
        response.redirect('home');

    } catch (error) {
        response.status(500).send(error);
    }
};

const generateToken = (name, email) => {
    // Generate a token with the user ID as the payload
    const token = jwt.sign({ name, email }, 'lskjdf435lwfksj!@#%$^&*()_+');
    return token;
};

module.exports = {
    register
};