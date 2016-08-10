/**
 * Created by yzg on 2016/7/24.
 */





var index              = require("../controllers/admin/index");
var home               = require("../controllers/admin/home");
var category           = require("../controllers/admin/category");
var login              = require("../controllers/admin/login");
var acticle            = require("../controllers/admin/article")





module.exports = function (app) {

    app.get("/", index.index);
    app.get("/logout", index.indexlogout)
    app.get("/home", home.home);
    app.get("/category", category.categorylist );
    app.get("/addcategory", category.addcategorypage );
    app.post("/addcategory", category.addcategory );
    app.get("/article", acticle.artoclelist);




    app.get("/login", login.login );
    app.post("/login", login.postlongin );

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






