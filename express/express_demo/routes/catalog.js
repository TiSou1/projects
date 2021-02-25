const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//进行路由分发

//请求主页
router.get('/',userController.index);
//请求

module.exports = router;