/**
 * 公用认证js
 * 1、部分领取和追加投资的验证码功能和人脸识别功能
 * @author itw_wangpeng01
 */
setSendCodeCounting(60, '.get-code');

var InterValSendCode;  

var sendMsgFlag = false;  //判断是否发送成功
function setSendCodeCounting(time, el) {
	var orderNum = $("#orderNum").val();  //获取保单号
	var secene = $("#secene").val();  //获取场景	此场景只针对于保单级手机号
    // 拼接获取验证码URL
    var url = WEBDOMAIN + "investAccountSwitchMsgCode/commonSendMsg";
    $(el).on("click", function() {
        if (!$(el).hasClass('disabled')) {
            var curcount = time;
            // //11.26 验证码发送成功状态 sendValidCodeStat ;
            var sendValidCodeStat = true;
            var mobileCodeResult;// 发送短信结果 1：成功、2：短信验证码每小时最多发送5次、0：验证码发送失败！
            var moblieCodeMessage; // 发送短信回复消息 1：成功、2：短信验证码每小时最多发送5次、0：验证码发送失败！
            // 发送验证码AJAX
            $.ajax({
                type : "post",
                url : url,
                data : {
                	"policyNo" : orderNum,
                	"secene" : secene
                },
                async : true,
                success : function(data) {
                    if (data.result == '1') { // 1是正常
                        sendMsgFlag = true;
                        codeCount = 0; // 重置发送状态
                    } else {
                        sendValidCodeStat = false;
                        moblieCodeMessage = data.msg;
                        mobileCodeResult = data.result;
                    }
                    if (!commonSendValidCode($(".target"), sendValidCodeStat, mobileCodeResult, moblieCodeMessage)) {
                        return false;
                    }
                }
            });
            // 获取验证码倒计时 60秒后重新获取
            // $(el).attr( 'disabled','disabled' );
            $(el).text(+curcount + "秒后重新获取");
            $(el).addClass('disabled'); // 启动按钮
            InterValSendCode = setInterval(countdown, 1000);
            // 60秒倒计时
            function countdown() {
                if (curcount == 0) {
                    clearInterval(InterValSendCode); // 停止计时器
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
}

// 短信验证码发送成功判断
function commonSendValidCode(str, flag, mobileCodeResult, moblieCodeMessage) {
    var alertTip;
    if (str.parent().siblings('.code-alert').length == 0) {
        alertTip = str.siblings('.alert');
    } else {
        alertTip = str.parent().siblings('.code-alert');
    }
    // 验证码发送成功
    if (flag) {
        alertTip.text('验证码已发送成功，请查收').removeClass('right').removeClass('wrong').addClass('right').show();
        return true;
    } else {// 如果验证码发送失败
        clearInterval(InterValSendCode);

        alertTip.text(moblieCodeMessage).removeClass('right').removeClass('wrong').addClass('wrong');
        alertTip.text(moblieCodeMessage).removeClass('disabled').show();
        if (mobileCodeResult == 2) {
            $('.cont .send-code .get-code').eq(0).text('获取验证码').addClass('disabled');
        } else {
            $('.cont .send-code .get-code').eq(0).text('获取验证码').removeClass('disabled');
        }
        return false;
    }
}

//TODO
//验证码 blur 事件
$('.send-code .code-ipt').on("change", function() {
	var orderNum = $("#orderNum").val();  //获取保单号
	var secene = $("#secene").val();//获取场景 TODO
    var code = $('.tzzhzh-confirm .step .cont .send-code .code-ipt').val(); //获取输入的验证码
    if (sendMsgFlag) {  //已经发送成功
        var checkCodeResult = commonTocheckValidCode(orderNum,code,secene);  //校验验证码
        if (checkCodeResult) {  //验证成功清楚定时器
            clearInterval(InterValSendCode);
        }
    } else {  //未点击获取验证码或发送失败
        $('.cont .code-alert').removeClass("right").removeClass("wrong").addClass('wrong').show().text('请先获取验证码');
    }
});

//验证码输入次数
var codeCount = 0;
// 验证 验证码 错误状态码 statu: 10--空值，11--4位错值，12--非空非4位错误
function commonTocheckValidCode(orderNum,code,secene) {
    var placeholder = $('.tzzhzh-confirm .step .cont .send-code .code-ipt').attr('placeholder');
    if (code == '' || code == placeholder) {
        $('.cont .code-alert').text('请输入验证码').removeClass('right').removeClass('wrong').addClass('wrong').show();
    } else if (!(/^\d{4}$/.test(code))) {
        $('.cont .code-alert').removeClass("right").removeClass("wrong").addClass('wrong').show().text('请输入4位验证码');
    } else if ((/^\d{4}$/.test(code))) {
    	
        if (codeCount >= 5) {
            $('.tzzhzh-confirm .step .cont .send-code .target').css('display', 'none');
            $('.cont .code-alert').removeClass("right").removeClass("wrong").addClass('wrong').show().text('今天操作次数已达到上限，请您明天再尝试');
            return;
        }
        // 拼接验证验证码URL
        var checkMsgUrl = WEBDOMAIN + "investAccountSwitchMsgCode/commonCheckMsg";
        $.ajax({
            url : checkMsgUrl,
            data : {
                "policyNo" : orderNum,
                "mobileCode" : code,
                "secene" : secene
            },
            type : "post",
            async : true,
            dataType : "json",
            success : function(data) {
                if (data.result == '1') { // 成功
                    $('.tzzhzh-confirm .step .cont .send-code .send-code').css('display', 'none');
                    $('.tzzhzh-confirm .step .cont .send-code .target').css('display', 'none');
                    $('.tzzhzh-confirm .step .cont .send-code .code-ipt').hide();
                    $('.tzzhzh-confirm .step .cont .send-code .correct-code').css('display', 'inline-block').text(code);
                    $('.cont .code-alert').hide();
                    commonShowQR(orderNum);  //展示二维码方法
                    return true;
                } else {
                	codeCount++;
                    $('.cont .code-alert').removeClass("right").removeClass("wrong").addClass('wrong').show().text('验证码错误');
                }
            }
        });
    }
    return false;
}

var time1, time2;//两个定时器，一个处理二维码状态，一个处理人脸识别状态
function commonShowQR(orderNum) {
	var secene = $("#secene").val();//获取场景 TODO
	var bcode = $("#bcode").val();//获取二维码标识,bcode在扫脸页面使用
    $('.tzzhzh-confirm .step .qr-scan').css('display', 'block');
    $(".qr-msg").show(); // 显示 '请用微信扫描下方二维码'这段话
    $('.notice span').hide();
    // 获取短连接URL
    var shortUrl = WEBDOMAIN + "member/commonGetShortUrl";
    // 获取短连接
    $.ajax({
        url : shortUrl,
        data : {
        	"policyNo" : orderNum,
        	"secene" : secene,
            "bcode" : bcode
        },
        type : "post",
        async : true,
        dataType : "json",
        success : function(data) {
            if (data.result == '1') {
                $("#keystr").val(data.keystr);
                $("#code").empty();
                $('#code').qrcode({
                    render : "table",
                    text : data.shortUrl
                });
                time1 = window.setInterval("getQRStatus('" + data.keystr + "')", 1000);
                time2 = window.setInterval("getFaceStatus('" + data.keystr + "')", 1000);
            } else {
                $("div[title='show_div']").hide();
            }
        }
    });
}

//二维码扫描状态，判断是否被扫描
function getQRStatus(keystr) {
    var QRStatusUrl = WEBDOMAIN + "wechat/getQRStatus"; // 拼接二维码状态的URL
    jQuery.ajax({
        url : QRStatusUrl,
        data : {
            keystr : keystr
        },
        type : "post",
        async : true,
        dataType : "json",
        success : function(data) {
            if (data.result == '1') {
                clearInterval(time1);
            }
        }
    });
}

/**
 * 人脸识别状态，判断是否人脸识别
 * @param keystr
 */
function getFaceStatus(keystr) {
    var faceStatusUrl = WEBDOMAIN + "wechat/getFaceStatus"; // 拼接获取脸部识别状态URL
    jQuery.ajax({
        url : faceStatusUrl,
        data : {
            keystr : keystr
        },
        type : "post",
        async : true,
        dataType : "json",
        success : function(data) {
            if (data.result == '1') {
                shaolianSuccess();
                clearInterval(time2);
            } else if (data.result == '0') {
                $("#code").empty();
                clearInterval(time2);
                shaolianFail();
            }
        }
    });
}

//function shaolianSuccess() {
//    $('#shaolianFail').hide();
//    $("#showMsg").hide(); // 隐藏 '请用微信扫描下方二维码'这段话
//    $("#code").empty(); // 去除二维码
//    cmtAjax();
//}
//
//function shaolianFail() {
//    $('#shaolianSuccess').hide();
//    $('#shaolianFail').show();
//    $("#showMsg").hide(); // 隐藏 '请用微信扫描下方二维码'这段话
//    $("#code").empty(); // 去除二维码
//}