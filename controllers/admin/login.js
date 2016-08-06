/**
 * Created by Administrator on 2016/8/5.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');    //引用mongoose模块
var db = mongoose.createConnection('localhost','newbloguser'); //创建一个数据库连接
var crypto = require('crypto');



db.on('error',console.error.bind(console,'连接错误:'));
var UserSchema = new mongoose.Schema({
    username:String,
    userpw:String
});
var UserModel = db.model('newbloguser',UserSchema);


exports.login = function (req, res) {
    res.render('admin/login', {
        title: '注册',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });



}


exports.postlongin = function (req, res) {

    UserModel.findOne({ username: req.body.username }, function (err, user) {
        if(err)
        {
            req.flash('error', '错误');
            return res.redirect('admin/login');
        }
        if(user!=null){
            var md5 = crypto.createHash('md5'),
                userpw = md5.update(req.body.userpw).digest('hex');
            if(userpw!=user.userpw){
                req.flash('error', '密码错误');
                return res.redirect('admin/login');
            }
            else{
                req.session.user = user; //用户信息存入session
                req.flash('success', '登录成功');
                return res.redirect('/');
            }
        }
        else{
            req.flash('error', '用户不存在');
            return res.redirect('admin/login');
        }
    });

}
