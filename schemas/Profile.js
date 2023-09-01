const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  empId: {type: String},
  designation: {type: String},
  department: { type: String },
  team: {type: String}, 
  role: {type: String},
  joiningDate: {type: String}, 
  teams: [{
    type: String,
  }],
  dob: {
    type: String
  },
  gender: {
    type: String
  },
}, {timestamps: true});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;