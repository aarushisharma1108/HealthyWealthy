const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected', 'Completed'],
        default: 'Pending'
    },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String }, // Optional: exact time if needed

    // Tracking times
    requestedAt: { type: Date, default: Date.now },
    acceptedAt: { type: Date },
    rejectedAt: { type: Date },
    completedAt: { type: Date },

    // Extra notes
    reason: { type: String }, // why user is booking
    doctorNotes: { type: String }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
