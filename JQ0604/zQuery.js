function ZaG(args){

	return new zQuery(args)
}

function bind(obj,evType,evFn){
	if(obj.addEventListener) {
		obj.addEventListener(evType,evFn,false);
	}else if(obj.attachEvent) {
		obj.handler = function(){
			evFn.call(obj);
		}
		obj.attachEvent('on'+evType,obj.handler);
	}else {
		obj['on'+evType] = evFn;
	}
}

function getStyle(obj,attr) {
	return obj.currentStyle? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}


function zQuery(args) {

	// 设置一个数组 里面可以存元素
	this.eles = [];

	if(typeof args =='function') {

		bind(window,'DOMContentLoaded',args)

	}else if( typeof args == 'string') {

		var firstChar = args.charAt(0)

		switch(firstChar) {
			case '#':
				this.eles.push(document.getElementById(args.substring(1)));
				break;
			case '.':
				var allEles = document.getElementsByTagName('*');

				for(var i = 0; i < allEles.length; i++) {
					var arrClassNames = allEles[i].className.split(' ');
					if(arrClassNames.indexOf(args.slice(1)) != -1 ) {

						this.eles.push(allEles[i]);
					}
				}
				break;
			default:
				this.eles = document.getElementsByTagName(args)
			
		}

	}

}

//css() 两个参数 是设置 一个参数 是读取  {}

zQuery.prototype.css = function (attr,val) {
	
	if(typeof arguments[0] == 'object') {

		for(var k in arguments[0]) {

			for(var i = 0; i < this.eles.length; i++) {
				this.eles[i].style[k] = arguments[0][k];
			}
		}

	}else {

		if(arguments.length == 2) {
			for(var i = 0; i < this.eles.length; i++) {

				this.eles[i].style[attr] = val;
			}
		}else {
			return getStyle(this.eles[0],attr);
		}
	}
	return this;
}


zQuery.prototype.html = function (val) {
	if(arguments.length) {
		for(var i = 0; i < this.eles.length; i++) {
			this.eles[i].innerHTML = val;
		}
	}else {
		return this.eles[0].innerHTML
	}
	return this
}

zQuery.prototype.click = function (fn) {
	if(typeof arguments[0] =='function') {

		for(var i = 0; i < this.eles.length; i++) {
			bind(this.eles[i],'click',fn);
		}
	}
}





