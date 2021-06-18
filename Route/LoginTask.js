var express = require('express');
var router = express.Router();
var atob = require('atob');
var LoginTask = require('../Controller/LoginTask');

router.get('/signInController/:id', function (request, response, next) {
    console.log('Access');
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    LoginTask.getSignInValidation(atob(request.params.id), atob(request.query.sendName), function (error, result) {
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

router.get('/emailValidation/:id', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('Email Validation call')
    LoginTask.getValidateEmaild(request.params.id, function (error, result) {
        if (error) {
            // response.send(error);
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

router.get('/updatePassword/:id', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    LoginTask.updatePassword(request.params.id,request.query.sendName, function (error, result) {
        if (error) {
            // response.send(error);
            return response.jsonp({
                status: "error",
                response: error
            });
        }
        else {
            //console.log(result);
            return response.jsonp({
                status: 200,
                response: result
            });
        }
    });
});

module.exports = router;