// 获取管理员列表
$(function(){
    adminAuditList(1)
})

function adminAuditList(e){
    var datas = {
        "option":"getAdminExamList",
        "userId":localStorage.sysUserId,
        "page":e,
        "pageSize":6,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "isrecomm":"",
        "state":""
    };
    var adminAuditHtml="";
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
            if(data.success=="y"){
                for(var i=0;i<data.resData.dataList.length;i++){
                    adminAuditHtml+='<tr><td class="textalign">'+(i+1)+'</td>'+
                                '<td>'+data.resData.dataList[i].name+'</td>'+
                                '<td>'+data.resData.dataList[i].companyName+'</td>'+
                                '<td>'+data.resData.dataList[i].projectNo+'</td>'+
                                '<td onclick=lookPhoto('+"'"+cucr+data.resData.dataList[i].pictureUrl+"'"+') class="tdImg"><img src="'+cucr+data.resData.dataList[i].pictureUrl+'"></td>'+
                                '<td class="statusTd">'+data.resData.dataList[i].stateText+'</td>'+
                                '<td class="statusTd">'+data.resData.dataList[i].isrecommText+'</td>'+
                                '<td><a class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1" onclick="checkDetails('+"'"+data.resData.dataList[i].projectId+"'"+','+"'"+data.resData.dataList[i].cfType+"'"+')"><i class="layui-icon">查看详情</i></a><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="approved('+"'"+data.resData.dataList[i].projectId+"'"+','+"'"+data.resData.dataList[i].state+"'"+')"><i class="layui-icon">审核</i></button><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="rejected('+"'"+data.resData.dataList[i].projectId+"'"+','+"'"+data.resData.dataList[i].state+"'"+')"><i class="layui-icon">驳回</i></button><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="shelves('+"'"+data.resData.dataList[i].projectId+"'"+')"><i class="layui-icon">下架</i></button><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="putaway('+"'"+data.resData.dataList[i].projectId+"'"+')"><i class="layui-icon">上架</i></button><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="recommended('+"'"+data.resData.dataList[i].projectId+"'"+')"><i class="layui-icon">设置是否推荐</i></button></td>'+
                                '</tr>';
                    
                }
                $(".tbodyList").html(adminAuditHtml)
                $(".tcdPageCode").createPage({
                    pageCount:data.resData.totalPage,
                    current:data.resData.pageIndex,
                    backFn:function(p){
                        adminAuditList(p)
                    }
                });
            }
        }
    });
}
function lookPhoto(e){
    window.open(e)
}
//设置是否推荐
function recommended(e){
    var html='<div class="recommendiv">'+
                '<span>是否推荐：</span>'+
                '<input type="radio" class="recommend" name="recommend" value="1" checked />'+
                '<label class="labelr">是</label>'+
                '<input type="radio" class="recommend" name="recommend" value="2" />'+
                '<label>否</label>'+
            '</div>'+
            '<div class="recommenBtn">'+
                '<button onclick="recommendSubmit('+"'"+e+"'"+')">确定</button>'+
            '</div>';
    layer.open({
      type: 1,
      title:"设置是否推荐",
      skin: 'layui-layer-rim', //加上边框
      area: ['420px', '240px'], //宽高
      content: html
    });
}
function recommendSubmit(e){
        var datas={
            "option":"setRecommend",
            "userId":localStorage.sysUserId,
            "projectId":e,
            "isrecomm":$("input[name='recommend']:checked").val()
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
                if(data.success=="y"){
                    adminAuditList(1)
                    layer.closeAll()
                }
            }
        })
    }
// 审核
function approved(e,state){
    if(state=="3"||state=="4 "){
        var datas={
            "option":"pass",
            "userId":localStorage.sysUserId,
            "projectId":e
        };
        layer.confirm('是否确定审核通过？', {
            btn: ['是','否'] 
        }, function(){
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
                    // console.log(data);
                    adminAuditList(1)
                }
            })
            layer.closeAll()
        }, function(){
            layer.closeAll()
        });
    }else{
        layer.alert("该状态不能进行审核！")
    }
}
// 驳回
function rejected(e,state){
    if(state=="3"){
        var datas={
            "option":"reject",
            "userId":localStorage.sysUserId,
            "projectId":e
        };
        layer.confirm('是否确定驳回？', {
            btn: ['是','否'] 
        }, function(){
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
                    // console.log(data);
                    adminAuditList(1)
                }
            })
            layer.closeAll()
        }, function(){
            layer.closeAll()
        });
    }else{
        layer.alert("该状态不能进行驳回！")
    } 
}
// 下架
function shelves(e){
    var datas={
        "option":"lower",
        "userId":localStorage.sysUserId,
        "projectId":e
    };
    layer.confirm('是否确定下架？', {
        btn: ['是','否'] 
    }, function(){
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
                // console.log(data);
                adminAuditList(1)
            }
        })
        layer.closeAll()
    }, function(){
        layer.closeAll()
    });
}
// 上架
function putaway(e){
    var datas={
        "option":"grounding",
        "userId":localStorage.sysUserId,
        "projectId":e
    };
    layer.confirm('是否确定上架？', {
        btn: ['是','否'] 
    }, function(){
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
                // console.log(data);
                adminAuditList(1)
            }
        })
        layer.closeAll()
    }, function(){
        layer.closeAll()
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