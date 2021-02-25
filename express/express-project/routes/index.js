var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //  路由重定向
    res.redirect('/catalog');
});

module.exports = router;
