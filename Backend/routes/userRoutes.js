const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// AUTH
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// PROFILE
router.get('/profile/', protect, userController.getUserProfile);
router.put('/profile/:userId', protect, userController.updateUserProfile);

// APPOINTMENTS
router.get('/:userId/appointments', protect, userController.getUserAppointments);

// Delete Account
router.delete('/:userId', protect, userController.deleteUserAccount);

router.post('/logout', userController.logoutUser);

module.exports = router;
