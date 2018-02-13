//约定划款日  下拉框
selectDate('.invest-new .modify-select');

//定投金额
placeholder('.investment-new', '请输入定投金额');

//下一步  进入定投人脸识别页面
$('.invest-new .fun-box .next-btn').on('click', function() {
	var flag = true;
	allFlag = false; //至少填写一个账户进行追加
	$('.invest-new .table-new tbody tr').each(function() {
		var inputVal = $(this).find('.inverstment_out').val(),
			inputValFloat = parseFloat($(this).find('.inverstment_out').val());
		var money = $(this).find('.inverstment_out').parent().prev("td").html();

		if(inputVal != placeholder) {
			allFlag = true;
			if(!checkInputValue(inputVal, money)) {
				flag = false;
				$(this).find('.inverstment_out').css('border', '1px solid #ff7e00');
			}
		}
	});
	if(flag && allFlag) {
		$(".invest-new").removeClass("disshow").addClass("disshow");
		$(".invest-modify-face").removeClass("disshow");
		//重设验证码
		$('.invest-modify-face .phone-verify').empty().phoneVerify({
			policyNumber: 1,
			secene: 1,
			interval: 60,
			serviceUrl: "http://127.0.0.1:8080/udp-web",
			success: function() {
				//验证失败,后续操作
			},
			error: function() {
				//验证失败
			}
		});
	} else {
		$('.pop-up').css('display', 'block');
	}
})

//返回上一步 跳转 "新设定投计划"
$('.invest-modify-face .fun-box .back-btn').on("click", function() {
	$(".invest-modify-face").removeClass("disshow").addClass("disshow");
	$('html,body').scrollTop(0);
	$(".invest-new").removeClass("disshow");
});

/******************** 定期投资-新设定投计划界面  开始 ********************/
var placeholder = "请输入定投金额";
//失去焦点
$(document).on('blur', '.invest-new .investment-new', function() {
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
$(document).on('focus', '.invest-new .investment-new', function() {
	$(this).css({
		'color': '#333',
		'border': '1px inset #dadada'
	});
	if($(this).val() == placeholder) {
		$(this).val("");
	}

});

//输入领取单位数，预估领取金额随之变动
$(document).on('keyup', '.invest-new .investment-new', function() {
	calculate();
});

//点击弹框的确定，弹框隐藏
$(document).on('click', '.pop-up .enter-btn', function() {
	$('.pop-up').css('display', 'none');
});

/********* 人脸识别 开始 *********/
//定期投资展示
displayPlan();

//点击按钮，控制剩余定期投资的显隐
$('.money-down-icon').on('click', function() {
	$("div.modify-list-info").filter(":gt(2)").toggle();
});

/********* 人脸识别 结束 *********/

/********* 函数定义 开始 *********/
/**
 * 约定划款日期选择下拉框
 * @param {Object} element
 */

function selectDate(element) {
	//创建ul和li，追加到div中
	var dateUl = $('<ul class="select-menu modify-menu"></ul>');
	for(var i = 1; i <= 28; i++) {
		var dateLi = $('<li>' + i + '</li>');
		dateLi.appendTo(dateUl);
	}
	dateUl.appendTo($(element));

	$(document).on('click', function() {
		$(element).children('.select-menu').slideUp()
	});
	$(element).find('.inp').off('click').on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.focus').removeClass('focus');
		$(element).removeClass("focus");
		$(element).find('.select-menu').stop().slideUp();
		$(this).val('请选择约定划款日').css('color', '#999');
		$(this).parent().parent().parent().siblings().find('.select-menu').slideUp();
		$(this).siblings('.select-menu').stop().slideToggle(300);
		$(this).closest(element).addClass("focus");
		return false;
	});
	$(element).find('li').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var str = $(this).text();
		$(this).closest(element).find('.inp').val(str);
		$(this).closest(element).find('.inp').css({
			'color': '#333'
		});
		$(this).closest(element).find('.select-menu').stop().slideUp(300);
		return false;
	})
}

/**
 * placeholder兼容性问题
 * @param {Object} element
 * @param {Object} str
 */
function placeholder(element, str) {
	$(element).on('blur', function() {
		if($(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
			$(this).val(str);
			$(this).css({
				'color': '#999'
			});
		} else {
			$(this).css({
				'color': '#333'
			});
		}
	});
	$(element).on('focus', function() {
		$(this).css({
			'color': '#333'
		});
		if($(this).val() == str) {
			$(this).val("");
		}
	})
}

//add by chenshijie on 2018/01/17 判断输入的领取金额是否有误
function checkInputValue(inputvalue, money) {
	var val = parseFloat(inputvalue),
		f_money = parseFloat((money + "").replace(/,/g, ''));
	if(!(/^[1-9][0-9]*0{2}$/.test(inputvalue)) | isNaN(inputvalue)) {
		return false;
	}
	return true;
}

//add by chenshijie on 2018/01/17 计算钱数
function calculate() {
	var $self = $('.invest-new .investment-new');
	var sum = 0;
	$self.each(function() {
		var inverstment_txt = $(this).val();
		if(!(isNaN(inverstment_txt))) {
			if(inverstment_txt == "")
				inverstment_txt = 0;
			inverstment_num = parseFloat(inverstment_txt);
			sum += inverstment_num;
			$('.addtional-combine').html(sum == 0 ? "-" : sum);
		}
	})
}

//定期投资展示
function displayPlan() {
	var investArr = [{
			"title": "健康收益",
			"num": "￥15,000,000.00"
		},
		{
			"title": "稳健收益养老泰康人寿",
			"num": "￥10,000.00"
		},
		{
			"title": "某某收益",
			"num": "￥15,000,000.00"
		},
		{
			"title": "健康收益",
			"num": "￥10,000.00"
		},
		{
			"title": "稳健收益养老泰康人寿",
			"num": "￥10,000.00"
		},
		{
			"title": "某某收益",
			"num": "￥15,000,000.00"
		}
	]

	for(var i = 0; i < investArr.length; i++) {
		var investHtml = $('<div class="modify-list-info">' +
			'<p class="money-title">' + investArr[i].title + '</p>' +
			'<div class="money-account">' +
			'<p class="money-num">账户定投金额</p>' +
			'<p class="money-amount">' + investArr[i].num + '</p>' +
			'</div>' +
			'</div>');
		investHtml.appendTo($('.modify-info'));
		if(i % 3 == 0) {
			$('.modify-list-info').eq(i).addClass('modify-money-first');
			$('.modify-list-info').eq(i).children('.money-title').addClass('money-title-first');
			$('.modify-list-info').eq(i).find('.money-amount').addClass('money-title-first');
		} else if(i % 3 == 1) {
			$('.modify-list-info').eq(i).addClass('modify-money-second');
			$('.modify-list-info').eq(i).children('.money-title').addClass('money-title-second');
			$('.modify-list-info').eq(i).find('.money-amount').addClass('money-title-second');
		} else {
			$('.modify-list-info').eq(i).addClass('modify-money-third');
			$('.modify-list-info').eq(i).children('.money-title').addClass('money-title-third');
			$('.modify-list-info').eq(i).find('.money-amount').addClass('money-title-third');
		}
	}
	$("div.modify-list-info").filter(":lt(3)").show().end().filter(":gt(2)").hide();
}

/********* 函数定义 结束 *********/