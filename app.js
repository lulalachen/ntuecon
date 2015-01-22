var express = require('express');
var session = require('express-session')
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


//require('./routes/search')(app)
app.get('/', routes.index);
app.get('/admin',search.admin)
app.post('/qa',search.qa)
app.post('/back',search.search)
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
app.get('/read/:id',search.readPost);

app.post('/createQA',search.createQA)
app.get('/editQA/:id',search.editQA)
app.get('/deleteQA/:id',search.deleteQA)
app.post('/updateQA/:id',search.updateQA)
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//app.listen(process.env.PORT || 5000,function(){
app.listen(process.env.PORT || 3000,function(){
    console.log("Server start")
})

/// error handlers
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
