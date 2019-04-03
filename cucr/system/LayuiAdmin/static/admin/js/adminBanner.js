// 获取管理员列表
$(function(){
    adminUserList(1)
})

//文件上传   
/*var headImgres="";
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
            if(data.success=="y"){
                headImgres=data.resData.fileId;
            }else{
                console.log(data.message);
            }
        },
        error: function (data) {
            console.log(data.success);
        }
    });
}*/

function adminUserList(e){
    var datas = {
        "option":"getList",
        "userId":localStorage.sysUserId,
        "page":e,
        "pageSize":3,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "isvalid":""
    };
    var adminUserHtml="";
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
            if(data.success=="y"){
                for(var i=0;i<data.resData.dataList.length;i++){
                    adminUserHtml+='<tr><td class="textalign">'+(i+1)+'</td>'+
                                '<td>'+data.resData.dataList[i].title+'</td>'+
                                '<td>'+data.resData.dataList[i].projectName+'</td>'+
                                '<td class="statusTd">'+data.resData.dataList[i].isvalidText+'</td>'+
                                '<td class="tdImg"><img src="'+cucr+data.resData.dataList[i].path+'"></td>'+
                                '<td><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="editAdminBanner('+"'"+data.resData.dataList[i].bannerId+"'"+')"><i class="layui-icon">&#xe642;</i></button><button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="1" onclick="deleteAdminBanner('+"'"+data.resData.dataList[i].bannerId+"'"+')"><i class="layui-icon">&#xe640;</i></button></td>'+
                                '</tr>';
                    
                }
                $(".tbodyList").html(adminUserHtml)
                $(".tcdPageCode").createPage({
                    pageCount:data.resData.totalPage,
                    current:data.resData.pageIndex,
                    backFn:function(p){
                        adminUserList(p)
                    }
                });
            }
        }
    });
}
//添加banner
function addBanner(){
    var conHtml='<div class="addAdminConAl1"><div class="imgdivcon">'+
                    '<span class="spanCon">标题：</span>'+
                    '<input class="userName submitUserName" type="text">'+
                '</div>'+
                '<div  class="imgdivcon" style="margin-top:2rem;"><span class="spanCon">修改头像：</span><div><form id="uploadForm" enctype="multipart/form-data" ><div class="form-group" style="margin-left: 6rem;margin-top: -1.5rem;"><div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload"><div class="fileinput-new thumbnail" style="width: 200px;height: auto;max-height:150px;"><img id="picImg" style="width: 100%;height:100%" src="" alt="" /></div><div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div><div><span class="btn btn-primary btn-file" style="background:white;border:1px solid white;width:50%;text-align: left;cursor: pointer;"><span class="fileinput-new" style="width:50%;text-align:left;cursor: pointer;color: #999;">选择图片</span><span class="fileinput-exists" style="width:100%;text-align:left;cursor: pointer;color:#333">换一张</span><input type="file" name="pic1" val="1" id="picID" accept="image/gif,image/jpeg,image/x-png" /></span></div></div></div><div style="display:none" id="uploadSubmit" onclick="uploadSubmit()" style="width: 100%;" class="btn btn-info">保存</div></form></div></div>'+
                '<div class="imgdivcon">'+
                    '<span class="spanCon">是否有效：</span>'+
                    '<input type="radio" class="isvalid" name="isvalid" value="1" checked/>'+
                    '<label>有效</label>'+
                    '<input type="radio" class="isvalid" name="isvalid" value="2" />'+
                    '<label>无效</label> '+
               '</div><div class="imgdivcon"><span class="spanCon">选择的项目：</span><input type="hidden" readonly="readonly" class="addProject1"><input type="text" readonly="readonly" class="addProject2"></div>'+
               '<table class="listTablePhotos layui-table">'+
                                    '<thead>'+
                                        '<tr>'+
                                            '<th class="">序</th>'+
                                            // '<th>项目类型</th>'+
                                            '<th>项目名称</th>'+
                                            '<th>发起人</th>'+
                                            '<th>图片</th>'+
                                            '<th>操作</th>'+
                                        '</tr>'+
                                    '</thead>'+
                                    '<tbody></tbody>'+
                                '</table><div class="tcdPageCode5 fr"></div>'+
                '<div style="clear: both;margin: 30px 0;">'+
                    '<div class="addAdminBtn" onclick="addBannerSubmit()">确定</div>'+
                '</div></div>';
    layer.open({
      type: 1,
      title:"添加banner图片",
      skin: 'layui-layer-rim',
      area: ['90%', '90%'],
      content: conHtml
    });
    projectList(1)
}


//获取项目列表
function projectList(e){
    var datas={
        "option":"getList",
        "userId":"",
        "page":e,
        "pageSize":5,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "queryUserId":"",
        "isrecomm":"",
        "surplusName":"",
        "amountState":""
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
                var listPhoto="";
                for(var i=0;i<data.resData.dataList.length;i++){
                    listPhoto +='<tr>'+
                                    '<td class="">'+(i+1)+'</td>'+
                                    // '<td>'+data.resData.dataList[i].cftypeText+'</td>'+
                                    '<td>'+data.resData.dataList[i].name+'</td>'+
                                    '<td>'+data.resData.dataList[i].nickName+'</td>'+
                                    '<td class="tdImg"><img src='+cucr+data.resData.dataList[i].pictureUrl+'></td>'+
                                    '<td class="tdaddproject" onclick=addProject('+"'"+data.resData.dataList[i].projectId+"'"+','+"'"+data.resData.dataList[i].name+"'"+')>添加</td>'+
                                '</tr>'
                }
                $(".listTablePhotos>tbody").html(listPhoto)
                $(".tcdPageCode5").createPage({
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
//查询项目列表
function projectLists(e){
    var datas={
        "option":"getList",
        "userId":"",
        "page":e,
        "pageSize":5,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "queryUserId":"",
        "isrecomm":"",
        "surplusName":"",
        "amountState":""
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
            console.log(data)
            if(data.success=="y"){
                var listPhoto;
                for(var i=0;i<data.resData.dataList.length;i++){
                    listPhoto +='<tr>'+
                                    '<td class="">'+(i+1)+'</td>'+
                                    '<td>'+data.resData.dataList[i].cftypeText+'</td>'+
                                    '<td>'+data.resData.dataList[i].name+'</td>'+
                                    '<td>'+data.resData.dataList[i].nickName+'</td>'+
                                    '<td class="tdImg"><img src='+cucr+data.resData.dataList[i].pictureUrl+'></td>'+
                                    '<td onclick=addProject('+"'"+data.resData.dataList[i].projectId+"'"+','+"'"+data.resData.dataList[i].name+"'"+')>添加</td>'+
                                '</tr>'
                }

                $(".listTablePhotos>tbody").html(listPhoto)
            }
        }
    })
   
}
//删除banner
function deleteAdminBanner(e){
    var datas={
        "option":"delete",
        "userId":localStorage.sysUserId,
        "bannerid":e,
    }
    layer.confirm('是否删除该banner？', {
      btn: ['是','否'] //按钮
    }, function(){
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
                // console.log(data);
                if(data.success=="y"){
                    layer.alert('删除成功！', {
                      icon: 1,
                      skin: 'layer-ext-moon'
                    },function(index){
                         layer.closeAll();
                         adminUserList(1)
                    })
                }
            }
        });
    }, function(){
      
    });
}
//添加projectId
function addProject(id,name){
    $(".addProject1").val(id);
    $(".addProject2").val(name)
}
//确认提交
function addBannerSubmit(){
    // imgdown();
    var headImgres;
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
    var datas={
        "option":"add",
        "userId":localStorage.sysUserId,
        "title":$(".submitUserName").val(),
        "imgid":headImgres,
        "isvalid":$('input[name="isvalid"]:checked ').val(),
        "projectid":$(".addProject1").val()
    }
    if(headImgres==undefined||$(".submitUserName").val()==""||$('input[name="isvalid"]:checked ').val()==""||$(".addProject1").val()==""){
        if(headImgres==undefined){
            layer.msg('请选择图片', {time: 1000, });
        }else{
            layer.alert('请填写完整信息！', {
              icon: 2,
              skin: 'layer-ext-moon'
            }) 
        }
    }else{
        console.log(datas);
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
                // console.log(data);
                if(data.success=="y"){
                    layer.alert('添加banner成功！', {
                      icon: 1,
                      skin: 'layer-ext-moon'
                    },function(index){
                         layer.closeAll();
                         adminUserList(1)
                    })
                }
            }
        });
    }
}
//修改banner
function editAdminBanner(e){
    var conHtml='<div class="addAdminConAl1"><div class="imgdivcon">'+
                    '<span class="spanCon">标题：</span>'+
                    '<input class="userName editUserName" type="text">'+
                '</div>'+
                '<div class="imgdivcon" style="margin-top:2rem;"><span class="spanCon">修改头像：</span><img class="editBanner" style="width: 140px;margin-bottom: 1rem;"><form class="uploadForm" enctype="multipart/form-data" ><div class="form-group" style="margin-left: 6rem;margin-top: -1.5rem;"><div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload"><div class="fileinput-new thumbnail" style="width: 200px;height: auto;max-height:150px;"><img id="picImg" style="width: 100%;height:100%" src="" alt="" /></div><div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div><div onclick="bannerImgHide()"><span class="btn btn-primary btn-file" style="background:white;border:1px solid white;width:50%;text-align: left;cursor: pointer;"><span class="fileinput-new" style="width:50%;text-align:left;cursor: pointer;color: #999;" >选择图片</span><span class="fileinput-exists" style="width:100%;text-align:left;cursor: pointer;color:#333">换一张</span><input type="file" name="pic1" val="1" id="picID" accept="image/gif,image/jpeg,image/x-png" /></span></div></div></div><div style="display:none" id="uploadSubmit" onclick="uploadSubmit()" style="width: 100%;" class="btn btn-info">保存</div></form></div>'+
                '<div class="imgdivcon">'+
                    '<span class="spanCon">是否有效：</span>'+
                    '<input type="radio" class="isvalid" name="isvalid" value="1"/>'+
                    '<label>有效</label>'+
                    '<input type="radio" class="isvalid" name="isvalid" value="2" />'+
                    '<label>无效</label> '+
               '</div><div class="imgdivcon"><span class="spanCon">选择的项目：</span><input type="hidden" readonly="readonly" class="addProject1"><input type="text" readonly="readonly" class="addProject2"></div>'+
               '<table class="listTablePhotos layui-table">'+
                                    '<thead>'+
                                        '<tr>'+
                                            '<th class="textalign">序</th>'+
                                            '<th>项目类型</th>'+
                                            '<th>项目名称</th>'+
                                            '<th>发起人</th>'+
                                            '<th>图片</th>'+
                                            '<th>操作</th>'+
                                        '</tr>'+
                                    '</thead>'+
                                    '<tbody></tbody>'+
                                '</table><div class="tcdPageCode5 fr"></div>'+
                '<div style="clear: both;margin: 30px 0;">'+
                    '<div class="addAdminBtn" onclick="editBannerSubmit()">确定</div>'+
                '</div></div>';
    layer.open({
      type: 1,
      title:"修改banner图片",
      skin: 'layui-layer-rim',
      area: ['90%', '90%'],
      content: conHtml
    });
    projectList(1);
    bannerIdInfo(e);
}
//根据bannerId获取详情
var editBannerImgId;
var editBannerId="";
function bannerIdInfo(e){
    var datas={
        "option":"getBannerInfo",
        "userId":localStorage.sysUserId,
        "bannerid":e
    }
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
            console.log(data)
            if(data.success=="y"){
                $(".editUserName").val(data.resData.title);
                console.log(data.resData.isvalId)
                $("input[name=isvalid]:eq("+(data.resData.isvalId-1)+")").attr("checked",'checked'); 
                $(".addProject2").val(data.resData.projectName);
                $(".editBanner").attr("src",cucr+data.resData.path);
                $(".addProject1").val(data.resData.projectId)
                editBannerImgId=data.resData.imgId;
                editBannerId=data.resData.bannerId;
            }
        }
    });
}
//确认修改banner数据
function editBannerSubmit(){
    if($(".fileinput-preview>img").attr("src")!=undefined){
        var datas = new FormData($('.uploadForm')[0]);
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
                    editBannerImgId=data.resData.fileId;
                }else{
                    console.log(data.message);
                }
            },
            error: function (data) {
                console.log(data.success);
            }
        });
    }
    var datas={
        "option":"update",
        "userId":localStorage.sysUserId,
        "bannerid":editBannerId,
        "title":$(".editUserName").val(),
        "imgid":editBannerImgId,
        "isvalid":$('input[name="isvalid"]:checked ').val(),
        "projectid":$(".addProject1").val()
    }
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
            // console.log(data);
            if(data.success=="y"){
                layer.alert('修改banner成功！', {
                  icon: 1,
                  skin: 'layer-ext-moon'
                },function(index){
                     layer.closeAll();
                     adminUserList(1)
                })
            }
        }
    });
    console.log(datas)
}
//点击消失图片
function bannerImgHide(){
    $(".editBanner").hide();
}