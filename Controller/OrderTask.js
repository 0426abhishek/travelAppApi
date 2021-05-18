var db = require('../Db/dbConnection'); //reference of dbconnection.js
var OrderTask = {
  insertOrderItem: function (Task, callback) {
    return db.query("Insert into orderitem (OrderCustomerId, OrderRequestID, OrderUserImage, OrderDate, UserNamOrdere, OrderFrom, OrderTo, OrderContent, OrderAmount, OrderImage, OrderStatus, RequestCustomerId, UserName, OTP, TravelId) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [Task.OrderCustomerId, Task.OrderRequestID, Task.OrderUserImage, Task.OrderDate, Task.UserNamOrdere, Task.OrderFrom, Task.OrderTo, Task.OrderContent, Task.OrderAmount, Task.OrderImage, Task.OrderStatus, Task.RequestCustomerId, Task.UserName, Task.OTP, Task.TravelId], callback);
  },
  updateOrderStatus: function (id, OrderCustomerId, OrderRequestID, callback) {
    return db.query("Select count(*) as count from orderitem where OrderCustomerId=? and OrderRequestID=? and RequestCustomerId=?", [OrderCustomerId, OrderRequestID, id], callback);
  },
  updateOrderItem: function (id, OrderCustomerId, OrderRequestID, OrderStatus, callback) {
    return db.query("UPDATE orderitem SET OrderStatus= ? WHERE OrderCustomerId = ? and OrderRequestID = ? and RequestCustomerId = ?", [OrderStatus, OrderCustomerId, OrderRequestID, id], callback);
  },
  getAllOrderItem: function (id, callback) {
    return db.query("Select * from orderitem where RequestCustomerId=?", [id], callback);
  },
  getOrderCount: function (id, callback) {
    return db.query("Select count(*) as orderCount from orderitem where RequestCustomerId = ? and OrderStatus != 3", [id], callback);
  },
  setPaymentDetails: function (request, payment, callback) {
    //console.log(payment);
    db.query("Insert into paymentdetails (PaymentStatus_id, Payment_OrderId, Payment_Status, Amount, Description) values(?,?,?,?,?)", [request.params.id, request.query.OrderItemId, 'paid', payment.amount / 100 + payment.currency, payment.description], callback);
  },
  setOrderStatus: function (request, callback) {
    return db.query("UPDATE orderitem SET OrderStatus=3 WHERE orderItemId = ?", [request.query.OrderItemId], callback);
  },
  updateOrderFeedStatus: function (request, callback) {
    return db.query("update travellingfeed tf inner join orderitem oi on tf.id = oi.OrderRequestID set Status = '3' where oi.orderItemId = ?", [request.query.OrderItemId], callback);
  }
};
module.exports = OrderTask;