const express = require('express');
const commentRoute = express.Router();
// Comments model
let Comments = require('../models/Comments');
const jwtVerify = require('../middleware/checkjwt')


// Add Posts
commentRoute.route('/create').post(jwtVerify.authenticateJWT,(req, res, next) => {
    const userId= req.user.userId;
    req.body.userId = userId;
    Comments.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Posts
commentRoute.route('/list').post(jwtVerify.authenticateJWT, (req, res) => {
    console.log('req', req.user);
    const searchParam = {
        userId:  req.user.userId,
        postId: req.body.postId
    }
    Comments.find(searchParam,(error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  // Delete 
  commentRoute.route('/delete/:id').delete(jwtVerify.authenticateJWT, (req, res, next) => {
    Comments.findOneAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })


  // Update employee
  commentRoute.route('/update/:id').put(jwtVerify.authenticateJWT,(req, res, next) => {
    Comments.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    })
  })
module.exports = commentRoute;