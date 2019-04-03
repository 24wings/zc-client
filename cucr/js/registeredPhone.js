(function ($) {
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
})(jQuery);
var projectId = $.getUrlParam('projectId');
function registerSub(){
    var datas = {
        "option":"mobileRegister",
        "phone":$(".phone").val(),
        "code":$(".code").val(),
        "pwd":$(".pwd").val()
    };
    console.log(datas)
    if($(".pwd").val().length>5){
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
                console.log(datas)
                console.log(data)
                if(data.success=="y"){
                    layer.alert('注册成功！', {
                      icon: 1,
                      skin: 'layer-ext-moon'
                    },function(index){
                         layer.close(index);
                         window.location.replace("/cucr/loginPhone.html?projectId="+projectId+"");
                    }) 
                }else{
                    layer.alert(data.message, {
                      icon: 2,
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
