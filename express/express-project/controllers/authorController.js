const Author = require('../models/author');
const async = require('async');
const Book = require('../models/book');
const moment = require('moment');
const {body,validationResult} = require('express-validator/check')
const {sanitizeBody} = require('express-validator/filter');
// 显示完整的作者列表
exports.author_list = (req, res) => { 
    Author.find()
        .sort([['family_name','ascending']])
        .exec((err,list_authors)=>{
            if(err)
                return next(err);
            //res.send(list_authors);        
            res.render('author_list',{title:'Author List',author_list:list_authors});
        })
  
 };

// 为每位作者显示详细信息的页面
exports.author_detail = (req, res) => {
    async.parallel({
        author:(callback)=>{
           // Author.find({"_id":req.params.id},callback)
           Author.findById(req.params.id)
           .exec(callback)
        },
        authors_books:callback=>{
            Book.find({'author':req.params.id},'title summary',callback);

        },
    },function(err,results){
        if(err)
            return next(err);
        if(results.author==null){
            let err = new Error('Author no found');
            err.status = 404;
            return next(err);
        }
        //successful
      // res.send(results.author);
       //console.log(results.author.lifespan);
        res.render('author_detail',{title:'Author Detaile',author: results.author,author_books:results.authors_books});
    });
 };

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res) => { 
    res.render('author_form',{title:'Create Author'});
};

// 由 POST 处理作者创建操作
exports.author_create_post = [
    body('first_name')
        .isLength({min:1})
        .trim() .withMessage('First name must be specified')     
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),

    body('family_name')
        .isLength({min:1})
        .trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),

    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),

    // Sanitize fields.
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),
   

     // Process request after validation and sanitization.
     (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Create an Author object with escaped and trimmed data.
            var author = new Author(
                {
                    first_name: req.body.first_name,
                    family_name: req.body.family_name,
                    date_of_birth: req.body.date_of_birth,
                    date_of_death: req.body.date_of_death
                });
            author.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(author.url);
            });
        }
    }
];

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res) => { 
   async.parallel({
       author: (callback)=>{
           Author.findById(req.params.id)
            .exec(callback);
       },

       author_books:callback=>{
           Book.find({'author':req.params.id},callback);
       }
   },function(err,results){
        if(err)
            return next(err);
        if(results==null){
            res.redirect('/catalog/authors');
        }
        //successful
       // res.send('sd');
        res.render('author_delete',{title:'Delete Author',author:results.author,author_books:results.author_books});
   });
 };

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res) => { 
    async.parallel({
        author: function(callback) {
          Author.findById(req.body.authorid).exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.body.authorid }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (results.authors_books.length > 0) {
            // Author has books. Render in same way as for GET route.
            res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
            return;
        }
        else {
            // Author has no books. Delete object and redirect to the list of authors.
            Author.findByIdAndRemove(req.body.authorid, function erdeleteAuthor(r) {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/catalog/authors')
            })
        }
    });
 };

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => {
    async.parallel({
        author:callback=>{
            Author.findById(req.params.id)
                .exec(callback);
        }
    },(err,results)=>{
        if(err)
            return next(err);
        res.render('author_form',{title:'Update Author',author:results.author});
        
    })
};

// 由 POST 处理作者更新操作
exports.author_update_post = [
    //验证
    body('first_name')
        .isLength({min:1})
        .trim().withMessage('Firs name must be specified')
        .isAlphanumeric().withMessage('first name has non-alphanumeric characters.'),

    body('family_name')
        .isLength({min:1})
        .trim().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),

    body('date_of_birth','Invalid date of birth')
        .optional({checkFalsy:true})
        .isISO8601(),

        body('date_of_death','Invalid date of death')
        .optional({checkFalsy:true})
        .isISO8601(),

    //清理器
    sanitizeBody('first_name').trim().escape(),
    sanitizeBody('family_name').trim().escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),


    //验证和消毒后处理请求。
    (req,res,next)=>{
        //从请求中提取验证错误。
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            //有错误
            res.render('author_form',{title:'Update Author',author:req.body,errors:errors.array()});
            return;
        }
        else{
           // 数据有效

            const author = new Author({
                _id:req.params.id,//This is required, or a new ID will be assigned!
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });
            //res.send(author);
            //console.log(author)
            Author.findByIdAndUpdate(req.params.id,author,(err,this_author)=>{
                if(err)
                    return next(err);
                res.redirect(this_author.url);
            })        
        }
    }
    
];