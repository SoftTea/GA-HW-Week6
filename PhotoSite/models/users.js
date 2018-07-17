const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  screenName: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema);