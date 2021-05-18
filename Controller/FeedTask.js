var db = require('../Db/dbConnection'); //reference of dbconnection.js
var FeedTask = {
insertTravelData: function (Task, callback) {
  return db.query("Insert into travellingfeed (customerId,Content,FromTravel,ToTravel,TDateTime,ImageName,Amount,Status,FeedOrderStatus,Weight) values (?,?,?,?,?,?,?,?,?,?)",[Task.customerId,Task.Content,Task.From,Task.To,Task.TDateTime,Task.ImageName,Task.Amount,Task.Status,Task.FeedOrderStatus,Task.Weight],callback);
},
getAllFeedList: function(id,callback){
 //return db.query("select * From  travellingfeed as tf , customer as cs , travelstatus as ts  where (tf.customerId=cs.customerId and tf.customerId != ? and ts.statusId = tf.Status)",[id],callback);
 return db.query("select * , null as password From  travellingfeed as tf , customer as cs , travelstatus as ts  where (tf.customerId=cs.customerId and ts.statusId = tf.Status and tf.Status != 3) order by tf.id desc",callback);
},
getAllTravelPlan: function(id,TaskName,callback){
return db.query("select * from travellingfeed where customerId = ? and ImageName =?",[id,TaskName],callback);
},
getSearchPlan: function(id,from,to,callback){
return db.query("select * from travellingfeed as tf , customer as cs where tf.FromTravel = ? and tf.ToTravel = ? and tf.customerId != ? and tf.customerId = cs.customerId and tf.ImageName != ? and tf.Status != 3",[from,to,id,""],callback);
},
updateTravelRequest: function(id,statusId,callback){
return db.query("update travellingfeed set FeedOrderStatus=? where id=?",[statusId,id],callback )
}
};
module.exports = FeedTask;