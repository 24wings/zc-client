$(function(){
    setTimeout(function(){
        physicalList(1)
        participateList(1)
        StockList(1)
    },800)
})
// tab切换
$(function(){
    $(".tabli li").click(function(){
        var i=$(this).index();
        $(this).addClass("select").siblings().removeClass("select");
        $(".cons").eq(i).show().siblings().hide();
    })
})

// (function ($) {
//   $.getUrlParam = function (name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return unescape(r[2]); return null;
//   }
// })(jQuery);

// var projectId = $.getUrlParam('projectId');
var projectId
setTimeout(function(){
    projectId=$(".projectId").val()
    // console.log(projectId)
},100)



// 获取实物回报列表
function physicalList(e){
    var datas={
        "option":"getInfoByProjectId",
        "userId":localStorage.userId,
        "projectId":projectId,
        "beUserId":"",
        "page":e,
        "pageSize":6
    }
    var adminUserHtml="";
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
            console.log(data);
            if(data.success=="y"){
                // console.log(data)
                if(data.resData.dataList.length==0){
                   /* $(".btnblue1").hide();*/
                    adminUserHtml = "<p style='text-align:center'>暂无数据</p>"
                    $(".tableDiv1").html(adminUserHtml)
                }else{
                    for(var i=0;i<data.resData.dataList.length;i++){
                        /*var html;
                        html = '<div onclick="addMater('+"'"+data.resData.dataList[i].projectId+"'"+","+"'"+data.resData.dataList[i].materialId+"'"+')">添加实物参与人</div>'
                        $(".btnblue1").html(html)*/
                        adminUserHtml+='<tr><td class="textalign">'+(i+1)+'</td>'+
                                    '<td style="display:none">'+data.resData.dataList[i].userId+'</td>'+
                                    '<td style="display:none">'+data.resData.dataList[i].materialId+'</td>'+
                                    '<td>'+data.resData.dataList[i].userName+'</td>'+
                                    '<td>'+data.resData.dataList[i].projectName+'</td>'+
                                    '<td class="tdImg"><img src="'+cucr+data.resData.dataList[i].imgUrl+'"></td>'+
                                    '<td class="statusTd">'+data.resData.dataList[i].totalPrice+'</td>'+
                                    '<td class="tdImg">'+data.resData.dataList[i].createTime+'</td>'+
                                    '<td><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="materialReturn('+"'"+data.resData.dataList[i].userId+"'"+','+"'"+data.resData.dataList[i].mPartakeId+"'"+')"><i class="layui-icon">实物回报</i></button><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="collectionReturn('+"'"+data.resData.dataList[i].userId+"'"+','+"'"+data.resData.dataList[i].mPartakeId+"'"+')"><i class="layui-icon">实物收款</i></button></td>'+
                                    '</tr>';
                        
                    }
                    $(".tbodyList1").html(adminUserHtml)
                }
                $(".tcdPageCode1").createPage({
                    pageCount:data.resData.totalPage,
                    current:data.resData.pageIndex,
                    backFn:function(p){
                        physicalList(p)
                    }
                });
            }
        }
    });
}
// 获取定额回报列表
function participateList(e){
    var datas={
        "option":"getInfoByProjectId",
        "userId":localStorage.userId,
        "projectId":projectId,
        "beUserId":"",
        "page":e,
        "pageSize":6
    }
    var adminUserHtml="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectQuotaPartake",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data);
            if(data.success=="y"){
                if(data.resData.dataList.length==0){
                    adminUserHtml = "<p style='text-align:center'>暂无数据</p>"
                    $(".tableDiv2").html(adminUserHtml)
                }else{
                    for(var i=0;i<data.resData.dataList.length;i++){
                        adminUserHtml+='<tr><td class="textalign">'+(i+1)+'</td>'+
                                    '<td style="display:none">'+data.resData.dataList[i].userId+'</td>'+
                                    '<td style="display:none">'+data.resData.dataList[i].quotaId+'</td>'+
                                    '<td>'+data.resData.dataList[i].userName+'</td>'+
                                    '<td>'+data.resData.dataList[i].projectName+'</td>'+
                                    '<td class="tdImg"><img src="'+cucr+data.resData.dataList[i].imgUrl+'"></td>'+
                                    '<td class="statusTd">'+data.resData.dataList[i].totalPrice+'</td>'+
                                    '<td class="statusTd">'+data.resData.dataList[i].retPrice+'</td>'+
                                    '<td class="tdImg">'+data.resData.dataList[i].createTime+'</td>'+
                                    '<td><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="quotaReturn('+"'"+data.resData.dataList[i].userId+"'"+','+"'"+data.resData.dataList[i].id+"'"+')"><i class="layui-icon">定额回报</i></button><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="quotaReturns('+"'"+data.resData.dataList[i].userId+"'"+','+"'"+data.resData.dataList[i].id+"'"+')"><i class="layui-icon">定额收款</i></button></td>'+
                                    '</tr>';
                        
                    }
                    $(".tbodyList2").html(adminUserHtml)
                }
                $(".tcdPageCode2").createPage({
                    pageCount:data.resData.totalPage,
                    current:data.resData.pageIndex,
                    backFn:function(p){
                        participateList(p)
                    }
                });
            }
        }
    });
}
// 获取股份回报列表
function StockList(e){
    var datas={
        "option":"getInfoByProjectId",
        "userId":localStorage.userId,
        "projectId":projectId,
        "beUserId":"",
        "page":e,
        "pageSize":6
    }
    var adminUserHtml="";
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
            // console.log(data);
            if(data.success=="y"){
                if(data.resData.dataList.length==0){
                    adminUserHtml = "<p style='text-align:center'>暂无数据</p>"
                    $(".tableDiv3").html(adminUserHtml)
                }else{
                    for(var i=0;i<data.resData.dataList.length;i++){
                        adminUserHtml+='<tr><td class="textalign">'+(i+1)+'</td>'+
                                    '<td style="display:none">'+data.resData.dataList[i].userId+'</td>'+
                                    '<td style="display:none">'+data.resData.dataList[i].stockId+'</td>'+
                                    '<td>'+data.resData.dataList[i].userName+'</td>'+
                                    '<td>'+data.resData.dataList[i].projectName+'</td>'+
                                    '<td class="tdImg"><img src="'+cucr+data.resData.dataList[i].imgUrl+'"></td>'+
                                    '<td class="statusTd">'+data.resData.dataList[i].totalPrice+'</td>'+
                                    '<td class="statusTd">'+data.resData.dataList[i].retPrice+'</td>'+
                                    '<td class="tdImg">'+data.resData.dataList[i].createTime+'</td>'+
                                    '<td><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="stockReturn('+"'"+data.resData.dataList[i].userId+"'"+','+"'"+data.resData.dataList[i].id+"'"+')"><i class="layui-icon">股份回报</i></button><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="stockReturns('+"'"+data.resData.dataList[i].userId+"'"+','+"'"+data.resData.dataList[i].id+"'"+')"><i class="layui-icon">股份收款</i></button></td>'+
                                    '</tr>';
                        
                    }
                    $(".tbodyList3").html(adminUserHtml)
                }
                $(".tcdPageCode3").createPage({
                    pageCount:data.resData.totalPage,
                    current:data.resData.pageIndex,
                    backFn:function(p){
                        StockList(p)
                    }
                });
            }
        }
    });
}

// 查看详情
function checkDetails(e,cfType){
    console.log(e+"---"+cfType);
    var projectIdVal=e;
    var projectType=cfType;
    layer.open({
        type: 2,
        title: '项目详情',
        shadeClose: true,
        shade: 0.4,
        area: ['80%', '80%'],
        content: './adminAuditDetail.html?projectId='+projectIdVal+'&cfType='+projectType+'',
    });
}
//实物回报
function materialReturn(userId,partakeId){
    layer.confirm('确定实物回报？', {
          btn: ['是','否'] //按钮
        }, function(index){
            var datas={
                "option":"setReturn",
                "userId":userId,
                "partakeId":partakeId
            }
            console.log(datas)
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
                    console.log(data)
                }
            })
            layer.close(index);
        },function(index){
            layer.close(index);
        }
    )
}
//实物收款
function collectionReturn(userId,partakeId){
    layer.confirm('确定实物收款？', {
          btn: ['是','否'] //按钮
        }, function(index){
            var datas={
                "option":"setReceivables",
                "userId":userId,
                "partakeId":partakeId
            }
            console.log(datas)
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
                    console.log(data)
                }
            })
            layer.close(index);
        },function(index){
            layer.close(index);
        }
    )
}
//定额回报
function quotaReturn(userId,partakeId){
    layer.confirm('确定定额回报？', {
          btn: ['是','否'] //按钮
        }, function(index){
            var datas={
                "option":"setReturn",
                "userId":userId,
                "partakeId":partakeId
            }
            console.log(datas)
            $.ajax({
                cache:true,
                url:cucr+"/api/ClzcProjectQuotaPartake",
                type:"POST",
                data:datas,
                async:true,
                error:function(request){
                    return;
                },
                success:function(data){
                    console.log(data)
                }
            })
            layer.close(index);
        },function(index){
            layer.close(index);
        }
    )
}
//定额收款
function quotaReturns(userId,partakeId){
    layer.confirm('确定定额收款？', {
          btn: ['是','否'] //按钮
        }, function(index){
            var datas={
                "option":"setReceivables",
                "userId":userId,
                "partakeId":partakeId
            }
            console.log(datas)
            $.ajax({
                cache:true,
                url:cucr+"/api/ClzcProjectQuotaPartake",
                type:"POST",
                data:datas,
                async:true,
                error:function(request){
                    return;
                },
                success:function(data){
                    console.log(data)
                }
            })
            layer.close(index);
        },function(index){
            layer.close(index);
        }
    )
}
//股权回报
function stockReturn(userId,partakeId){
    layer.confirm('确定股份回报？', {
          btn: ['是','否'] //按钮
        }, function(index){
            var datas={
                "option":"setReturn",
                "userId":userId,
                "partakeId":partakeId
            }
            console.log(datas)
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
                    console.log(data)
                }
            })
            layer.close(index);
        },function(index){
            layer.close(index);
        }
    )
}
//定额收款
function stockReturns(userId,partakeId){
    layer.confirm('确定股份收款？', {
          btn: ['是','否'] //按钮
        }, function(index){
            var datas={
                "option":"setReceivables",
                "userId":userId,
                "partakeId":partakeId
            }
            console.log(datas)
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
                    console.log(data)
                }
            })
            layer.close(index);
        },function(index){
            layer.close(index);
        }
    )
}
// 添加实物参与人
function addMater(){
    var projectId = $(".projectId").val();
    var materialId = $(".materialId").val();
    console.log(projectId)
    console.log(materialId)
    var datas={
        "option":"getMaterialInfo",
        "userId":"",
        "id":materialId
    }
    console.log(datas)
    //共发行份数
    var singleNumber1;
    //单份金额
    var singlePrice1;
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectMaterial",
        type:"POST",
        data:datas,
        async:false,
        error:function(request){
            return;
        },
        success:function(data){
            singleNumber1=data.resData.singleNumber;
            singlePrice1=data.resData.singlePrice;
            console.log(data.resData.singleNumber)
        }
    })
    var conHtml='<div class="addAdminConAl">'+
                '<div>'+
                    '<span>参与人姓名：</span>'+
                    '<input class="partUserName" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>参与份数：</span>'+
                    '<input class="number1" type="text">(共发行'+singleNumber1+'份)'+
                '</div>'+
                '<div>'+
                    '<span>单份金额：</span>'+
                    '<input class="singlePrice1" value='+"'"+singlePrice1+"'"+' type="text">'+
                '</div>'+
                '<div>'+
                    '<span>总金额：</span>'+
                    '<input class="totalPrice1" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>收货人：</span>'+
                    '<input class="userName1" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>收货人电话：</span>'+
                    '<input class="userPhone1" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>邮编：</span>'+
                    '<input class="zipCode1" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>收货人地址：</span>'+
                    '<input class="address1" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>参与人电话：</span>'+
                    '<input class="phone1" type="text">'+
                '</div>'+
                '<div class="clear">'+
                    '<div class="addAdminBtn" onclick="addAdminUser('+"'"+projectId+"'"+","+"'"+materialId+"'"+')">确定提交</div>'+
                '</div></div>';
    layer.open({
      type: 1,
      title:"添加参与人",
      skin: 'layui-layer-rim',
      area: ['820px', '640px'],
      content: conHtml
    });
}
function addAdminUser(projectId,materialId){
    var datas={
        "option":"sysAdd",
        "userId":"",
        "projectId":projectId,
        "materialId":materialId,
        "number":$(".number1").val(),
        "singlePrice":$(".singlePrice1").val(),
        "totalPrice":$(".totalPrice1").val(),
        "userName":$(".userName1").val(),
        "userPhone":$(".userPhone1").val(),
        "zipCode":$(".zipCode1").val(),
        "address":$(".address1").val(),
        "phone":$(".phone1").val(),
        "partUserName":$(".partUserName").val()
    }
    console.log(datas)
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
                console.log(data)
                layer.msg('支持成功');
                setTimeout(function(){
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                    window.parent.location.reload();
                }, 1000)
            }else{
                layer.msg(data.message);
            }
        }
    })
}
// 添加定额参与人
function addQuota(){
    var projectId = $(".projectId").val();
    var quotaId = $(".quotaId").val();
    console.log(projectId)
    console.log(quotaId)
    var datas={
        "option":"getQuotaInfo",
        "userId":"",
        "id":quotaId
    }
    console.log(datas)
    //共发行份数
    var singleNumber2;
    //单份金额
    var singlePrice2;
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectQuota",
        type:"POST",
        data:datas,
        async:false,
        error:function(request){
            return;
        },
        success:function(data){
            singleNumber2=data.resData.singleNumber;
            singlePrice2=data.resData.singlePrice;
            console.log(data.resData.singleNumber)
        }
    })
    var conHtml='<div class="addAdminConAl">'+
                '<div>'+
                    '<span>参与人姓名：</span>'+
                    '<input class="partUserName2" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>参与份数：</span>'+
                    '<input class="number2" type="text">(共发行'+singleNumber2+'份)'+
                '</div>'+
                '<div>'+
                    '<span>单份金额：</span>'+
                    '<input class="singlePrice2" value='+"'"+singlePrice2+"'"+' type="text">'+
                '</div>'+
                '<div>'+
                    '<span>总金额：</span>'+
                    '<input class="totalPrice2" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>参与人电话：</span>'+
                    '<input class="phone2" type="text">'+
                '</div>'+
                '<div class="clear">'+
                    '<div class="addAdminBtn" onclick="addAdminUser1('+"'"+projectId+"'"+","+"'"+quotaId+"'"+')">确定提交</div>'+
                '</div></div>';
    layer.open({
      type: 1,
      title:"添加参与人",
      skin: 'layui-layer-rim',
      area: ['820px', '640px'],
      content: conHtml
    });
}
function addAdminUser1(projectId,quotaId){
    var datas={
        "option":"sysAdd",
        "userId":"",
        "projectId":projectId,
        "quotaId":quotaId,
        "number":$(".number2").val(),
        "singlePrice":$(".singlePrice2").val(),
        "totalPrice":$(".totalPrice2").val(),
        "phone":$(".phone2").val(),
        "partUserName":$(".partUserName2").val()
    }
    console.log(datas)
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectQuotaPartake",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            if(data.success=="y"){
                console.log(data)
                layer.msg('支持成功');
                setTimeout(function(){
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                    window.parent.location.reload();
                }, 1000)  
            }else{
                layer.msg(data.message);
            }  
        }
    })
}
// 添加股份参与人
function addStock(){
    var projectId = $(".projectId").val();
    var stockId = $(".stockId").val();
    console.log(projectId)
    console.log(stockId)
    var conHtml='<div class="addAdminConAl">'+
                '<div>'+
                    '<span>参与人姓名：</span>'+
                    '<input class="partUserName3" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>参与金额：</span>'+
                    '<input class="totalPrice3" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>参与人电话：</span>'+
                    '<input class="phone3" type="text">'+
                '</div>'+
                '<div class="clear">'+
                    '<div class="addAdminBtn" onclick="addAdminUser2('+"'"+projectId+"'"+","+"'"+stockId+"'"+')">确定提交</div>'+
                '</div></div>';
    layer.open({
      type: 1,
      title:"添加参与人",
      skin: 'layui-layer-rim',
      area: ['820px', '640px'],
      content: conHtml
    });
}
function addAdminUser2(projectId,stockId){
    var datas={
        "option":"sysAdd",
        "userId":"",
        "projectId":projectId,
        "stockId":stockId,
        "totalPrice":$(".totalPrice3").val(),
        "phone":$(".phone3").val(),
        "partUserName":$(".partUserName3").val()
    }
    console.log(datas)
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
                console.log(data)
                layer.msg('支持成功');
                setTimeout(function(){
                    var index = parent.layer.getFrameIndex(window.name);
                    parent.layer.close(index);
                    window.parent.location.reload();
                }, 1000)  
            }else{
                layer.msg(data.message);
            }  
        }
    })
}