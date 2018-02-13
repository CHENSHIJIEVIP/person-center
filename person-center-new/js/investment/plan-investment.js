//已设置定投计划,显示修改\取消\返回列表
 //btnStyleChange(false);

//没有设置定投计划,显示新设\返回列表
 btnStyleChange(true);

//add by chenshijie on 2018/01/18 改变样式
function btnStyleChange(setupNew){
	if(setupNew){
		$('.add-btn').addClass('add-icon');
		$('.update-btn').addClass('update-disable');
		$('.btn-upate').addClass('dis-fontStyle');
		if($('.btn-upate').hasClass('dis-fontStyle')){
			$('.btn-upate').css('cursor','default');
			$('.btn-upate').css('background','none');
			$('.btn-upate').css('border','1px solid #ccc');
			$('.btn-upate').click(function(event){
				return false;
			})
		};
		$('.cancel-btn').addClass('cancel-disable');
		$('.btn-cancel').addClass('dis-fontStyle');
		if($('.btn-cancel').hasClass('dis-fontStyle')){
			$('.btn-cancel').css('cursor','default');
			$('.btn-cancel').css('background','none');
			$('.btn-cancel').css('border','1px solid #ccc');
			$('.btn-cancel').click(function(event){
				return false;
			})
		};
	}else{
		$('.update-btn').addClass('update-icon');
		$('.cancel-btn').addClass('cancel-icon');
		$('.add-btn').addClass('add-disable');
		$('.btn-add').addClass('dis-fontStyle');
		if($('.btn-add').hasClass('dis-fontStyle')){
			$('.btn-add').css('cursor','default');
			$('.btn-add').css('background','none');
			$('.btn-add').css('border','1px solid #ccc');
			$('.btn-add').click(function(event){
				return false;
			})
		};
	}
}