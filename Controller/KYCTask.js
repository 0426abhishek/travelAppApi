var db = require('../Db/dbConnection'); //reference of dbconnection.js
var KYCTask = {
    updateCustomerAcc: function (accId, id, callback) {
        return db.query("update customer set accountid = ? where customerId = ?", [accId, id], callback);
    },
};
module.exports = KYCTask;