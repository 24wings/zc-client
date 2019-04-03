(function ($) {
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
})(jQuery);
var projectId = $.getUrlParam('projectId');
var userId = $.getUrlParam('userId');

$(function(){
    divliSupport3(1)
    allComments()
    //获取页面信息
    var datas={
        "option":"getProjectInfo",
        "userId":localStorage.userId,
        "projectId":projectId
    };
    var detailInfo;
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProject",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            console.log(data);
            $(".imgNav").attr("src",cucr+data.resData.pictureUrl)
            $(".liName").text(data.resData.name)
            /*$(".companyName").text(data.resData.companyName)
            $(".projectNo").text(data.resData.projectNo)*/
            $(".totalPrice").text(data.resData.totalPrice)
            $(".jdspan").text(data.resData.percent+"%")
            $(".proInfodd3>div").css("width",data.resData.percent+"%")
            $(".amount").text(data.resData.amount)
            $(".surplus").text(data.resData.surplus)
            $(".totalPerson").text(data.resData.totalPerson)
            var b = new Base64();  
            var str = b.decode(data.resData.details); 
            detailInfo = "<p>"+str+"</p>";
            $(".proCon1").html(detailInfo);
        }
    });
}) 
//支持登录跳转
function supportBtn(){
    if(userId==null){
        console.log("无user")
        window.location.replace("/cucr/loginPhone.html?projectId="+projectId+"");
    }else{
        console.log("有user")
        var datas={
            "option":"projectReturn",
            "userId":"",
            "projectId":projectId
        };
        $.ajax({
            cache:true,
            url:cucr+"/api/ClzcProject",
            type:"POST",
            data:datas,
            async:true,
            error:function(request){
                return;
            },
            success:function(data){
                console.log(data)
                var idhide1s=data.resData.materialId;
                var idhide2s=data.resData.quotaId;
                var idhide3s=data.resData.stockId;
                layer.open({
                  type: 1,
                  title:"立即支持",
                  skin: 'layui-layer-rim', //加上边框
                  area: ['80%', '16rem'], //宽高
                  content: '<dl class="layerdl"><dd class="idhide1" onclick="materialClick('+"'"+projectId+"'"+')">实物支持</dd><dd  class="idhide2" onclick="quotaClick('+"'"+projectId+"'"+')">定额支持</dd><dd class="idhide3" onclick="stockClick('+"'"+projectId+"'"+')">股份支持</dd></dl>'
                });
                if(idhide1s==""){
                    $(".idhide1").hide()
                }
                if(idhide2s==""){
                    $(".idhide2").hide()
                }
                if(idhide3s==""){
                    $(".idhide3").hide()
                }
            }
        })
    }  
}
//实物支持
function materialClick(e){
    window.location.replace("/cucr/materPhone.html?projectId="+projectId+"")
}
//定额支持
function quotaClick(){
    window.location.replace("/cucr/quotaPhone.html?projectId="+projectId+"")
}
//股份支持
function stockClick(){
    window.location.replace("/cucr/stockPhone.html?projectId="+projectId+"")
}
//获取支持列表
function divliSupport3(e){
    var datas={
            "option":"getProjectDynamic",
            "userId":localStorage.userId,
            "projectId":projectId,
            "beUserId":"",
            "page":e,
            "pageSize":3
        };
    var html="";
    console.log(datas)
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectMaterialPartake",
        type:"POST",
        data:datas,
        async:false,
        error:function(request){
            return;
        },
        success:function(data){
            console.log(data)
            for(var i=0;i<data.resData.dataList.length;i++){
                if(data.resData.dataList[i].support=="实物支持"){
                    if(data.resData.dataList[i].headImg==""){
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url(img/imgMR.jpg)'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd><span class='ddspandd1 swbtn'>"+data.resData.dataList[i].support+"</span></dl><h2 class='border80'></h2></div>"
                    }else{
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url("+cucr+data.resData.dataList[i].headImg+")'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd><span class='ddspandd1 swbtn'>"+data.resData.dataList[i].support+"</span></dl><h2 class='border80'></h2></div>"
                    }
                }
                if(data.resData.dataList[i].support=="定额支持"){
                    if(data.resData.dataList[i].headImg==""){
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url(img/imgMR.jpg)'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd><span class='ddspandd1 debtn'>"+data.resData.dataList[i].support+"</span></dl><h2 class='border80'></h2></div>"
                    }else{
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url("+cucr+data.resData.dataList[i].headImg+")'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd><span class='ddspandd1 debtn'>"+data.resData.dataList[i].support+"</span></dl><h2 class='border80'></h2></div>"
                    }
                }
                if(data.resData.dataList[i].support=="股份支持"){
                    if(data.resData.dataList[i].headImg==""){
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url(img/imgMR.jpg)'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd><span class='ddspandd1 gfbtn'>"+data.resData.dataList[i].support+"</span></dl><h2 class='border80'></h2></div>"
                    }else{
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url("+cucr+data.resData.dataList[i].headImg+")'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd><span class='ddspandd1 gfbtn'>"+data.resData.dataList[i].support+"</span></dl><h2 class='border80'></h2></div>"
                    }
                }
                 
            }
            $(".dlddInfo4").html(html);
        }
    })
}
//获取评论
function allComments(){
    var datas={
        "option":"getList",
        "userId":localStorage.userId,
        "page":1,
        "pageSize":3,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "sendUserId":"",
        "projectId":projectId
    };
    var commentsDl="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectQuestion",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            console.log(data)
            if(data.success=="y"){
                $(".pageSpan").text(data.resData.totalCount);
                for(var i=0;i<data.resData.dataList.length;i++){
                    commentsDl +='<dd>'+
                                    '<ul class="con2ddul fl">'+
                                        '<li class="bgcenter con2ddli1" style="background-image:url('+cucr+data.resData.dataList[i].sendHeadUrl+')"></li>'+
                                        '<li class="con2ddli2">'+data.resData.dataList[i].sendNickName +'</li>'+
                                        '<li class="con2ddli3">'+data.resData.dataList[i].createTime+'</li>'+
                                    '</ul>'+
                                    '<p>'+data.resData.dataList[i].question+'</p>'+
                                    '<div class="clear"></div>'+
                                    '<div class="con2ddBtn fl">'+
                                        '<p>&nbsp;</p>'+
                                    '</div>'+
                                    '<div class="clear"></div>'+
                                    '<div style="display:none">'+
                                        '<textarea class="childtext" rows="5"></textarea>'
                                        '<div class="fl proConBtn">'+
                                            '<div class="fr sendText">发送</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</dd>';
                }
                $(".commentsDl").html(commentsDl)
            }
        }
    });
}