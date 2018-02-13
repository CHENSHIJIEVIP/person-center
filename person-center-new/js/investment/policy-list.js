/*2018/1/16 by zhangwei 定期投资列表界面*/

//点击设置定投，如果没有阻断，则弹出投资账户定期投资须知
$(document).on('click', '.content-policy .table1 .policy_btn', function () {
    //需要调用BAS接口查询该保单的账户价值是否大于零，如等于零，返回阻断性提示：保单处于非有效状态，不支持设置定投
    // var insuranceValue=1;//保单账户价值
    // if(insuranceValue>0){
    //
    // }else {
    //
    // }
	$('.content-policy .pop-up').css('display', 'block');
});

//点击×和不同意，关闭投资账户定期投资须知
$(document).on('click', '.content-policy .invest-regularly .invest-regularly-container .invest-regularly-clos', function () {
    $('.invest-regularly').css('display', 'none');
});
$(document).on('click', '.content-policy .invest-regularly .invest-regularly-container .invest-regularly-bot .no-agree', function () {
    $('.invest-regularly').css('display', 'none');
});
//点击同意
$(document).on('click', '.content-policy .invest-regularly .invest-regularly-container .invest-regularly-bot .to-agree', function () {
    $('.invest-regularly').css('display', 'none');
});

//点击弹出投资账户定期投资须知
$(document).on('click', '.content-policy .pop-up .enter-btn', function () {
    $('.content-policy .pop-up').css('display', 'none');
    $('.invest-regularly').css('display', 'block');
});

//解决nth-child() 在IE8不兼容的问题
$(document).ready(function () {
    $('.policy-list .content table tr:nth-child(even)').css('background', '#f7f7f7');
});

//点击查看更多,增加10条 数据从后端获取
/*$(document).on('click', '.policy-list .load-more', function () {
    //获取数据的长度
    var  len=10;
    //不可定投为false
    var bol=false;
    var html='';
    for(var i=0;i<len;i++){
        if(!bol){
            $(yesInvest()).appendTo(".policy-list .table1 tbody");
        }else {
            $(noInvest()).appendTo(".policy-list .table1 tbody");
        }
    }
});*/

/*可定投tr*/
function yesInvest() {
    var tr=$('<tr>' +
        '<td>210123456789</td>' +
        '<td class="td-text">泰康赢家理财D款年金保险（投资连结型）</td>' +
        '<td>2017/03/01</td>' +
        '<td><span class="policy-icon-yes"></span></td>'+
        '<td><a href="javascript:;" class="policy_btn">设置定投</a></td>' +
        '<td><a href="#/investment/history-investment" class="policy_btn">查看记录</a></td>' +
        '</tr>');
    return tr;
}
/*不可的定投tr*/
function noInvest() {
    var tr=$('<tr>' +
        '<td>210123456789</td>' +
        '<td class="td-text">泰康赢家理财投资连结保险</td>' +
        '<td>2017/03/01</td>' +
        '<td><span class="policy-icon-no"></span></td>'+
        '<td><a href="javascript:;" class="gray_btn">设置定投</a></td>' +
        '<td><a href="javascript:;" class="gray_btn">查看记录</a></td>' +
        '</tr>');
    return tr;
}