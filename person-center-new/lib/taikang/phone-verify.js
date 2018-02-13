;
(function($, window, document) {

	//在插件中使用phoneVerify对象
	$.fn.phoneVerify = function(options, callbacks) {
		var phoneVerify = new PhoneVerify(this, options);
		phoneVerify.init();
	};

	//定义PhoneVerify的构造函数
	var PhoneVerify = function(ele, opt) {
		this.$element = ele,
			this.defaults = {
				policyNumber: 1,
				secene: 1,
				interval: 60,
				serviceUrl: "http://127.0.0.1:8080/udp-web",
				success: function() {},
				error: function() {}

			},
			this.options = $.extend({}, this.defaults, opt)
	};

	//定义PhoneVerify的方法
	PhoneVerify.prototype = {
		init: function() {
			var _this = this;

			//加载页面
			this.loadDom();

			//验证码 blur 事件
			this.$element.find(".code-ipt").on("change", function() {
				var orderNum = _this.options.policyNumber, //获取保单号
					secene = _this.options.secene; //获取场景 
				var code = $(_this.htmlDoms.code_ipt).val(); //获取输入的验证码

				if(_this.sendMsgFlag) { //已经发送成功
					var checkCodeResult = _this.commonTocheckValidCode(orderNum, code, secene); //校验验证码
					if(checkCodeResult) { //验证成功清楚定时器
						clearInterval(_this.InterValSendCode);
					}
				} else { //未点击获取验证码或发送失败
					$(_this.htmlDoms.code_alert).removeClass("right").removeClass("wrong").addClass('wrong').show().text('请先获取验证码');
				}
			});
		},

		//初始化加载
		loadDom: function() {
			var panelHtml = '';
			panelHtml = '<div class="send-code">验证码：' +
				'<input type="text" class="code-ipt" placeholder="请输入手机验证码"/>' +
				'<a href="javascript:;" class="get-code target">获取验证码</a><span class="correct-code">正确</span>' +
				'</div>' +
				'<p class="code-alert">请输入正确的验证码</p>';

			this.$element.append(panelHtml);

			this.htmlDoms = {
				send_code: this.$element.find('.send-code'),
				code_ipt: this.$element.find('.code-ipt'),
				get_code: this.$element.find('.get-code'),
				correct_code:this.$element.find('.correct_code'),
				code_alert: this.$element.find('.code-alert')
			};

			this.InterValSendCode = null; //定时器
			this.sendMsgFlag = false; //判断是否发送成功
			this.codeCount=0;//验证码输入次数

			this.setSendCodeCounting(this.options.interval, this.htmlDoms.get_code);
		},

		//设置定时器
		setSendCodeCounting: function(time, el) {
			var orderNum = this.options.policyNumber,
				secene = this.options.secene, //获取场景	此场景只针对于保单级手机号
				url = this.options.serviceUrl + "investAccountSwitchMsgCode/commonSendMsg"; // 拼接获取验证码URL
			var _this = this;
			$(el).on("click", function() {
				if(!$(el).hasClass('disabled')) {
					var curcount = time;
					// //11.26 验证码发送成功状态 sendValidCodeStat ;
					var sendValidCodeStat = true;
					var mobileCodeResult; // 发送短信结果 1：成功、2：短信验证码每小时最多发送5次、0：验证码发送失败！
					var moblieCodeMessage; // 发送短信回复消息 1：成功、2：短信验证码每小时最多发送5次、0：验证码发送失败！
					// 发送验证码AJAX
					$.ajax({
						type: "post",
						url: url,
						data: {
							"policyNo": orderNum,
							"secene": secene
						},
						async: true,
						success: function(data) {
							if(data.result == '1') { // 1是正常
								sendMsgFlag = true;
								_this.codeCount = 0; // 重置发送状态
							} else {
								sendValidCodeStat = false;
								moblieCodeMessage = data.msg;
								mobileCodeResult = data.result;
							}
							if(!_this.commonSendValidCode($(_this.htmlDoms.get_code), sendValidCodeStat, mobileCodeResult, moblieCodeMessage)) {
								return false;
							}
						}
					});

					// 获取验证码倒计时 60秒后重新获取
					$(el).text(+curcount + "秒后重新获取");
					$(el).addClass('disabled'); // 启动按钮
					_this.InterValSendCode = setInterval(countdown, 1000);
					// 60秒倒计时
					function countdown() {
						if(curcount == 0) {
							clearInterval(_this.InterValSendCode); // 停止计时器
							$(el).removeClass('disabled'); // 启动按钮
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
		},
		
		// 短信验证码发送成功判断
		commonSendValidCode: function(str, flag, mobileCodeResult, moblieCodeMessage) {
			var alertTip;
			var _this = this;
			if(str.parent().siblings('.code-alert').length == 0) {
				alertTip = str.siblings('.alert');
			} else {
				alertTip = str.parent().siblings('.code-alert');
			}
			// 验证码发送成功
			if(flag) {
				alertTip.text('验证码已发送成功，请查收').removeClass('right').removeClass('wrong').addClass('right').show();
				return true;
			} else { // 如果验证码发送失败
				clearInterval(_this.InterValSendCode);

				alertTip.text(moblieCodeMessage).removeClass('right').removeClass('wrong').addClass('wrong');
				alertTip.text(moblieCodeMessage).removeClass('disabled').show();
				if(mobileCodeResult == 2) {
					$(str).eq(0).text('获取验证码').addClass('disabled');
				} else {
					$(str).eq(0).text('获取验证码').removeClass('disabled');
				}
				return false;
			}
		},
		
		// 验证 验证码 错误状态码 statu: 10--空值，11--4位错值，12--非空非4位错误
		commonTocheckValidCode: function(orderNum, code, secene) {
			var _this = this,
			    placeholder = $(_this.htmlDoms.code_ipt).attr('placeholder');
			if(code == '' || code == placeholder) {
				$(_this.htmlDoms.code_alert).text('请输入验证码').removeClass('right').removeClass('wrong').addClass('wrong').show();
			} else if(!(/^\d{4}$/.test(code))) {
				$(_this.htmlDoms.code_alert).removeClass("right").removeClass("wrong").addClass('wrong').show().text('请输入4位验证码');
			} else if((/^\d{4}$/.test(code))) {

				if(_this.codeCount >= 5) {
					$(_this.htmlDoms.get_code).css('display', 'none');
					$(_this.htmlDoms.code_alert).removeClass("right").removeClass("wrong").addClass('wrong').show().text('今天操作次数已达到上限，请您明天再尝试');
					return;
				}
				// 拼接验证验证码URL
				var checkMsgUrl = _this.options.serviceUrl + "investAccountSwitchMsgCode/commonCheckMsg";
				$.ajax({
					url: checkMsgUrl,
					data: {
						"policyNo": orderNum,
						"mobileCode": code,
						"secene": secene
					},
					type: "post",
					async: true,
					dataType: "json",
					success: function(data) {
						if(data.result == '1') { // 成功
							$(_this.htmlDoms.send_code).css('display', 'none');
							$(_this.htmlDoms.get_code).css('display', 'none');
							$(_this.htmlDoms.code_ipt).hide();
							$(_this.htmlDoms.correct_code).css('display', 'inline-block').text(code);
							$(_this.htmlDoms.code_alert).hide();
							//commonShowQR(orderNum); //展示二维码方法
							_this.options.success();
							return true;
						} else {
							_this.codeCount++;
							$(_this.htmlDoms.code_alert).removeClass("right").removeClass("wrong").addClass('wrong').show().text('验证码错误');
						}
					}
				});
			}
			return false;
		}
	};	
})(jQuery, window, document);