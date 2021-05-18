var express = require('express');
var router = express.Router();
var ChatTask = require('../Controller/ChatTask');
router.get('/chatCount/:id', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    ChatTask.chatCountStatus(request.params.id, function (error, result) {
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

router.get('/chatList/:id', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    ChatTask.chatList(request.params.id, function (error, result) {
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




module.exports = router;