"use strict";

const Joi = require('joi');

// Validate add new data body
const validateAddData = Joi.object().keys({
    name: Joi.string().min(3).max(50).trim().required(),
    email: Joi.string().min(3).max(200).trim().required()
})

// Validate get query params
const validateListData = Joi.object().keys({
    pageNo: Joi.number().optional(),
    size: Joi.number().optional(),
});

// Validate Update email
const validateUpdateEmail = Joi.object().keys({
    email: Joi.string().min(3).max(200).trim().required()
})

module.exports = {
    validateListData,
    validateAddData,
    validateUpdateEmail
}