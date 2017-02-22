import mongoose from 'mongoose';
import { UserSchema } from './user';

export const CommentSchema = mongoose.Schema({
  rating:  {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment:  {
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
