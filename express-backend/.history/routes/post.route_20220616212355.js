const express = require('express');
const app = express();
const postRoute = express.Router();
// User model
let Posts = require('../models/Posts');

// Add User
postRoute.route('/create').post((req, res, next) => {
    Posts.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

module.exports = postRoute;