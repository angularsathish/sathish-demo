const express = require('express');
const app = express();
const postRoute = express.Router();
// Posts model
let Posts = require('../models/Posts');
const jwtVerify = require('../middleware/checkjwt')
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.auth;

    if (authHeader) {
        const token = authHeader;

        jwt.verify(token, "@SK", (err, user) => {
            if (err) {
                console.log('err', err)
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
// Add Posts
postRoute.route('/create').post(authenticateJWT,(req, res, next) => {
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
postRoute.route('/list').get(authenticateJWT, (req, res) => {
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
  postRoute.route('/delete/:id').delete(authenticateJWT, (req, res, next) => {
    Posts.findOneAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })

module.exports = postRoute;