import express from 'express';
import { auth } from '../auth.js';
const router = express.Router();

// Define your routes here
router.get('/', auth,(req, res) => {
  res.send('Hello, World!');
});

router.get('/userget', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users
      console.log(users); // Log all users to the console
      res.json(users); // Send the users as a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching users" });
    }
  });
  
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
      } catch (error) {
        console.error("Error creating user:", error);
      }
});

// Export the router
export default router;