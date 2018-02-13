/*2018/1/18 by zhangwei 投资账户定期投资划款明细界面*/
//解决nth-child() 在IE8不兼容的问题
$(document).ready(function () {
    $('.invest-history .content table tr:nth-child(even)').css('background', '#f7f7f7');
});
/*2018/1/19 by zhangwei 修改*/
//点击查看更多,增加10条
//通过ajax获取的数据,下面为一条数据
// var data=[
//     {
//         name:"泰康e理财B款投资连结保险",
//         date:"2017/03/23",
//         price:"900.00",
//         card:"6214********1234",
//         bank:"招商银行"
//     }
// ];
// $(document).on('click', '.invest-history .load-more', function () {
//     var html='';
//     for(var i=0;i<data.length;i++){
//         html+='<tr>' +
//             '<td>'+data[i].name+'</td>' +
//             '<td class="td-text">'+data[i].date+'</td>' +
//             '<td>'+data[i].price+'</td>' +
//             '<td>'+data[i].card+'</td>'+
//             '<td>'+data[i].bank+'</td>' +
//             '</tr>';
//     }
//     $(html).appendTo(".invest-history .table1 tbody");
// });
