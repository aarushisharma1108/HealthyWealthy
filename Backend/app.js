


const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const { connectDB } = require('./config/db');
const { protect } = require('./middlewares/authMiddleware'); // ✅ Import protect

const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

dotenv.config();
connectDB();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Static frontend files
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Auth pages
app.get('/login-user', (req, res) => {
    res.sendFile(path.join(__dirname, '..','frontend', 'public', 'login-user.html'));
});

app.get('/signup-user', (req, res) => {
    res.sendFile(path.join(__dirname, '..','frontend', 'public', 'signup-user.html'));
});

app.get('/login-doctor', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'login-doctor.html'));
});

app.get('/signup-doctor', (req, res) => {
    res.sendFile(path.join(__dirname, '..','frontend', 'public', 'signup-doctor.html'));
});

// Home page protected
app.get('/', protect, (req, res) => {
    res.sendFile(path.join(__dirname, '..','frontend', 'public', 'home.html'));
});

// app.get('/profile', protect, (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'profile.html'));
//   });

//   app.get('/patient-profile', protect, (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'patient-profile.html'));
//   });


app.get('/doctors-specilization', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'doctors-specilization.html'));
});

app.get('/doctors-by-specilization', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'doctors-by-specilization.html'));
});

  // Profile page with role-based routing
app.get('/profile', protect, (req, res) => {
    console.log(req.role)
    if (req.role === 'user') {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'patient-profile.html'));
    } else if (req.role === 'doctor') {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'profile.html'));
    } else {
        res.redirect('/login-user');
    }
});


app.get('/appointments', protect, (req, res) => {
    console.log(req.role);
    if (req.role === 'user') {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'user-appointments.html'));
    } else if (req.role === 'doctor') {
        res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'doctor-appointments.html'));
    } else {
        res.redirect('/login-user');
    }
});


  app.get('/doctor-profile-for-user', protect, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'doctor-profile-for-user.html'));
});

  
app.get('/appointments/create', (req, res) => {
    const doctorId = req.query.doctorId;
  
    if (!doctorId) {
      return res.status(400).send('Doctor ID is missing.');
    }
  
    // Render the create appointment page with doctorId passed
    res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'create-appointment.html'));
  });

  
// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
