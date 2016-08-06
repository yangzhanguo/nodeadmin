/**
 * Created by Administrator on 2016/8/2.
 */
exports.category = function (req, res, next) {
    res.render('admin/category', {
        title: '分类列表'
    });

    res.post()
};


exports.addcategory = function (req, res, next) {
    res.render('admin/addcategory', {
        title: '增加分类'
    });
};