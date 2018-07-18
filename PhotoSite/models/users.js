const mongoose = require('mongoose');

const Photos = require('./photos');

const userSchema = mongoose.Schema({
  screenName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  photos: [Photos.schema]
})

module.exports = mongoose.model('User', userSchema);