//importamos express y controladores
import express from "express";
import TaskRouter from './routes/TaskRouter.js';
import { connectDB } from "./config/db.js";

//instanciamos nueva aplicación express
const app = express();

//necesario para poder recibir datos en json
app.use(express.json());

//conectamos la base de datos
connectDB();

//las rutas que empiecen por /api/alumnes se dirigirán a alumnesRouter
app.use('/api/task', TaskRouter);

// servimos front como ruta estática
app.use(express.static('FRONT/dist'));


//arranque del servidor
const port = 3000
app.listen(port, () => console.log(`App listening on port ${port}!`))

