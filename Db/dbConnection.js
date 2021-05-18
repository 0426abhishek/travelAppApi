var mysql = require ("mysql");
// Production connection
var connection = mysql.createPool({
    host: "localhost",
    user: "packntag",
    password: "password",
    database: "packntag_com"
});

//development connection
// var connection = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "packntag_com"
// });
module.exports = connection;