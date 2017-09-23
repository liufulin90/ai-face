var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;
// 控制http传值，最低可以传50M
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.use('/', express.static(`${__dirname}/`)); // 根目录可直接访问
app.use('/static', express.static('static')); // 访问静态资源

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});


app.get('/', function (req, res) {
  console.log('index');
  res.render('index', {});
});

app.get('/scanface', function (req, res) {
  console.log(1111);
  res.json({a:1});
});

app.listen(port, function () {
  console.log(`server listen port ${port}`);
});
