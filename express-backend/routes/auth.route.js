const express = require('express');
const app = express();
const userRoute = express.Router();
const jwt = require('jsonwebtoken');

// User model
let User = require('../models/Users');

userRoute.route('/login').post((req, res, next) => {
    User.find( req.body,(error, data) => {
        if (error) {
            return next(error)
          } else {
            const getuser = data[0];
            console.log('data', data)
            const token = jwt.sign(
                { userId: getuser._id, username: getuser.userName },
                "@SK",
                { expiresIn: "1h" }
              );
             const response =  { status: true, token: token }
            res.json(response)
          }
     })
   
});

module.exports = userRoute;