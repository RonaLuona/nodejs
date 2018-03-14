function route(handle, pathname, response, request) {
  console.log('请求路径：' + pathname + ' 成功');
  // 判断 该请求对应的处理程序是否存在（为函数时存在）
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("未找到相应请求处理程序" + pathname);
    response.writeHead(404, {'Content-Type': 'text/html'});
    // response.write('404 Not found');
    response.end();
  }
}

exports.route = route;