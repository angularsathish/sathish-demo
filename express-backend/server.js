const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet')
dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL)
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
const commentRoute = require('../express-backend/routes/comments.route')

const app = express()
app.use(cors())
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'dist/sathish-test')))
app.use('/', express.static(path.join(__dirname, 'dist/sathish-test')))
// app.use('/uploads',
//   express.static(path.join(__dirname, "upload"), { maxAge: 31557600000 })
// );
app.get('/uploads/:name', function (req, res, next) {
  const fileName = req.params.name;
  console.log('fileName', fileName)
  res.sendFile('./uploads/' + fileName,{ root: __dirname });
});

app.use('/api', userRoute);
app.use('/auth', authRoute);
app.use('/post',postRoute);
app.use('/comments', commentRoute)

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
  if (!err.message) err.message = err.message
  if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})