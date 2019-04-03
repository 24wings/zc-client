(function ($) {
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
})(jQuery);
var projectId=$.getUrlParam('projectId');
// var stockId=$.getUrlParam('stockId');
// var amount=$.getUrlParam('amount');
var stockId;
var amount;
//获取项目名称
$(function(){
    $(".amount").val("1"); 
    var datas1={
        "option":"getProjectInfo",
        "userId":localStorage.userId,
        "projectId":projectId
    };
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProject",
        type:"POST",
        data:datas1,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            console.log(data)
            $(".tdTitle").text(data.resData.name)
            stockId = data.resData.stockId;
            $(".navimg").css("background-image","url("+cucr+data.resData.pictureUrl+")");
        }
    })
    $(".priceSpan").text($(".amount").val())
})

//实时响应下方价格
function tdfocus(){
    $(".priceSpan").text($(".amount").val())
}
//支持股份回报提交
 function subBtn(){
    var datas={
        "option":"add",
        "userId":localStorage.userId,
        "projectId":projectId,
        "stockId":stockId,
        "totalPrice":$(".amount").val()
    }
    console.log(datas);
    if(projectId==""||$(".amount").val()==""){
        layer.msg('信息填写完整');
    }else{
        layer.confirm('是否提交？', {
            btn: ['是','否'] //按钮
        }, function(){
            $.ajax({
                cache:true,
                url:cucr+"/api/ClzcProjectStockPartake",
                type:"POST",
                data:datas,
                async:true,
                error:function(request){
                    return;
                },
                success:function(data){
                    if(data.success=="y"){
                        var trade_no=data.resData.orderNo;
                        var subject=$(".tdLx").text()+","+$(".tdTitle").text();
                        var total_amount=$(".priceSpan").text();
                        var body=$(".tdLx").text()+","+$(".tdTitle").text();
                        console.log(trade_no)
                        console.log(subject)
                        console.log(total_amount)
                        console.log(body)
                        var formSub="<form id='alipaysubmit' name='alipaysubmit' action='/pay/paypage.ashx' method='post'><input  name='trade_no' value="+"'"+trade_no+"'"+"/><input  name='subject' value="+"'"+subject+"'"+"/><input  name='total_amount' value="+"'"+total_amount+"'"+"/><input  name='body' value="+"'"+body+"'"+"/><input type='submit' value='post' style='display:none;'></form><script>document.forms['alipaysubmit'].submit();</script>"
                        console.log(formSub)
                        document.write(formSub)
                        /*layer.confirm('订单提交成功，是否跳转到个人中心页面查看详情？', {
                            btn: ['是','否'] //按钮
                        }, function(){
                            window.location.replace("/cucr/personal.html");
                        },
                        function(){})*/
                        // setTimeout(function(){
                        //     var index = parent.layer.getFrameIndex(window.name);
                        //     parent.layer.close(index);
                        //     window.parent.location.reload();
                        // },1000)
                    }else{
                        layer.msg(data.message);
                    }
                }
            })
        }, function(){
              layer.msg('支持失败');
        })
    }
 }