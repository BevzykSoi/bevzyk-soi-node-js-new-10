const express = require('express');
require('dotenv').config();
const volleyball = require('volleyball');
const mongoose = require('mongoose');

const apiRouter = require('./routes/api');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected!"))
    .catch(error => {
        console.log(error);
        process.exit(1);
    })

app.use(volleyball);
app.use(express.json());

app.use('/api/v1', apiRouter);

app.use(errorHandler);

module.exports = app;
