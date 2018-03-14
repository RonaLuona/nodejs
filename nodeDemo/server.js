var http = require('http');
var url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    console.log('-------------------------------');
    var postData = '';
    // 解析路由，当前路径
    var pathname = url.parse(request.url).pathname;
    // 请求路由
    route(handle, pathname, response, request);
    /*
    // 设置接收请求数据的字符编码 UTF-8
    request.setEncoding("utf8");
    // 注入data监听器 收集接收到的数据块
    request.addListener('data', function(postDataChunk){
      // 将接收到的数据块拼接 数据块最大65536字节 ／ 64K
      postData += postDataChunk;
      console.log('获取到post数据块：' + postDataChunk + ' .');
    });
    // 注入end事件监听器 调用请求路由
    request.addListener('end', function() {
      route(handle, pathname, response, postData);
    });
    */
  }
  http.createServer(onRequest).listen(8088);
  console.log('服务器已开启！');
}

exports.start = start;