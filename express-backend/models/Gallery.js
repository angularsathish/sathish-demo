var mongoose = require('mongoose');

var GallerySchema = new mongoose.Schema({
  imageUrl: String,
  imageTitle: String,
  imageDesc: String,
  postId: {
    type: mongoose.Types.ObjectId, required : true,
 },
 userId: {
    type: mongoose.Types.ObjectId, required : true,
    },
  uploaded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gallery', GallerySchema);

