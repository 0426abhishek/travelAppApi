var db=require('../Db/dbConnection'); //reference of dbconnection.js
var RegistrationTask={
insertTask:function(Task,callback){
    return db.query("Insert into customer (Name,Email,Mobile,Password,CustImageName) values (?,?,?,?,?)",[Task.Name,Task.Email,Task.Mobile,Task.Password,Task.ImageName],callback);
},
getProfileTask:function(Task,callback){
    return db.query("select name, CustImageName as imagename,mobile from customer where customerId=?",[Task],callback);
},
updateProfileTask:function(Task,callback){
    return db.query("update customer set Name=?,Mobile=?,CustImageName=? where customerId=?",[Task.Name,Task.Mobile,Task.ImageName,Task.customerId],callback);  
}
}
 module.exports=RegistrationTask;