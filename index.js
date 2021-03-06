"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const message = require('./constants/message');

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowHeaders: [
        'Origin',
        "Accept",
        "Accept-version",
        "Content-Length",
        "Content-MD5",
        "Content-Type",
        "Authorization",
        "upload-length",
        "upload-metadata",
    ]
};

// Middleware configurations
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

// Routing Cofigurations
app.use('/', routes.pagination);

// Middleware to return a error message of JOI validation
app.use((err, req, res, next) => {
    if(err && err.error && err.error.isJoi) {
        res.status(400).json({
            type: err.type,
            message: err.error.toString()
        })
    }else {
        next(err);
    }
});

// Mongo DB connection

const port = process.env.PORT || 5000;

let dbOptions = {
    dbName: "pagination",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
};

mongoose.connect(process.env.DB_URI, dbOptions, (err) => {
    if(err) {
        console.log(message.dbConnectionError);
        console.log(err);
    } else {
        console.log(message.dbConnectionSuccess)
    }
});

app.listen(port, () => console.log(message.appListening, port))