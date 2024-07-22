import mongoose from "mongoose";

const CursoSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reemplaza 'Usuario' con el nombre de tu modelo de usuario
    required: true,
  },
});

export default mongoose.model('Curso', CursoSchema);