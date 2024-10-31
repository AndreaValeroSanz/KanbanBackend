import express from 'express';
import { auth } from '../auth.js';
import User from '../models/user.js'; // Importación del modelo User

const router = express.Router();

// Ruta de prueba
router.get('/', auth, (req, res) => {
  res.send('Hello, World!');
});

// Ruta para obtener usuarios
router.get('/userget', async (req, res) => {
  try {
    const users = await User.find(); // Obtiene todos los usuarios
    console.log(users); // Muestra los usuarios en la consola del servidor
    res.json(users); // Responde con los usuarios en formato JSON
  } catch (error) {
    console.error("Error en la ruta /userget:", error);
    res.status(500).json({ message: "An error occurred while fetching users" });
  }
});

// Ruta para crear un usuario (ejemplo)
router.post('/userpost', async(req, res) => {
  try {
    const user = new User({
      id: "67224a6746492fd47f07c7c5",
      name: "ferran",
      surname: "Pérez",
      surname2: "García",
      email: "juan.perez@example.com",
      password: "securePass123"
    });
    await user.save();
    console.log("User created:", user);
    res.status(201).json(user); // Responde con el usuario creado
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Exporta el router
export default router;
