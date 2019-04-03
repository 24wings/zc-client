//定义省份id
var regionId1,regionId2,regionId3;
$(function(){
    setTimeout(function(){
        //console.log($(".editAddid").val());
        //根据地址id获取详情
        var datas={
            "option":"getAddressInfo",
            "userId":localStorage.userId,
            "addId":$(".editAddid").val()
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
                if(data.success="y"){
                    console.log(data);
                    regionId1=data.resData.provinceid;
                    regionId2=data.resData.cityid;
                    regionId3=data.resData.areaId;
                    regionInfo=data.resData.region;
                    $(".region").val(data.resData.region);
                    $(".address").val(data.resData.address);
                    $(".zipCode").val(data.resData.zipCode);
                    $(".userName").val(data.resData.userName);
                    $(".userPhone").val(data.resData.userPhone);
                    if(data.resData.isDefault=="1"){
                        $(".isDefault1").attr("checked",'checked');
                    }else{
                        $(".isDefault2").attr("checked",'checked');
                    };
                }else{
                    layer.msg(data.message);
                }
            }
        })
    },100)
})
//省份区域选择
//定义省份文字
var regionTx1,regionTx2,regionTx3;
//定义省份城市区域文字
var regionInfo;
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
    if(regionTx1=="台湾省"||regionTx1=="香港特别行政区"||regionTx1=="澳门特别行政区"){
        $(".region").val(regionTx1)
        $(".provinceId").val(regionId1)
        $(".dlregion1").hide();
        $(".dlregion1>dd").remove(); 
    }
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
            // console.log(data.resData);
            var html=""
            for(var i=0;i<data.resData.length;i++){
                html += "<dd  onclick=hidedd("+"'"+data.resData[i].name+"'" +","+data.resData[i].id+")>"+data.resData[i].name+"</dd>";
            }
            $(".dlregion1").append(html)
        }
    }); 
    
};
function hidedd(n,id){
    regionId3=id;
    regionTx3=n;
    regionInfo=regionTx1+"-"+regionTx2+"-"+regionTx3
    $(".region").val(regionInfo)
    $(".provinceId").val(regionId1)
    $(".cityId").val(regionId2)
    $(".areaId").val(regionId3)
    $(".dlregion1").hide();
    $(".dlregion1>dd").remove(); 
};

function btnOrder(){
    if($(".region").val()==""||$(".address").val()==""||$(".userName").val()==""||$(".userPhone").val()==""){
        layer.alert("请将地址信息填写完整！")
    }else{
        if(!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test($(".userPhone").val()))){
            layer.alert("手机号不正确！")
        }else{
            var datas={
                "option":"update",
                "addId":$(".editAddid").val(),
                "userId":localStorage.userId,
                "provinceid":regionId1,
                "cityid":regionId2,
                "areaid":regionId3,
                "region":regionInfo,
                "zipCode":$(".zipCode").val(),
                "address":$(".address").val(),
                "userName":$(".userName").val(),
                "userPhone":$(".userPhone").val(),
                "isDefault":$('input[name="isDefault"]:checked').val()
            }
            console.log(datas)
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
                        layer.msg('地址修改成功');
                        setTimeout(function(){
                            window.parent.location.reload();
                        }, 1000)
                    }else{
                        layer.msg(data.message);
                    }
                }
            })
        }
    }
}
//手机号验证
$(function(){
    $(".userPhone").blur(function(){ 
        if(!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test($(".userPhone").val()))){
            layer.alert("手机号不正确！")
        } 
    })
})