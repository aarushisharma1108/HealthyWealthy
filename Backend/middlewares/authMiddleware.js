
// // middlewares/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const Doctor = require('../models/Doctor');

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   let token = req.cookies.token; // ✅ Get token from cookies

//   if (!token) {
//     return res.redirect('/login-user'); // ✅ Redirect if no token
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user or doctor to request
//     req.user = await User.findById(decoded.id) || await Doctor.findById(decoded.id);

//     if (!req.user) {
//       return res.redirect('/login-user'); // ✅ Redirect if user not found
//     }

//     next(); // ✅ Everything ok, continue
//   } catch (error) {
//     console.error(error);
//     return res.redirect('/login-user'); // ✅ Redirect on error
//   }
// };

// module.exports = { protect };



// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token = req.cookies.token; // ✅ Get token from cookies

  if (!token) {
    return res.redirect('/login-user'); // ✅ Redirect if no token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;
    // First try to find User
    const user = await User.findById(decoded.id).select('-password');

    if (user) {
      req.user = user;
      req.role = 'user';  
      return next();
    }

    // Then try to find Doctor
    const doctor = await Doctor.findById(decoded.id).select('-password');

    if (doctor) {
      req.doctor = doctor;
      req.role = 'doctor';    // Save role
console.log(req.doctor)
      return next();
    }

    // If neither user nor doctor found
    return res.redirect('/login-user');

  } catch (error) {
    console.error(error);
    return res.redirect('/login-user');
  }
};

module.exports = { protect };







// // middlewares/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const Doctor = require('../models/Doctor');

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   let token = req.cookies.token; // ✅ Get token from cookies

//   if (!token) {
//     return res.redirect('/login-user'); // ✅ Redirect if no token
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // First try to find User
//     const user = await User.findById(decoded.id).select('-password');

//     if (user) {
//       req.user = user;         // ✅ always use req.user
//       req.role = 'user';        // optional, in case you want to know role
//       return next();
//     }

//     // Then try to find Doctor
//     const doctor = await Doctor.findById(decoded.id).select('-password');

//     if (doctor) {
//       req.user = doctor;        // ✅ doctor stored as req.user too
//       req.role = 'doctor';      // optional
//       return next();
//     }

//     // If neither user nor doctor found
//     return res.redirect('/login-user');

//   } catch (error) {
//     console.error(error);
//     return res.redirect('/login-user');
//   }
// };

// module.exports = { protect };




// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const Doctor = require('../models/Doctor');

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   let token = req.cookies.token; // Get token from cookies

//   if (!token) {
//     return res.redirect('/login-user'); // Redirect if no token
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // First try to find User
//     const user = await User.findById(decoded.id).select('-password');

//     if (user) {
//       req.user = user;           // Store user in req.user
//       req.role = 'user';         // Role is user
//       return next();
//     }

//     // Then try to find Doctor
//     const doctor = await Doctor.findById(decoded.id).select('-password');

//     if (doctor) {
//       req.user = doctor;         // Store doctor in req.user
//       req.role = 'doctor';       // Role is doctor
//       return next();
//     }

//     // If neither user nor doctor found
//     return res.redirect('/login-user');
//   } catch (error) {
//     console.error(error);
//     return res.redirect('/login-user');
//   }
// };

// module.exports = { protect };



// // middlewares/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const Doctor = require('../models/Doctor');

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   let token = req.cookies.token; // ✅ Get token from cookies

//   if (!token) {
//     return res.redirect('/login-user'); // ✅ Redirect if no token
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // First try to find User
//     const user = await User.findById(decoded.id).select('-password');

//     if (user) {
//       req.user = user;         // ✅ always use req.user
//       req.role = 'user';        // optional, in case you want to know role
//       return next();
//     }

//     // Then try to find Doctor
//     const doctor = await Doctor.findById(decoded.id).select('-password');

//     if (doctor) {
//       req.user = doctor;        // ✅ doctor stored as req.user too
//       req.role = 'doctor';      // optional
//       return next();
//     }

//     // If neither user nor doctor found
//     return res.redirect('/login-user');

//   } catch (error) {
//     console.error(error);
//     return res.redirect('/login-user');
//   }
// };

// module.exports = { protect };






// // middlewares/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const Doctor = require('../models/Doctor');

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   let token = req.cookies.token; // ✅ Get token from cookies

//   if (!token) {
//     return res.redirect('/login-user'); // ✅ Redirect if no token
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // First try to find User
//     const user = await User.findById(decoded.id).select('-password');

//     if (user) {
//       req.user = user;         // ✅ Always use req.user for user
//       req.role = 'user';        // Optional, if you need to know the role
//       return next();
//     }

//     // Then try to find Doctor
//     const doctor = await Doctor.findById(decoded.id).select('-password');

//     if (doctor) {
//       req.user = doctor;        // ✅ Doctor stored as req.user too
//       req.role = 'doctor';      // Optional, for role distinction
//       return next();
//     }

//     // If neither user nor doctor found, redirect to login
//     return res.redirect('/login-user');
//   } catch (error) {
//     console.error('Error in authMiddleware:', error);

//     // If token verification fails (e.g., expired token), redirect to login
//     return res.redirect('/login-user');
//   }
// };

// module.exports = { protect };
