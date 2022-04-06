"use strict";

const message = require("../constants/message");

const paginationModel = require('../model/pagination');

class Pagination {

    // Insert New Data
    async addData ({req}) {
        try{

            //To check existing customer
            const email = await paginationModel.findOne({
                email: req.body.email,
            });

            if(email) {
                let response = {
                    status: message.failure,
                    statusCode: 409,
                    message: message.alreadyExist,
                    };
                return response;
            }

            const data = {
                name: req.body.name,
                email: req.body.email,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const dataObj = new paginationModel(data);

            const newData = await dataObj.save();

            let response = {
                status: message.success,
                statusCode: 200,
                message: newData._id,
            };

            return response

        } catch(err) {
            throw err;
        }
    }

    // Get All data 
    async getAllTableData ({req}) {
        try {
            let pageNo = parseInt(req.query.pageNo)
            let size = parseInt(req.query.size) || 5;

            if(pageNo < 0 || pageNo === 0){
                let response = {
                    status: message.failure,
                    statusCode: 400,
                    message: message.invalidPageNumber
                }
                return response;
            }

            let skip = size * (pageNo - 1);
            let limit = size;

            let dataObj = {};

            let totalCount = await paginationModel.find({}).count()

            let getData = await paginationModel.find({}).sort({createdAt:-1}).skip(skip).limit(limit)
            dataObj.currentPage = pageNo ? pageNo : 1;
            dataObj.totalRecords = totalCount;
            dataObj.totalPages = Math.ceil(totalCount / (size ? size : 5));
            dataObj.data = getData

            if(!getData){
                let response = {
                    status: message.failure,
                    statusCode: 404,
                    message: message.noDataFound
                }
                return response;
            }

            let response = {
                status: message.success,
                statusCode: 200,
                message: dataObj
            }
            return response;
        } catch( err ){
            throw err
        }
    }

    // Edit email
    async editEmail ({req}) {
        try{
            let validateEmail = await paginationModel.findOne({email: req.params.email});

            if(!validateEmail) {
                let response = {
                    status: message.failure,
                    statusCode: 404,
                    message: message.invalidEmail,
                };
                return response;
            }

            const updateEmail = {
                email: req.body.email,
                updatedAt: new Date()
            }

            await paginationModel.updateOne({email: req.params.email}, {$set: updateEmail});

            let response = {
                status: message.success,
                statusCode: 200,
                message: message.updateSucces,
            };
            return response;
        } catch (err) {
            throw err;
          }
    }
}

module.exports =  new Pagination();