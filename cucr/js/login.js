$(function() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.location.href = "loginPhone.html";
    }
})

function loginSub() {
    var phone = $(".phoneNum>input").val();
    var pwd = $(".pwdNum>input").val();

    var datas = {
        "option": "login",
        "phone": phone,
        "pwd": pwd
    };
    $.ajax({
        cache: true,
        url: "http://192.168.1.99:5000/api/CucrSaas/ZC/Admin/ZCAuth/login",
        type: "POST",
        data: JSON.stringify(datas),
        async: true,
        dataType: "json",
        contentType: "application/json",
        error: function(request) {
            layer.alert('网络连接超时！', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return;
        },
        success: function(data) {
            console.log(data)
            if (data.success == "n") {
                layer.alert('账号或是密码错误！', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                })
                console.log("登陆失败")
            } else {
                localStorage.setItem("userId", data.resdata.user.id);
                if (data.resdata.roles) {
                    localStorage.setItem("roleId", data.resdata.user.roles[0].name);
                }

                // localStorage.setItem("roleName", data.resdata.user.roleName);



                window.location.replace("/cucr/index.html");
            }
        }
    });
}

function changePwd() {
    layer.open({
        type: 2,
        title: '修改密码',
        shadeClose: true,
        shade: 0.3,
        area: ['380px', '380px'],
        content: './changePwd.html'
    });
}
document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) { // enter 键
        //要做的事情
        loginSub()
    }
};