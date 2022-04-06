"use strict";

const urlconstants = require('../constants/urlconstants');
const response = require('../utils/response');
const validator = require('express-joi-validation').createValidator({
    passError: true
})

const {
    validateListData,
    validateAddData,
    validateUpdateEmail
} = require ('../schema/pagination');
const pagination = require('../controller/pagination');

const router = require('express').Router();

// Add new data
router.post(
    urlconstants.addData,
    validator.body(validateAddData),
    async (req, res) => {
        try {
            const result = await pagination.addData({req});
            return response.send({
                result,
                res
            })
        } catch (err) {
            throw err;
        }
    }
)

// Get all table data
router.get(
    urlconstants.getAllTableData,
    validator.query(validateListData),
    async (req, res) => {
        try {
            const result = await pagination.getAllTableData({req});
            return response.send({
                result,
                res
            })
        } catch (err) {
            throw err;
        }
    }
)

// Update Email
router.patch(
    urlconstants.updateEmail,
    validator.body(validateUpdateEmail),
    async (req, res) => {
        try {
            const result = await pagination.editEmail({req});
            return response.send({
                result,
                res,
            });
        } catch (err) {
            throw err;
        }
    }
)

module.exports = router