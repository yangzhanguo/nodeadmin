var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');




var routes = require('./routes/routes');
var flash = require('connect-flash');
var users = require('./routes/users');
var fs = require('fs');
var accessLog = fs.createWriteStream('access.log', {flags:'a'});
var errorLog = fs.createWriteStream('error.log', {flags: 'a'});


var app = express(); //生成一个express实例app

// view engine setup
app.set('views', path.join(__dirname, 'views')); //设置views文件夹为存放视图文件的目录，存放模板文件，__dirname全局变量，存放当前正在执行的脚本所在的目录
app.set('view engine', 'ejs'); //设置视图模板引擎为ejs
app.use(flash());

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //加载日志中间件
app.use(logger({stream: accessLog}));
app.use(bodyParser.json()); //加载解析json的中间件
app.use(bodyParser.urlencoded({
    extended: false
})); //加载解析urlencoded请求体的中间件
app.use(cookieParser()); //加载解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public'))); //设置public文件夹为存放静态文件的目录
app.use(function (err, req, res, next) {
    var meta = '[' + new Date() + ']' + req.url + '\n';
    errorLog.write(meta + err.stack + '\n');
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: settings.cookieSecret,
    key: settings.db, //cookie name
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }, //30天
    store: new MongoStore({
        db: settings.db,
        host: settings.host,
        port: settings.port
    })
}));

app.use(bodyParser({uploadDir:'./tmp/'}));
var ueditor = require('ueditor-nodejs');
app.use('/ueditor/ue', ueditor({//这里的/ueditor/ue是因为文件件重命名为了ueditor,如果没改名，那么应该是/ueditor版本号/ue
    configFile: '/ueditor/php/config.json',//如果下载的是jsp的，就填写/ueditor/jsp/config.json
    mode: 'local', //本地存储填写local
    // accessKey: 'Adxxxxxxx',//本地存储不填写，bcs填写
    // secrectKey: 'oiUqt1VpH3fdxxxx',//本地存储不填写，bcs填写
    staticPath: path.join(__dirname, 'public'), //一般固定的写法，静态资源的目录，如果是bcs，可以不填
    dynamicPath: '/blogpicture' //动态目录，以/开头，bcs填写buckect名字，开头没有/.路径可以根据req动态变化，可以是一个函数，function(req) { return '/xx'} req.query.action是请求的行为，uploadimage表示上传图片，具体查看config.json.
}));

var dynamicPath = function (req) {
    if (req.query.action == 'uploadimage') {//如果是上传图片
        if (req.session.isMe) {//如果是博主自己
            return '/uploadimage'
        } else {//其余的当作访客
            return '/visitorimage'
        }
    }
}



/*app.use('/', routes); //路由控制
 app.use('/users', users); */
routes(app);

// catch 404 and forward to error handler 捕捉404c错误并转发到错误处理器
app.use(function (req, res, next) {
    var err = new Error('页面走丢了');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler  开发环境下的错误处理器
// will print stacktrace  将错误信息渲染error模板并显示到浏览器里
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler   生产环境下的错误处理器，将错误信息渲染error模板并显示到浏览器中
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app; //导出app实例供其他模块调用
