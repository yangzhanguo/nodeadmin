/**
 * Created by Administrator on 2016/7/28.
 */
exports.index = function (req, res) {
    res.render('admin/index', {
        title: '首页',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
}

exports.indexlogout = function (req, res) {
    req.session.user = null;
    req.flash('success', '登出成功');
    res.redirect('/login'); //登出成功后跳转登录页
}



