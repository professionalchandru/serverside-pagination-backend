"use strict";

const message = require('../constants/message');

module.exports = {
    send: function ({result, res}) {
        let statusCode = result.statusCode || 200;
        let data;

        if(result.status  == message.success) {
            data = {
                data: result
            }
        } else {
            data = {
                data: result
            }
        }
        return res.status(statusCode).send(data);
    }
}