// server.js
require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();

// Middleware to allow cross-origin requests and parse request bodies
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Replace this with your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a schema for form data
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

// Create a model from the schema
const FormData = mongoose.model('FormData', formSchema);

// Handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Create a new instance of the FormData model
    const newForm = new FormData({
        name,
        email,
        message,
    });

    // Save the data to the database
    newForm.save()
        .then(() => res.status(200).json({ message: 'Form data saved successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
