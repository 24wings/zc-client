$(function(){
    physicalList(1)
    participateList(1)
    StockList(1)
})
// tab切换
$(function(){
    $(".tabli li").click(function(){
        var i=$(this).index();
        $(this).addClass("select").siblings().removeClass("select");
        $(".cons").eq(i).show().siblings().hide();
    })
})
// 获取实物回报列表
function physicalList(e){
    var datas={
        "option":"getInfoByProjectId",
        "userId":localStorage.userId,
        "projectId":"",
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
            // console.log(data);
            if(data.success=="y"){
                for(var i=0;i<data.resData.dataList.length;i++){
                    adminUserHtml+='<tr><td class="textalign">'+(i+1)+'</td>'+
                                '<td>'+data.resData.dataList[i].userName+'</td>'+
                                '<td>'+data.resData.dataList[i].projectName+'</td>'+
                                '<td class="tdImg"><img src="'+cucr+data.resData.dataList[i].imgUrl+'"></td>'+
                                '<td class="statusTd">'+data.resData.dataList[i].totalPrice+'</td>'+
                                '<td class="tdImg">'+data.resData.dataList[i].createTime+'</td>'+
                                '<td><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="checkDetails('+"'"+data.resData.dataList[i].projectId+"'"+','+"'"+data.resData.dataList[i].cfType+"'"+')"><i class="layui-icon">查看项目</i></button></td>'+
                                '</tr>';
                    
                }
                $(".tbodyList1").html(adminUserHtml)
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
        "projectId":"",
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
                for(var i=0;i<data.resData.dataList.length;i++){
                    adminUserHtml+='<tr><td class="textalign">'+(i+1)+'</td>'+
                                '<td>'+data.resData.dataList[i].userName+'</td>'+
                                '<td>'+data.resData.dataList[i].projectName+'</td>'+
                                '<td class="tdImg"><img src="'+cucr+data.resData.dataList[i].imgUrl+'"></td>'+
                                '<td class="statusTd">'+data.resData.dataList[i].totalPrice+'</td>'+
                                '<td class="statusTd">'+data.resData.dataList[i].retPrice+'</td>'+
                                '<td class="tdImg">'+data.resData.dataList[i].createTime+'</td>'+
                                '<td><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="checkDetails('+"'"+data.resData.dataList[i].projectId+"'"+','+"'"+data.resData.dataList[i].cfType+"'"+')"><i class="layui-icon">查看项目</i></button></td>'+
                                '</tr>';
                    
                }
                $(".tbodyList2").html(adminUserHtml)
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
        "projectId":"",
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
                for(var i=0;i<data.resData.dataList.length;i++){
                    adminUserHtml+='<tr><td class="textalign">'+(i+1)+'</td>'+
                                '<td>'+data.resData.dataList[i].userName+'</td>'+
                                '<td>'+data.resData.dataList[i].projectName+'</td>'+
                                '<td class="tdImg"><img src="'+cucr+data.resData.dataList[i].imgUrl+'"></td>'+
                                '<td class="statusTd">'+data.resData.dataList[i].totalPrice+'</td>'+
                                '<td class="statusTd">'+data.resData.dataList[i].retPrice+'</td>'+
                                '<td class="tdImg">'+data.resData.dataList[i].createTime+'</td>'+
                                '<td><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1" ><i class="layui-icon" onclick="checkDetails('+"'"+data.resData.dataList[i].projectId+"'"+','+"'"+data.resData.dataList[i].cfType+"'"+')">查看项目</i></button></td>'+
                                '</tr>';
                    
                }
                $(".tbodyList3").html(adminUserHtml)
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