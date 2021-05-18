var express = require('express');
var router = express.Router();
var multer = require('multer');
var RegistrationTask=require('../Controller/Registrationtask');
var storage = require('../ImageUploader/ImageUploder');
var upload = multer({ storage: storage });
router.post('/getRegistration', upload.single('selectedFile') , function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    RegistrationTask.insertTask(request.body,function(error,result){
        if(error) {
           // response.send(error);
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
router.get('/getProfileInfo/:id',function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    RegistrationTask.getProfileTask(request.params.id,function(error,result){
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

router.post('/updateProfile', upload.single('selectedFile') , function(request,response,next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    RegistrationTask.updateProfileTask(request.body,function(error,result){
        if(error) {
           // response.send(error);
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