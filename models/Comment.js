const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CommentSchema = mongoose.Schema({
  userID: {
    type: Schema.Types.ObjectId
  },
  username:{
      type: String
  },
  content: {
    type: String
  },
  productID:{
    type: Schema.Types.ObjectId
  },
  createAt:{
    type: Date
  },
  image:{
    type: String
  }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;