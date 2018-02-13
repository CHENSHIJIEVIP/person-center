	/*2017/12/11 by zhanghuan 部分领取列表*/
	//点击部分领取，如果不能领取弹出提示窗口
	$(document).on('click', '.tzzhlq .table1 .part_btn', function() {
		$('.tzzhlq .pop-up').css('display', 'block');
	});
	$(document).on('click', '.tzzhlq .pop-up .enter-btn', function() {
		$('.tzzhlq .pop-up').css('display', 'none');
		window.location.href = "#/investment-account-detail";
	});
	//解决nth-child() 在IE8不兼容的问题
	$(document).ready(function() {
		$('.tzzhlq .content table tr:nth-child(even)').css('background', '#f7f7f7');
	});
