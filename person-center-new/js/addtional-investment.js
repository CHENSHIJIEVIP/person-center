	/*追加投资列表界面*/
	//点击部分领取，弹出是否确认的提示框
	$(document).on('click', '.tzzhzjtz .table1 .part_btn', function() {
		$('.tzzhzjtz .pop-up').css('display', 'block');
	});
	$(document).on('click', '.tzzhzjtz .pop-up .enter-btn', function() {
		$('.tzzhzjtz .pop-up').css('display', 'none');
		window.location.href = "#/addtional-investment-detail";
	});
	//解决nth-child() 在IE8不兼容的问题
	$(document).ready(function() {
		$('.tzzhzjtz .content table tr:nth-child(even)').css('background', '#f7f7f7');
	});