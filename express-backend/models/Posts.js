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
   url: {
      type: String,
   },
   description: {
    type: String,
 },
 userId: {
   type: mongoose.Types.ObjectId,
    required : true,
   },

}, {
   collection: 'post'
})
module.exports = mongoose.model('Post', Post)