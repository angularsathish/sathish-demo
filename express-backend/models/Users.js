const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let User = new Schema({
    firstName: {
        type: String, required : [true,
        'firstName is required']
     },
   lastName: {
      type: String, required : [true, 'lastname is required'],
   },
   userName: {
    type: String,
    unique : true, required : [true, 'userName is required'],
 },
  
   password: {
      type: String, required : [true, 'password is required'],
   },

}, {
   collection: 'user'
})
module.exports = mongoose.model('User', User)