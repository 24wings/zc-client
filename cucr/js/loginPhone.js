(function($) {
    $.getUrlParam = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
})(jQuery);
var projectId = $.getUrlParam('projectId');

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
        url: cucr + "/api/ClzcUser",
        type: "POST",
        data: datas,
        async: true,
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
                localStorage.setItem("userId", data.resData.userId);
                localStorage.setItem("userId", data.resData.roleId);
                localStorage.setItem("userId", data.resData.roleName);
                window.location.replace("/cucr/projectInfoPhone.html?projectId=" + projectId + "&userId=" + data.resData.userId + "");
            }
        }
    });
}

function registerA() {
    window.location.replace("/cucr/registeredPhone.html?projectId=" + projectId + "");
}