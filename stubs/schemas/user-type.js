const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  allow_edit: Boolean,
});

module.exports = mongoose.model('UserType', userTypeSchema);
