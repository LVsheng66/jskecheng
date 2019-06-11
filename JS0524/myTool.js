/* 
这是你自己封装的一个小的工具库 

$函数 用来获取元素用的
 
getStyle() 函数 封装了获取兼容性样式的函数

move函数   用来实现匀速运动的

shake() 封装了一个抖动函数
 */

function $(selector, parentEle) {

	parentEle = parentEle || document;

	// 通过传入的传入参数 带不带 '#'来区分 到底是获取id 还是标签
	if (selector.charAt(0) == '#') {
		// 你要通过id名获取元素   '#box' 
		return document.getElementById(selector.substring(1));
	} else if (selector.charAt(0) == '.') {

		// 从整个文档下 去获取所有的标签
		var allEle = parentEle.getElementsByTagName('*');
		// 建立一个数组 用来存储 我要找的带clsName类的标签
		var arrEle = [];
		// 循环所有的标签
		for (var i = 0; i < allEle.length; i++) {
			//这是每一个标签 div  body  li  html
			// 每一个元素身上的类 都是字符串 ""   "li"  "aa"   "active aa"  "p1 aa oP", "aaa"
			var classNameArr = allEle[i].className.split(" "); // ['']  ['li'] ['aa'] ['active'，‘aa’] ['p1','aa','oP']
			// 把专程数组的类  进行循环
			for (var j = 0; j < classNameArr.length; j++) {
				// 循环每一项类名 判断是否和我要找的类 相等 如果相等 说明当前这个带类的标签是我要找的
				// "active" === '.aa'  'aa' == 'aa'
				if (classNameArr[j] == selector.slice(1)) {
					//这里说明找到了
					arrEle.push(allEle[i]);
					// 如果当前的类的数组里面循环找到了我要找的类 那么就没必要继续往后循环看了
					break;
				}
			}
		}

		return arrEle;


	} else {
		return parentEle.getElementsByTagName(selector);
	}

}

// 获取样式的兼容性函数
/* function getStyle(obj,attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr]
	}else {
		return getComputedStyle(obj)[attr];
	}
} */

function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function zero(m) {
	return m < 10 ? '0' + m : m;
}


function move(obj, attr, rate, target, callback) {

	// clearInterval(timer);

	if (obj.timer) {
		return;
	}

	// -19  19
	// 初始位置 > target -19   19
	rate = parseInt(getStyle(obj, attr)) > target ? -rate : rate


	obj.timer = setInterval(function() {
		var speed = parseInt(getStyle(obj, attr)) + rate;
		// 790 + 19 ===> 809  790+10
		// 向前走
		//   700多 >=  30
		if (speed >= target && rate > 0 || speed <= target && rate < 0) {

			speed = target; // 800
		}
		// 向后走

		obj.style[attr] = speed + 'px';

		if (speed == target) {
			//清除定时器
			clearInterval(obj.timer); // 定时器虽然停止了 但是timer变量里面存的还有一个数字定时器编号 13  2
			obj.timer = null;
			// 物体运动完了
			//可以做别的事情了
			if (callback) {
				callback(); // undefined()
			}

		}

	}, 30)


}


/* 
	obj:哪个元素抖动
	attr: 'left' 'top' 
	range: 抖动的幅度
	rate : 抖动的频率
	回调函数： function(){}
	 */


function shake(obj, attr, range, rate, callback) {

	// 如果当前的timer里面有定时器存在  则是一个真的 进入if语句 return返回 后面代码不执行

	if (obj.times) {
		return;
	}

	var arr = [];
	for (var i = range; i > 0; i -= rate) {

		arr.push(-i, i);
	}

	arr.push(0);

	var pos = parseInt(getStyle(obj, attr));
	var n = 0;
	obj.times = setInterval(function() {
		obj.style[attr] = pos + arr[n++] + 'px';

		if (n > arr.length - 1) {
			clearInterval(obj.times);
			obj.times = null;
			// 这里是抖完了
			// 回调在这里执行
			/* if(callback){
				callback()
			} */
			// 短路写法
			callback && callback();

		}
	}, 30)

}


/* 
 这是一个获取dom节点 第一个子元素节点的函数 实现了浏览器兼容 
 */
function first(ele) {
	// 标准浏览器下 firstElementChild  也能识别 firstChild
	var firstEle = ele.firstElementChild || ele.firstChild;

	// 排除掉非元素节点  nodeType
	// null.nodeType
	if (firstEle && firstEle.nodeType == 1) {
		return firstEle; //正常返回
	} else {
		return null; // 返回一个null 空对象 没有正确获取到元素节点
	}


}

function last(ele) {
	var lastEle = ele.lastElementChild || ele.lastChild;

	if (lastEle && lastEle.nodeType == 1) {

		return lastEle;

	} else {
		return null;
	}
}

function prev(ele) {
	var prevEle = ele.previousElementSibling || ele.previousSibling;

	if (prevEle && prevEle.nodeType == 1) {
		return prevEle;
	} else {
		return null;
	}

}

function next(ele) {
	var nextEle = ele.nextElementSibling || ele.nextSibling;

	if (nextEle && nextEle.nodeType == 1) {
		return nextEle;
	} else {
		return null;
	}

}


function getPos(ele) {
	// 设置一个变量 l  用来累加 左侧 最终偏移量
	// 设置一个变量 t  用来累加 顶部的最终偏移量
	var l = 0 - parseInt(getStyle(ele, 'borderLeftWidth'));
	var t = 0 - parseInt(getStyle(ele, 'borderTopWidth'));

	/* l += ele.offsetLeft;
	t += ele.offsetTop;
		
	l += ele.offsetParent.offsetLeft;
	t += ele.offsetParent.offsetTop;
		
	l += ele.offsetParent.offsetParent.offsetLeft;
	t += ele.offsetParent.offsetParent.offsetTop; */

	while (ele) {
		l += ele.offsetLeft;
		l += parseInt(getStyle(ele, 'borderLeftWidth'));
		t += ele.offsetTop;
		t += parseInt(getStyle(ele, 'borderTopWidth'));
		ele = ele.offsetParent;
	}

	return {
		left: l,
		top: t
	};

}

/* 
封装了一个 添加class类的方法 
 */
function addClass(ele, clsName) {
	//第一种情况 ele 没有class   ele.className = clsName; 
	if (ele.className == '') {
		ele.className = clsName;
	} else {
		// "aaa active p1 cc abc"
		//先把类的这个字符串 转换成数组 split(" ")
		var arr = ele.className.split(' ');
		if (arr.indexOf(clsName) == -1) {
			// 代码能进来 说明当前的ele 没有这个类
			//ele.className +=' abc';
			// ele.className += ' '+ clsName

			arr.push(clsName);
			ele.className = arr.join(' ');
		}

	}
	/* 第二种情况 ele 有类:
				看一看 有没有我这个要准备添加的类
					如果有这个要添加的类 则不添加
						
					否则 在原来的类的基础上 加新的这个类 */

}


/* 
 封装了一个移除class类的函数
 */
function removeClass(ele, clsName) {

	//第一种情况:如果ele 根本就没有类 不做任何操作,
	if (ele.className != "") {

		var arr = ele.className.split(' ');

		var index = arr.indexOf(clsName);

		if (index != -1) {
			arr.splice(index, 1);

			ele.className = arr.join(" ");
		}

	}
	// 			第二种情况: 有类    否则 没有找到要移除的类 则不做任何操作,
	// 			
	// 				如果有我找移除的类 则移除


}


function bind(obj, evName, evFn) {
	if (obj.addEventListener) { // 标准浏览器可以识别
		obj.addEventListener(evName, evFn, false);
	} else if (obj.attachEvent) { // IE浏览器可以识别  IE6 7 9
		// 给当前绑定的元素添加一个自定义属性 挂载 匿名函数
		obj.handler = function() {
			evFn.call(obj);
		}

		obj.attachEvent('on' + evName, obj.handler);
	} else {
		// 超级古老的浏览器
		obj["on" + evName] = evFn;
	}



}


function unbind(obj, evName, evFn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(evName, evFn, false);

	} else if (obj.detachEvent) {
		obj.detachEvent('on' + evName, obj.handler);
	} else {
		obj['on' + evName] = null;
	}

}
