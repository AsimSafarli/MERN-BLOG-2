import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    file: { type: String, required: true },
    author: { type: Schema.Types.ObjectId,ref:'User' },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
