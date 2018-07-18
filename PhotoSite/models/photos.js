const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  url: {type:String, required:true},
  text: String

})

module.exports = mongoose.model('Photo', photoSchema);