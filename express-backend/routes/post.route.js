const express = require('express');
const app = express();
const postRoute = express.Router();
// Posts model
let Posts = require('../models/Posts');
const jwtVerify = require('../middleware/checkjwt')

var multer  = require('multer');
const PATH = './uploads';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, PATH);
    },
    filename: (req, file, cb) => {
     
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      const filename = 'image-' + Date.now() + '.' + filetype;
      req.ImgName = filename
      cb(null, filename);
    }
});

var upload = multer({storage: storage});



// Add Posts
postRoute.route('/create').post([jwtVerify.authenticateJWT,upload.single('Images')],(req, res, next) => {
 
  
const param = req.body;
let postobj =  {}
const imgName =   req.ImgName ?  req.ImgName : undefined;
   for (var key in param) {
     if (key == 'post')
    postobj = JSON.parse(param[key])
}
  
  req.body = postobj
  

    const userId= req.user.userId;
    req.body.userId = userId;
    console.log(' req.body',  req.body);
    console.log('imgName', imgName)

    if(imgName) {
      // upload.single(files)
      req.body.url = 'http://localhost:4000/uploads/' +  req.ImgName;
     
  } 

    Posts.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Posts
postRoute.route('/list').get(jwtVerify.authenticateJWT,async (req, res) => {
    console.log('req', req.user);
    const { page = 1, size = 5 } = req.query;
    console.log('req.query', req.query)
    const searchParam = {
      userId:  req.user.userId
  }

    //////
    try {
      // execute query with page and limit values
      const posts = await Posts.find(searchParam)
        .limit(size * 1)
        .skip((page - 1) * size)
        .exec();
  
      // get total documents in the Posts collection 
      const count = await Posts.countDocuments();
  
      // return response with posts, total pages, and current page
      res.json({
        posts,
        totalPages: count,
        currentPage: page
      });
    } catch (err) {
      
      console.error(err.message);
    }
    
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