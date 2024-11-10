const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type_id: { type: Number, required: true },
    description: { type: String },
    last_visit_date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
