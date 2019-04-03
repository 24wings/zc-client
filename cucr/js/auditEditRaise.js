//获取projectId
(function ($) {
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
})(jQuery);
var projectId = $.getUrlParam('projectId');
var cfType = $.getUrlParam('cfType');
//通过projectId获取相关信息
var headImgres="";
var headImgNew="";
var materialId="";
var quotaId="";
var stockId="";
$(function(){
    if(cfType==1){
        $(".auditCon").show()
        $(".equityCon").hide()
    }
    if(cfType==2){
        $(".auditCon").hide()
        $(".equityCon").show()
    }
    $("#uploadForm").click(function(){
        $(".auditPhoto").hide();
        $("br").hide();
        $("#uploadForm").css("margin-left","0")
    })
    // 获取实物相关信息
    var Materials={
        "option":"getInfoByProjectId",
        "userId":localStorage.userId,
        "projectId":projectId
    }
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectMaterial",
        type:"POST",
        data:Materials,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data)
            materialId=data.resData.materialId;
            $(".materialNumber").val(data.resData.singleNumber);
            $(".materialPrice").val(data.resData.singlePrice);
            $(".materialTitle").val(data.resData.title);
            $(".materialExplain").val(data.resData.explain)
        }
    })
    //获取定额相关信息
    var Quotas={
        "option":"getInfoByProjectId",
        "userId":localStorage.userId,
        "projectId":projectId
    }
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectQuota",
        type:"POST",
        data:Quotas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data)
            quotaId=data.resData.quotaId;
            $(".quotaNumber").val(data.resData.singleNumber);
            $(".quotaPrice").val(data.resData.singlePrice);
            $(".quotaRepay").val(data.resData.singleRepay);
            $(".quotaTitle").val(data.resData.title);
            $(".quotaExplain").val(data.resData.explain)
        }
    })
    // 获取股份相关信息
    var Stocks={
        "option":"getInfoByProjectId",
        "userId":localStorage.userId,
        "projectId":projectId
    }
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectStock",
        type:"POST",
        data:Stocks,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data)
            stockId=data.resData.stockId;
            $(".stockCoeff").val(data.resData.coeff);
            $(".stockTitle").val(data.resData.title);
            $(".stockExplain").val(data.resData.explain)
            // $(".quotaNumber").val(data.resData.singleNumber);
            // $(".quotaPrice").val(data.resData.singlePrice);
            // $(".quotaRepay").val(data.resData.singleRepay);
            // $(".quotaTitle").val(data.resData.title);
            // $(".quotaExplain").val(data.resData.explain)
        }
    })
    //获取其他信息
    var datas = {
        "option":"getProjectInfo",
        "userId":localStorage.userId,
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
            // console.log(data.resData.state)
            if(data.resData.state=="3"){
                $(".raiseSend").hide();
            }
            $(".name").val(data.resData.name);
            $(".amount").val(data.resData.amount);
            $(".companyName").val(data.resData.companyName);
            $(".projectNo").val(data.resData.projectNo);
            $(".provinceid").val(data.resData.provinceId);
            $(".cityid").val(data.resData.cityId);
            $(".region").val(data.resData.province+"--"+data.resData.city)
            headImgNew=data.resData.pictureId;
            var pictureid=headImgres;
            $(".videoid").val(data.resData.videoId);
            $(".explain").val(data.resData.explain);
            var cftype=data.resData.cfType-1;
            $("input[name=cftype]:eq("+cftype+")").attr("checked",'checked'); 
            $(".lable").val(data.resData.lable); 
            $(".startTime").val(data.resData.startTime);
            $(".endTime").val(data.resData.endTime);
            // $(".details").val(data.resData.details);
            var b = new Base64();  
            var str = b.decode(data.resData.details);  

            ue.ready(function(){
                ue.setContent(str);
            })
            $(".auditPhoto").attr("src",cucr+data.resData.pictureUrl);
            var materialPercent=parseFloat(data.resData.materialPercent);
            $(".materialPercent").val(materialPercent);
            $(".materialSpan").text(materialPercent)
            var quotaPercent=parseFloat(data.resData.quotaPercent);
            $(".quotaPercent").val(quotaPercent);
            $(".quotaSpan").text(quotaPercent)
            var stockPercent=parseFloat(data.resData.stockPercent);
            $(".stockPercent").val(stockPercent);
            $(".stockSpan").text(stockPercent);
            
            $(".repaidday").val(data.resData.repayTime);
            $(".totalAmount1").text(data.resData.materialPrice);
            $(".totalAmount2").text(data.resData.quotaPrice);
            $(".totalAmount3").text(data.resData.stockPrice);
            repayid=data.resData.repayid;
            // console.log(repayid)
        }
    }); 
    
})

//计算实物份额
function materialChange(){
    var materS1=$(".totalAmount1").text();
    var materS2=$(".material1").val();
    var materSS=materS1/materS2;
    $(".material2").val(materSS)
}
//计算定额份额
function quotaChange(){
    var materS1=$(".totalAmount2").text();
    var materS2=$(".quota1").val();
    var materSS=materS1/materS2;
    $(".quota2").val(materSS)
}

//修改项目众筹
function editRaise(){
    if(materialId==null&&quotaId==null&&stockId==null){
        materialSubmit1();
        quotaSubmit1();
        stockSubmit1();
    }else{
        materialSubmit();
        quotaSubmit();
        stockSubmit();
    }
    if($(".fileinput-preview>img").attr("src")!=undefined){
        var datas = new FormData($('#uploadForm')[0]);
        $.ajax({
            url: cucr+'/api/Files',
            type: 'POST',
            data: datas,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                // console.log(data);
                if(data.success){
                    // console.log('upload success');
                    // console.log(data.resData);
                    headImgres=data.resData.fileId;
                }else{
                    // console.log(data.message);
                }
            },
            error: function (data) {
                // console.log(data.success);
            }
        });
    }
    var details="";
    var ue = UE.getEditor('editor');
    var arr = [];
    arr.push(UE.getEditor('editor').getContent());
    var _adrobj=arr.join("\n").replace(/\"/g, "'")
    var b = new Base64();  
    var str1 = b.encode(_adrobj); 
    details = str1;

    if(headImgres==""){
        var materialPercent=$(".materialPercent").val();
        var materialPrice=(materialPercent/100)*($(".amount").val());
        var quotaPercent=$(".quotaPercent").val();
        var quotaPrice=(quotaPercent/100)*($(".amount").val());
        var stockPercent=$(".stockPercent").val();
        var stockPrice=(stockPercent/100)*($(".amount").val());
        var companyName=$(".companyName").val();
        var projectNo=$(".projectNo").val();
        var datas = {
            "option":"update",
            "userId":localStorage.userId,
            "projectId":projectId,
            "name":$(".name").val(),
            "projectNo":projectNo,
            "companyName":companyName,
            "amount":$(".amount").val(),
            "classify":$("input[name='cftype']:checked").val(),
            "provinceid":$(".provinceid").val(),
            "cityid":$(".cityid").val(),
            "region":$(".region").val(),
            "pictureid":headImgNew,
            "videoid":$(".videoid").val(),
            "explain":$(".explain").val(),
            "details":details,
            "lable":$(".lable").val(),
            "startTime":$(".startTime").val(),
            "endTime":$(".endTime").val(),
            "materialPercent":materialPercent,
            "materialPrice":materialPrice,
            "quotaPercent":quotaPercent,
            "quotaPrice":quotaPrice,
            "stockPercent":stockPercent,
            "stockPrice":stockPrice,
            "repayTime":$(".repaidday").val()
        };
    }else{
        var datas = {
            "option":"update",
            "userId":localStorage.userId,
            "projectId":projectId,
            "name":$(".name").val(),
            "projectNo":projectNo,
            "companyName":companyName,
            "amount":$(".amount").val(),
            "classify":$("input[name='cftype']:checked").val(),
            "provinceid":$(".provinceid").val(),
            "cityid":$(".cityid").val(),
            "region":$(".region").val(),
            "pictureid":headImgres,
            "videoid":$(".videoid").val(),
            "explain":$(".explain").val(),
            "details":details,
            "lable":$(".lable").val(),
            "startTime":$(".startTime").val(),
            "endTime":$(".endTime").val(),
            "materialPercent":materialPercent,
            "materialPrice":materialPrice,
            "quotaPercent":quotaPercent,
            "quotaPrice":quotaPrice,
            "stockPercent":stockPercent,
            "stockPrice":stockPrice,
            "repayTime":$(".repaidday").val()
        };
    }
    // console.log(datas)
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
            if(data.success=="y"){
                // editReturn()
                // console.log(data)
                layer.alert('修改成功！', {
                  icon: 1,
                  skin: 'layer-ext-moon'
                },function(index){
                     layer.close(index);
                     window.location.reload()
                }) 
            }else{
                layer.alert(data.message, {
                  icon: 2,
                  skin: 'layer-ext-moon'
                },function(index){
                     layer.close(index);
                     window.location.reload()
                }) 
            }
            
        }
    }); 
    
}
//提交审核项目众筹
function sendRaise(){
    var datas={
        "option":"apply",
        "userId":localStorage.userId,
        "projectId":projectId
    }
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
            if(data.success=="n"){
                layer.alert("提交失败！", {
                  icon: 2,
                  skin: 'layer-ext-moon'
                },function(index){
                     layer.close(index);
                     window.location.replace("/cucr/personal.html");
                }) 
            }else{
                // console.log(data)
                layer.alert('提交成功！', {
                  icon: 1,
                  skin: 'layer-ext-moon'
                },function(index){
                     layer.close(index);
                     window.location.replace("/cucr/personal.html");
                }) 
            }
            
        }
    }); 
}
//删除项目众筹
function deleteRaise(){
    var datas={
        "option":"delete",
        "userId":localStorage.userId,
        "projectId":projectId
    }
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
            if(data.success=="n"){
                layer.alert(data.message, {
                  icon: 2,
                  skin: 'layer-ext-moon'
                },function(index){
                     layer.close(index);
                     window.location.replace("/cucr/personal.html");
                }) 
            }else{
                // console.log(data)
                layer.alert('删除成功！', {
                  icon: 1,
                  skin: 'layer-ext-moon'
                },function(index){
                     layer.close(index);
                     window.location.replace("/cucr/personal.html");
                }) 
            }
            
        }
    }); 
}

// var headImgNew1="";
//修改股权众筹
/*function editEquity(){
    if($(".fileinput-preview>img").attr("src")!=undefined){
        var datas = new FormData($('#uploadForm')[0]);
        $.ajax({
            url: cucr+'/api/Files',
            type: 'POST',
            data: datas,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                if(data.success){
                    console.log('upload success');
                    console.log(data.resData);
                    headImgres=data.resData.fileId;
                }else{
                    console.log(data.message);
                }
            },
            error: function (data) {
                console.log(data.success);
            }
        });
    }
    var name=$(".name").val();
    var amount=$(".amount").val();
    var provinceid=$(".provinceid").val();
    var cityid=$(".cityid").val();

    var pictureid=headImgres;
    var videoid=$(".videoid").val();
    var explain=$(".explain").val();
    var lable=$(".lable").val();
    var startTime=$(".startTime").val();
    var endTime=$(".endTime").val();
    var details=$(".details").val();
    console.log(name+"-"+amount+"-"+provinceid+"-"+cityid+"-"+pictureid+"-"+videoid+"-"+explain+"-"+lable+"-"+startTime+"-"+endTime+"-"+details);

    if(headImgres==""){
        var datas = {
            "option":"update",
            "userId":localStorage.userId,
            "amount":amount,
            "name":name,
            "projectId":projectId,
            "provinceid":provinceid,
            "cityid":cityid,
            "pictureid":headImgNew,
            "videoid":videoid,
            "explain":explain,
            "classify":"",
            "cftype":"2",
            "lable":lable,
            "startTime":startTime,
            "endTime":endTime,
            "details":details
        };
    }else{
        var datas = {
            "option":"update",
            "userId":localStorage.userId,
            "amount":amount,
            "name":name,
            "projectId":projectId,
            "provinceid":provinceid,
            "cityid":cityid,
            "pictureid":pictureid,
            "videoid":videoid,
            "explain":explain,
            "classify":"",
            "cftype":"2",
            "lable":lable,
            "startTime":startTime,
            "endTime":endTime,
            "details":details
        };
    }
    
    console.log(datas)
    if(name==""||amount==""||provinceid==""||cityid==""||videoid==""||explain==""||lable==""||startTime==""||endTime==""||details==""){
        if(pictureid==""){
            layer.msg('请选择图片', {time: 1000, });
        }else{
            layer.alert('请填写完整信息！', {
              icon: 2,
              skin: 'layer-ext-moon'
            }) 
        }  
    }else{
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
                if(data.success=="n"){
                    layer.alert(data.message, {
                      icon: 2,
                      skin: 'layer-ext-moon'
                    },function(index){
                         layer.close(index);
                         window.location.reload()
                    }) 
                }else{
                    console.log(data)
                    editReturn()
                    layer.alert('修改成功！', {
                      icon: 1,
                      skin: 'layer-ext-moon'
                    },function(index){
                         layer.close(index);
                         window.location.reload()
                    }) 
                }
            }
        }); 
    }
}*/

//修改项目回报
/*function editReturn(){
    var repaidday=$(".repaidday").val();
    var datas={
        "option":"update",
        "userId":localStorage.userId,
        "repayid":repayid,
        "projectId":projectId,
        "repaidday":repaidday
    };
    // console.log(datas)
    if(repaidday==""||projectId==""){
        layer.alert('请填写完整信息！', {
          icon: 2,
          skin: 'layer-ext-moon'
        })   
    }else{
        $.ajax({
            cache:true,
            url:cucr+"/api/ClzcProjectRepay",
            type:"POST",
            data:datas,
            async:true,
            error:function(request){
                return;
            },
            success:function(data){
                // console.log(data);
            }
        });
    } 
}
*/






//修改实物回报表单
function materialSubmit(){
    var datas={
        "option":"update",
        "userId":localStorage.userId,
        "id":materialId,
        "projectId":projectId,
        "singlePrice":$(".materialPrice").val(),
        "singleNumber":$(".materialNumber").val(),
        "title":$(".materialTitle").val(),
        "explain":$(".materialExplain").val()
    }
    console.log(datas)
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectMaterial",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            if(data.success=="y"){
                console.log(data)
            }
        }
    });
}
//修改定额回报表单
function quotaSubmit(){
    var datas={
        "option":"update",
        "userId":localStorage.userId,
        "id":quotaId,
        "projectId":projectId,
        "singlePrice":$(".quotaPrice").val(),
        "singleNumber":$(".quotaNumber").val(),
        "singleRepay":$(".quotaRepay").val(),
        "title":$(".quotaTitle").val(),
        "explain":$(".quotaExplain").val()
    }
    console.log(datas)
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectQuota",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            if(data.success=="y"){
                console.log(data)
            }
        }
    });
}
//修改股份回报表单
function stockSubmit(){
    var datas={
        "option":"update",
        "userId":localStorage.userId,
        "id":stockId,
        "projectId":projectId,
        "coeff":$(".stockCoeff").val(),
        "title":$(".stockTitle").val(),
        "explain":$(".stockExplain").val()
    }
    console.log(datas)
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectStock",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            if(data.success=="y"){
                console.log(data)
            }
        }
    });
}



//计算实物份额
function materialChange(){
    var materS1=$(".totalAmount1").text();
    var materS2=$(".material1").val();
    var materSS=materS1/materS2;
    $(".material2").val(materSS)
}
//计算定额份额
function quotaChange(){
    var materS1=$(".totalAmount2").text();
    var materS2=$(".quota1").val();
    var materSS=materS1/materS2;
    $(".quota2").val(materSS)
}
//计算下方实物百分比
function materialIn1(){
    $(".materialSpan").text($(".materialPercent").val())
    $(".material1").val("")
    $(".material2").val("")
}
//计算下方定额百分比
function materialIn2(){
    $(".quotaSpan").text($(".quotaPercent").val())
    $(".quota1").val("")
    $(".quota2").val("")
    $(".quotaRepay").val("")
}
//计算下方股份百分比
function materialIn3(){
    $(".stockSpan").text($(".stockPercent").val())
}
//计算实物定额股份价格
function amountChange(){
    var materMoney=$(".materialPercent").val();
    var quotaMoney=$(".quotaPercent").val();
    var stockMoney=$(".stockPercent").val();
    $(".totalAmount1").text((materMoney/100)*($(".amount").val()))
    $(".totalAmount2").text((quotaMoney/100)*($(".amount").val()))
    $(".totalAmount3").text((stockMoney/100)*($(".amount").val()))
}
// function momeyChange1(){
//     $(".material1").val("");
//     $(".material2").val("");
// }

//提交实物回报表单
function materialSubmit1(){
    var datas={
        "option":"add",
        "userId":localStorage.userId,
        "projectId":projectId,
        "singlePrice":$(".materialPrice").val(),
        "singleNumber":$(".materialNumber").val(),
        "title":$(".materialTitle").val(),
        "explain":$(".materialExplain").val()
    }
    console.log(datas)
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectMaterial",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            if(data.success=="y"){
                console.log(data)
            }
        }
    });
}
//提交定额回报表单
function quotaSubmit1(){
    var datas={
        "option":"add",
        "userId":localStorage.userId,
        "projectId":projectId,
        "singlePrice":$(".quotaPrice").val(),
        "singleNumber":$(".quotaNumber").val(),
        "singleRepay":$(".quotaRepay").val(),
        "title":$(".quotaTitle").val(),
        "explain":$(".quotaExplain").val()
    }
    console.log(datas)
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectQuota",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            if(data.success=="y"){
                console.log(data)
            }
        }
    });
}
//提交股份回报表单
function stockSubmit1(){
    var datas={
        "option":"add",
        "userId":localStorage.userId,
        "projectId":projectId,
        "coeff":$(".stockCoeff").val(),
        "title":$(".stockTitle").val(),
        "explain":$(".stockExplain").val()
    }
    console.log(datas)
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectStock",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            if(data.success=="y"){
                console.log(data)
            }
        }
    });
}