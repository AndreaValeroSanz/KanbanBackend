// UsersRouter.js
import express from 'express';
import { auth } from '../auth.js';
import User from '../models/user.js'; // Importación del modelo User
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET_KEY = 'gommit'; // Debes reemplazar esto con una clave secreta segura

// Ruta de prueba
router.get('/', auth, (req, res) => {
  res.send('Hello, World!');
});

// Definición del esquema y resolvers de GraphQL con la nueva consulta
const schema = buildSchema(`
  type User {
    id: ID!
    name: String
    surname1: String
    surname2: String
    email: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    userByCredentials(name: String!, password: String!): AuthPayload
  }
`);

// Definir resolvers para las consultas
const root = {
  users: async () => {
    try {
      return await User.find();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error al obtener usuarios");
    }
  },
  user: async ({ id }) => {
    try {
      return await User.findById(id);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Error al obtener el usuario");
    }
  },
  userByCredentials: async ({ name, password }) => {
    try {
      // Encuentra un usuario que coincida con el nombre y la contraseña
      const user = await User.findOne({ name: name, password: password });
      if (!user) {
        throw new Error("Usuario no encontrado o credenciales incorrectas");
      }

      // Genera un token JWT
      const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET_KEY, {
        expiresIn: '3h' // Token válido por 3 horas
      });

      // Devuelve el token y los datos del usuario
      return { token, user };
    } catch (error) {
      console.error("Error fetching user by credentials:", error);
      throw new Error("Error al obtener el usuario");
    }
  }
};

// Ruta para GraphQL usando el middleware `graphqlHTTP`
router.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // Habilita GraphiQL en el navegador
}));

// Exporta el router
export default router;
