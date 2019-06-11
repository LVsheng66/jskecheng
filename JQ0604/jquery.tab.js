(function ($) {
	
	var defaultSettings = {}	

	function Tab(options){
		// 先设置一个默认的配置项   按钮文字  div内容  事件类型 click mouseover
		// 
		defaultSettings = {
			'btnCon':['按钮1','按钮2','按钮3'],
			'divCon':['内容1','内容2','内容3'],
			'evType':'click'
		}
		//
		// jq对象的属性拷贝方法
		$.extend(defaultSettings,options);

		console.log(defaultSettings);

		console.log(this);//$('#tab')

		//调用一个 插件初始化方法
		init.call(this)

		// 调用一个 功能实现 tab切换
		evFn.call(this)
	}

	// 编写一个插件初始化方法 （让按钮和div元素生成）
	function init() {
		console.log(this);
		// console.log(defaultSettings);
		for(var i = 0; i < defaultSettings.btnCon.length; i++) {
			if(i==0) {
				var $btn = $('<input type="button" class="active" value="'+ defaultSettings.btnCon[i] +'" />');
			}else {
				var $btn = $('<input type="button" value="'+ defaultSettings.btnCon[i] +'" />');
			}
			
			this.append($btn);
		}

		for(var i = 0; i < defaultSettings.divCon.length; i++) {
			if(i==0){
				var $div = $('<div style="display:block;">'+ defaultSettings.divCon[i] +'</div>');
			}else {
				var $div = $('<div>'+ defaultSettings.divCon[i] +'</div>');
			}
			
			this.append($div);
		}
	}

	function evFn(){

		this.children('input').on(defaultSettings.evType,function () {
			// console.log(this);
			$(this).addClass('active').siblings('input').removeClass('active');

			$(this).siblings('div').eq( $(this).index() ).show().siblings('div').hide();
		})

	}


	//jq对象的插件机制 将方法传入到其内部 可以实现 给所有的jq对象 添加方法 （相当于内部直接给jq对象的原型上添加了方法 所有对象都可以访问）
	$.fn.extend({
		tab:Tab

	})
	// 直接将该方法 放到jquey内部的构造函数的原型上 这样所有的外面的jq对象都可以访问


})(jQuery);