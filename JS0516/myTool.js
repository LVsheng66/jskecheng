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
function getStyle(obj,attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr]
	}else {
		return getComputedStyle(obj)[attr];
	}
}



function move(obj,attr,rate,target,callback) {
		
		// clearInterval(timer);
		
		if(obj.timer) {
			return;
		}
		
		// -19  19
		// 初始位置 > target -19   19
		rate = parseInt(getStyle(obj, attr))>target ? -rate:rate
		
		
		obj.timer = setInterval(function() {
			var speed = parseInt(getStyle(obj, attr)) + rate;
			// 790 + 19 ===> 809  790+10
			// 向前走
			//   700多 >=  30
			if(speed>=target&& rate>0 || speed<=target&&rate<0){
				  
				speed = target; // 800
			}
			// 向后走
		  
			obj.style[attr] = speed + 'px';
			
			if(speed == target){
				//清除定时器
				clearInterval(obj.timer); // 定时器虽然停止了 但是timer变量里面存的还有一个数字定时器编号 13  2
				obj.timer = null;
				 // 物体运动完了
				 //可以做别的事情了
				 if(callback){
					 callback(); // undefined()
				 }
				 
			}
			
		},30)
		
		
	}
	