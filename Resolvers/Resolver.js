import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Card from '../models/card.js'; // Ensure you have the Card model

const SECRET_KEY = "gommit";

const resolvers = {
  Query: {
    getAllCards: async (_, __, { userId }) => {
      try {
        if (!userId) {
          throw new Error('No autorizado');
        }

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

        const defaultProjectId = "67224b9d9040a876aa6e7013";
        const projectIdToUse = projects_id || defaultProjectId;

        const newCard = new Card({
          title,
          description,
          duedate,
          type,
          color,
          user_id: userId,
          projects_id: projectIdToUse,
        });

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

        const deletedCard = await Card.findOneAndDelete({ _id: id, user_id: userId });
        if (!deletedCard) {
          throw new Error('Tarjeta no encontrada o no autorizada para eliminar');
        }

        return deletedCard;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    editCard: async (
      _, 
      { cardId, title, description, duedate, type, color, projects_id },
      { userId }
    ) => {
      try {
        if (!userId) {
          throw new Error('No autorizado');
        }

        const updatedCard = await Card.findByIdAndUpdate(
          cardId,
          {
            ...(title && { title }),
            ...(description && { description }),
            ...(duedate && { duedate }),
            ...(type && { type }),
            ...(color && { color }),
            ...(projects_id && { projects_id }),
          },
          { new: true }
        );

        if (!updatedCard) {
          throw new Error('Tarjeta no encontrada');
        }

        return updatedCard;
      } catch (error) {
        throw new Error(`Error al editar la tarjeta: ${error.message}`);
      }
    },
    updateCardType: async (_, { id, type }, { userId }) => {
      try {
        if (!userId) {
          throw new Error('No autorizado');
        }

        // Find the card and make sure it belongs to the current user
        const card = await Card.findOne({ _id: id, user_id: userId });
        if (!card) {
          throw new Error('Tarjeta no encontrada o no autorizada');
        }

        // Update the type
        card.type = type;
        const updatedCard = await card.save();

        return updatedCard;
      } catch (error) {
        throw new Error(`Error al actualizar el tipo de tarjeta: ${error.message}`);
      }
    },
  },
};


export default resolvers;
