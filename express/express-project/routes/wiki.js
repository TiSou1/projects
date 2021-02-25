//wiki-路由模块

const express = require('express');
const router = express.Router();

//主页路由
router.get('/',(req,res)=>{
    res.send('wiki主页');
});

//关于页面路由
router.get('/about',(req,res)=>{
    res.send('关于wiki');
});

module.exports = router;