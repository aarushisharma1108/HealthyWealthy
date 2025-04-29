const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect } = require('../middlewares/authMiddleware');

// AUTH
router.post('/register', doctorController.registerDoctor);
router.post('/login', doctorController.loginDoctor);

// PROFILE
// router.get('/profile/:doctorId', protect, doctorController.getDoctorProfile);
router.get('/profile', protect, doctorController.getDoctorProfile);

router.put('/profile/:doctorId', protect, doctorController.updateDoctorProfile);

// DOCTOR LISTING (public)
router.get('/all', doctorController.getAllDoctors);
router.get('/search', doctorController.searchDoctors);

// DOCTOR's OWN APPOINTMENTS
router.get('/:doctorId/appointments', protect, doctorController.getDoctorAppointments);

// Delete Doctor Account
router.delete('/:doctorId', protect, doctorController.deleteDoctorAccount);

// Define the route to get doctors by specialization
router.get('/specialization/:specialization', doctorController.getDoctorsBySpecialization); // Corrected here
//Get docket by id for showiing to user 
router.get('/doctor/:id', doctorController.getDoctorById);
// logout logic
router.post('/logout', doctorController.logoutDoctor);

module.exports = router;
