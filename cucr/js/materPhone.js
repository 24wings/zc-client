// 添加新地址
function addAddress(){
    layer.open({
        type: 2,
        title: '添加地址',
        shadeClose: true,
        shade: 0.4,
        area: ['80%', '567px'],
        content: './materAlert.html',
        success: function (layero, index){
            // var body = layer.getChildFrame('body', index);
            // body.contents().find(".projectId").val(projectId);
            // body.contents().find(".projectName").val(projectName);
            // body.contents().find(".materialId").val(materialId);
            // body.contents().find(".quotaId").val(quotaId);
            // body.contents().find(".stockId").val(stockId);
        }
    });
}
//获取地址列表
$(function(){
    var datas={
        "option":"getList",
        "userId":localStorage.userId,
        "page":1,
        "pageSize":3
    }
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcUserAddress",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            if(data.success=="y"){
                // console.log(data);
                var html="";
                for(var i=0;i<data.resData.dataList.length;i++){
                    if(data.resData.dataList[i].isDefault=="1"){
                        html += '<dd class="index-board-item  addressDd selectAddress">'+
                                '<p class="namePhone"><span class="nameSpan">'+data.resData.dataList[i].userName+'</span><span class="phoneSpan">'+data.resData.dataList[i].userPhone+'</span><em></em></p>'+
                                '<p class="addressp">'+data.resData.dataList[i].region+'&nbsp;<br>'+data.resData.dataList[i].address+'</p>'+
                                // '<p class="zipCodep">'+data.resData.dataList[i].zipCode+'</p>'+
                                '<em class="editDelete">'+
                                    '<span onclick=editAddress('+"'"+data.resData.dataList[i].addId+"'"+')>修改</span>'+
                                    '<span onclick=deleteAddress('+"'"+data.resData.dataList[i].addId+"'"+')>删除</span>'+
                                '</em>'+
                            '</dd>'
                    }else{
                        html += '<dd class="index-board-item  addressDd">'+
                                '<p class="namePhone"><span class="nameSpan">'+data.resData.dataList[i].userName+'</span><span class="phoneSpan">'+data.resData.dataList[i].userPhone+'</span><em></em></p>'+
                                '<p class="addressp">'+data.resData.dataList[i].region+'&nbsp;<br>'+data.resData.dataList[i].address+'</p>'+
                                // '<p class="zipCodep">'+data.resData.dataList[i].zipCode+'</p>'+
                                '<em class="editDelete">'+
                                    '<span onclick=editAddress('+"'"+data.resData.dataList[i].addId+"'"+')>修改</span>'+
                                    '<span onclick=deleteAddress('+"'"+data.resData.dataList[i].addId+"'"+')>删除</span>'+
                                '</em>'+
                            '</dd>'
                    }
                    
                }
                $(".shipAddress dl").html(html)
            }else{
                layer.msg(data.message);
            }
        }
    })
})
//删除地址
function deleteAddress(e){
    layer.confirm('确定删除该地址？', {
      btn: ['是','否'] //按钮
    }, function(){
        var datas={
            "option":"delete",
            "userId":localStorage.userId,
            "addId":e
        }
        $.ajax({
            cache:true,
            url:cucr+"/api/ClzcUserAddress",
            type:"POST",
            data:datas,
            async:true,
            error:function(request){
                return;
            },
            success:function(data){
                if(data.success=="y"){
                    location.reload() 
                }
            }
        })
    },function(){
         console.log(e)
    })
}
//修改地址
function editAddress(e){
    var addid=e;
    layer.open({
        type: 2,
        title: '修改地址',
        shadeClose: true,
        shade: 0.4,
        area: ['80%', '567px'],
        content: './materEdit.html',
        success: function (layero, index){
            var body = layer.getChildFrame('body', index);
            body.contents().find(".editAddid").val(e);
        }
    });
}
(function ($) {
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
})(jQuery);
var projectId=$.getUrlParam('projectId');
var materialId;
$(function(){
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
        async:false,
        error:function(request){
            return;
        },
        success:function(data){
            console.log(data)
            $(".tdTitle").text(data.resData.name)
            materialId = data.resData.materialId;
            $(".navimg").css("background-image","url("+cucr+data.resData.pictureUrl+")");
        }
    })
    materInfo()
})
//根据id获取详情
function materInfo(){
    var datas1={
        "option":"getMaterialInfo",
        "userId":localStorage.userId,
        "id":materialId
    };
    console.log(datas1)
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectMaterial",
        type:"POST",
        data:datas1,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            console.log(data)
            $(".materSinglePrice").text(data.resData.singlePrice)
            $(".amount").val(data.resData.singlePrice)
            $(".singleNumber").val(data.resData.singleNumber)
            $(".singlePrice").val(data.resData.singlePrice)
        }
    })
}
function txtfocus(){
        var copies=$(".copies").val();
        var singleNumber=parseInt($(".singleNumber").val())
        console.log(parseInt($(".singlePrice").val()))
        if(copies>=singleNumber){
            var copies=$(".copies").val(singleNumber);
            var copiesies=singleNumber*$(".singlePrice").val()
            $(".amount").val(copiesies)
            $(".priceSpan").text(copiesies)
        }else{
            var copiesies=copies*$(".singlePrice").val()
            $(".amount").val(copiesies)
            $(".priceSpan").text(copiesies)
        }
     }
//实物支持
//实物支持
function submitBtn1(){
    var datas={
        "option":"add",
        "userId":localStorage.userId,
        "projectId":projectId,
        "materialId":materialId,
        "number":$(".copies").val(),
        "singlePrice":$(".singlePrice").val(),
        "totalPrice":$(".amount").val(),
        "userName":"",
        "userPhone":"",
        "zipCode":"",
        "address":""
    }
    console.log(datas);
    if(projectId==""||$(".copies").val()==""){
        layer.msg('信息填写完整');
    }else{
        layer.confirm('是否提交？', {
            btn: ['是','否'] //按钮
        }, function(){
            $.ajax({
                cache:true,
                url:cucr+"/api/ClzcProjectMaterialPartake",
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
                        /*var formSub="<form id='alipaysubmit' name='alipaysubmit' action='/pay/paypage.ashx' method='post'><input  name='trade_no' value="+"'"+trade_no+"'"+"/><input  name='subject' value="+"'"+subject+"'"+"/><input  name='total_amount' value="+"'"+total_amount+"'"+"/><input  name='body' value="+"'"+body+"'"+"/><input type='submit' value='post' style='display:none;'></form><script>document.forms['alipaysubmit'].submit();</script>"
                        console.log(formSub)
                        document.write(formSub)*/

                        /*layer.confirm('订单提交成功，是否跳转到个人中心页面查看详情？', {
                            btn: ['是','否'] //按钮
                        }, function(){
                            window.location.replace("/cucr/personal.html");
                        },
                        function(){})*/
                        // layer.msg('支持成功');
                        // setTimeout(function(){
                        //     var index = parent.layer.getFrameIndex(window.name);
                        //     parent.layer.close(index);
                        //     window.parent.location.reload();
                        // }, 1000)
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