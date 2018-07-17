const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users');

mongoose.connection.on('connected', ()=>{
  console.log('mongoose is connected ')
})

mongoose.connection.on('error', (err)=>{
  console.log('mongoose error: ', err)
})

mongoose.connection.on('disconnected', ()=>{
  console.log('mongoose is disconnected')
})