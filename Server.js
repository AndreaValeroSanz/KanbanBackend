//importamos express y controladores
import express from "express";
import TaskRouter from './routes/TaskRouter.js';
import UsersRouter from './routes/UsersRouter.js';
import { connectDB } from "./config/db.js";
import User from './models/user.js';
import Project from './models/project.js';
import mongoose from "mongoose";


//instanciamos nueva aplicación express
const app = express();

//necesario para poder recibir datos en json
app.use(express.json());

//conectamos la base de datos
connectDB();

//las rutas que empiecen por /api/alumnes se dirigirán a alumnesRouter
app.use('/api/task', TaskRouter);

//las rutas que empiecen por /api/users se dirigirán a usersRouter
app.use('/api/users', UsersRouter);

// servimos front como ruta estática
app.use(express.static('FRONT/dist'));


//arranque del servidor
const port = 3000
app.listen(port, () => console.log(`App listening on port ${port}!`))



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