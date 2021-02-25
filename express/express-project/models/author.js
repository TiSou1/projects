const mongoose = require('mongoose');
const moment = require('moment')
const Schema = mongoose.Schema;
//定义模式
const AuthorSchema =new Schema ({
    first_name:{type:String,required:true,max:100},
    family_name:{type:String,required:true,max:100},
    date_of_birth:{type:Date},
    date_of_death:{type:Date}
})

//虚拟属性name 表示作者全名
AuthorSchema
    .virtual('name')
    .get(function(){
        return this.family_name+','+this.first_name;
    });

//虚拟属性lifespan:作者寿命
AuthorSchema
    .virtual('lifespan')
    .get(function(){
        if(this.date_of_birth&&this.date_of_death)
            return (this.date_of_death.getYear()-this.date_of_birth.getYear()).toString();
        else 
            return '';
    });

//希你是公益性url  作者URL
AuthorSchema
    .virtual('url')
    .get(function(){
        return '/catalog/author/' + this._id;
    });

AuthorSchema
    .virtual('birth')
    .get(function(){
        return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD'):'';
    })

AuthorSchema
    .virtual('death')
    .get(function(){
        return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD'):'';
    })

//导出Author模型

module.exports = mongoose.model('Author',AuthorSchema);
