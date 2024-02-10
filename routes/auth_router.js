import express from 'express';
const router = express.Router();

import auth_controller from '../controllers/auth_controller.js'
import auth_middleware from '../middleware/auth_middleware.js';



// Example protected route accessible to authenticated users
router.post('/register',auth_controller.register);
router.post('/login',auth_controller.login);
router.get('/profile', auth_middleware.authenticateUser, auth_controller.profile);


// // Example route restricted to admin role
// router.get('/admin', auth_middleware.authorizeUser('admin'), (req, res) => {
//   res.json({ message: 'Admin dashboard accessed successfully' });
// });
// router.get('/author', auth_middleware.authorizeUser('author'), (req, res) => {
//   res.json({ message: 'Author dashboard accessed successfully' });
// });

export default router
