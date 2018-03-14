var qs = require('querystring');
// fs 文件系统模块，负责读写
var fs = require('fs');
var formidable = require("formidable");

function start(response) {
  console.log("请求处理程序 start 已处理");
  var body = '';
  // 请求成功  
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'charset': 'utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
  });
  // 向页面写入body内容
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("请求处理程序 upload 已处理");
  // 创建form ，对图片解析
  var form = new formidable.IncomingForm();
  console.log('正在解析图片...');
  // 解析图片
  form.parse(request, function(error, fields, files) {
    // 解析完成后回调
    console.log("图片解析完成");
    // 重写文件路径 ： tmp/test.png
    fs.renameSync(files.upload.path, "/tmp/test.png");
    // 向页面写入内容
    response.writeHead(200, {"Content-Type": "text/html"}); 
    response.write("Upload Image Success:<br/>");
    response.write("<img src='/show' width=400>");
    response.end();
    });
}
// 存储图片路径
function show(response) {
  console.log("请求处理程序 show 已处理");
  // 读取文件
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;