import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Card from '../models/card.js'; // Asegúrate de tener el modelo Card
const SECRET_KEY = "gommit"; 

const resolvers = {
  Query: {
    getAllCards: async (_, __, { userId }) => { // Usamos userId del contexto
      try {
        if (!userId) {
          throw new Error('No autorizado');
        }
        //pasar como payload el project id en la request
        
        // Filtra las cards del usuario autenticado
        const cards = await Card.find({ user_id: userId });
        return cards;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('Usuario no encontrado');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Contraseña incorrecta');
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email },
          SECRET_KEY,
          { expiresIn: '3h' }
        );

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
