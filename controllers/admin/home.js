/**
 * Created by Administrator on 2016/7/28.
 */
exports.home = function (req, res, next) {
    res.render('admin/home', {
        title: '主页'
    });

}
