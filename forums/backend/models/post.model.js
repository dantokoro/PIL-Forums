const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    topic_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Topic'
    },
    debate: {
        type: Boolean,
        default: false
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
         default: 0
    }
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;