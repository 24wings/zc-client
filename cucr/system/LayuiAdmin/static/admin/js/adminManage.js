// 获取管理员列表
$(function(){
    adminUserList(1)
})
function adminUserList(e){
    var datas = {
        "option":"getAllDataList",
        "userId":localStorage.sysUserId,
        "pageIndex":e,
        "pageNum":15,
        "searchKey":""
    };
    var adminUserHtml="";
    $.ajax({
        cache:true,
        url:cucr+"/api/SysUserManager",
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
                                '<td>'+data.resData.dataList[i].desc+'</td>'+
                                '<td class="statusTd">'+data.resData.dataList[i].statusText+'</td>'+
                                '<td>'+data.resData.dataList[i].addTime+'</td>'+
                                '<td><button class="layui-btn layui-btn-mini layui-btn-normal  edit-btn" data-id="1"  onclick="editAdminInfo('+"'"+data.resData.dataList[i].id+"'"+')"><i class="layui-icon">&#xe642;</i></button><button class="layui-btn layui-btn-mini layui-btn-danger del-btn" data-id="1" onclick="deleteAdminStatus('+"'"+data.resData.dataList[i].id+"'"+')"><i class="layui-icon">&#xe640;</i></button></td>'+
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
// 添加用户弹出窗
function addUserBtn(){
    var conHtml='<div class="addAdminConAl"><div>'+
                    '<span>用户名：</span>'+
                    '<input class="userName" type="text">'+
                '</div>'+
                '<div>'+
                    '<span>用户名密码：</span>'+
                    '<input class="pwd" type="password">'+
                '</div>'+
                '<div>'+
                    '<span>用户名描述：</span>'+
                    '<textarea class="userDesc"  cols="30" rows="10"></textarea>'+
               '</div>'+
                '<div class="clear">'+
                    '<div class="addAdminBtn" onclick="addAdminUser()">确定提交</div>'+
                '</div></div>';
    layer.open({
      type: 1,
      title:"添加管理员",
      skin: 'layui-layer-rim',
      area: ['820px', '640px'],
      content: conHtml
    }); 
}
//添加用户成员
function addAdminUser(){
    var userName=$(".userName").val();
    var pwd=$(".pwd").val();
    var userDesc=$(".userDesc").val();

    //获取项目列表
    var datas = {
        "option":"register",
        "userId":localStorage.sysUserId,
        "userName":userName,
        "pwd":pwd,
        "userDesc":userDesc
    };
    if(userName==""||pwd==""||userDesc==""){
        layer.alert('账号、密码和描述不能为空！', {
          icon: 2,
          skin: 'layer-ext-moon'
        },function(index){
             layer.close(index);
        }) 
    }else{
        $.ajax({
            cache:true,
            url:cucr+"/api/SysUserManager",
            type:"POST",
            data:datas,
            async:true,
            error:function(request){
                return;
            },
            success:function(data){
                // console.log(data)
                if(data.success=="y"){
                    layer.alert('添加管理员成功！', {
                      icon: 1,
                      skin: 'layer-ext-moon'
                    },function(index){
                         layer.closeAll();
                         adminUserList(1);
                         $(".userName").val("");
                         $(".pwd").val("");
                         $(".userDesc").val("");
                    })
                }else{
                    layer.alert(data.message, {
                      icon: 2,
                      skin: 'layer-ext-moon'
                    },function(index){
                         layer.close(index);
                    })
                }
            }
        });
    } 
}
//修改管理员信息
function editAdminInfo(e){
    var datas={
        "option":"getUserInfo",
        "userId":localStorage.sysUserId,
        "queryUserId":e
    }
    $.ajax({
        cache:true,
        url:cucr+"/api/SysUserManager",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data);
            if(data.success=="y"){
                var conHtml='<div class="addAdminConAl"><div>'+
                                '<span>用户名：</span>'+
                                '<input class="editUserName" value='+data.resData.userName+' readonly="readonly" type="text">'+
                            '</div>'+
                            '<div>'+
                                '<span>新密码：</span>'+
                                '<input class="editPwd" type="password">'+
                            '</div>'+
                            '<div>'+
                                '<span>用户名描述：</span>'+
                                '<textarea class="editUserDesc" cols="30" rows="10"></textarea>'+
                           '</div>'+
                           '<div>'+
                                '<span>状态：</span>'+
                                '<input type="radio" class="status" name="status" value="1"/>'+
                                '<label>启用</label>'+
                                '<input type="radio" class="status" name="status" value="2" />'+
                                '<label>禁用</label> '+
                                '<input type="radio" class="status" name="status" value="3" />'+
                                '<label>删除</label> '+
                           '</div>'+
                            '<div>'+
                                '<div class="addAdminBtn" onclick="deterAdminUser('+"'"+e+"'"+')">确定提交</div>'+
                            '</div></div>';
                layer.open({
                  type: 1,
                  title:"修改管理员信息",
                  skin: 'layui-layer-rim',
                  area: ['820px', '640px'],
                  content: conHtml
                });
                $(".editUserDesc").val(data.resData.desc);
                var status = data.resData.status-1;
                $("input[name=status]:eq("+status+")").attr("checked",'checked'); 
            }
        }
    });
}
//确定修改管理员信息
function deterAdminUser(e){
    var beUserId=e;
    var userName=$(".editUserName").val();
    var pwd=$(".editPwd").val();
    var userDesc=$(".editUserDesc").val();
    var uStatus=$("input[name='status']:checked").val();
    // console.log(userName+"---"+pwd+"---"+userDesc+"---"+uStatus+"---"+e);
    var datas={
        "option":"update",
        "userId":localStorage.sysUserId,
        "beUserId":beUserId,
        "userName":userName,
        "pwd":pwd,
        "userDesc":userDesc,
        "uStatus":uStatus
    }
    $.ajax({
        cache:true,
        url:cucr+"/api/SysUserManager",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data);
            if(data.success=="y"){
                layer.alert('修改管理员信息成功！', {
                  icon: 1,
                  skin: 'layer-ext-moon'
                },function(index){
                     layer.closeAll();
                     adminUserList(1);
                })
            }
        }
    });
}
//删除管理员
function deleteAdminStatus(e){
    var datas={
        "option":"updateStatus",
        "userId":localStorage.sysUserId,
        "beUserId":e,
        "status":3
    }
    layer.confirm('是否删除该管理员？', {
      btn: ['是','否'] //按钮
    }, function(){
        $.ajax({
            cache:true,
            url:cucr+"/api/SysUserManager",
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
                         adminUserList(1);
                    })
                }
            }
        });
    }, function(){
      
    });
}