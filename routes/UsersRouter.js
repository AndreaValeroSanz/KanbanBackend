import express from 'express';
import { auth } from '../auth.js';
const router = express.Router();

// Define your routes here
router.get('/', auth,(req, res) => {
  res.send('Hello, World!');
});

router.get('/userget', (req, res) => {
  res.send('List of Tasks');
});

router.post('/userpost', (req, res) => {
  res.send('Create a new task');
});

// Export the router
export default router;