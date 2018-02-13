/*2018/1/18 by zhangwei 取消定投界面*/
$('.phone-verify').phoneVerify({
    policyNumber: 1,
    secene: 1,
    interval: 60,
    serviceUrl: "http://127.0.0.1:8080/udp-web",
    success: function () {
        alert("验证成功");
        //......后续操作
    },
    error: function () {
        alert('验证失败！');
    }
});

//点击下一步，验证
$('.invest-modify .next-btn').on('click', function() {
    var flag = true,
        allFlag=false; //至少填写一个领取金额账户
    $('.invest-modify .table1 tbody tr').each(function() {
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
        $(".invest-modify").removeClass("disshow").addClass("disshow");
        $(".tzzhlq_next").removeClass("disshow");
    }
    else{
        $('.pop-up').css('display', 'block');
    }
});
/***************************** 部分领取-填写领取金额界面  结束 ********************************/
/***************************** 部分领取-填写银行卡界面  开始 *********************************/
//checkbox选中
$(document).on('click', '.invest-modify .account_agree', function() {
    if($('.account_choose i').hasClass('account_selected')) {
        $('.account_choose i').removeClass('account_selected');
        $('.invest-modify .fun-box .next-btn').addClass('disabled');
    } else {
        $('.account_choose i').addClass('account_selected');
        $('.invest-modify .fun-box .next-btn').removeClass('disabled');
        //下一步 跳转到人脸识别界面
        $('.invest-modify .fun-box .next-btn').on("click", function() {
            if(!$('.account_choose i').hasClass('account_selected')) {
                return false;
            }
            $(".invest-modify").removeClass("disshow").addClass("disshow");
            $('html,body').scrollTop(0);
            $(".inverst-confirm").removeClass("disshow");
        });
        //返回上一步 跳转到账户领取详情页
        $('.inverst-confirm .fun-box .back-btn').on("click", function() {
            $(".inverst-confirm").removeClass("disshow").addClass("disshow");
            $('html,body').scrollTop(0);
            $(".invest-modify").removeClass("disshow");
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
$(".invest-modify .back-btn").on("click", function() {
    $(".invest-modify").removeClass("disshow").addClass("disshow");
    $(".invest-modify").removeClass("disshow");
    $('html,body').scrollTop(0);
})