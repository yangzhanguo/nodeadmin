/**
 * Created by yzg on 2016/7/24.
 */





var index              = require("../controllers/index");
var home               = require("../controllers/home");





module.exports = function (app) {

    app.get("/", index.index);
    app.get("/home", home.home);


    /*
    app.get('/', function (req, res, next) {
        res.render('index', {
            title: '首页'
        });
    });

    app.get('/home', function (req, res, next) {
        res.render('home', {
            title: '主页'
        });
    });

    app.get('/category', function (req, res, next) {
        res.render('category', {
            title: '分类列表'
        });
    });

    app.get('/addcategory', function (req, res, next) {
        res.render('addcategory', {
            title: '增加分类'
        });
    })

*/
}






