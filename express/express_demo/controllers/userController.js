const User = require('../models/user');


exports.index = async(req,res)=>{
    res.render('index',{title:'express'});
}