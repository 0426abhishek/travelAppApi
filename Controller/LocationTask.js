var db = require('../Db/dbConnection');
var LocationTask = {
    getAllCitiesList: function (id, callback) {
        return db.query("select CONCAT(city_name,',',country_name) as citycountry from city where city_name like ? limit 10",[id+"%"],callback);
    }
};

module.exports = LocationTask;

