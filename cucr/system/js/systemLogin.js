//账号登录
function systemLogin(){
    var phoneNum=$(".phoneNum>input").val();
    var pwdNum=$(".pwdNum>input").val();
    //获取项目列表
    var datas = {
        "option":"login",
        "userId":"",
        "userName":phoneNum,
        "pwd":pwdNum
    };
    if(phoneNum==""||pwdNum==""){
        layer.alert('账号或是密码不能为空！', {
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
                console.log(data)
                if(data.success=="y"){
                    localStorage.setItem("sysUserId",data.resData.userId);
                    window.location.replace("/system/LayuiAdmin/index.html");
                }else{
                    layer.alert('账号或是密码错误！', {
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