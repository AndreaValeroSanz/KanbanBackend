import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './Schemas/Schema.js';
import resolvers from './Resolvers/Resolver.js';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { auth } from './auth.js';

const app = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Ejecuta el middleware de autenticación y obtiene el userId
      let userId = null;
      try {
        auth(req, null, () => {
          userId = req.userId; // Asigna el userId del token al contexto
        });
      } catch (err) {
        console.error("Error de autenticación:", err.message);
      }

      return { userId }; // Pasa userId al contexto de los resolvers
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  
  connectDB();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();

// query {
//   getAllCards {
//     _id
//     title
//     description
//     duedate
//     type
//     color
//     user_id
//     projects_id
//   }
// }

// mutation {
//   login(email: "usuario@example.com", password: "password123") {
//     token
//     user {
//       _id
//       email
//     }
//   }
// }
