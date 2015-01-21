var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var db = require('./config/db');

var routes = require('./routes/index');
var search = require('./routes/search');
//var data = require('./routes/data');  //testing only
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')))

app.get('/', routes.index);
app.get('/search', routes.reload);
app.post('/search',search.search);
app.get('/comment',routes.comment);
app.get('/comment/posts', routes.getPosts);
app.post('/comment/posts', routes.postPosts);
app.get('/comment/posts/:id', routes.getPostsId);
app.put('/comment/posts/:id/upvotes', routes.putPostsUpvotes);
app.post('/comment/posts/:id/comments/', routes.postComments);
app.put('/comment/posts/:id/comment/:id/upvotes', routes.putCommentsUpvotes);

app.post('/suggest',search.suggestPost);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(process.env.PORT || 80,function(err){
    if(err) throw err
    console.log("Server start")
})

var http = require('http'),
    httpProxy = require('http-proxy');

//httpProxy.createServer(3000,'localhost').listen(80,'54.65.240.93');

//
// Create a proxy server with custom application logic
//

var proxy = httpProxy.createProxyServer({});
/*
httpProxy.createServer(  
  require('proxy-by-url')({
//  '/': { port: 3000, host: 'ec2-54-65-240-93.ap-northeast-1.compute.amazonaws.com' }
 //'': { port :3000, host:'localhost'}
  '/localstuff': { port: 3000, host: 'localhost' } 
  })
).listen(80);
*/

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
/*
/// Reverse Proxy///
var node_reverse_proxy = require('node-reverse-proxy');

var ip = '54.65.240.93';
var reverse_proxy = new node_reverse_proxy({
    //'184.168.221.56' : ip + ':3000'
    //'my.second_host.com' : ip + ':8081',
    //'my.second_host.com/page/' : ip + ':8080',
    //'' : ip + ':3000' // catch all other routes
    'http://ntuecon.info' : ip + ':3000'
});

reverse_proxy.start(80);
*/

//error handlers
var myErrorHandler = function(err, req, res, next){
    console.log('j')
    if(err){
        res.render('error',{
            message : err.message,
            err : err
        })
    }
    next();
};


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
