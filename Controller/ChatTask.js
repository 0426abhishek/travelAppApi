var db = require('../Db/dbConnection'); //reference of dbconnection.js
var ChatTask = {
    chatCountStatus: function (id, callback) {
        return db.query("select count(*) as chatcount from orderitem where (OrderCustomerId = ? or RequestCustomerId = ?) and OrderStatus = '3' and OrderDate >= curdate()",[id, id], callback);
    },
    chatList : function(id, callback) {
       return db.query("select  oi.UserName , oi.UserNamOrdere , oi.RequestCustomerId , oi.OrderCustomerId from orderitem as oi   where (oi.OrderCustomerId = ? or oi.RequestCustomerId = ?)  and oi.OrderStatus = '3' and oi.OrderDate >= curdate() group by oi.RequestCustomerId",[id , id],callback);
    },

};
module.exports = ChatTask;