const Appointment = require('../models/Appointment');

// Create Appointment
exports.createAppointment = async (req, res) => {
    try {
      const { doctorId, appointmentDate, appointmentTime, reason } = req.body;
  
      // Automatically get user ID from middleware
      const userId = req.user._id;
  
      if (!doctorId || !appointmentDate) {
        return res.status(400).json({ message: 'Doctor ID and Appointment Date are required.' });
      }
  
      const appointment = await Appointment.create({
        user: userId,
        doctor: doctorId,
        appointmentDate,
        appointmentTime,
        reason,
        status: 'Pending',
        requestedAt: new Date(),
      });
  
      res.status(201).json(appointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ message: 'Error creating appointment', error });
    }
  };
  

// // Accept Appointment
// exports.acceptAppointment = async (req, res) => {
//   try {
//     const appointment = await Appointment.findByIdAndUpdate(
//       req.params.appointmentId,
//       { status: 'accepted', acceptedTime: new Date() },
//       { new: true }
//     );
//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: 'Error accepting appointment', error });
//   }
// };

// // Reject Appointment
// exports.rejectAppointment = async (req, res) => {
//   try {
//     const appointment = await Appointment.findByIdAndUpdate(
//       req.params.appointmentId,
//       { status: 'rejected', rejectedTime: new Date() },
//       { new: true }
//     );
//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: 'Error rejecting appointment', error });
//   }
// };

// // Complete Appointment
// exports.completeAppointment = async (req, res) => {
//   try {
//     const appointment = await Appointment.findByIdAndUpdate(
//       req.params.appointmentId,
//       { status: 'completed' },
//       { new: true }
//     );
//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({ message: 'Error completing appointment', error });
//   }
// };

// Get Appointment Details
exports.getAppointmentDetails = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointment', error });
  }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.appointmentId);
    res.json({ message: 'Appointment canceled' });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling appointment', error });
  }
};


// Get all appointments by user
exports.getAppointmentsByUser = async (req, res) => {
    try {
      const userId = req.user._id;
      const appointments = await Appointment.find({ user: userId }).populate('doctor', 'name specialization');
      
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching appointments', error });
    }
  };

  
  // Get all appointments for a doctor
exports.getAppointmentsByDoctor = async (req, res) => {
    try {
        const doctorId = req.doctor._id;  // Get the doctor ID from the authenticated user
        const appointments = await Appointment.find({ doctor: doctorId })
            .populate('user', 'name')  // Populate the user data to show the patient's name
            .populate('doctor', 'name specialization');  // Populate doctor data
            console.log('Appointments being sent:', appointments);

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctor\'s appointments', error });
    }
};

// Accept an appointment
exports.acceptAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (appointment.status !== 'Pending') {
            return res.status(400).json({ message: 'Appointment already accepted or rejected.' });
        }

        appointment.status = 'Accepted';
        appointment.acceptedAt = Date.now();  // Set the accepted time
        await appointment.save();

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error accepting appointment', error });
    }
};

// Reject an appointment
exports.rejectAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    try {
        const appointment = await Appointment.findById(appointmentId);

        if (appointment.status !== 'Pending') {
            return res.status(400).json({ message: 'Appointment already accepted or rejected.' });
        }

        appointment.status = 'Rejected';
        appointment.rejectedAt = Date.now();  // Set the rejected time
        await appointment.save();

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting appointment', error });
    }
};


// Complete appointment
exports.completeAppointment = async (req, res) => {
    const { appointmentId } = req.params;
  
    try {
      const appointment = await Appointment.findById(appointmentId);
      
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      appointment.status = 'Completed';
      appointment.completedAt = Date.now();
      await appointment.save();
  
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: 'Error completing appointment', error });
    }
  };