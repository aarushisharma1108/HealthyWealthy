const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const generateToken = (id, role) => {
    return jwt.sign(
      { id, role }, // 🎯 Now embedding both id and role
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
  };
// Register Doctor
exports.registerDoctor = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    gender,
    specialization,
    degrees,
    collegeName,
    experienceYears,
    bio,
    profilePic,
    availableTimes,
    awards,
    memberships,
    languagesSpoken,
    role
  } = req.body;

  try {
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) return res.status(400).json({ message: 'Doctor already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      gender,
      specialization,
      degrees,
      collegeName,
      experienceYears,
      bio,
      profilePic,
      availableTimes,
      awards,
      memberships,
      languagesSpoken,
      role: role || 'Doctor',  // save role, default to 'Doctor' if not sent

    });

    res.status(201).json({
      _id: doctor._id,
      token: generateToken(doctor._id, doctor.role), // <-- Use doctor.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering doctor', error });
  }
};


  
exports.loginDoctor = async (req, res) => {
    const { email, password } = req.body; // no role here

    try {
      const doctor = await Doctor.findOne({ email });

      if (doctor && (await bcrypt.compare(password, doctor.password))) {
        const token = generateToken(doctor._id, doctor.role); // role from database

        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: 'Login successful' });

      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
};




exports.getDoctorProfile = async (req, res) => {
    try {
        console.log(' control went inside doctor controller')
      const doctor = await Doctor.findById(req.doctor._id); // ✅ use req.user._id directly
  
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      res.json(doctor); // ✅ send doctor profile back
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
// Update Doctor Profile
exports.updateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.doctorId, req.body, { new: true }).select('-password');
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

// Delete Doctor
exports.deleteDoctorAccount = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.doctorId);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting doctor', error });
  }
};

// Get All Doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select('-password');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

// Search Doctors
exports.searchDoctors = async (req, res) => {
  try {
    const { specialization, name } = req.query;
    const query = {};

    if (specialization) query.specialization = { $regex: specialization, $options: 'i' };
    if (name) query.name = { $regex: name, $options: 'i' };

    const doctors = await Doctor.find(query).select('-password');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error searching doctors', error });
  }
};

// Get Doctor's Appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};



exports.getDoctorsBySpecialization = async (req, res) => {
  const { specialization } = req.params;  // Extract specialization from the request params

  try {
    // Query the database for doctors that match the given specialization
    const doctors = await Doctor.find({ specialization: specialization });

    if (doctors.length === 0) {
      return res.status(404).json({ message: 'No doctors found for this specialization' });
    }

    // Return the list of doctors
    res.status(200).json(doctors);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getDoctorById = async (req, res) => {
    try {
      const doctorId = req.params.id;
      const doctor = await Doctor.findById(doctorId);
      
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      
      res.json(doctor);
    } catch (error) {
      console.error('Error fetching doctor by ID:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  
exports.logoutDoctor = (req, res) => {
    try {
      res.clearCookie('token', {
        // httpOnly: true,
        sameSite: 'strict',
      });
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out', error });
    }
  };