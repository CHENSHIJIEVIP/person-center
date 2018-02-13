!(function($,window) {
	
	var httpService={
		get: getService,
        post: postService
	};
	function getService(serviceName, data,async,handleSuccess,handleError) {
	 	return baseService(serviceName, 'get', data, async,handleSuccess,handleError);
	};
	
	function postService(serviceName,data,async,handleSuccess,handleError) {
		return baseService(serviceName, 'post', data, async,handleSuccess,handleError);
	};
	function baseService(serviceName, method, data,async,handleSuccess,handleError) {
        var requestUrl = WEBDOMAIN+serviceName;
            /*requestUrl = requestUrl + "?tokenID="*/     
        $.ajax({
       		url:requestUrl,
       		type : method,
			async:async||true,
			contentType:"application/json;charset=utf-8",
			dataType : "json",
			data:data,
			success:function(data,status){
				if(handleSuccess)
				    handleSuccess(data,status);
			},
			error:function(data,status){
				if(handleError)
				    handleError(data,status)
			}
		});
        return (request.then(handleSuccess, handleError));
    };
    window.httpService = httpService;
    /*使用方法
    httpService.post("ByPartyController/getByParty",{"findType" : "1"},false,
    function(data,status){
     	//成功
    },function(data,status){
    	//失败
    });
    */
})(jQuery,window);