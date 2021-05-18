var express = require('express');
var router = express.Router();
var OrderTask = require('../Controller/OrderTask');
var FeedTask = require('../Controller/FeedTask');
var stripe = require("stripe")("sk_test_EzRaIDcwg7Hl46YzGA5KrHdj");
router.post('/insertOrderItem', function (request, response, next) {
    OrderTask.insertOrderItem(request.body, function (error, result) {
        if (error) {
            return response.jsonp({
                status: "error",
                response: error
            });
        }
        else {
            //  response.send(result);
            return response.jsonp({
                status: 200,
                response: result
            });
        }
    });
});

router.get('/updateOrderStatus/:id', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    OrderTask.updateOrderStatus(request.params.id, request.query.OrderCustomerId, request.query.OrderRequestID, function (error, result) {
        if (result[0].count === 1) {
            OrderTask.updateOrderItem(request.params.id, request.query.OrderCustomerId, request.query.OrderRequestID, request.query.OrderStatus, function (error, result) {
                //console.log(result);
            });
            FeedTask.updateTravelRequest(request.query.OrderRequestID, request.query.OrderStatus, function (error, result) {
                //console.log(result);
            });
        }
        if (error) {
            return response.jsonp({
                status: "error",
                response: error
            });
        }
        else {
            //  response.send(result);
            return response.jsonp({
                status: 200,
                response: result
            });
        }
    });
});

router.get('/getAllOrderItem/:id', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    OrderTask.getAllOrderItem(request.params.id, function (error, result) {
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


router.post('/getPaymentSubmit', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(request.body);
    stripe.charges.create({
        amount: request.body.value,
        currency: request.body.currency,
        source: request.body.token, // obtained with Stripe.js
        description: request.body.description
    }, function (err, charge) {
        if (err) {
            return response.jsonp({
                status: 300,
                response: err
            });
        }
        else {
            return response.jsonp({
                status: 200,
                response: charge
            });
        }

    });
});

router.get('/getOrderCount/:id', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    OrderTask.getOrderCount(request.params.id, function (error, result) {
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

router.get('/getPaymentStatus/:id', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    stripe.balance.retrieveTransaction(
        request.params.id,
        function (err, balanceTransaction) {
            // asynchronously called
            if (err) {
                return response.jsonp({
                    status: "error",
                    response: error
                });
            }
            else {
                OrderTask.setOrderStatus(request, function (error, result) {
                    OrderTask.updateOrderFeedStatus(request, function (error, result) {
                    });
                });
                OrderTask.setPaymentDetails(request, balanceTransaction, function (error, result) {
                    return response.jsonp({
                        status: 200,
                        response: balanceTransaction.status
                    });
                });

            }
        });
});

module.exports = router;