"use strict";

const mongoose = require('mongoose');

const paginationSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50,
        required: true
    },
    email: {
        type: String,
        min: 3,
        max: 200,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        required: true 
    },
    updatedAt: {
        type: Date,
        required: true 
    }
});

module.exports = mongoose.model('paginationData', paginationSchema)