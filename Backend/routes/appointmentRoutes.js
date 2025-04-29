// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middlewares/authMiddleware');

// // Controllers
// const appointmentController = require('../controllers/appointmentController');

// // CREATE APPOINTMENT (Patient Request)
// router.post('/create', protect, appointmentController.createAppointment);


// // Route to get appointments by user ID
// router.get('/appointments', protect, appointmentController.getAppointmentsByUser);
// // Route to get appointments by doctor ID
// router.get('/doctor-appointments', protect, appointmentController.getAppointmentsByDoctor);

// // APPOINTMENT ACTIONS
// router.put('/:appointmentId/accept', appointmentController.acceptAppointment);
// router.put('/:appointmentId/reject', appointmentController.rejectAppointment);
// router.put('/:appointmentId/complete', appointmentController.completeAppointment);

// // VIEW APPOINTMENT
// router.get('/:appointmentId', appointmentController.getAppointmentDetails);

// // Cancel Appointment (User or Doctor)
// router.delete('/:appointmentId', appointmentController.cancelAppointment);

// module.exports = router;



const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

// Controllers
const appointmentController = require('../controllers/appointmentController');

// CREATE APPOINTMENT (Patient Request)
router.post('/create', protect, appointmentController.createAppointment);

// Route to get appointments by user ID
router.get('/appointments', protect, appointmentController.getAppointmentsByUser);
// Route to get appointments by doctor ID
router.get('/doctor-appointments', protect, appointmentController.getAppointmentsByDoctor);

// APPOINTMENT ACTIONS
router.put('/:appointmentId/accept', protect, appointmentController.acceptAppointment);
router.put('/:appointmentId/reject', protect, appointmentController.rejectAppointment);
router.put('/:appointmentId/complete', protect, appointmentController.completeAppointment);

// VIEW APPOINTMENT
router.get('/:appointmentId', protect, appointmentController.getAppointmentDetails);

// Cancel Appointment (User or Doctor)
router.delete('/:appointmentId', protect, appointmentController.cancelAppointment);

module.exports = router;
