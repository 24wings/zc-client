function changePassword(){
    var phone=$(".phone").val();
    var newPwd=$(".newPwd").val();
    var code=$(".phoneNewCode").val();
    var datas = {
            "option":"updatePwd",
            "phone":phone,
            "newPwd":newPwd,
            "code":code,
        };
    if(newPwd.length>5){
        $.ajax({
            cache:true,
            url:cucr+"/api/ClzcUser",
            type:"POST",
            data:datas,
            async:true,
            error:function(request){
                return;
            },
            success:function(data){
                console.log(data);
                if(data.success=="n"){
                    layer.alert('信息为空或填写错误！', {
                      icon: 2,
                      skin: 'layer-ext-moon'
                    }) 
                }else{
                    layer.alert('密码修改成功！', {
                      icon: 1,
                      skin: 'layer-ext-moon'
                    }) 
                }
            }
        }); 
    }else{
        layer.alert('密码设置不能小于六位！', {
          icon: 2,
          skin: 'layer-ext-moon'
        }) 
    }
}