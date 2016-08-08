/**
 * Created by Administrator on 2016/8/2.
 */


var mongoose = require('mongoose');    //引用mongoose模块
var db = mongoose.createConnection('localhost','newbloguser'); //创建一个数据库连接

db.on('error',console.error.bind(console,'连接错误:'));


var CategorySchema = new mongoose.Schema({
    name:String,
    alias:String,
    parent:String,
    describe:String
});
var CategoryModel = db.model('newblogcategory',CategorySchema);

exports.categorylist = function (req, res) {


   // var Category = mongoose.model('category', CategorySchema,'category');



    CategoryModel.execPageQuery(1,100,function(err,rel){
        if(err)
        {
            req.flash('error', '请求失败');
            return res.redirect('/category');
        }
        res.render('admin/category', {
            title: '分类列表',
            category:rel.rows,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        })
    });
};


exports.addcategorypage = function (req, res) {
    res.render('admin/addcategory', {
        title: '增加分类',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
};


exports.addcategory = function (req, res) {
    var CategoryEntity = new CategoryModel({name:req.body.name,alias:req.body.alias,parent:req.body.parent,describe:req.body.describe});
    CategoryEntity.save(function(err){
        if(err){
            req.flash('error', '添加类别失败');
            return res.redirect('/addcategory');
        }
        else
        {
            req.flash('success', '添加成功！');

            return res.redirect('/category');
        }


    });
}