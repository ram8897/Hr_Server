const twilio = require('twilio');
const asyncHandler = require('express-async-handler')
const User = require('../schemas/User')
const accountSid = 'AC0e3f011e9e6ec5d48c17d66130a71313'; // Your Account SID from www.twilio.com/console
const authToken = '49cb31654be90b1213ef025609280be0'; // Your Auth Token from www.twilio.com/console
const client = twilio(accountSid, authToken);


const sendOtp = asyncHandler(async (req, res) => {
    const { phoneNumber } = req.body
    // const cryptoRandomString = await import('crypto-random-string');
    const otp = Math.floor(Math.random() * 1000000)
    // const user = await User.findOneAndUpdate({ phoneNumber }, { otp }, { new: true, upsert: true });
    const formattedNumber = `+91 ${phoneNumber}`;
  client.messages
    .create({
      body: `Welcome to the HRMS application use the One Time Password: ${otp} to reset your password`,
      from: '+15855232573',
      to: formattedNumber,
    })
    .then(async () => {
      console.log(`OTP sent successfully to ${phoneNumber}`);
      // user.save();
      res.status(200).json({ message: 'OTP sent successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Failed to send OTP' });
    });
})

module.exports = { sendOtp }