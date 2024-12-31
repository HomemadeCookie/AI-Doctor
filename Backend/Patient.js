const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    condition: {
        complaint: String,
        attachments: {
            data: Buffer,
            contentType: String
        } // have to change for actual files
    },
    currentChats: [{
        AI_chat: String,
        user_chat: String
    }],
    history: [{
        summary: String,
        date: Date
    }]
})

module.exports = mongoose.model("Patients", patientSchema)
