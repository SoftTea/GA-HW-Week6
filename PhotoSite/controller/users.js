const express = require('express');

const router = express.Router();

const Users = require('../models/users');

router.get('/', (req,res)=>{
  Users.find({}, (err, allUsers)=>{
    if(err){
      res.send(err)
    } else {
      res.render('users/index.ejs', {
        users: allUsers
      })
    }
  })
});

router.get('/create', (req,res)=>{
  res.render('users/create.ejs')
})

router.post('/', (req,res)=>{
  Users.create(req.body, (err, createdUser)=>{
    if(err) {
      res.send(err)
    } else {
      console.log(createdUser, 'created User')
      res.redirect('/users')
    }
  })
})

router.get('/:id', (req,res)=>{
  Users.findById(req.params.id, (err, userInfo)=>{
    if (err) {
      res.send(err)
    } else {
      res.render('users/show.ejs', {
        user: userInfo
      });
    }
  })
})

router.get('/:id/edit', (req,res)=>{
  Users.findById(req.params.id, (err,foundUser)=>{
    if (err) {
      res.send(err)
    } else {
      res.render('users/edit.ejs', {
        user: foundUser
      })
    }
  })
  
})

router.put('/:id/update', (req,res)=>{
  Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUsr)=>{
    if(err) {
      res.send(err);
    } else {
      res.redirect('/users')
    }
  })
})

module.exports = router;