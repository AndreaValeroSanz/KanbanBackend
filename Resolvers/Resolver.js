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

        // Usar la ID por defecto si no se proporciona projects_id
        const defaultProjectId = "67224b9d9040a876aa6e7013";
        const projectIdToUse = projects_id || defaultProjectId;

        // Crea una nueva tarjeta
        const newCard = new Card({
          title,
          description,
          duedate,
          type,
          color,
          user_id: userId, // Asocia la tarjeta al usuario autenticado
          projects_id: projectIdToUse,
        });

        // Guarda la tarjeta en la base de datos
        const savedCard = await newCard.save();
        return savedCard;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteCard: async (_, { id }, { userId }) => {
      try {
        if (!userId) {
          throw new Error('No autorizado');
        }

        // Buscar y eliminar la tarjeta que pertenece al usuario autenticado
        const deletedCard = await Card.findOneAndDelete({ _id: id, user_id: userId });

        if (!deletedCard) {
          throw new Error('Tarjeta no encontrada o no autorizada para eliminar');
        }

        return deletedCard;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
