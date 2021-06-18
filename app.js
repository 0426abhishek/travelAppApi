var express = require("express");
var cors = require('cors');
var app = express();
var dotenv = require('dotenv').config();
app.use(cors());
var bodyParser = require('body-parser');
var LoginTask = require('./Route/LoginTask');
var RegistrationTask = require('./Route/RegistrationTask');
var FeedTask = require('./Route/FeedTask');
var OrderTask = require('./Route/OrderTask');
var LocationTask = require('./Route/LocationTask');
var ChatTask = require('./Route/ChatTask');
var KYCTask = require('./Route/KYCTask');
var NotifyTask = require('./Route/NotifyTask');
var PaymentRecievedTask = require('./Route/PaymentRecievedTask')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/Tasks',LoginTask);
app.use('/Registration',RegistrationTask);
app.use("/FeedTask", FeedTask);
app.use("/OrderTask",OrderTask);
app.use("/LocationTask",LocationTask);
app.use('/ChatTask',ChatTask);
app.use('/KYCTask',KYCTask);
app.use('/NotifyTask',NotifyTask);
app.use('/PaymentRecievedTask',PaymentRecievedTask);
app.use('/PackNTagImages', express.static('../PackNTagImages'));
app.listen(process.env.PORT || 5000, function () {
    console.log('Express server is listening on port ' + process.env.PORT );
});