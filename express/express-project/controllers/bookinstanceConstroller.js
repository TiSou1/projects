const BookInstance = require('../models/bookinstance');
const {body,validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
const Book = require('../models/book');
const async = require('async');

// 显示完整的图书状态列表
exports.bookinstance_list = (req, res) => { 
    BookInstance.find()
        .populate('book')
        .exec((err,list_bookinstance)=>{
            if(err)
                return next(err);
            res.render('bookinstance_list',{title:'BookInstance List',bookinstance_list:list_bookinstance});

        })
};

// 为每位图书状态显示详细信息的页面
exports.bookinstance_detail = (req, res) => { 
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec((err,bookinstance)=>{
            if(err)
                return next(err);
            if(bookinstance==null){
                let err = new Error('Book copy bot found');
                err.status = 404;
                return next(err);
            }
            res.render('bookinstance_detail',{ title: 'Book:', bookinstance:  bookinstance});
        })
};

// 由 GET 显示创建图书状态的表单
exports.bookinstance_create_get = (req, res) => {
    
    Book.find({},'title')
    .exec(function (err, books) {
      if (err) { return next(err); }
      // Successful, so render.
      //res.send('sdsd');
      res.render('bookinstance_form', {title: 'Create BookInstance', book_list:books});
    });
 };

// 由 POST 处理图书状态创建操作
exports.bookinstance_create_post = [
     // Validate fields.
     body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
     body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
     body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),
     
     // Sanitize fields.
     sanitizeBody('book').trim().escape(),
     sanitizeBody('imprint').trim().escape(),
     sanitizeBody('status').trim().escape(),
     sanitizeBody('due_back').toDate(),
     
     // Process request after validation and sanitization.
     (req, res, next) => {
 
         // Extract the validation errors from a request.
         const errors = validationResult(req);
 
         // Create a BookInstance object with escaped and trimmed data.
         var bookinstance = new BookInstance(
           { book: req.body.book,
             imprint: req.body.imprint,
             status: req.body.status,
             due_back: req.body.due_back
            });
 
         if (!errors.isEmpty()) {
             // There are errors. Render form again with sanitized values and error messages.
             Book.find({},'title')
                 .exec(function (err, books) {
                     if (err) { return next(err); }
                     // Successful, so render.
                     res.render('bookinstance_form', { title: 'Create BookInstance', book_list : books, selected_book : bookinstance.book._id , errors: errors.array(), bookinstance:bookinstance });
             });
             return;
         }
         else {
             // Data from form is valid.
             bookinstance.save(function (err) {
                 if (err) { return next(err); }
                    // Successful - redirect to new record.
                    res.redirect(bookinstance.url);
                 });
         }
     }
];

// 由 GET 显示删除图书状态的表单
exports.bookinstance_delete_get = (req, res) => { 
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec((err,result)=>{
            if(err)
                return next(err);
           // res.send(result);
           res.render('bookinstance_delete',{title:'Delete Booninstance',bookinstance:result})
        })
};

// 由 POST 处理图书状态删除操作
exports.bookinstance_delete_post = (req, res) => { 
    BookInstance.findByIdAndDelete(req.body.bookinstanceid,(err,result)=>{
        if(err)
            return next(err);
        res.redirect('/catalog/bookinstances');
    })
 };

// 由 GET 显示更新图书状态的表单
exports.bookinstance_update_get = (req, res) => { 
    //res.send('12312');
    async.parallel({
        books:callback=>{    
            Book.find({},'title')
             .exec(callback)
        },

        bookinstance:callback=>{
            BookInstance.findById(req.params.id)
                .exec(callback)             
        },
    },(err,results)=>{
        if(err)
                return next(err);
               //res.send(results.books);
           res.render('bookinstance_form',{title:'Update BookInstance', book_list:results.books,bookinstance:results.bookinstance});
    })

 };

// 由 POST 处理图书状态更新操作
exports.bookinstance_update_post = [
     // Validate fields.
     body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
     body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
     body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),
     
     // Sanitize fields.
     sanitizeBody('book').trim().escape(),
     sanitizeBody('imprint').trim().escape(),
     sanitizeBody('status').trim().escape(),
     sanitizeBody('due_back').toDate(),
     
     // Process request after validation and sanitization.
     (req, res, next) => {
 
         // Extract the validation errors from a request.
         const errors = validationResult(req);
 
         // Create a BookInstance object with escaped and trimmed data.
         var bookinstance = new BookInstance(
           { book: req.body.book,
             imprint: req.body.imprint,
             status: req.body.status,
             due_back: req.body.due_back,
             _id:req.params.id
            });
 
         if (!errors.isEmpty()) {
             // There are errors. Render form again with sanitized values and error messages.
             Book.find({},'title')
                 .exec(function (err, books) {
                     if (err) { return next(err); }
                     // Successful, so render.
                     res.render('bookinstance_form', { title: 'Create BookInstance', book_list : books, errors: errors.array()});
             });
             return;
         }
         else {
             // Data from form is valid.
             BookInstance.findByIdAndUpdate(req.params.id,bookinstance,function (err) {
                 if (err) { return next(err); }
                    // Successful - redirect to new record.
                    res.redirect(bookinstance.url);
                 });
         }
     }
];