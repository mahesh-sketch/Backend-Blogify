import { Schema, model } from "mongoose";

const blogSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

export default Blog;
