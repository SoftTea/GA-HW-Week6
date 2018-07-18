const express = require('express');

const router = express.Router();

const Users = require('../models/users');

const Photos = require('../models/photos');

router.get('/', (req,res)=>{
  Photos.find({}, (err,allPhotos)=>{
    res.render('photos/index.ejs', {
      photos: allPhotos
    })
  })
});

router.get('/:id', (req, res)=>{
  Photos.findById(req.params.id, (err, foundPhoto)=>{
    Users.findOne({'photos._id': req.params.id}, (err, foundUser)=>{
    
      res.render('photos/show.ejs', {
        user: foundUser,
        photo: foundPhoto
      })
    })
  })
})

router.put('/:id', (req,res)=>{
  Photos.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPhoto)=>{
    Users.findOne({'photos._id': req.params.id}, (err,foundUser)=>{
      foundUser.photos.id(req.params.id).remove();
      foundUser.photos.push(updatedPhoto);
      foundUser.save((err, data)=>{
        res.redirect(`/photos/${req.params.id}`)
      })

    })
  })
})

router.get('/:id/edit', (req,res)=>{
  Photos.findById(req.params.id, (err,foundPhoto)=>{
    res.render('photos/edit.ejs', {
      photo: foundPhoto
    })
  })
})

router.get('/create', (req, res)=>{
  res.render('photos/create.ejs');
});

router.post('/', (req,res)=>{
  Users.findOne({'screenName': req.body.screenName}, (err, foundUser)=>{
    Photos.create(req.body,(err,createdPhoto)=>{
      foundUser.photos.push(createdPhoto);
      foundUser.save((err,data)=>{
        res.redirect('/photos')
      });
    })
  })
})


module.exports = router;