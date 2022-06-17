const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let User = new Schema({
    firstName: {
        type: String, required : true,
     },
   lastName: {
      type: String, required : true,
   },
   userName: {
    type: String,
    unique : true, required : true,
 },
  
   password: {
      type: String, required : true,
   },

}, {
   collection: 'user'
})
module.exports = mongoose.model('User', User)