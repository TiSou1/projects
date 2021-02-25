var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //重定向
  res.redirect('/catalog');
  //使用模板文件
  // console.log(req.query);
  // console.log(req.params);
  // res.send(req.query)
   //res.render('index', { title: 'Express' });
});

module.exports = router;
