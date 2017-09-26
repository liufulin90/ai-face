/**
 * Created by liufulin on 17-9-26.
 */
var log4js = require('log4js');

log4js.configure({
  appenders: {
    dateFile: {
      type: 'dateFile',
      alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
      filename: __dirname + '/logs/dateFile',//您要写入日志文件的路径
      pattern: "-yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      compress: true,
      encoding: 'utf-8',//default "utf-8"，文件的编码
      category: "log_date",
      replaceConsole: true
    },
    out: {
      type: 'stdout'
    },
  },
  categories: {
    default: {appenders: ['dateFile', 'out'], level: 'trace'}
  }
});

// var logger = log4js.getLogger('log_file');
// logger.info("this is a log4js test1111111111111!");

module.exports = {log4js};