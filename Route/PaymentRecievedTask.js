var express = require('express');
var router = express.Router();
var PaymentRecievedTask = require('../Controller/PaymentRecievedTask');
var stripe = require("stripe")("sk_test_EzRaIDcwg7Hl46YzGA5KrHdj");
router.get('/paymentRecievedList/:id', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    PaymentRecievedTask.getPaymentRecievedList(request.params.id, function (error, result) {
        if (error) {
            return response.jsonp({
                status: "error",
                response: error
            });
        }
        else {
            return response.jsonp({
                status: 200,
                response: result
            });
        }


    });
});

router.get('/paymentStatus/:id', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    PaymentRecievedTask.getAccountInfo(request.query.customerId, function (error, result) {
        let amountCurrency = request.query.amountCurrency.split(" ");
        if (error) {
            return response.jsonp({
                status: 300,
                response: error
            });
        }
        else {
            if (result[0].accountId === null || result[0].accountId === 'null') {
                return response.jsonp({
                    status: 400,
                    response: result
                });
            }
            else {
                stripe.transfers.create({
                    amount: amountCurrency[0] * 100,
                    currency: amountCurrency[1],
                    destination: result[0].accountId
                }, function (err, transfer) {
                    if (err) {
                        return response.jsonp({
                            status: 300,
                            response: err
                        });
                    }
                    else {
                        PaymentRecievedTask.updateAccInfo(request.params.id, function (err, result) {
                            if (err) {
                                return response.jsonp({
                                    status: 301,
                                    response: err
                                });
                            }
                            else {
                                return response.jsonp({
                                    status: 200,
                                    response: result
                                });
                            }
                        })
                    }
                });
            }
        }

    })
});

module.exports = router;