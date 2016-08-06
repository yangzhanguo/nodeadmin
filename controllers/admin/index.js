/**
 * Created by Administrator on 2016/7/28.
 */
exports.index = function (req, res) {
        res.render('admin/index', {
            title: '首页',
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
}



