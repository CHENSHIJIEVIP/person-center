!(function(window, document) {
	var Router = function() {
		this.method = 'hash';
		this.history = [];
		this.crumb = [];
	};
	Router.prototype.getCrumb = function() {
		var that = this;
		var crumbArr = [];
		var ajaxMap = $.get('js/sitemap.txt', function(data) {
			var dd = JSON.parse(data);
			var matched = [];
			var str = that.str();
			for(var prop in dd) {
				if(prop == str) {
					matched = dd[prop];
					crumbArr = matched;
				}
			}
			that.outputCrumb(matched);
		});
	}

	Router.prototype.outputCrumb = function(arr) {
		var addCrumb = '';
		if(arr.length > 1) {
			for(var i = 0; i < arr.length - 1; i++) {
				addCrumb += "<a href=\" " + arr[i][1] + " \" class=\"item-link fl\">" + arr[i][0] + "</a><span class=\"icon fl\" ></span>";
			}
			//addCrumb += "<a href=\"" + arr[arr.length - 1][1] + "\" class=\"item-link fl on\">" + arr[arr.length - 1][0] + "</a>";
			// 11.20修改面包屑 取消面包屑最后一个链接 此上注释为原代码
			addCrumb += "<a href=\"" + arr[arr.length - 1][1]+ "\" class=\"item-link fl on\">" + arr[arr.length - 1][0] + "</a>";
		}
		if(arr.length == 1) {
			addCrumb += "<a href=\"" + arr[0][1] + "\" class=\"item-link fl on\">" + arr[0][0] + "</a>";
		}
		 var headerMenuName=(window.HeaderMenu) ? window.HeaderMenu.name : "用户首页",
		     headerMenuUrl = (window.HeaderMenu) ? window.HeaderMenu.url : "index.html";
		 
		$('.crumbs').html("<a href='"+headerMenuUrl+"' class=\"item-link fl\">"+headerMenuName+"</a><span class=\"icon fl\" ></span>" + addCrumb);
	}

	Router.prototype.firstRender = function() {
		var component = window.location.hash.split('#'),
			path=component[component.length - 1 || component.length == 0];
		var that = this;
	    
		$.get("common/header.html", function(data) {
			$(".header").html(data);
		});
		$.get("common/footer.html", function(data) {
			$(".footer").html(data);
		});
		$.get("common/sidebar.html", function(data) {
			$(".sidebar").html(data);
			if (path) 
			   that.sideBarStyle(path);
		});		
		if(component.length > 1) {
			that.render(path);
		}
	};

	Router.prototype.hashListenner = function() {
		debugger;
		that = this;
		$(window).on('hashchange', function(e) {
			var component = window.location.hash.split('#'),
			path = component[component.length - 1];
			that.sideBarStyle(path);			
			that.render(path);
		});
	};

	Router.prototype.render = function(str) {
		$('html, body').animate({
			scrollTop: 0
		}, 300);
		//alert(window.screen.height);
		//console.log(window.screen.height);
		$('.sidebar').css('display', 'block');
		$('.main').css({
			'margin-left': 270,
			'minHeight': "420px"
		});
		$(document).unbind("click");

		var that = this;
		/* var loading = "<div style='width:100%;height:100%;overflow: hidden;'><img src='img/timg.gif' style='margin:110px auto 0;display:block'></div>";
		 $('.main').html(loading);*/

		that.getCrumb();
		$.get("page" + str + ".html", function(data) {
			$(".main").html(data);
			//that.footerPosition();
		});
	};

	Router.prototype.str = function() {
		var component = window.location.hash.split('#');
		return component[component.length - 1];
	}
	
	//侧边栏交互
	Router.prototype.sideBarStyle= function(component) {
		var sideState = '#' + component,
		    sideBars = $('.sidebar .sidebar-children');
		for(var i = 0; i < sideBars.length; i++) {
			var sideBarName = $(sideBars).eq(i).find('a').attr('href');
			//加载的组件与链接比对，如果相同则展开并变色
			if(sideState === sideBarName) {
				$(sideBars).eq(i).addClass('on').siblings('li').removeClass('on');
				//debugger;
				// console.log($(sideBars).find('.sub-side'))
				if($(sideBars).eq(i).find('.sub-side')) {
					$(sideBars).eq(i).find('.sub-side').css('display', 'block');
					$(sideBars).eq(i).siblings().find('.sub-side').css('display', 'none');
					$(sideBars).eq(i).find('.sub-side li').eq(0).addClass("on").siblings().removeClass("on");
					$("#wrap").removeClass("zoom-layout").addClass("zoom-layout");
				}
			}
		}
	};
	
	Router.prototype.footerPosition=function() {
		$(".footer").removeClass("fixed-bottom");
		var contentHeight = document.body.scrollHeight, //网页正文全文高度
			winHeight = window.innerHeight; //可视窗口高度，不包括浏览器顶部工具栏
		if(!(contentHeight > winHeight)) {
			//当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
			$(".footer").addClass("fixed-bottom");
		} else {
		    debugger;
			$(".footer").removeClass("fixed-bottom");
		}
	}
	$(document).ready(function() {
		var R = new Router;
		R.firstRender();
		R.hashListenner();
		R.getCrumb();
		window.Router=R;
	});
})(window, document);