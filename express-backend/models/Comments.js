const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Comments = new Schema({
    message: {
        type: String, required : true,
     },
     postId: {
      type: mongoose.Types.ObjectId, required : true,
   },
  
 userId: {
   type: mongoose.Types.ObjectId, required : true,
   },

}, {
   collection: 'comments'
})
module.exports = mongoose.model('Comments', Comments)