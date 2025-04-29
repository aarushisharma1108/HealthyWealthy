const User = require('../models/User');
const Appointment = require('../models/Appointment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

const generateToken = (id, role) => {
    return jwt.sign(
      { id, role }, // 🎯 Now embedding both id and role
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
  };

// // Register User
// exports.registerUser = async (req, res) => {
//   const { name, email, password, phone, address, age, gender } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       age,
//       gender,
//       role: role || 'Patient',  // save role, default to 'Patient' if not sent

//     });

//     res.status(201).json({
//       _id: user._id,
//       token: generateToken(user._id,role),
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
//   }
// };





exports.registerUser = async (req, res) => {
    const { name, email, password, phone, address, age, gender, role } = req.body;
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        age,
        gender,
        role: role || 'Patient',  // default to Patient
      });
  
      res.status(201).json({
        _id: user._id,
        token: generateToken(user._id, user.role),
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  };
  
// // Login User
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user._id,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// };


// // Login User
// exports.loginUser = async (req, res) => {
//     const { email, password ,role } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
  
//       if (user && (await bcrypt.compare(password, user.password))) {
//         const token = generateToken(user._id, role);
  
//         // ✅ Set JWT token inside HTTP-Only Cookie
//         res.cookie('token', token, {
//           httpOnly: true,           // Cannot access cookie via JS
//           secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
//           sameSite: 'strict',        // CSRF protection
//           maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//         });
  
//         // ✅ Now send minimal response
//         res.status(200).json({ message: 'Login successful' });
  
//       } else {
//         res.status(401).json({ message: 'Invalid credentials' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Error logging in', error });
//     }
//   };

  

exports.loginUser = async (req, res) => {
    const { email, password } = req.body; // no role here

    try {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id, user.role); // role from database

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

// Get User Profile
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching profile', error });
//   }
// };

exports.getUserProfile = async (req, res) => {
    try {
      // Fetch user profile based on authenticated user's ID
      const user = await User.findById(req.user.id).select('-password');
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Send the user profile details as response
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  };
  
// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

// Delete User
exports.deleteUserAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// Get User Appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.userId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
};

exports.logoutUser = (req, res) => {
    try {
      res.clearCookie('token', {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',  // Ensure secure flag in production
        sameSite: 'strict',
      });
  
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out', error });
    }
  };