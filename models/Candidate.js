const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    experience: [
        {
            title: {type: String, required: true},
            company: {type: String, required: true},
            jobType: {type: String, required: true},
            location: {type: String},
            from: {type: Date, required: true},
            to: {type: Date},
            current: {type: Boolean, default: false},
            description: {type: String}
            // media (can upload image or add link to his work)
        }
    ],
    education: [
        {
            school: {type: String, required: true},
            degree: {type: String, required: true},
            fieldOfStudy: {type: String, required: true},
            from: {type: Date, required: true},
            to: {type: Date},
            current: {type: Boolean, default: false},
            description: {type: String}
        }
    ],
    certificates: [
        {
            name: {type: String, required: true},
            certificateId: {type: String, required: true},
            fileName: {type: String, required: true},
            awardedBy: {type: String, required: true},
            dateAwarded: {type: Date, required: true}
        }
    ],
});

module.exports = Student = mongoose.model('candidate', CandidateSchema);