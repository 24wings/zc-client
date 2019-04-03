$(function(){
    physicalList(1)
})

// 获取实物回报列表
function physicalList(e){
    var datas={
        "option":"getList",
        "userId":"",
        "page":e,
        "pageSize":6,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "queryUserId":"",
        "isrecomm":"",
        "surplusName":"",
        "amountState":"",
        "corwdState":"",
        "classifyId":""
    }
    var adminUserHtml="";
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
            if(data.success=="y"){
                for(var i=0;i<data.resData.dataList.length;i++){
                    adminUserHtml+='<tr><td class="textalign">'+(i+1)+'</td>'+
                                '<td>'+data.resData.dataList[i].name+'</td>'+
                                '<td class="tdImg"><img src="'+cucr+data.resData.dataList[i].pictureUrl+'"></td>'+
                                '<td>'+data.resData.dataList[i].startTime+'</td>'+
                                '<td>'+data.resData.dataList[i].endTime+'</td>'+
                                '<td class="statusTd">'+data.resData.dataList[i].repayTime+'</td>'+
                                '<td class="tdImg">'+data.resData.dataList[i].totalPrice+'</td>'+
                                '<td class="tdImg">'+data.resData.dataList[i].percent+'%</td>'+
                                '<td><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="checkDetails('+"'"+data.resData.dataList[i].projectId+"'"+','+"'"+data.resData.dataList[i].materialId+"'"+','+"'"+data.resData.dataList[i].quotaId+"'"+','+"'"+data.resData.dataList[i].stockId+"'"+')"><i class="layui-icon">查看详情</i></button></td>'+
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

// 查看详情
function checkDetails(e,materialId,quotaId,stockId){
    var projectIdVal=e;
    console.log(materialId);
    console.log(quotaId);
    console.log(stockId);
    layer.open({
        type: 2,
        title: '项目详情',
        shadeClose: true,
        shade: 0.4,
        area: ['90%', '84%'],
        content: './projectManInfo.html?projectId='+projectIdVal+'',
        success: function (layero, index){
            var body = layer.getChildFrame('body', index);
            body.contents().find(".projectId").val(projectIdVal);
            body.contents().find(".materialId").val(materialId);
            body.contents().find(".quotaId").val(quotaId);
            body.contents().find(".stockId").val(stockId);
        }
    });
}