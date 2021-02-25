const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title:{type:String,require:true},
    author:{type:Schema.Types.ObjectId,ref:'Author',require:true},
    summary:{type:String,required:true},
    isbn:{type:String,required:true},
    genre:[{type:Schema.Types.ObjectId,ref:'Genre'}]
});

//虚拟属性url
BookSchema
    .virtual('url')
    .get(function(){
        return '/catalog/book/'+this._id;
    });

//导出模块

module.exports = mongoose.model('Book',BookSchema);