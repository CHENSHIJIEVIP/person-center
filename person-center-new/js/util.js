//注册电话校验事件
function checkPhone(str) {
	$(str).on('blur', function() {
		toCheckPhone(str);
	})
}
// 电话校验事件
function toCheckPhone(str) {
	var _this = $(str),
		phone = _this.val(),
		//11.27 兼容IE placeholder
		placeholder = _this.attr('placeholder');
	if(!(/^1[34578]\d{9}$/.test(phone))) {
		_this.siblings('.alert').text('手机格式错误').removeClass('right').removeClass('wrong').addClass('wrong');
		if(phone == '' || phone == placeholder) {
			_this.siblings('.alert').text('请输入手机').removeClass('right').removeClass('wrong').addClass('wrong');
		}
	} else {
		_this.siblings('.alert').text('').removeClass('right').removeClass('wrong').addClass('right');
		return true;
	}
	return false;
}

// 注册验证码验证事件
function checkValidCode(str, codeNum) {
	$(str).on('blur', function() {
		toCheckValidCode(this, codeNum);

	})
	$(str).on('keyup', function() {
		var code = $(str).val();
		var _this = $(this);
		if((/^\d{4}$/.test(code))) {
			if(code == codeNum) {
				_this.siblings('.alert').text('').removeClass('right').removeClass('wrong').addClass('right').show();
				_this.siblings('.send-code').text('获取验证码').removeClass('disabled').hide();
				_this.attr("disabled", "disabled");
				_this.siblings('.send-code').removeClass('disabled').text('获取短信验证码');
				clearInterval(InterValObj);
			}
		}
	})
}
// 验证码验证
function toCheckValidCode(str, codeNum) {
	var _this = $(str),
		code = _this.val(),
		//11.27 兼容IE placeholder
		placeholder = _this.attr('placeholder');
	if(code == '' || code == placeholder) {
		_this.siblings('.alert').text('请输入验证码').removeClass('right').removeClass('wrong').addClass('wrong').show();
	} else if(!(/^\d{4}$/.test(code))) {
		_this.siblings('.alert').text('请输入4位验证码').removeClass('right').removeClass('wrong').addClass('wrong').show();
	} else if((/^\d{4}$/.test(code))) {
		if(code == codeNum) {
			_this.siblings('.alert').text('').removeClass('right').removeClass('wrong').addClass('right').show();
			_this.siblings('.send-code').text('获取验证码').removeClass('disabled').hide();
			_this.attr("disabled", "disabled");
			_this.siblings('.send-code').removeClass('disabled').text('获取短信验证码');
			clearInterval(InterValObj);
			return true;
		} else {
			_this.siblings('.alert').text('验证码错误').removeClass('right').removeClass('wrong').addClass('wrong').show();
		}
	}
	return false;

}

//注册校验用户名事件
function checkName(str) {
	$(str).on('blur', function() {
		toCheckName(this);
	})
}

// 校验用户名事件
function toCheckName(str) {
	var _this = $(str),
		code = _this.val(),
		//11.27 兼容IE placeholder
		placeholder = _this.attr('placeholder');
	if(code == ''||code == placeholder) {
		_this.siblings('.alert').text('请输入姓名').removeClass('right').removeClass('wrong').addClass('wrong');
		return false;
	} else {
		_this.siblings('.alert').text('').removeClass('right').removeClass('wrong').addClass('right');
		return true;
	}
}

// 注册密码校验事件
function checkPwd(str, restr) {
	$(str).on('blur', function() {
		var _this = $(this);
		toCheckPwd(this);
	})
	$(str).bind('input propertychange', function() {
		$(restr).siblings('.alert').text('').removeClass('right').removeClass('wrong');
		$(restr).val("");
	});
}
//密码校验
function toCheckPwd(str) {
	var _this = $(str),
		pwd = _this.val(),
		//11.27 兼容IE placeholder
		placeholder = _this.attr('placeholder');
	if(!checkPwdType(pwd)) {
		_this.siblings('.alert').text('密码格式错误').removeClass('right').removeClass('wrong').addClass('wrong');
		if(pwd == ''|| pwd == placeholder) {
			_this.siblings('.alert').text('请输入密码').removeClass('right').removeClass('wrong').addClass('wrong');
		}
	} else {
		_this.siblings('.alert').text('').removeClass('right').removeClass('wrong').addClass('right');
		return true;
	}
	return false;
}
//注册再次输入密码校验事件
function checkRePwd(str, restr) {
	$(restr).on('blur', function() {
		toCheckRePwd(str, this);
	})
}
//再次输入密码校验
function toCheckRePwd(str, restr) {
	var _this = $(restr),
		repwd = _this.val(),
		pwd = $(str).val(),
		//11.27 兼容IE placeholder
		placeholder = _this.attr('placeholder');
	if(repwd == "" || repwd == placeholder) {
		_this.siblings('.alert').text('请输入确认密码').removeClass('right').removeClass('wrong').addClass('wrong');
		return false;
	} else if(repwd !== pwd) {
		_this.siblings('.alert').text('两次输入密码不一致').removeClass('right').removeClass('wrong').addClass('wrong');
		return false;
	} else {
		_this.siblings('.alert').text('').removeClass('right').removeClass('wrong').addClass('right');
		return true;
	}

}

//判断选择证件类型
function checkIdentificationType(str) {
	var typeStat = $(str);
	var type = $(str).text();
	if(type == "请选择证件类型") {
		typeStat.parent().siblings('.alert').text('请输入证件类型').removeClass('right').removeClass('wrong').addClass('wrong');
		return false;
	} else {
		typeStat.siblings('.alert').text('').removeClass('right').removeClass('wrong').addClass('right');
		typeStat.parent().siblings('.alert').text('').removeClass('right').removeClass('wrong').addClass('right').show();
		return type;
	}
}
//注册证件校验事件
function checkIdentificationNum(str, restr) {
	$(restr).on('blur', function() {
		checkIdentification(str, restr)
	});
}
//验证身份证号、军官证和护照号
function checkIdentification(str, restr) {
	var _this = $(restr),
		idNum = _this.val(),
		//11.27 兼容IE placeholder
		placeholder = _this.attr('placeholder'),
		reg = /(^[1-9]\d{16}[0-9Xx]$)|(^[1-9]\d{14}$)/,
		regHz = /^[A-Za-z]{1}\d{8}$/,
		flag = checkIdentificationType(str);
	if(!flag) {
		if(idNum == "") {
			_this.siblings('.alert').text('请输入证件号码').removeClass('right').removeClass('wrong').addClass('wrong');
		}
		return false;
	}

	if(idNum == "" || idNum == placeholder) {
		_this.siblings('.alert').text('请输入证件号码').removeClass('right').removeClass('wrong').addClass('wrong');
	} else if(flag && (flag == "身份证" & !reg.test(idNum))) {
		_this.siblings('.alert').text('身份证号输入错误').removeClass('right').removeClass('wrong').addClass('wrong');
	} else if(flag && (flag == "护照" & !regHz.test(idNum))) {
		_this.siblings('.alert').text('护照号码输入错误').removeClass('right').removeClass('wrong').addClass('wrong');
	} else if(flag && (flag == "军官证" & !(/^\d{8}$/).test(idNum))) {
		_this.siblings('.alert').text('军官证码输入错误').removeClass('right').removeClass('wrong').addClass('wrong');
	} else {
		_this.siblings('.alert').text('').removeClass('right').removeClass('wrong').addClass('right');
		return true;
	}

}

//判断 密码格式 6-20字母和数字
function checkPwdType(pwd) {
	var r1 = /^[A-Za-z0-9]{6,20}$/,
		r2 = /^\d+$/,
		r3 = /^[A-Za-z]+$/;
	if((r1.test(pwd)) && !(r2.test(pwd)) && !(r3.test(pwd))) {
		return true;
	}
	return false;
}

// 11.22 计时器设为全局
var InterValObj;
function setCounting(time, el) {
	//获取验证码
	$(el).on("click", function() {
		if(!$(el).hasClass('disabled')) {
			var phone;
			var curcount = time;
			// phone = $('#reg-phone').val();

			//验证手机号是否正确

			//发送验证码
			// $.get('/getcode',{ phone: phone }, function(data){
			//     alert(data);
			// });
			
            //11.26  验证码发送成功状态 sendValidCodeStat ;
			var sendValidCodeStat = true;
			if(!sendValidCode($(this),sendValidCodeStat)){
				return false;
			}
			//获取验证码倒计时    60秒后重新获取
			// $(el).attr( 'disabled','disabled' );
			$(el).text(+curcount + "秒后重新获取");
			$(el).addClass('disabled'); //启动按钮
			InterValObj = setInterval(countdown, 1000);

			//60秒倒计时
			function countdown() {
				if(curcount == 0) {
					clearInterval(InterValObj); //停止计时器
					$(el).removeClass('disabled'); //启动按钮
					$(el).text("重新发送验证码");
					// 11.27 发送状态初始化
					$(el).siblings('.alert').text("").hide();
					$(el).parent().siblings('.code-alert').text("").hide();
				} else {
					curcount--;
					$(el).text(+curcount + "秒后重新获取");
				}

			}
		}
	});
}

//短信验证码发送成功判断
function sendValidCode(str,flag){
	var alertTip;
	if(str.parent().siblings('.code-alert').length == 0){
		alertTip = str.siblings('.alert');
	}else{
		alertTip = str.parent().siblings('.code-alert');
	}
	// 验证码发送成功
	if(flag){
		alertTip.text('验证码已发送成功，请查收').removeClass('right').removeClass('wrong').addClass('right').show();
		return true;
	}else{// 如果验证码发送失败
		clearInterval(InterValObj);
		alertTip.text('获取验证码').removeClass('disabled').show();
		alertTip.text('验证码发送失败，请重新获取').removeClass('right').removeClass('wrong').addClass('wrong');
		return false;
	}
}

//1.27 验证码输入初始化
function initValidCodeIpt(str){
	$(str).find(".code-ipt").val("").attr("disabled",true);
	$(str).find(".send-code").text("获取验证码").addClass('disabled').show();
    $(str).find(".alert").text("").hide();
    clearInterval(InterValObj);
}