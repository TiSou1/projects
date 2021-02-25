const express = require('express');
const router = express.Router();


//导入控制器模块
const book_controller = require('../controllers/bookController');
const author_controller = require('../controllers/authorController');
const genre_controller = require('../controllers/genreController');
const book_instance_controller = require('../controllers/bookinstanceConstroller');


//藏书路由

//get过去藏书编目主页
router.get('/',book_controller.index);

//get请求添加藏书,必须位于显示藏书的路由之前
router.get('/book/create',book_controller.book_create_get);

//post请求添加新书
router.post('/book/create',book_controller.book_create_post);

//get请求删除藏书
router.get('/book/:id/delete',book_controller.book_delete_get);

//post请求删除藏书
router.post('/book/:id/delete',book_controller.book_delete_post);

//get请求更新藏书
router.get('/book/:id/update',book_controller.book_update_get);

//post请求更新参数
router.post('/book/:id/update',book_controller.book_update_post);

//get请求藏书
router.get('/book/:id',book_controller.book_detail);

//get请求完整藏书列表
router.get('/books',book_controller.book_list);

/// 藏书副本、藏书种类、作者的路由与藏书路由结构基本一致，只是无需获取主页 ///

//作者路由

//get添加作者
router.get('/author/create',author_controller.author_create_get);

//post添加作者
router.post('/author/create',author_controller.author_create_post);

//get更新作者
router.get('/author/:id/update',author_controller.author_update_get);

//post更新作者
router.post('/author/:id/update',author_controller.author_update_post);

//get删除作者
router.get('/author/:id/delete',author_controller.author_delete_get);

//post删除作者
router.post('/author/:id/delete',author_controller.author_delete_post);

//get 请求作者
router.get('/author/:id',author_controller.author_detail);

//get请作者列表
router.get('/authors',author_controller.author_list);


//----------类别路由

//get添加类别
router.get('/genre/create',genre_controller.genre_create_get);

//post添加类别
router.post('/genre/create',genre_controller.genre_create_post);

//get删除类别
router.get('/genre/:id/delete',genre_controller.genre_delete_get);

//post删除类别
router.post('/genre/:id/delete',genre_controller.genre_delete_post)

//get更新类别
router.get('/genre/:id/update',genre_controller.genre_update_get);

//post更新类别
router.post('/genre/:id/update',genre_controller.genre_update_post);

//get请求类别
router.get('/genre/:id',genre_controller.genre_detail);

//get请求类别列表
router.get('/genres',genre_controller.genre_list);



//--------藏书副本

router.get('/bookinstance/create',book_instance_controller.bookinstance_create_get);
router.post('/bookinstance/create',book_instance_controller.bookinstance_create_post);

router.get('/bookinstance/:id/update',book_instance_controller.bookinstance_update_get);
router.post('/bookinstance/:id/update',book_instance_controller.bookinstance_update_post);

router.get('/bookinstance/:id/delete',book_instance_controller.bookinstance_delete_get);
router.post('/bookinstance/:id/delete',book_instance_controller.bookinstance_delete_post);

router.get('/bookinstance/:id',book_instance_controller.bookinstance_detail);
router.get('/bookinstances',book_instance_controller.bookinstance_list);

module.exports = router;