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
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  color: {
    type: String, 
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo User
    required: true,
  },
  projects_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Referencia al modelo Project
    required: false,
  },
}, { timestamps: false });

const Card = mongoose.model('Card', CardSchema);

export default Card;
