function ajax(options) {

    //做一个默认的配置 进行 融合
    var defaults = {
            method: options.method || "get", // 如果外面指定的方式 则按外面来 否则 默认为get
            url: options.url,
            data: options.data || "",
            dataType: options.dataType || "", // 默认 "" 代表 文本字符串
            success: options.success || null, // 默认为null
            failure: options.failure || null // 添加一个失败后的回调函数 对于失败的情况 我们可能做不同的处理
        }
        // 有些后端人员习惯 方法method 使用大写  "POST" ===>不管大写还是小写 统统转小写
    defaults.method = defaults.method.toLowerCase();


    // ajax 第一步  创建一个ajax对象
    var xhr = null;
    // 使用异常捕获语句进行 兼容性处理
    try {
        xhr = new XMLHttpRequest(); // js内置的一个ajax对象 （IE6）
    } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP'); //IE 6 可以识别的

    }

    // 判断一下请求方式  如果是get data放在url的？后面拼接 如果是post 则放在send方法里
    if (defaults.method == 'get') {
        // 这里 针对 get方式 并且是ie下 可能会有中文乱码 需要编码处理 encodeURI()  另外还有缓存的问题 在参数的最后位置加一个时间戳
        defaults.url += "?" + encodeURI(defaults.data + "&" + new Date().getTime());
    }

    // 第二步 调用  open方法
    xhr.open(defaults.method, defaults.url, true);


    // 第三步 调用send方法

    // 如果是post 方法 则需要处理的 1 设置请求头 2 把data放在send方法里面
    if (defaults.method == 'post') {
        //如果是post请求 需要设置请求头
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(defaults.data);
    } else {
        xhr.send();
    }





    // 第四步 监听ajax工作状态码 发生改变
    xhr.onreadystatechange = function() {

        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // alert(xhr.responseText);
                //这里要处理一下 数据格式的问题
                /* 如果数据返回的是文本字符串  直接返回 xhr.responseText
                如果数据返回的是json字符串  需要使用JSON.parse 解析成js对象
                过去老的接口 习惯返回 xml数据  则需要 返回 xhr.responseXML */

                var data = '';

                if (defaults.dataType == '') { // 默认文本字符串 
                    data = xhr.responseText;
                } else if (defaults.dataType == 'json') { // 后端返回的是json字符串
                    data = JSON.parse(xhr.responseText);

                } else if (defaults.dataType == 'xml') {
                    data = xhr.responseXML;
                }

                // 执行回调函数
                (typeof defaults.success === 'function') && defaults.success(data);
            } else {
                // alert('错了，错误信息是' + xhr.status);
                (typeof defaults.failure === 'function') && defaults.failure(xhr.status);
            }
        }
    }
}