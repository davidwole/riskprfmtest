// Packages used
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

// Database Connection & App Initialization
const app = express();
const port = process.env.PORT || 3000;
const db = process.env.DB;

mongoose.connect(db).then(() => {
    console.log(`Connected to DB`);
    app.listen(port, () => {
        console.log(`App is listening on Port: ${port}`);
    });
}).catch((error) => {
    console.log(error.message)
});

// Data Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));

