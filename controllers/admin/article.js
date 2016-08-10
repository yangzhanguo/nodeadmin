/**
 * Created by Administrator on 2016/8/10.
 */

exports.artoclelist = function (req, res) {
    res.render('admin/article', {
        title: '文章列表',
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    })
}
