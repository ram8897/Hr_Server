const asyncHandler = require('express-async-handler')
const user = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userLogin = asyncHandler(async (req, res) => {
    console.log("req", req)
    try {
        const { email, password } = req.body;
        console.log(req.body, email, user);
        const userLogin = await user.findOne({ email });
        console.log(userLogin);
        if (!userLogin) {
            return res.status(401).json({ message: "Authentication Failed" })
        }

        const isPasswordValid = await bcrypt.compare(password, userLogin.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ id: userLogin._id, email: userLogin.email, role: userLogin.role }, 'mysecretkey');
        userLogin.token = token;
        await userLogin.save();
        res.status(200).json({
            message: 'Authentication successful',
            userLogin,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = { userLogin }