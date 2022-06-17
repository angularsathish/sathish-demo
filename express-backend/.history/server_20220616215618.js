const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
// Connecting with mongo db
// 127.0.0.1:27017
// 106.197.144.180/32
mongoose
  .connect('mongodb+srv://sathish_user:pJButRhk3I1iP7E2@scubesathish.gzbwq.mongodb.net/sathishmongo?authSource=admin&replicaSet=atlas-ll1zuw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
// Setting up port with express js
const userRoute = require('../express-backend/routes/user.route');
const authRoute = require('../express-backend/routes/auth.route');
const postRoute = require('../express-backend/routes/post.route');

const jwtVerify = require('../express-backend/middleware/checkjwt')
const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist/sathish-test')))
app.use('/', express.static(path.join(__dirname, 'dist/sathish-test')))
app.use('/api', userRoute);
app.use('/auth', authRoute);
app.use('/post',[jwtVerify] ,postRoute);

// Create port
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404))
})
// error handler
app.use(function (err, req, res, next) {
  console.error(err.message) // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})