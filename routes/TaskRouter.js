import express from 'express';
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.get('/users', (req, res) => {
  res.send('List of users');
});

router.post('/users', (req, res) => {
  res.send('Create a new user');
});

// Export the router
export default router;