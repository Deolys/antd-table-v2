const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true},
    password: { type: String, required: true },
    type_id: { type: Number, required: true },
    project: {type: String, required: true},
    description: { type: String },
    map_data: {type: Map, of: String},
    last_visit_date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
