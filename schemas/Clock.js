const mongoose = require("mongoose")
const PunchSchema = new mongoose.Schema({
    type: { type: String, enum: ['in', 'out'] },
    punchIn: { type: String},
    punchOut: { type: String},
    totalWorkingHours: { type: String },
    timeCount: { type: String },
    firstname: { type: String },
    lastname: { type: String },
  },
  {
    timestamps: true
  }
);
  
module.exports = mongoose.model('Punch', PunchSchema);
  