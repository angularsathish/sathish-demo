const express = require('express');
const app = express();
const postRoute = express.Router();
// Posts model
let Posts = require('../models/Posts');
const jwtVerify = require('../middleware/checkjwt')
const jwt = require('jsonwebtoken');


// Add Posts
postRoute.route('/create').post(jwtVerify.authenticateJWT,(req, res, next) => {
    const userId= req.user.userId;
    req.body.userId = userId;
    Posts.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Posts
postRoute.route('/list').get(jwtVerify.authenticateJWT, (req, res) => {
    console.log('req', req.user);
    const searchParam = {
        userId:  req.user.userId
    }
    Posts.find(searchParam,(error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  // Delete employee
  postRoute.route('/delete/:id').delete(jwtVerify.authenticateJWT, (req, res, next) => {
    Posts.findOneAndRemove({_id:req.params.id}, (error, data) => {
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
  postRoute.route('/update/:id').put(jwtVerify.authenticateJWT,(req, res, next) => {
    Posts.findByIdAndUpdate({_id:req.params.id}, {
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
module.exports = postRoute;