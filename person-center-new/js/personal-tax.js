/***************纳税身份说明---基本信息页面----开始---by zhanghuan on 2017/12/28*****************************/
//checkbox选中
$(document).on('click', '.nssfsmjbxx .account_choose', function() {
	if($('.account_choose i').hasClass('account_selected')) {
		$('.account_choose i').removeClass('account_selected');
		$('.nssfsmjbxx .fun-box .next-btn').addClass('disabled');
	} else {
		$('.account_choose i').addClass('account_selected');
		$('.nssfsmjbxx .fun-box .next-btn').removeClass('disabled');
	};
});

//性别   radio选中
$(document).on('click', '.nssfsmjbxx .radio-sax', function() {
	$(this).find('i').addClass('h-choice').parent().siblings().find('i').removeClass('h-choice');
});

//请输入姓名
placeholder('.personal_name', '请输入姓名');

//请输入证件号码
placeholder('.personal_num', '请输入证件号码');

//请输入手机号码
placeholder('.personal_phone', '请输入手机号码');

//选择性别下拉框
selectMenu('.tax_sax');

//选择证件类型下拉框
selectMenu('.tax_certificate');

//选择出生日期
selectMenu('.tax_born');

//选择纳税类型
selectMenu('.tax_type');

//基本信息  纳税类型  下拉框选择
var flag;
$('.nssfsmjbxx .tax_type').find('.item').on('click', function() {
	var itemIndex = $(this).index();
	if(itemIndex == 0) {
		flag = 0;
		//选择仅为中国居民   点击下一步，跳转查看信息页面
		$('.nssfsmjbxx .account_choose').removeClass("disshow");
	} else {
		flag = 1;
		//选择其他两种  点击下一步，跳转其他两种基本信息页面
		$('.nssfsmjbxx .fun-box .next-btn').removeClass('disabled');
		$('.nssfsmjbxx .account_choose').removeClass("disshow").addClass('disshow');

	}
})

//点击下一步，进行验证及后续操作
$('.nssfsmjbxx .next-btn').on('click', function() {
			debugger;
	var personal_sax = $('.nssfsmjbxx .radio-sax').find('.radio-circle');
	for(var i = 0, result = 0; i < personal_sax.length; i++) {
		!personal_sax.eq(i).hasClass('h-choice') && result++;
		if(result == 3) {
			personal_sax.eq(i).parent().parent().css('display', 'none');
			personal_sax.eq(i).parent().parent().next().css('display', 'block');
		}
	}

	var personal_select = $('.nssfsmjbxx .analog-select');
	for(var i = 0; i < personal_select.length; i++) {
		if(personal_select.eq(i).children(':first').val() == personal_select.eq(i).children(':first').attr('placeholder') || personal_select.eq(i).children(':first').val() == '') {
			personal_select.eq(i).css('display', 'none').next().css('display', 'block');
		}
	}

	var personal_input = $('.nssfsmjbxx .inverstment_out');
	for(var i = 0; i < personal_input.length; i++) {
		if(personal_input.eq(i).val() == personal_input.eq(i).attr('placeholder') || personal_input.eq(i).val() == '') {
			personal_input.eq(i).val(personal_input.eq(i).attr('placeholder')).css('color', '#ff0000');
		}
	}

	var personal_tax = $('.nssfsmjbxx .empty');
	for(var i = 0; i < personal_tax.length; i++) {
		if(personal_tax.eq(i).val() == personal_tax.eq(i).attr('placeholder') || personal_tax.eq(i).val() == '') {
			return false;
		}
	}
	$('.nssfsm').addClass('disshow');
	if(flag == 0) {
		if(!$('.nssfsmjbxx .account_choose i').hasClass('account_selected')) {
			$('.nssfsmjbxx').removeClass('disshow');
			return false;
		}
		$('.nssfsmckxx').removeClass('disshow');
		$('html,body').scrollTop(0);
	} else {
		$('.nssfsmnsxx').removeClass('disshow');
		$('html,body').scrollTop(0);
	}

});

//点击性别提示语，显示性别单选框
$('.tax-tip-sax').on('click', function() {
	$(this).css('display', 'none');
	$(this).prev('.radio-choose').css('display', 'block');
});

//校验input
checkTip('.personal_name', '请输入姓名');
checkTip('.personal_num', '请输入证件号码');
checkTip('.personal_phone', '请输入手机号码');

//点击提示语，显示下拉框
showSelect('.tax_certificate');
showSelect('.tax_sax');
showSelect('.tax_type');

/***************纳税身份说明---基本信息页面----结束---by zhanghuan on 2017/12/28*****************************/

/***************纳税身份说明---查看信息页面（中国居民）---开始  by zhanghuan on 2018/1/2*****************************/

//返回上一步 跳转到纳税身份说明基本信息页面
$('.nssfsmckxx .fun-box .back-btn').on("click", function() {
	$(".nssfsmckxx").removeClass("disshow").addClass("disshow");
	$('html,body').scrollTop(0);
	$(".nssfsmjbxx").removeClass("disshow");
	if($('.nssfsmjbxx .account_choose i').hasClass('account_selected')) {
		$('.account_choose i').removeClass('account_selected');
		$('.nssfsmjbxx .fun-box .next-btn').addClass('disabled');
	}
});
/***************纳税身份说明---查看信息页面（中国居民）---结束  by zhanghuan on 2018/1/2*****************************/

/***************纳税身份说明---纳税信息页面（其他两种）---开始  by zhanghuan on 2018/1/2*****************************/
//checkbox选中
$(document).on('click', '.nssfsmnsxx .account_choose', function() {
	if($('.account_choose i').hasClass('account_selected')) {
		$('.account_choose i').removeClass('account_selected');
		$('.nssfsmnsxx .fun-box .next-btn').addClass('disabled');
	} else {
		$('.account_choose i').addClass('account_selected');
		$('.nssfsmnsxx .fun-box .next-btn').removeClass('disabled');
	};
});

//选择出生地（英文）
selectMenu('.tax_born_en');
//选择出生地（中文）
selectMenu('.tax_born_ch');
//选择国家（地区）
selectMenu('.address_country');
//选择税收居民国
selectMenu('.complete_country');
//选择无纳税人识别号原因
selectMenu('.complete_reason');
//无纳税人识别号原因    下拉选项  
noTaxPersonalReason();

//点击添加按钮，增加行
$('.complete_add').on('click', function() {
	$('.tax_info_table').append(
		'<tbody style="border: 0;">' +
		'<tr>' +
		'<td class="gray info_country">税收居民国地区</td>' +
		'<td class="info_num">' +
		'<div class="analog-select complete_country">' +
		'<input class="inp inp-in empty" type="text" name="" value="请选择" readonly="true" placeholder="请选择">' +
		'<i class="horned"></i>' +
		'<ul class="select-menu select-menu-other">' +
		'<li class="item">英国</li>' +
		'<li class="item">法国</li>' +
		'<li class="item">美国</li>' +
		'</ul>' +
		'</div>' +
		'<span class="tax-tip-select">请选择</span>' +
		'</td>' +
		'<td class="gray info_num">纳税人识别号</td>' +
		'<td class="tax-info-num">' +
		'<input name="inverstment_out" class="inverstment_out noborder complete_num" placeholder="请输入纳税人识别号" value="请输入纳税人识别号">' +
		'</td>' +
		'<td rowspan="2" class="info_operation"><i class="complete_delete"></i></td>' +
		'</tr>' +
		'<tr>' +
		'<td class="gray">无纳税人识别号原因</td>' +
		'<td colspan="3" class="tax-no">' +
		'<div class="analog-select complete_reason">' +
		'<input class="inp inp-in empty" type="text" name="" value="请选择" readonly="true" placeholder="请选择">' +
		'<input type="text" name="inverstment_out" class="inverstment_out noborder complete_reason_other disshow" placeholder="请输入原因" value="请输入原因" />' +
		'<i class="horned"></i>' +
		'<ul class="select-menu select-menu-reason">' +
		'<li class="item">居民国地区不发放纳税人识别号</li>' +
		'<li class="item">其他</li>' +
		'</ul>' +
		'</div>' +
		'<span class="tax-tip-select tax-tip-reason">请选择</span>' +
		'</td>' +
		'</tr>' +
		'<tr><td colspan="5" style="height:10px; border: 0;" ></td></tr>' +
		'</tbody>');
	//请输入纳税人识别号
	placeholder('.complete_num', '请输入纳税人识别号');
	//选择税收居民国
	selectMenu('.complete_country');
	//选择无纳税人识别号原因
	selectMenu('.complete_reason');
	//选择其他时input框
	checkTip('.complete_reason_other', '请输入原因');
	//无纳税人识别号原因    下拉选项  
	noTaxPersonalReason();

	//点击提示语，显示下拉框
	showSelect('.tax_born_en');
	showSelect('.tax_born_ch');
	showSelect('.address_country');
	showSelect('.complete_country');
	showSelect('.complete_reason');

	//纳税人识别号和无纳税人识别号原因的联动
	taxCompeleteNum();
	//点击下一步，跳转其他两种查看信息页面
	toNextInfo();

})

//点击删除按钮，删除当前行
$(document).on('click', '.complete_delete', function(e) {
	e.stopPropagation();
	e.preventDefault();
	var infoLength = $('.tax_info_table tbody').length;
	if(infoLength == 1) {
		return false;
	}
	$(this).parent().parent().parent().remove();
})

//纳税人识别号和无纳税人识别号原因的联动
taxCompeleteNum();
function taxCompeleteNum() {
	$('.complete_num').on('blur',function(e) {
		debugger;
		e.stopPropagation();
		e.preventDefault();
		if($(this).val() == $(this).attr('placeholder') || $(this).val() == '') {
			$(this).parent().parent().next().find('.complete_reason').css('display', 'block');
			$(this).parent().parent().next().find('.tax-tip-reason').css('display', 'none');
		} else {
			$(this).parent().parent().next().find('.complete_reason').css('display', 'none');
			$(this).parent().parent().next().find('.tax-tip-reason').css('display', 'none');
			$(this).parent().parent().next().find('.complete_reason').children('input').removeClass('empty');
//			$(this).parent().parent().next().find('.tax-no').css('width', '615px');
		}
	})
}

//请输入现居住地址
placeholder('.tax_born_other', '请输入现居住地址');
//请输入姓（英文）
placeholder('.personal_name_xing', '请输入');
//请输入名（英文）
placeholder('.personal_name_ming', '请输入');
//请输入省（英文）
placeholder('.address_province', '请输入省（地区）');
//请输入市（英文）
placeholder('.address_city', '请输入市（地区）');
//请输入详细地址
placeholder('.address_now_detail', '请输入详细地址');
//请输入原因
placeholder('.complete_reason_other', '请输入原因');
//请输入纳税人识别号
placeholder('.complete_num', '请输入纳税人识别号');

//校验input
checkTip('.personal_name_xing', '请输入');
checkTip('.personal_name_ming', '请输入');
checkTip('.tax_born_other', '请输入现居住地址');
checkTip('.address_province', '请输入省（地区）');
checkTip('.address_city', '请输入市（地区）');
checkTip('.address_now_detail', '请输入详细地址');
checkTip('.complete_reason_other', '请输入原因');
//checkTip('.complete_num', '请输入纳税人识别号');

//点击提示语，显示下拉框
showSelect('.tax_born_en');
showSelect('.tax_born_ch');
showSelect('.address_country');
showSelect('.complete_country');
showSelect('.complete_reason');

//点击返回上一步，返回基本信息页面
$('.nssfsmnsxx .fun-box .back-btn').on("click", function() {
	$(".nssfsm").removeClass("disshow").addClass("disshow");
	$('html,body').scrollTop(0);
	$(".nssfsmjbxx").removeClass("disshow");
});

//纳税信息页面input的英文和数字验证
var inverstment = $('.nssfsmnsxx>.content>table>tbody>tr>td>input');
inverstment.each(function(index, item) {
	$(item).on('blur', function() {
		var placeholder = $(this).attr('placeholder');
		switch(index) {
			case 0:
			case 1:
				if(/^[A-Za-z]+$/.test($(this).val()) == false) {
					$(this).val(placeholder).css('color', '#ff0000');
				}
				break;
			case 2:
			case 3:
			case 4:
			case 5:
				if(/^\w+$/.test($(this).val()) == false) {
					$(this).val(placeholder).css('color', '#ff0000');
				}
		}
	})
});

//点击下一步，跳转其他两种查看信息页面
toNextInfo();

function toNextInfo() {
	debugger;
	$('.nssfsmnsxx .next-btn').on('click', function() {
		var personalns_select = $('.nssfsmnsxx .analog-select');
		for(var i = 0; i < personalns_select.length; i++) {
			if(personalns_select.eq(i).children(':first').val() == personalns_select.eq(i).children(':first').attr('placeholder') || personalns_select.eq(i).children(':first').val() == '') {
				personalns_select.eq(i).css('display', 'none').next().css('display', 'block');
			}
		}

		var personalns_input = $('.nssfsmnsxx .inverstment_out');
		for(var i = 0; i < personalns_input.length; i++) {
			if(personalns_input.eq(i).val() == personalns_input.eq(i).attr('placeholder') || personalns_input.eq(i).val() == '') {
				personalns_input.eq(i).val(personalns_input.eq(i).attr('placeholder')).css('color', '#ff0000');
				if(personalns_input.eq(i).hasClass('complete_num')) {
					personalns_input.eq(i).val(personalns_input.eq(i).attr('placeholder')).css('color', '#999');
				} 
			}else if(personalns_input.eq(i).hasClass('complete_num')){
				personalns_input.eq(i).parent().parent().next().find('.complete_reason').css('display','none');
				personalns_input.eq(i).parent().parent().next().find('.tax-tip-reason').css('display','none');
			}
		}

		var personalns_tax = $('.nssfsmnsxx .empty');
		for(var i = 0; i < personalns_tax.length; i++) {
			if(personalns_tax.eq(i).val() == personalns_tax.eq(i).attr('placeholder') || personalns_tax.eq(i).val() == '') {
				return false;
			}
		}

		if(!$('.nssfsmnsxx .account_choose i').hasClass('account_selected')) {
			return false;
		}

		$('.nssfsmnsxx').removeClass("disshow").addClass('disshow');
		$('.nssfsmckxx_other').removeClass('disshow');
		$('html,body').scrollTop(0);
	});
}

/***************纳税身份说明---纳税信息页面（其他两种）---结束  by zhanghuan on 2018/1/2*****************************/

/***************纳税身份说明---查看信息页面（其他两种）---开始 by zhanghuan on 2018/1/2*****************************/

//返回上一步 跳转到纳税身份说明纳税信息页面 
$('.nssfsmckxx_other .fun-box .back-btn').on("click", function() {
	$(".nssfsmckxx_other").removeClass("disshow").addClass("disshow");
	$('html,body').scrollTop(0);
	$(".nssfsmnsxx").removeClass("disshow");
	if($('.nssfsmnsxx .account_choose i').hasClass('account_selected')) {
		$('.account_choose i').removeClass('account_selected');
		$('.nssfsmnsxx .fun-box .next-btn').addClass('disabled');
	}
});
/***************纳税身份说明---查看信息页面（其他两种）---结束 by zhanghuan on 2018/1/2*****************************/

/*******************公共方法   开始   by zhanghuan on 2018/1/3*********************************/

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

/**
 * 下拉框
 * @param {Object} element
 */
function selectMenu(element) {
	$(document).on('click', function() {
		$(element).children('.select-menu').slideUp()
	});
	$(element).find('.inp').off('click').on('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		$('.focus').removeClass('focus');
		$(element).removeClass("focus");
		$(element).find('.select-menu').stop().slideUp();
		$(this).parent().parent().parent().siblings().find('.select-menu').slideUp();
		$(this).parent().parent().siblings().find('.select-menu-other').slideUp();
		$(this).siblings('.select-menu').stop().slideToggle(300);
		$(this).closest(element).addClass("focus");
		return false;
	});
	$(element).find('.item').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var str = $(this).text();
		$(this).closest(element).find('.inp').val(str);
		$(this).closest(element).find('.inp').css({
			'color': '#333',
			'padding-left': '9px'
		});
		$(this).closest(element).find('.select-menu').stop().slideUp(300);
		return false;
	})
}

/**
 * 无纳税人识别号原因    下拉选项选择  
 */
function noTaxPersonalReason() {
	$('.nssfsmnsxx .select-menu-reason').find('.item').on('click', function() {
		var itemIndex = $(this).index();
		$('.complete_reason_other').val('');
		if(itemIndex == 0) {
			//选择居民国地区不发放纳税人识别号
			$(this).parent().parent().css('text-align', 'left');
			$(this).parent().parent().find('.inp').css({
				'width': '350px',
				'text-align': 'left',
				'padding': '0 25px 0 5px'
			});
			$(this).parent().parent().find('.horned').css('right', '345px');
			$(this).parent().siblings('.complete_reason_other').removeClass('disshow').addClass('disshow');
			$(this).parent().siblings('.complete_reason_other').css('width', '376px');
		} else {
			//选择其他
			$(this).parent().parent().css('text-align', 'left');
			$(this).parent().parent().find('.inp').css({
				'width': '61px',
				'text-align': 'left',
				'padding': '0 20px 0 5px'
			});
			$(this).parent().parent().find('.horned').css('right', '535px');
			$(this).parent().siblings('.complete_reason_other').removeClass('disshow').addClass('empty');
		}
	});
}

/**
 * 校验input
 * @param {Object} ele
 * @param {Object} str
 */
function checkTip(ele, str) {
	$(ele).on('blur', function() {
		var code = $(this).val(),
			placeholder = $(this).attr('placeholder');
		if(code == '' || code == placeholder) {
			$(this).val(str).css('color', '#ff0000');
		}
	});
	$(ele).on('focus', function() {
		$(this).css({
			'color': '#333'
		});
		var code = $(this).val();
		if(code == str) {
			$(this).val('');
		}
	})
}

/**
 * 点击提示语，显示下拉框
 * @param {Object} ele
 */
function showSelect(ele) {
	$(ele).next().on('click', function() {
		$(this).css('display', 'none');
		$(this).siblings().css('display', 'block');
	})
}
/*******************公共方法   结束  by zhanghuan on 2018/1/3*********************************/