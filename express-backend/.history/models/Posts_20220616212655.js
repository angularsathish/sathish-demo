const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Post = new Schema({
    title: {
        type: String, required : true,
     },
     content: {
      type: String, required : true,
   },
   description: {
    type: String,
 },
 userId: {
      type: String, required : true,
   },

}, {
   collection: 'post'
})
module.exports = mongoose.model('Post', Post)