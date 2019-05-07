// ライブラリ読み込み
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var oauth2 = require('./routes/oauth2');
var client = require('./routes/client');
var login = require('./routes/login');

//body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // port番号を指定

//ログインセッションの作成定義
app.use(session({
 secret: 'secret',
 resave: false,
 saveUninitialized: false,
 cookie:{
 httpOnly: true,
 secure: false,
 maxage: 1000 * 60 * 30
 }
}));

// GET http://localhost:3000/api/v1/
app.get('/api/v1/',function(req,res){
    res.json({
        message:"Hello,world"
    });
});

app.use('/api/oauth2', oauth2);
app.use('/api/client', client);
app.use('/api/login', login);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);
