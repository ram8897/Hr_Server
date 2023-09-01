const asyncHandler = require('express-async-handler')
const userModel = require('../schemas/User')
const bcrypt = require('bcrypt');

const changePassword = asyncHandler(async (req, res) => {
   try {
      const { id, oldPassword, newPassword } = req.body;
      const user = await userModel.findByIdAndUpdate(id);
      console.log(user);
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: 'Invalid old password' });
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newPassword, salt);

      await userModel.findByIdAndUpdate(id, { password: passwordHash });

      res.status(200).json({ message: 'Password changed successfully' });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
   }
})

module.exports = { changePassword }