const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    age: { type: Number },
    gender: { type: String },
    createdAt: { type: Date, default: Date.now },
   
    role: {
        type: String,
        enum: ['Patient', 'Doctor'],
        default: 'Patient',
      },
    // Appointments sent to doctors
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
