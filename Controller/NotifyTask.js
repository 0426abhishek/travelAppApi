var db = require('../Db/dbConnection');
var NotifyTask = {
    getNotifyList: function (id, callback) {
        return db.query('SELECT OTP, OrderFrom , OrderTo , OrderAmount FROM packntag_com.orderitem where RequestCustomerId = ? and OrderStatus = 3 and OrderDate >= curdate() order by orderItemId desc', [id], callback);
    },
}
module.exports = NotifyTask;
