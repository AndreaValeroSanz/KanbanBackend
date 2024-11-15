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
      try {
        // Llama al middleware de autenticación
        auth(req, null, () => {});
        
        // Retorna el contexto con `userId` solo si la autenticación es exitosa
        return { userId: req.userId };
      } catch (err) {
        console.error("Error de autenticación:", err.message);
        throw new Error("No autorizado");
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  // Conexión a la base de datos
  connectDB();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
