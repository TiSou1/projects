const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
// 显示完整的类型列表
exports.genre_list = (req, res) => { 
    Genre.find()
        .sort([['name','ascending']])
        .exec((err,list_genres)=>{
            if(err)
                return next(err);
            res.render('genre_list',{title:'Genre List',genre_list:list_genres});
        })
 };

// 为每位类型显示详细信息的页面
exports.genre_detail = (req, res) => { 
    async.parallel({
        genre: function(callback){
            Genre.findById(req.params.id)
                .exec(callback);
        },

        genre_books:callback=>{
            Book.find({'genre':req.params.id},callback);
        },
        
    },(err,results)=>{
        if(err)
            return next(err);
        if(results.genre==null){
            let err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        //SUccessfukl
        res.render('Genre_detail',{title:'Genre Datail',genre:results.genre,genre_books:results.genre_books});
    } );
};

// 由 GET 显示创建类型的表单
exports.genre_create_get = (req, res) => { 
    res.render('genre_form',{title:'Create Genre'})
};

// 由 POST 处理类型创建操作
exports.genre_create_post = [
    //验证失败,显示第二个参数内容
    body('name','Genre name required')
        .isLength({min:2})
        .trim(),
    sanitizeBody('name')
        .trim()
        .escape(),
    (req,res,next)=>{
        const errors = validationResult(req);
        const genre = new Genre({
            name:req.body.name
        });

        if(!errors.isEmpty()){
            //有错误
            // // There are errors. Render the form again with sanitized values/error messages.
            res.render('genre_form',{title:'Create Genre',genre:genre,errors:errors.array()});
            return;
        }else{
                //Data from form is valid.有效的
                 // Check if Genre with same name already exists.
                Genre.findOne({'name':req.body.name})
                    .exec((err,found_genre)=>{
                        if(err)
                            return next(err);
                        if(found_genre){
                             // Genre exists, redirect to its detail page.
                            res.redirect(found_genre.url);
                        }else{
                            genre.save((err)=>{
                                if(err)
                                    return next(err);
                                     // Genre saved. Redirect to genre detail page.
                                res.redirect(genre.url);
                            })
                        }
                    })
        }
    }
];

// 由 GET 显示删除类型的表单
exports.genre_delete_get = (req, res) => { 
    Genre.findById(req.params.id)
        .exec((err,result)=>{
            if(err)
                return next(err);
               // res.send(result);
             res.render('genre_delete',{title:'Delete Genre', genre: result});
        });
    
 };

// 由 POST 处理类型删除操作
exports.genre_delete_post = (req, res) => { 
   // console.log('genre_delete_post....');
    Genre.findByIdAndDelete(req.body.genreid)
        .exec((err,result)=>{
            if(err)
                return next(err);
                //重定向到genres页面
                //res.send(result);
            res.redirect('/catalog/genres');
        })
 };

// 由 GET 显示更新类型的表单
exports.genre_update_get = (req, res) => { 
    async.parallel({
        genre:callback=>{
            Genre.findById(req.params.id,callback)
        }
    },(err,results)=>{
        if(err)
            return next(err);
        //res.send(results);
        res.render('genre_form',{title:'Update Genre',genre:results.genre});
    })
 };

// 由 POST 处理类型更新操作
exports.genre_update_post = [
    //验证器
    body('name')
        .isLength({min:1}).withMessage('name must be specified'),

    //清理器
    sanitizeBody('name').trim().escape(),

    //验证和消毒后处理请求。

    (req,res,next)=>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            //有问题
            res.render('genre_form',{title:'Update Genre',genre:req.body,errors:errors.array()});
            return;
        }else{
            //数据有效

            const genre = new Genre({
                _id:req.params.id,
                name:req.body.name
            });

            Genre.findByIdAndUpdate(req.params.id,genre,(err,thisgenre)=>{
                if(err)
                    return next(err);
                res.redirect(thisgenre.url);
            })
        }
    }
];