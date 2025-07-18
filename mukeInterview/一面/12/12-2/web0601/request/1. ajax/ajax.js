const ajax = option => {
  //type, url, data, timeout, success, error将所有参数换成一个对象{}

  //  0.将对象转换成字符串

  //处理obj
  const objToString = data => {
    data.t = new Date().getTime();
    let res = [];
    for (let key in data) {
      //需要将key和value转成非中文的形式，因为url不能有中文。使用encodeURIComponent();
      res.push(encodeURIComponent(key) + ' = ' + encodeURIComponent(data[key]));
    }
    return res.join('&');
  };

  let str = objToString(option.data || {});

  //  1.创建一个异步对象xmlHttp；
  var xmlHttp, timer;
  if (window.XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else if (xmlHttp) {
    // code for IE6, IE5
    xmlHttp = new ActiveXObject('Microsoft.xmlHttp');
  }

  //  2.设置请求方式和请求地址；
  // 判断请求的类型是POST还是GET
  if (option.type.toLowerCase() === 'get') {
    xmlHttp.open(option.type, option.url + '?t=' + str, true);
    //  3.发送请求；
    xmlHttp.send();
  } else {
    xmlHttp.open(option.type, option.url, true);
    // 注意：在post请求中，必须在open和send之间添加HTTP请求头：setRequestHeader(header,value);
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //  3.发送请求；
    xmlHttp.send(str);
  }

  //  4.监听状态的变化；
  xmlHttp.onreadystatechange = function () {
    clearInterval(timer);
    if (xmlHttp.readyState === 4) {
      if ((xmlHttp.status >= 200 && xmlHttp.status < 300) || xmlHttp.status == 304) {
        //  5.处理返回的结果；
        option.success(xmlHttp.responseText); //成功后回调；
      } else {
        option.error(xmlHttp.responseText); //失败后回调；
      }
    }
  };

  //判断外界是否传入了超时时间
  if (option.timeout) {
    timer = setInterval(function () {
      xmlHttp.abort(); //中断请求
      clearInterval(timer);
    }, option.timeout);
  }
};
