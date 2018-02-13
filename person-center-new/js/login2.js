	/* $(".verify-move-block").hover(function() {
			$('.verify-img-panel').css('display', 'block');
			$('.verify-sub-block').css('display', 'block');
		}, function() {
			$('.verify-img-panel').css('display', 'none');
			$('.verify-sub-block').css('display', 'none');
		});*/
	//加载页脚文件
	$.get("common/footer.html", function(data) {
		$(".footer").html(data);
	});

	var isCheckVerifier = false;
	//清除警告信息
	function clearAlarm() {
		$('.login-window >span').text('').removeClass('right').removeClass('wrong');
	}
	//设置警告信息
	function showAlarm(info) {
		var ss = $('.login-window >span');
		$('.login-window >span').text(info).removeClass('right').addClass('wrong');
	}
	$('.verifier').slideVerify({
		type: 2, //类型
		vOffset: 5, //误差量，根据需求自行调整
		vSpace: 5, //间隔
		/*imgName: ['1.jpg', '2.jpg','3.jpg'],*/
		imgSize: {
			width: '308px',
			height: '160px',
		},
		blockSize: {
			width: '40px',
			height: '40px',
		},
		barSize: {
			width: '308px',
			height: '40px',
		},
		ready: function() {},
		success: function() {
			alert('验证成功，添加你自己的代码！');
			isCheckVerifier = true;
			if($('.login-window>span').text() == "请从左到右移动滑块！") {
				clearAlarm();
			}
			//......后续操作
		},
		error: function() {
			alert('验证失败！');
		}
	});
	//验证手机号码
	$(".ipt-phone").on('blur', function() {
		var phone = $(".ipt-phone").val();
		if(!(/^1[34578]\d{9}$/.test(phone))) {
			showAlarm('手机号格式错误！');
			if(phone === "")
				showAlarm('手机号不能为空！');
		} else
			clearAlarm();
	});
	$('.login-window input').bind('input propertychange', function() {
		clearAlarm();
	});

	$('.login-btn').on('click', function(e) {
		var obj = e.target || e.srcElement,
			step = obj.parentNode.id;
		var phone = $(".ipt-phone").val(),
			password = $(".ipt-pwd").val();
		if(!checkNull(step) || isCheckVerifier == false) {
			e.preventDefault();
			if(phone == "" || password == "") {
				showAlarm('手机号或密码不能为空！');
				return;
			}
			if(isCheckVerifier == false) {
				showAlarm('请从左到右移动滑块！');
				return;
			}
		}
		$.ajax( {
			type : "get",
			url : "data/a.json",
			async : false,
			success : function(data) {
				debugger;
				e.preventDefault();
				window.location.href="http://127.0.0.1:8020/taikang-1125-new/index.html#/account-verify";
			},
			
		});	
	});
	
	//密码错误的重试时间
	$('.retry_btn').on('click',function(){
		$(".login-error-out-time").removeClass("disshow").addClass("disshow");
		$('.ipt-pwd').focus();
	})