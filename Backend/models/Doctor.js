const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    gender: { type: String },
    specialization: { type: String },
    degrees: [{ type: String }], // e.g., MBBS, MD
    collegeName: { type: String },
    experienceYears: { type: Number },
    bio: { type: String },
    profilePic: { type: String }, // Profile image URL or path
   
    availableTimes: [{ type: String }], // Optional available slots like "Mon-Fri 10AM-2PM"
    createdAt: { type: Date, default: Date.now },
    
    role: {
        type: String,
        enum: ['Patient', 'Doctor'],
        default: 'Doctor',
      },
    // Appointments received from users
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ],

    // Additional minor details
    awards: [{ type: String }],
    memberships: [{ type: String }],
    languagesSpoken: [{ type: String }]
});

module.exports = mongoose.model('Doctor', doctorSchema);
