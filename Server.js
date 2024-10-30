//importamos express y controladores
import express from "express";
import TaskRouter from './routes/TaskRouter.js';
import UsersRouter from './routes/UsersRouter.js';
import { connectDB } from "./config/db.js";
import User from './models/user.js';


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


const getUsers = async () => {
    try {
      const users = await User.find();
      console.log(users);
    } catch (error) {
      console.error(error);
    }
  };

getUsers();