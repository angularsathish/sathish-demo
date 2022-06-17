const express = require('express');
const app = express();
const postRoute = express.Router();
// Posts model
let Posts = require('../models/Posts');
const jwtVerify = require('../middleware/checkjwt')
const jwt = require('jsonwebtoken');
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.auth;
    console.log('authHeader', authHeader)

    if (authHeader) {
        const token = authHeader;
        console.log('token', token)

        jwt.verify(token, "@SK", (err, user) => {
            if (err) {
                console.log('err', err)
                return res.sendStatus(403);
            }
            console.log('user', user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
// Add Posts
postRoute.route('/create', jwtVerify).post((req, res, next) => {
    Posts.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Posts
postRoute.route('/list' ).get(authenticateJWT, (req, res) => {
    Posts.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

module.exports = postRoute;