var express = require('express');
var router = express.Router();
var LocationTask = require('../Controller/LocationTask');

router.get('/getCities/:id', function (request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    LocationTask.getAllCitiesList(request.params.id,function(error,result){
        if(error) {
            return response.jsonp({
             status:"error",
             response: error
            });
         }
         else{
           //  response.send(result);
            return response.jsonp({
             status:200,
             response: result
          });
         }
    });
});

module.exports=router;