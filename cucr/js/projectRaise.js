//获取项目分类
$(function() {
        var datas = {
            "option": "getList",
            "userId": localStorage.userId
        };
        $.ajax({
            cache: true,
            url: cucr + "/api/ClzcProjectClass",
            type: "POST",
            data: datas,
            async: true,
            error: function(request) {
                return;
            },
            success: function(data) {
                var html = "";
                if (data.success == "y") {
                    for (var i = 0; i < data.resData.length; i++) {
                        html += '<p><input type="radio" name="cftype" value="' + data.resData[i].id + '"/><label>' + data.resData[i].name + '</label></p>'
                    }
                    $(".cftypeDiv").append(html)
                    $(".cftypeDiv>p:first-child>input").attr("checked", "checked")
                }
            }
        });
    })
    //省份区域选择
    //定义省份id
var regionId1, regionId2, regionId3;
//定义省份文字
var regionTx1, regionTx2, regionTx3;

function regionClick() {
    var datas = {
        "pId": "0",
        "userId": localStorage.userId,
    };
    $.ajax({
        cache: true,
        url: cucr + "/api/SysArea",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            $(".dlregion1>dd").remove();
            var html = "";
            for (var i = 0; i < data.resData.length; i++) {
                html += "<dd onclick=d2(" + "'" + data.resData[i].name + "'" + "," + data.resData[i].id + ")>" + data.resData[i].name + "</dd>";
            }
            $(".dlregion1").append(html)
        }
    });
    $(".dlregion1").show()
};

function d2(n, id) {
    regionId1 = id;
    regionTx1 = n;
    var datas = {
        "pId": id,
        "userId": localStorage.userId,
    };
    $.ajax({
        cache: true,
        url: cucr + "/api/SysArea",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            $(".dlregion1>dd").remove();
            var html = "";
            for (var i = 0; i < data.resData.length; i++) {
                html += "<dd onclick=d3(" + "'" + data.resData[i].name + "'" + "," + data.resData[i].id + ")>" + data.resData[i].name + "</dd>";
            }
            $(".dlregion1").append(html)
        }
    });

};

function d3(n, id) {
    regionId2 = id;
    regionTx2 = n;
    $(".region").val(regionTx1 + "--" + regionTx2)
    provinceid = regionId1;
    cityid = regionId2;
    $(".provinceid").val(provinceid);
    $(".cityid").val(cityid);
    $(".dlregion1").hide();
};
//上传图片
var headImgres = "";

function imgdown() {
    var datas = new FormData($('#uploadForm')[0]);
    $.ajax({
        url: cucr + '/api/Files',
        type: 'POST',
        data: datas,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            console.log(data)
            if (data.success) {
                headImgres = data.resData.fileId;
                $(".layui-layer").fadeOut();
                $(".layui-layer-shade").fadeOut();
                $(".layerPhoto").text("图片已选择")
            } else {
                console.log(data.message);
            }
        },
        error: function(data) {
            console.log(data.success);
        }
    });
}

function uploadSubmit() {
    imgdown();
}
//修改头像弹窗
function layerPhoto() {
    layer.open({
        type: 1,
        title: "上传封面",
        skin: 'layui-layer-rim', //加上边框
        area: ['420px', '314px'], //宽高
        content: '<dd style="margin-top:2rem;margin-bottom: -1.5rem;"><span style="display:none;cursor:pointer">上传封面</span><form id="uploadForm" enctype="multipart/form-data" ><div class="form-group" style="margin-left: 6rem;margin-top: -1.5rem;"><div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload"><div class="fileinput-new thumbnail" style="width: 200px;height: auto;max-height:150px;"><img id="picImg" style="width: 100%;height:100%" src="" alt="" /></div><div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div><div><span class="btn btn-primary btn-file" style="background:white;border:1px solid white;width:50%;text-align: left;cursor: pointer;"><span class="fileinput-new" style="width:50%;text-align:left;cursor: pointer;color: #999;">选择图片</span><span class="fileinput-exists" style="width:100%;text-align:left;cursor: pointer;color:#333">换一张</span><input type="file" name="pic1" val="1" id="picID" accept="image/gif,image/jpeg,image/x-png" /></span></div></div></div><div id="uploadSubmit" onclick="uploadSubmit()" style="width: 100%;" class="btn btn-info">保存</div></form></dd>'
    });
}
/*function raiseSendBtnck1(){
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
    var cftype=$("input[name='cftype']:checked").val();
    var lable=$(".lable").val();
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
    // console.log(name+"-"+amount+"-"+days+"-"+provinceid+"-"+cityid+"-"+supportcount+"-"+pictureid+"-"+videoid+"-"+explain+"-"+cftype+"-"+lable+"-"+minmoney+"-"+isrecomm+"-"+startTime+"-"+endTime+"-"+details);
    var datas = {
        "option":"add",
        "userId":localStorage.userId,
        "name":name,
        "amount":amount,
        "days":days,
        "classify":cftype,
        "provinceid":provinceid,
        "cityid":cityid,
        "supportcount":supportcount,
        "pictureid":pictureid,
        "videoid":videoid,
        "explain":explain,
        "details":details,
        "cftype":"1",
        "lable":lable,
        "employeesnum":"",
        "pamount":"",
        "shares":"",
        "minmoney":minmoney,
        "isrecomm":isrecomm,
        "startTime":startTime,
        "endTime":endTime,
        "mode":$("input[name='mode']:checked").val(),
        "copies":$(".copies").val(),
        "single":$(".single").val(),
        "maxcopies":$(".maxcopies").val()
    };
    console.log(datas)
    if(name==""||amount==""||days==""||provinceid==""||cityid==""||supportcount==""||pictureid==""||videoid==""||explain==""||cftype==""||lable==""||minmoney==""||isrecomm==""||startTime==""||endTime==""||details==""||repaidday==""||mode==""||repaycoeff==""||sharemoney==""||isbonus==""||bonusmoney==""||content==""){
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
}*/
//添加项目回报
/*function addReturn(projectId){
    var repaidday=$(".repaidday").val();
    var mode=$("input[name='mode']:checked").val();
    var repaycoeff=$(".repaycoeff").val();
    var sharemoney=$(".sharemoney").val();
    var isbonus=$("input[name='isbonus']:checked").val();
    var bonusmoney=$(".bonusmoney").val();
    var content=$(".content").val();
    // console.log(repaidday+"---"+mode+"---"+repaycoeff+"---"+sharemoney+"---"+isbonus+"---"+bonusmoney+"---"+content)
    console.log(mode)
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
}*/
//回报方式下面的显影
function modeS() {
    $(".modeSH").show()
}

function modeH() {
    $(".modeSH").hide();
    $(".copies").val("");
    $(".single").val("");
    $(".maxcopies").val("");
}
// 第一步显影
function projectA1btn() {
    if ($(".name").val() == "" || $(".provinceid").val() == "" || $(".cityid").val() == "" || $(".explain").val() == "" || $(".fileinput-preview>img").attr("src") == undefined || $(".companyName").val() == "" || $(".projectNo").val() == "") {
        layer.msg('填写完整信息');
    } else {
        $(".projectA1").hide();
        $(".projectA2").show();
    }
}
var details = "";
//第二步显影
function projectA2btn() {
    if ($(".amount").val() == "" || $(".startTime").val() == "" || $(".endTime").val() == "" || $("input[name='cftype']:checked").val() == "" || $(".lable").val() == "" || $(".income").val() == "" || $(".cost").val() == "") {

        layer.msg('填写完整信息');
    } else {
        $(".projectA2").hide();
        $(".projectA3").show();
    }

    var ue = UE.getEditor('editor');
    var arr = [];
    arr.push(UE.getEditor('editor').getContent());
    var _adrobj = arr.join("\n").replace(/\"/g, "'")
    var b = new Base64();
    var str = b.encode(_adrobj);

    details = str;

    $(".projectA3").hide();
    $(".projectA4").show();
}
//第三步显影


// function projectA3btn(){


// }
// 第四步显影
var projectId;

function projectA4btn() {
    // $(".totalAmount").text($(".amount").val())
    var materMoney = $(".materialPercent").val();
    var quotaMoney = $(".quotaPercent").val();
    var stockMoney = $(".stockPercent").val();
    $(".totalAmount1").text((materMoney / 100) * ($(".amount").val()))
    $(".totalAmount2").text((quotaMoney / 100) * ($(".amount").val()))
    $(".totalAmount3").text((stockMoney / 100) * ($(".amount").val()))

    $(".materialSpan").text($(".materialPercent").val());
    $(".quotaSpan").text($(".quotaPercent").val());
    $(".stockSpan").text($(".stockPercent").val());
    if ($(".materialPercent").val() == "") {
        $(".materialDl").hide()
    }
    if ($(".quotaPercent").val() == "") {
        $(".quotaDl").hide()
    }
    if ($(".stockPercent").val() == "") {
        $(".stockDl").hide()
    }
    //提交表单
    if ($(".fileinput-preview>img").attr("src") != undefined) {
        var datas = new FormData($('#uploadForm')[0]);
        $.ajax({
            url: cucr + '/api/Files',
            type: 'POST',
            data: datas,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                console.log(data);
                if (data.success) {
                    // console.log(data.resData);
                    headImgres = data.resData.fileId;
                } else {
                    // console.log(data.message);
                }
            },
            error: function(data) {
                // console.log(data.success);
            }
        });
    }
    var name = $(".name").val();
    var amount = $(".amount").val();
    var provinceid = $(".provinceid").val();
    var cityid = $(".cityid").val();
    var region = $(".region").val();
    var pictureid = headImgres;
    var videoid = $(".videoid").val();
    var explain = $(".explain").val();
    var cftype = $("input[name='cftype']:checked").val();
    var lable = $(".lable").val();
    // var details=$(".details").val();
    var startTime = $(".startTime").val();
    var endTime = $(".endTime").val();
    var materialPercent = $(".materialPercent").val();
    var materialPrice = (materialPercent / 100) * ($(".amount").val());
    var quotaPercent = $(".quotaPercent").val();
    var quotaPrice = (quotaPercent / 100) * ($(".amount").val());
    var stockPercent = $(".stockPercent").val();
    var stockPrice = (stockPercent / 100) * ($(".amount").val());
    var projectNo = $(".projectNo").val();
    var companyName = $(".companyName").val();
    let income = $(".income").val();
    let cost = $(".cost").val();
    var datas = {
        "option": "add",
        "userId": localStorage.userId,
        "name": name,
        "projectNo": projectNo,
        "companyName": companyName,
        "amount": amount,
        "classify": cftype,
        "provinceid": provinceid,
        "cityid": cityid,
        "region": region,
        "pictureid": pictureid,
        "videoid": videoid,
        "explain": explain,
        "details": details,
        "lable": lable,
        "startTime": startTime,
        "endTime": endTime,
        "materialPercent": materialPercent,
        "materialPrice": materialPrice,
        "quotaPercent": quotaPercent,
        "quotaPrice": quotaPrice,
        "stockPercent": stockPercent,
        "isrecomm": '',
        "stockPrice": stockPrice,
        "repayTime": $(".repaidday").val(),
        "income": income,
        "cost": cost
    };
    console.log(datas)
    $.ajax({
        cache: true,
        // http://192.168.1.99:8899/api/ClzcProject
        // url: "http://192.168.1.99:8899/api/ClzcProject",
        url: cucr + "/api/ClzcProject",
        // headers: { "Content-Type": "application/json" },
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            if (data.success == "y") {
                projectId = data.resData
                console.log(data.resData)
                $(".projectA4").hide();
                $(".projectA5").show();
                console.log("成功")
            }
        }
    });
}
//计算实物份额
function materialChange() {
    var materS1 = $(".totalAmount1").text();
    var materS2 = $(".material1").val();
    var materSS = materS1 / materS2;
    $(".material2").val(materSS)
}
//计算定额份额
function quotaChange() {
    var materS1 = $(".totalAmount2").text();
    var materS2 = $(".quota1").val();
    var materSS = materS1 / materS2;
    $(".quota2").val(materSS)
}
//提交实物回报表单
function materialSubmit() {
    var datas = {
        "option": "add",
        "userId": localStorage.userId,
        "projectId": projectId,
        "singlePrice": $(".materialPrice").val(),
        "singleNumber": $(".materialNumber").val(),
        "title": $(".materialTitle").val(),
        "explain": $(".materialExplain").val()
    }
    console.log(datas)
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectMaterial",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            if (data.success == "y") {
                console.log(data)
            }
        }
    });
}
//提交定额回报表单
function quotaSubmit() {
    var datas = {
        "option": "add",
        "userId": localStorage.userId,
        "projectId": projectId,
        "singlePrice": $(".quotaPrice").val(),
        "singleNumber": $(".quotaNumber").val(),
        "singleRepay": $(".quotaRepay").val(),
        "title": $(".quotaTitle").val(),
        "explain": $(".quotaExplain").val()
    }
    console.log(datas)
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectQuota",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            if (data.success == "y") {
                console.log(data)
            }
        }
    });
}
//提交股份回报表单
function stockSubmit() {
    var datas = {
        "option": "add",
        "userId": localStorage.userId,
        "projectId": projectId,
        "coeff": $(".stockCoeff").val(),
        "title": $(".stockTitle").val(),
        "explain": $(".stockExplain").val()
    }
    console.log(datas)
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectStock",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            if (data.success == "y") {
                console.log(data)
            }
        }
    });
}
//发布众筹项目
function raiseSendBtnck() {
    // if($(".materialPrice").val()==""||$(".materialNumber").val()==""||$(".materialTitle").val()==""||$(".materialExplain").val()==""||$(".quotaPrice").val()==""||$(".quotaNumber").val()==""||$(".quotaTitle").val()==""||$(".quotaExplain").val()==""||$(".stockCoeff").val()==""||$(".stockTitle").val()==""||$(".stockExplain").val()==""){
    //     layer.msg('请将信息填写完整', {time: 1000, });
    // }else{
    materialSubmit();
    quotaSubmit();
    stockSubmit();
    layer.alert('项目创建成功，请到审核列表提交审核', {
            icon: 1,
            skin: 'layer-ext-moon',
        }, function(index) {
            layer.close(index);
            window.location.replace("/cucr/personal.html");
        })
        // }  
}



// 收益计算




$(function() {
    $(".income").keyup(() => {
        let income = $(".income").val();
        let cost = $(".cost").val();
        let earnings = $(".earnings ").html();
        let earningsjg
        earningsjg = income - cost - (income * 0.088);
        $(".sya>small").text(earningsjg + "元")
    })
    $(".cost").keyup(() => {
        let income = $(".income").val();
        let cost = $(".cost").val();
        let earnings = $(".earnings ").html();
        let earningsjg
        earningsjg = income - cost - (income * 0.088);
        $(".sya>small").text(earningsjg + "元")


    })
})