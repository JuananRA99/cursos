import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  comentario: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const themeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comentarios: [commentSchema], // Array de comentarios
});

export default mongoose.model("Theme", themeSchema);