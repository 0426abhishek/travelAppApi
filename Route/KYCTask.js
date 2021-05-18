var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = require('../ImageUploader/ImageUploder');
var upload = multer({ storage: storage });
var KYCTask = require('../Controller/KYCTask');
var stripe = require("stripe")("sk_test_EzRaIDcwg7Hl46YzGA5KrHdj");
var fs = require('fs');
router.post('/insertKYC', upload.single('selectedFile'), function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(request.body);
    var externalAccount;
    var externalacc;
    if (request.body.currency === 'gbp') {
        externalacc = {
            object: "bank_account",
            country: request.body.country,
            currency: request.body.currency,
            routing_number: request.body.sortcode,
            account_number: request.body.accountnumber,
        }
    }
    else if (request.body.currency === 'usd') {
        externalacc = {
            object: "bank_account",
            country: request.body.country,
            currency: request.body.currency,
            routing_number: request.body.routing,
            account_number: request.body.accountnumber,
        }
    }
    else {
        externalacc = {
            object: "bank_account",
            country: request.body.country,
            currency: request.body.currency,
            account_number: request.body.iban,
        }

    }
    stripe.accounts.create({
        country: request.body.country,
        type: "custom",
        legal_entity: {
            dob: {
                day: request.body.day,
                month: request.body.month,
                year: request.body.year
            },
            first_name: request.body.firstName,
            last_name: request.body.lastName,
            type: "individual"
        },
        external_account: externalacc,
        tos_acceptance: {
            date: Math.floor(Date.now() / 1000),
            ip: request.connection.remoteAddress // Assumes you're not using a proxy
        },
    }).then(function (acct) {
        externalAccount = acct.id;
        stripe.fileUploads.create({
            purpose: 'identity_document',
            file: {
                data: fs.readFileSync("/var/www/packntag/server/PackNTagImages/" + request.body.ImageName),
                name: request.body.ImageName,
                type: 'application/octet-stream'
            }
        }, function (err, fileUpload) {
            if (err) {
                return response.jsonp({
                    status: 300,
                    response: err
                });
            }
            else {
                stripe.accounts.update(externalAccount, {
                    legal_entity: {
                        verification: {
                            document: fileUpload.id
                        }
                    }
                }).then(function (res, err) {
                    if (err) {
                        return response.jsonp({
                            status: 300,
                            response: err
                        });
                    }
                    else {
                        KYCTask.updateCustomerAcc(externalAccount, request.body.customerId, function (error, result) {
                            if (err) {
                                return response.jsonp({
                                    status: 300,
                                    response: err
                                });
                            }
                            else {
                                return response.jsonp({
                                    status: 200,
                                    response: res
                                });
                            }
                        });
                    }
                });
            }
        });
    }).catch(err => {
        return response.jsonp({
            status: 300,
            response: err
        });
    });
});
module.exports = router;