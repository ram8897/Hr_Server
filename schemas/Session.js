
const mongoose = require('mongoose');

const activeSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  loginTime: {
    type: Date,
    required: true
  },
  expireAt: { 
    type: Date, 
    default: () => new Date().getTime() + 1 * 60000
  }, // 1 minutes in the future,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  logoutTime: {
    type: Date
  }
});

activeSessionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 }); // Auto-delete expired sessions

module.exports = mongoose.model('ActiveSession', activeSessionSchema);;