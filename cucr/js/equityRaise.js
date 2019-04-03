//省份区域选择
//定义省份id
var regionId1,regionId2,regionId3;
//定义省份文字
var regionTx1,regionTx2,regionTx3;
function regionClick(){
    var datas = {
            "pId":"0",
            "userId":localStorage.userId,
        };
    $.ajax({
        cache:true,
        url:cucr+"/api/SysArea",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            $(".dlregion1>dd").remove();
            var html="";
            for(var i=0;i<data.resData.length;i++){
                html += "<dd onclick=d2("+"'"+data.resData[i].name+"'"+","+data.resData[i].id+")>"+data.resData[i].name+"</dd>";
            }
            $(".dlregion1").append(html)
        }
    }); 
    $(".dlregion1").show()
};
function d2(n,id){
    regionId1=id;
    regionTx1=n;
    var datas = {
        "pId":id,
        "userId":localStorage.userId,
    };
    $.ajax({
        cache:true,
        url:cucr+"/api/SysArea",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            $(".dlregion1>dd").remove();
            var html="";
            for(var i=0;i<data.resData.length;i++){
                html += "<dd onclick=d3("+"'"+data.resData[i].name+"'"+","+data.resData[i].id+")>"+data.resData[i].name+"</dd>";
            }
            $(".dlregion1").append(html)
        }
    }); 
    
};
function d3(n,id){
    regionId2=id;
    regionTx2=n;
    $(".region").val(regionTx1+"--"+regionTx2)
    provinceid=regionId1;
    cityid=regionId2;
    $(".provinceid").val(provinceid);
    $(".cityid").val(cityid);
    $(".dlregion1").hide();
};

var headImgres="";
function sendEquery(){
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
    var days=$(".days").val();
    var provinceid=$(".provinceid").val();
    var cityid=$(".cityid").val();
    var supportcount=$(".supportcount").val();
    var pictureid=headImgres;
    var videoid=$(".videoid").val();
    var explain=$(".explain").val();
    var lable=$(".lable").val();
    var employeesnum=$(".employeesnum").val();
    var pamount=$(".pamount").val();
    var shares=$(".shares").val();
    var minmoney=$(".minmoney").val();
    var isrecomm=$("input[name='isrecomm']:checked").val();
    var startTime=$(".startTime").val();
    var endTime=$(".endTime").val();
    var details=$(".details").val();

    var repaidday=$(".repaidday").val();
    var mode=$("input[name='mode']:checked").val();
    var repaycoeff=$(".repaycoeff").val();
    var sharemoney=$(".sharemoney").val();
    var isbonus=$("input[name='isbonus']:checked").val();
    var bonusmoney=$(".bonusmoney").val();
    var content=$(".content").val();
    // console.log(name+"-"+amount+"-"+days+"-"+provinceid+"-"+cityid+"-"+supportcount+"-"+pictureid+"-"+videoid+"-"+explain+"-"+lable+"-"+minmoney+"-"+isrecomm+"-"+startTime+"-"+endTime+"-"+details);


    var datas = {
        "option":"add",
        "userId":localStorage.userId,
        "amount":amount,
        "name":name,
        "days":days,
        "provinceid":provinceid,
        "cityid":cityid,
        "supportcount":supportcount,
        "pictureid":pictureid,
        "videoid":videoid,
        "explain":explain,
        "classify":"",
        "cftype":"2",
        "lable":lable,
        "employeesnum":employeesnum,
        "pamount":pamount,
        "shares":shares,
        "minmoney":minmoney,
        "isrecomm":isrecomm,
        "startTime":startTime,
        "endTime":endTime,
        "details":details,
        "mode":$("input[name='mode']:checked").val(),
        "copies":$(".copies").val(),
        "single":$(".single").val(),
        "maxcopies":$(".maxcopies").val()
    };
    if(name==""||amount==""||days==""||provinceid==""||cityid==""||supportcount==""||pictureid==""||videoid==""||explain==""||lable==""||minmoney==""||isrecomm==""||startTime==""||endTime==""||details==""||repaidday==""||mode==""||repaycoeff==""||sharemoney==""||isbonus==""||bonusmoney==""||content==""){
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
                // console.log(data)
                if(data.success=="y"){
                    addReturn(data.resData)
                    layer.alert('项目发布成功！', {
                      icon: 1,
                      skin: 'layer-ext-moon',
                    },function (index) {
                        layer.close(index);
                        window.location.replace("/personal.html");
                      }
                    ) 
                }
            }
        });
    } 
}
//添加项目回报
function addReturn(projectId){
    var repaidday=$(".repaidday").val();
    var mode=$("input[name='mode']:checked").val();
    var repaycoeff=$(".repaycoeff").val();
    var sharemoney=$(".sharemoney").val();
    var isbonus=$("input[name='isbonus']:checked").val();
    var bonusmoney=$(".bonusmoney").val();
    var content=$(".content").val();
    // console.log(repaidday+"---"+mode+"---"+repaycoeff+"---"+sharemoney+"---"+isbonus+"---"+bonusmoney+"---"+content)
    var datas={
        "option":"add",
        "userId":localStorage.userId,
        "projectId":projectId,
        "repaidday":repaidday,
        "mode":mode,
        "repaycoeff":repaycoeff,
        "sharemoney":sharemoney,
        "isbonus":isbonus,
        "bonusmoney":bonusmoney,
        "content":content
    };
    if(repaidday==""||mode==""||repaycoeff==""||sharemoney==""||isbonus==""||bonusmoney==""||content==""||projectId==""){
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
//回报方式下面的显影
function modeS(){
    $(".modeSH").show()
}
function modeH(){
    $(".modeSH").hide();
    $(".copies").val("");
    $(".single").val("");
    $(".maxcopies").val("");
}