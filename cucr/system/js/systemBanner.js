$(function(){
    getPhotoList(1);
});
//获取banner列表
function getPhotoList(e){
    var datas={
        "option":"getList",
        "userId":"",
        "page":e,
        "pageSize":2,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "isvalid":""
    };
    console.log(datas)
    var photoListHtml="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcBanner",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            console.log(data);
            for(var i=0;i<data.resData.dataList.length;i++){
                photoListHtml += '<tr>'+
                                        '<td class="textalign">'+(i+1)+'</td>'+
                                        '<td>'+data.resData.dataList[i].title+'</td>'+
                                        '<td>'+data.resData.dataList[i].projectName+'</td>'+
                                        '<td>'+data.resData.dataList[i].isvalidText+'</td>'+
                                        '<td class="tdImg"><img src="'+cucr+data.resData.dataList[i].path+'"></td>'+
                                        '<td><div class="btnAdmin">修改</div><div class="btnAdmin">删除</div></td>'+
                                    '</tr>'
            }
            $(".listTable>tbody").html(photoListHtml)
            $(".tcdPageCode1").createPage({
                pageCount:data.resData.totalPage,
                current:data.resData.pageIndex,
                backFn:function(p){
                    getPhotoList(p)
                }
            });
        }
    })
}
//文件上传   
var headImgres;
function imgdown(){
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
            if(data.success){
                headImgres=data.resData.fileId;
                // $(".layui-layer").fadeOut();
                // $(".layui-layer-shade").fadeOut()
            }else{
                console.log(data.message);
            }
        },
        error: function (data) {
            console.log(data.success);
        }
    });
}
//添加banner弹窗
function addBanner(){
    var conHtml='<div class="addAdminConAl"><div>'+
                    '<span>标题：</span>'+
                    '<input class="userName" type="text">'+
                '</div>'+
                '<dd style="margin-top:2rem;margin-bottom: -1.5rem;"><span style="display:none">修改头像</span><form id="uploadForm" enctype="multipart/form-data" ><div class="form-group" style="margin-left: 6rem;margin-top: -1.5rem;"><div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload"><div class="fileinput-new thumbnail" style="width: 200px;height: auto;max-height:150px;"><img id="picImg" style="width: 100%;height:100%" src="" alt="" /></div><div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div><div><span class="btn btn-primary btn-file" style="background:white;border:1px solid white;width:50%;text-align: left;cursor: pointer;"><span class="fileinput-new" style="width:50%;text-align:left;cursor: pointer;color: #999;">选择图片</span><span class="fileinput-exists" style="width:100%;text-align:left;cursor: pointer;color:#333">换一张</span><input type="file" name="pic1" val="1" id="picID" accept="image/gif,image/jpeg,image/x-png" /></span></div></div></div><div style="display:none" id="uploadSubmit" onclick="uploadSubmit()" style="width: 100%;" class="btn btn-info">保存</div></form></dd>'+
                '<div>'+
                    '<span>是否有效：</span>'+
                    '<input type="radio" class="isvalid" name="isvalid" value="1"/>'+
                    '<label>有效</label>'+
                    '<input type="radio" class="isvalid" name="isvalid" value="2" />'+
                    '<label>无效</label> '+
               '</div>'+
               '<div class="addAdminConAl"><div>'+
                    '<span onclick="projectList(1)">选择项目</span>'+
                '</div>'+
                '<div>'+
                    '<div class="addAdminBtn" onclick="addBannerSubmit()">确定提交</div>'+
                '</div></div>';
    layer.open({
      type: 1,
      title:"添加banner图片",
      skin: 'layui-layer-rim',
      area: ['820px', '640px'],
      content: conHtml
    });
}
//添加banner确认
function addBannerSubmit(){
    imgdown()
    console.log(headImgres)  
}
//获取项目列表
function projectList(e){
    var datas={
        "option":"getList",
        "userId":"",
        "page":e,
        "pageSize":10,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "queryUserId":"",
        "isrecomm":""
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
                console.log(data);
                var listPhoto="";
                var conHtml='<div class="tcdPageCode6 fr"></div><table class="listTablePhoto" border="1">'+
                                    '<thead>'+
                                        '<tr>'+
                                            '<td class="textalign">序</td>'+
                                            '<td>项目类型</td>'+
                                            '<td>项目名称</td>'+
                                            '<td>发起人</td>'+
                                            '<td>图片</td>'+
                                            '<td>操作</td>'+
                                        '</tr>'+
                                    '</thead>'+
                                    '<tbody></tbody>'+
                                '</table>';
                layer.open({
                  type: 1,
                  title:"添加banner图片",
                  skin: 'layui-layer-rim',
                  area: ['100%', '100%'],
                  content: conHtml
                });
                for(var i=0;i<data.resData.dataList.length;i++){
                    listPhoto +='<tr>'+
                                    '<td class="textalign">'+(i+1)+'</td>'+
                                    '<td>'+data.resData.dataList[i].cftypeText+'</td>'+
                                    '<td>'+data.resData.dataList[i].name+'</td>'+
                                    '<td>'+data.resData.dataList[i].nickName+'</td>'+
                                    '<td class="tdImg"><img src='+cucr+data.resData.dataList[i].pictureUrl+'></td>'+
                                    '<td onclick=addProject('+"'"+data.resData.dataList[i].projectId+"'"+')>添加</td>'+
                                '</tr>'
                }

                $(".listTablePhoto>tbody").html(listPhoto)
                $(".tcdPageCode6").createPage({
                    pageCount:data.resData.totalPage,
                    current:data.resData.pageIndex,
                    backFn:function(p){
                        projectLists(p)
                    }
                });
            }
        }
    })
   
}
//添加到添加页面projectId
function addProject(e){
    console.log(e)
}
//查询项目列表
function projectLists(e){
    var datas={
        "option":"getList",
        "userId":"",
        "page":e,
        "pageSize":10,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "queryUserId":"",
        "isrecomm":""
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
                var listPhoto;
                for(var i=0;i<data.resData.dataList.length;i++){
                    listPhoto +='<tr>'+
                                    '<td class="textalign">'+(i+1)+'</td>'+
                                    '<td>'+data.resData.dataList[i].cftypeText+'</td>'+
                                    '<td>'+data.resData.dataList[i].name+'</td>'+
                                    '<td>'+data.resData.dataList[i].nickName+'</td>'+
                                    '<td class="tdImg"><img src='+cucr+data.resData.dataList[i].pictureUrl+'></td>'+
                                    '<td>操作</td>'+
                                '</tr>'
                }

                $(".listTablePhoto>tbody").html(listPhoto)
            }
        }
    })
   
}