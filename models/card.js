import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duedate: {
    type: Date,
    required: true,
  },
  type: {
    type: String, // Array de strings
    required: [true],
  },
  color: {
    type: String, // Array de strings
    required: [true],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo User
    required: true,
  },
  projects_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Referencia al modelo Project
    required: true,
  },
}, { timestamps: false });

const Card = mongoose.model('Card', CardSchema);

export default Card;