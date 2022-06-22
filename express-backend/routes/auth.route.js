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
            const getuser = data && data.length > 0 ? data[0] : undefined;
            if (getuser) {
              console.log('data', data)
              const token = jwt.sign(
                  { userId: getuser._id, username: getuser.userName },
                  "@SK",
                  { expiresIn: "1h" }
                );
               const response =  { status: true, token: token }
              res.json(response)
            }else {
              next(new Error('Invalid Login Details'));
            }
            
          }
     })
   
});

module.exports = userRoute;