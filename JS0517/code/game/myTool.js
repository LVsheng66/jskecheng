/* 
这是你自己封装的一个小的工具库 

$函数 用来获取元素用的
 
getStyle() 函数 封装了获取兼容性样式的函数

move函数   用来实现匀速运动的

shake() 封装了一个抖动函数
 */

function $(selector, parentEle) {

	// 通过传入的传入参数 带不带 '#'来区分 到底是获取id 还是标签

	if (selector.charAt(0) == '#') {
		// 你要通过id名获取元素   '#box' 
		return document.getElementById(selector.substring(1));
	} else {
		// 你要通过标签获取元素'      li'

		parentEle = parentEle || document;

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
