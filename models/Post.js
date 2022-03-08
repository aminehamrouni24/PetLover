const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Post = mongoose.model("post", postSchema);
