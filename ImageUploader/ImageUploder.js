var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Production
     cb(null, "/var/www/packntag/server/PackNTagImages/");
      // Development 
     // cb(null, "../PackNTagImages");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

module.exports = storage;