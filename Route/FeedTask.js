var express = require('express');
var router = express.Router();
var multer = require('multer');
var FeedTask=require('../Controller/FeedTask');
var storage = require('../ImageUploader/ImageUploder');
var upload = multer({ storage: storage });
router.post('/insertTravel', upload.single('selectedFile'), function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    FeedTask.insertTravelData(request.body,function(error,result){
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
router.get('/getAllFeedList/:id',function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    FeedTask.getAllFeedList(request.params.id,function(error,result){
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
router.get('/getTravelPlan/:id',function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    FeedTask.getAllTravelPlan(request.params.id,"",function(error,result){
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

router.get('/getSearchPlan/:id',function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    FeedTask.getSearchPlan(request.params.id,request.query.From,request.query.To,function(error,result){
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

router.get('/updateTravelRequest/:id',function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    FeedTask.updateTravelRequest(request.params.id,request.query.statusId,function(error,result){
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