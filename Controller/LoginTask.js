var db=require('../Db/dbConnection'); //reference of dbconnection.js
var LoginTask={
 

getSignInValidation:function(email,password,callback){
   return db.query("select customerId, CustImageName, Name from customer where email=? and password=?",[email,password],callback);
},
getValidateEmaild:function(id,callback){
    return db.query("select count(*) as validEmail from customer where email=?",[id],callback);
},
updatePassword:function(id,password,callback){
    return db.query("update customer set password=? where customerId=?",[password,id],callback);
}
};
 module.exports=LoginTask;