/***************************** 部分领取-填写领取金额界面  开始 ********************************/

var placeholder = "请输入领取单位数";
//失去焦点
$(document).on('blur', '.tzzhlq_detail .inverstment_out', function() {
	if($(this).val() == '') {
		$(this).css({
			'color': '#999'
		});
		$(this).val(placeholder);
	} else {
		//modify by yulianlian on 2017/12/14  判断输入为非数字
		if($(this).val() != placeholder) {
			if(!checkInputValue($(this).val(), $(this).parent().prev("td").html())) {
				$(this).parent().parent().children('.estimate').html('-');
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
$(document).on('focus', '.tzzhlq_detail .inverstment_out', function() {
	$(this).css({
		'color': '#333',
		'border': '1px inset #dadada'
	});
	if($(this).val() == placeholder) {
		$(this).val("");
	}
});
//输入领取单位数，预估领取金额随之变动
$(document).on('keyup', '.tzzhlq_detail .inverstment_out', function() {
	var inverstment_txt = $(this).val();
	if(inverstment_txt == "")
		$(this).parent().parent().children('.estimate').html('-');
	else
		$(this).parent().parent().children('.estimate').html(calculate(inverstment_txt));
});

//点击弹框的确定，弹框隐藏
$(document).on('click', '.pop-up .enter-btn', function() {
	$('.pop-up').css('display', 'none');
});

//解决nth-child() 在IE8不兼容的问题
$(document).ready(function() {
	$('.tzzhlq_detail table th:nth-child(4)').css('width', '20%');
	$('.tzzhlq_detail table th:nth-child(5)').css('width', '12%');
	$('.tzzhlq_detail table th:nth-child(6)').css('width', '21%');
})

//点击下一步，验证
$('.tzzhlq_detail .next-btn').on('click', function() {
	var flag = true,
	    allFlag=false; //至少填写一个领取金额账户
	$('.tzzhlq_detail .table1 tbody tr').each(function() {
		var inputVal = $(this).find('.inverstment_out').val(),
		    inputValFloat = parseFloat($(this).find('.inverstment_out').val());
		var money = $(this).find('.inverstment_out').parent().prev("td").html();
		//modify by yulianlian on 2017/12/14  判断输入为非数字
		if(inputVal != placeholder) {
			allFlag = true;
			if(!checkInputValue(inputVal, money)) {
				flag = false;
				$(this).children('.estimate').html('-');
				$(this).find('.inverstment_out').css('border', '1px solid #ff7e00');
			}
			else{
				$(this).find('.inverstment_out').val(inputValFloat);
			}
		}
	});
	if(flag && allFlag) {
		$(".tzzhlq_detail").removeClass("disshow").addClass("disshow");
		$(".tzzhlq_next").removeClass("disshow");
	}
	else{
		$('.pop-up').css('display', 'block');
	}
});
/***************************** 部分领取-填写领取金额界面  结束 ********************************/
/***************************** 部分领取-填写银行卡界面  开始 *********************************/
//add by chenshijie on 2017/12/20 投连账户部分领取显示，点击"关闭"
$(document).on('click', '.tzzhlq_next .account_txt', function() {
		$('.addtional-agreement').removeClass('disshow');
});
//add by chenshijie on 2017/12/20 投连账户部分领取关闭，点击"显示"
$('.tzzhlq_next .addtional-close').on('click',function () {
	$('.addtional-agreement').addClass('disshow');
});

//checkbox选中
$(document).on('click', '.tzzhlq_next .account_agree', function() {
	if($('.account_choose i').hasClass('account_selected')) {
		$('.account_choose i').removeClass('account_selected');
		$('.tzzhlq_next .fun-box .next-btn').addClass('disabled');
	} else {
		$('.account_choose i').addClass('account_selected');
		$('.tzzhlq_next .fun-box .next-btn').removeClass('disabled');
		//下一步 跳转到人脸识别界面
		$('.tzzhlq_next .fun-box .next-btn').on("click", function() {
			if(!$('.account_choose i').hasClass('account_selected')) {
				return false;
			}
			$(".tzzhlq_next").removeClass("disshow").addClass("disshow");
			$('html,body').scrollTop(0);
			$(".inverst-confirm").removeClass("disshow");
		});
		//返回上一步 跳转到账户领取详情页
		$('.inverst-confirm .fun-box .back-btn').on("click", function() {
			$(".inverst-confirm").removeClass("disshow").addClass("disshow");
			$('html,body').scrollTop(0);
			$(".tzzhlq_next").removeClass("disshow");
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

//解决nth-child() 在IE8不兼容的问题
$(document).ready(function() {
	$('.tzzhlq_next .credit_content_table .table1 tbody td:nth-child(1)').css('background', '#f7f7f7');
	$('.tzzhlq_next .credit_content_table .table1 thead th:nth-child(1)').css('width', '40%');
	$('.tzzhlq_next .credit_content_table .table1 thead th:nth-child(2)').css('width', '30%');
	$('.tzzhlq_next .credit_content_table .table1 thead th:nth-child(3)').css('width', '35%');
	$('.tzzhlq_next .credit_content_table .table2 thead th:nth-child(1)').css('width', '10%');
	$('.tzzhlq_next .credit_content_table .table2 thead th:nth-child(2)').css('width', '30%');
	$('.tzzhlq_next .credit_content_table .table2 thead th:nth-child(3)').css('width', '40%');
	$('.tzzhlq_next .credit_content_table .table2 thead th:nth-child(4)').css('width', '20%');
	$('.tzzhlq_next .credit_content_table .table2 tbody td:nth-child(1)').css('width', '10%');
	$('.tzzhlq_next .credit_content_table .table2 tbody td:nth-child(2)').css('width', '30%');
	$('.tzzhlq_next .credit_content_table .table2 tbody td:nth-child(3)').css('width', '40%');
	$('.tzzhlq_next .credit_content_table .table2 tbody td:nth-child(4)').css('width', '20%');
});

//add by yulianlian  on 2017/12/13 银行卡界面点击"返回上一步"
$(".tzzhlq_next .back-btn").on("click", function() {
	$(".tzzhlq_next").removeClass("disshow").addClass("disshow");
	$(".tzzhlq_detail").removeClass("disshow");
	$('html,body').scrollTop(0);
})
/***************************** 部分领取-填写银行卡界面  结束 *********************************/
/***************************** 函数定义 开始 *************************************************/
//add by yulianlian on 2017/12/14  判断输入的领取金额是否有误
function checkInputValue(inputvalue, money) {
	var val = parseFloat(inputvalue),
		f_money = parseFloat((money + "").replace(/,/g, ''));
	if(!(/^\d+(?:\.\d{1,4})?$/.test(inputvalue)) | isNaN(inputvalue) | val > f_money) {
		return false;
	}
	return true;
}
//add by yulianlian on 2017/12/14 根据输入金额计算钱数
function calculate(inputvalue){
	return 10 * inputvalue;
}
/***************************** 函数定义 结束 *************************************************/