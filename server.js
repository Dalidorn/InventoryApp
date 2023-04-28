// Dependancies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// Load .env File
dotenv.config();

// Declare Express Server
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connect to Mongoose to Mongo
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});