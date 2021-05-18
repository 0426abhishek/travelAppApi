var db = require('../Db/dbConnection');
var PaymentRecievedTask = {
    getPaymentRecievedList: function (id, callback) {
        return db.query("select * from orderitem where TravelId = ? and OrderStatus = 3  and OrderDate >= curdate() order by orderItemId desc", [id, id], callback);
    },
    getAccountInfo: function (id, callback) {
        return db.query("select accountId from customer where customerId = ?", [id], callback);
    },
    updateAccInfo: function (id,callback){
        return db.query("update orderitem set isVerified = 'Y' where orderItemId = ?",[id],callback);
    }
}
module.exports = PaymentRecievedTask;