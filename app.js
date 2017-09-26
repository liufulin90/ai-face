var bodyParser = require('body-parser');
var express = require('express');
var AipFaceClient = require('baidu-ai').face;
var fs = require('fs');
var CONFIG = require('./config');
var log4js = require('./logger').log4js;
var logger = log4js.getLogger('ai-face');

// 设置APPID/AK/SK
var APP_ID = CONFIG.APP_ID;// "你的 App ID";
var API_KEY = CONFIG.API_KEY;// "你的 Api Key";
var SECRET_KEY = CONFIG.SECRET_KEY;// "你的 Secret Key";
var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

var rootPath = `${__dirname}/`;

var app = express();
var port = CONFIG.server_port;

// 控制http传值，最低可以传50M
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.use('/', express.static(`${__dirname}/`)); // 根目录可直接访问
app.use('/static', express.static('static')); // 访问静态资源

// 配置跨域请求，都能通过
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

//扫描请求
app.post('/scanface', function (req, res) {
  // 数据库源数据
  var imageBase64;
  // 上传需要识别的图片
  var faceData = req.body.faceData;
  if (faceData) {
    imageBase64 = faceData;
  } else {
    // 没有传图片就默认系统图片
    var path = `${rootPath}static/images/myavatar.png`;
    var imageData = fs.readFileSync(path);
    imageBase64 = new Buffer(imageData).toString('base64');
  }
  // console.log(base64);

  // 人脸识别传入的数据
  var scanData = req.body.scanData;
  scanData = scanData.replace(/^data:image\/(\w*);base64,/g, '');
  // console.log(scanData)

  client.match([imageBase64, scanData]).then(function(result) {
    console.log(JSON.stringify(result));
    res.json({score: result.result[0] ? result.result[0].score : 0});
  });
});

// 服务器监听端口
app.listen(port, function () {
  console.log(`server started listen port ${port}`);
});

process.on('exit', (code) => {
  setTimeout(() => {
    logger.error(`About to exit with code: ${code}`);
  }, 0);
});

process.on('SIGINT', function() {
  logger.error(`Got SIGINT.  Press Control-D/Control-C to exit.`);
});