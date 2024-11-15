import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;

const videosSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: [true, "Video file is required"],
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Invalid URL for video file",
      },
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Invalid URL for thumbnail",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      lowercase: true,
      index: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must not exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      lowercase: true,
      maxlength: [500, "Description must not exceed 500 characters"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 second"],
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "Views cannot be negative"],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const VideoModel = model("Video", videosSchema);

export default VideoModel;
