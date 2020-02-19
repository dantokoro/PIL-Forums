const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    post_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
    reply_to: {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
         default: 0
    },
    debate: {
        type: Boolean,
        default: false
    }
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;