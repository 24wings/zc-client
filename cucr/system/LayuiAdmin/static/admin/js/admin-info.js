//修改密码
$(function(){
    editPwd();
});
var beUserId;
function editPwd(){
    var datas={
        "option":"getUserInfo",
        "userId":localStorage.sysUserId,
        "queryUserId":localStorage.sysUserId
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
            console.log(data);
            if(data.success=="y"){
                beUserId=data.resData.id
            }
        }
    });
}
//确认修改密码
function editPwdBtn(){
    var userName=$(".editUserNameAdmin").val();
    var pwd=$(".editPwdAdmin").val();
    var pwd1=$(".editPwdAdmin1").val();
    var datas={
        "option":"update",
        "userId":localStorage.sysUserId,
        "beUserId":beUserId,
        "userName":userName,
        "pwd":pwd,
        "userDesc":"",
        "uStatus":1
    }
    if(pwd==pwd1){
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
                console.log(data);
                if(data.success=="y"){
                    layer.alert('修改密码成功！', {
                      icon: 1,
                      skin: 'layer-ext-moon'
                    },function(index){
                         layer.closeAll();
                         $(".editPwdAdmin").val("");
                         $(".editPwdAdmin1").val("");
                    })
                }
            }
        });
    }else{
        layer.alert('密码不一致！', {
          icon: 2,
          skin: 'layer-ext-moon'
        },function(index){
             layer.closeAll();
        })
    }
    
}
