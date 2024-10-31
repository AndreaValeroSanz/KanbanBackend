import express from "express";
import TaskRouter from './routes/TaskRouter.js';
import UsersRouter from './routes/UsersRouter.js';
import { connectDB } from "./config/db.js";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import User from './models/user.js'; // Asegúrate de tener el modelo User

// Instanciamos la aplicación Express
const app = express();

// Configuración para recibir JSON y permitir CORS
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// Conectamos la base de datos
connectDB();

// Definimos el esquema de GraphQL
const schema = buildSchema(`
  type User {
    id: ID!
    name: String
    surname1: String
    surname2: String
    email: String
  }

  type Query {
    users: [User]
  }
`);

// Definimos los resolvers para GraphQL
const root = {
  users: async () => {
    try {
      return await User.find();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error al obtener usuarios");
    }
  }
};

// Configuramos el endpoint de GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // Habilita GraphiQL en el navegador
}));

// Rutas adicionales
app.use('/api/task', TaskRouter);
app.use('/api/users', UsersRouter);

// Servimos el front-end como ruta estática
app.use(express.static('FRONT/dist'));

// Iniciamos el servidor
const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));




// const getProjects = async() => {
//     try {
//         const projects = await Project.find(); // Fetch all users
//         console.log(projects); // Log all users to the console
//         // res.json(users); // Send the users as a JSON response
//       } catch (error) {
//         console.error(error);
//         // res.status(500).json({ message: "An error occurred while fetching users" });
//       }
// }
// getProjects();

// const createuser = async () => {
//     try {
//       const user = new User({
//         name: "elena",
//         surname1: "eqw",
//         surname2: "weq",
//         email: "dasdas@gmail.com",
//         password: "securePass123"
//       });
//       await user.save();
//       console.log("User created:", user);
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };
  
//   createuser();
  
// const getUsers = async() => {
//     try {
//         const users = await User.find(); // Fetch all users
//         console.log(users); // Log all users to the console
//         // res.json(users); // Send the users as a JSON response
//       } catch (error) {
//         console.error(error);
//         // res.status(500).json({ message: "An error occurred while fetching users" });
//       }
// }
// getUsers();