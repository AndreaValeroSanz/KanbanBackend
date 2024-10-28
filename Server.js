//importamos express y controladores
import express from "express";
// import TaskRouter from './rutas/TaskRouter.js';
import { MongoClient } from 'mongodb';

//instanciamos nueva aplicación express
const app = express();

//necesario para poder recibir datos en json
app.use(express.json());


const url = "mongodb+srv://avalerosanz:<root>@cluster0.oqdti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//conectamos con la base de datos
const client = new MongoClient(url);
client.connect();

//las rutas que empiecen por /api/alumnes se dirigirán a alumnesRouter
// app.use('/api/task', TaskRouter);

// servimos front como ruta estática
app.use(express.static('FRONT/dist'));


//arranque del servidor
const port = 3000
app.listen(port, () => console.log(`App listening on port ${port}!`))

