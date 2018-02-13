	/***************************** 追加投资-填写追加账户界面  开始 ********************************/
	var placeholder="请输入追加金额";
	//失去焦点
	$(document).on('blur', '.tzzhzjtz_detail .inverstment_out', function() {
		if($(this).val() == '') {
			$(this).val(placeholder);
			$(this).css({
				'color': '#999'
			});
		} else {
			if($(this).val() != placeholder) {
				//判断输入为非数字
				if(!checkInputValue($(this).val(), $(this).parent().prev("td").html())) {
					$(this).css('border', '1px solid #ff7e00');
				} else {
					$(this).css('border', '1px solid #dadada');
				}
				$(this).css({
					'color': '#333'
				});
			}
		}
	});

	//获取焦点
	$(document).on('focus', '.tzzhzjtz_detail .inverstment_out', function() {
		$(this).css({
			'color': '#333',
			'border': '1px inset #dadada'
		});
		if($(this).val() == placeholder) {
			$(this).val("");
		}

	});
	//输入领取单位数，预估领取金额随之变动
	$(document).on('keyup', '.tzzhzjtz_detail .inverstment_out', function() {
		calculate();
	});

	//点击弹框的确定，弹框隐藏
	$(document).on('click', '.pop-up .enter-btn', function() {
		$('.pop-up').css('display', 'none');
	});

	//add by yulianlian  on 2017/12/13 点击追加账户界面”下一步“(显示银行卡界面)
	$(".tzzhzjtz_detail .next-btn").on("click", function() {
		var flag = true;
		    allFlag=false; //至少填写一个账户进行追加
		$('.tzzhzjtz_detail .table1 tbody tr').each(function() {
			var inputVal = $(this).find('.inverstment_out').val(),
			    inputValFloat = parseFloat($(this).find('.inverstment_out').val());
			var money = $(this).find('.inverstment_out').parent().prev("td").html();
			
			if(inputVal !=placeholder){
				allFlag = true;
				if(!checkInputValue(inputVal,money)){
					flag = false;
					$(this).find('.inverstment_out').css('border', '1px solid #ff7e00');
				}
			}
		});
		if(flag && allFlag) {
			$(".tzzhzjtz_detail").removeClass("disshow").addClass("disshow");
			$(".tzzhzjtz_next").removeClass("disshow");
		}
		else{
			$('.pop-up').css('display', 'block');
		}
	});
	/***************************** 追加投资-填写追加账户界面  结束 ********************************/

	/***************************** 追加投资-选择银行卡界面      开始 ********************************/
	//add by yulianlian on 2017/12/20 银行转账须知显示，点击"关闭"
	$(document).on('click', '.tzzhzjtz_next .account_txt', function() {
		$('.addtional-agreement').removeClass('disshow');
	});
	
	$('.tzzhzjtz_next .addtional-close').on('click',function () {
		$('.addtional-agreement').addClass('disshow');
	});	
	//checkbox选中
	$(document).on('click', '.tzzhzjtz_next .account_agree', function() {
		if($('.account_choose i').hasClass('account_selected')) {
			$('.account_choose i').removeClass('account_selected');
			$('.tzzhzjtz_next .fun-box .next-btn').addClass('disabled');
		} else {
			$('.account_choose i').addClass('account_selected');
			$('.tzzhzjtz_next .fun-box .next-btn').removeClass('disabled');
			//下一步 跳转到人脸识别界面
			$('.tzzhzjtz_next .fun-box .next-btn').on("click", function() {
				if(!$('.account_choose i').hasClass('account_selected')) {
					return false;
				}
				$(".tzzhzjtz_next").removeClass("disshow").addClass("disshow");
				$('html,body').scrollTop(0);
				$(".inverst-confirm").removeClass("disshow");
			});
			//返回上一步 跳转到账户领取详情页
			$('.inverst-confirm .fun-box .back-btn').on("click", function() {
				$(".inverst-confirm").removeClass("disshow").addClass("disshow");
				$('html,body').scrollTop(0);
				$(".tzzhzjtz_next").removeClass("disshow");
			});
		};
	});

	//选择银行下拉框
	$(document).on("click", function() {
		$(".bank_select .analog-select .select-menu").slideUp();
	});
	$(document).off('click', ".bank_select .analog-select .inp").on("click", ".bank_select .analog-select .inp", function(e) {
		e.stopPropagation();
		e.preventDefault();
		$(".bank_select .analog-select").removeClass("focus");
		$(".bank_select .analog-select .select-menu").stop().slideUp();
		$(this).siblings('.select-menu').stop().slideToggle(300);
		$(this).closest(".analog-select").addClass("focus");
		return false;
	});
	$(document).on('click', '.bank_select .analog-select .item', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var str = $(this).text();
		$(this).closest('.analog-select').find('.inp').val(str);
		$(this).closest('.analog-select').find('.select-menu').stop().slideUp(300);
		return false;
	});

	//add by yulianlian  on 2017/12/13 银行卡界面点击"返回上一步"
	$(".tzzhzjtz_next .back-btn").on("click", function() {
		$(".tzzhzjtz_next").removeClass("disshow").addClass("disshow");
		$(".tzzhzjtz_detail").removeClass("disshow");
		$('html,body').scrollTop(0);
	})

	/***************************** 追加投资-选择银行卡界面      结束 ********************************/

	/***************************** 函数定义 开始 *************************************************/
	//add by yulianlian on 2017/12/14 判断输入的领取金额是否有误
	function checkInputValue(inputvalue, money) {
		var val = parseFloat(inputvalue),
			f_money = parseFloat((money + "").replace(/,/g, ''));
		if(!(/^\d+(?:\.\d{1,2})?$/.test(inputvalue)) | isNaN(inputvalue)) {
			return false;
		}
		return true;
	}
	//add by yulianlian on 2017/12/14 计算钱数
	function calculate(){
		var $self = $('.tzzhzjtz_detail .inverstment_out');
		var sum = 0;
		$self.each(function() {
			var inverstment_txt = $(this).val();
			if(!(isNaN(inverstment_txt))) {
				if(inverstment_txt == "")
					inverstment_txt = 0;
				inverstment_num = parseFloat(inverstment_txt);
				sum += inverstment_num;
				$('.addtional_combine').html(sum == 0 ? "-" : sum);
			}
		})
	}
	/***************************** 函数定义 结束 *************************************************/