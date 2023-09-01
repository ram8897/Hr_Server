const express = require('express')
const router = express.Router();
const { userSignup, userLogin, punchIn, punchOut, allPunchins, downloadPunchData, getAllUsers, updateUser, uploadProfile, getAllUserEmails, userLogout, extendSession, getUploadImage, getAllCount } = require("../controllers/UserController");
const { requireLogin } = require('../middlewares/auth');
router.route('/all-users').get(getAllUsers)
router.route('/signup').post(userSignup);
router.route('/login').post(userLogin);
router.route('/logout', requireLogin).post(userLogout);
router.route('/extand-session').post(extendSession)
router.route('/user-update/:id').put(updateUser);
router.route('/all-punchs').get(allPunchins);
router.route('/punch-in').post(punchIn);
router.route('/punch-out').post(punchOut);
router.route('/punches/download').get(downloadPunchData);
router.route("/upload-profile/:id").post(uploadProfile);
router.route("/upload-profile/:id/image").get(getUploadImage);
router.route("/all-users/emails").get(getAllUserEmails);
router.route("/Employee-graph").get(getAllCount);
module.exports = router;
