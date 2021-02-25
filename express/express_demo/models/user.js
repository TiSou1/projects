const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//定义模式
const userSchema = new Schema({
    name:{type:String,required:true,max:100},
})

module.exports = mongoose.model('User',userSchema);