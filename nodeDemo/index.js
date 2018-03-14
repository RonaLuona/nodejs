var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

// 设置请求对应对请求处理程序
var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['/show'] = requestHandlers.show;

// 开启服务器
server.start(router.route, handle);
