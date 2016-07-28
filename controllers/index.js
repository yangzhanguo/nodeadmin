/**
 * Created by Administrator on 2016/7/28.
 */
exports.index = function (req, res, next) {
        res.render('index', {
            title: '首页'
        });
}



