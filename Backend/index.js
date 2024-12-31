const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Patient = require('./Patient')
const multer = require('multer')

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/AI_Hospital', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('MongoDB connected')
    } catch (err) {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    }
}

module.exports = connectDB

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/upload', multer().single('file'), async(req,res) => {
    const { id }= req.body

    if (!id || !req.file) {
        return res.status(400).send('Missing id or file.');
    }
    
    try {
        const patient = await Patient.findOne({id})
        if (!patient) {
            return res.status(404).send('Patient not found.');
        }
        patient.file = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
        await patient.save()

        res.status(200).send('File uploaded successfully')
    } catch (error) {
        console.error('Error uploading file:', error)
        res.status(500).send('Error uploading file.')
    }
})

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try{
        const newPatient = await Patient.findOne({ email })
        if(!newPatient){
            res.status(201).send({message: 'Invalid email'})
        } else if(newPatient.password === password){
            res.status(200).send({message: 'User Logged in Successfully'})
        } else {
            res.status(202).send({message: 'Invalid password'})
            return;
        }
    } catch (err) {
        if(err.code === 11000){
            res.status(400).send({message: 'Email already registered'});
        } else {
            console.error(err);
            res.status(500).send({ message: "Internal server error"})
        }
    }
})

app.post('/api/signup', async (req, res) => {
    const { email, password } = req.body;

    try{
        const newPatient = new Patient({email, password});
        await newPatient.save();
        res.status(200).send({ message: 'Patient registered successfully'})
    } catch (err) {
        if(err.code === 11000){
            res.status(400).send({message: 'Email already registered'});
        } else {
            console.error(error);
            res.status(500).send({ message: "Internal server error"})
        }
    }
})

app.listen(5000, () => {
    console.log('Server running on port 5000')
})