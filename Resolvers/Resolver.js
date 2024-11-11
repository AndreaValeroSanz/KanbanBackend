import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Card from '../models/card.js'; // Asegúrate de tener el modelo Card
const SECRET_KEY = "gommit"; 

const resolvers = {
  Query: {
    getAllCards: async (_, __, { userId }) => {
      try {
        if (!userId) {
          throw new Error('No autorizado');
        }

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
    createCard: async (
      _,
      { title, description, duedate, type, color, projects_id },
      { userId }
    ) => {
      try {
        if (!userId) {
          throw new Error('No autorizado');
        }

        // Crea una nueva tarjeta
        const newCard = new Card({
          title,
          description,
          duedate,
          type,
          color,
          user_id: userId, // Asocia la tarjeta al usuario autenticado
          projects_id,
        });

        // Guarda la tarjeta en la base de datos
        const savedCard = await newCard.save();
        return savedCard;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    editCard: async (_, { cardId, title, description, duedate, type, color, projects_id }, { userId }) => {
      try {
        // Verifica si el usuario está autenticado
        if (!userId) {
          throw new Error('No autorizado');
        }

        // Encuentra y actualiza la tarjeta con los campos proporcionados
        const updatedCard = await Card.findByIdAndUpdate(
          cardId, // Primer parámetro debe ser el cardId
          {
            ...(title && { title }),
            ...(description && { description }),
            ...(duedate && { duedate }),
            ...(type && { type }),
            ...(color && { color }),
            ...(projects_id && { projects_id }),
          },
          { new: true } // crea el documento actualizado
        );

        // Verifica si la tarjeta fue encontrada
        if (!updatedCard) {
          throw new Error('Tarjeta no encontrada');
        }

        return updatedCard; // devuelve la tarjeta actualizada
      } catch (error) {
        throw new Error(`Error al editar la tarjeta: ${error.message}`);
      }
    },
  }
};

export default resolvers;
