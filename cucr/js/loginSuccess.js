$(function() {
    var html1 = '<ul class="nav-list userNull fr"><a href="login.html"></a><li>登录/注册</li></ul>';
    var html2 = '<div class="initiateDiv"><img style="margin-top: -2px;" src="./img/startIcon.png"><span class="divase" onclick="ifjl()">发起项目</span></div><div class="bgcenter userLogin"><a href="personal.html"></a></div>';
    if (localStorage.userId != null) {
        $(".head-nav").append(html2)
            // $(".userNull").hide();
            // $(".userLogin").show();
    } else {
        $(".head-nav").append(html1)
            // $(".userNull").show();
            // $(".userLogin").hide();
    }

    var datas = {
        "option": "getUserInfo",
        "userId": localStorage.userId,
    };
    if (datas.userId == undefined) {

    } else {
        $.ajax({
            cache: true,
            url: cucr + "/api/ClzcUser",
            type: "POST",
            data: datas,
            async: true,
            error: function(request) {
                return;
            },
            success: function(data) {
                var headurl = data.resData.headurl;
                var date = new Date;
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var getData = date.getDate();
                var headurl1 = "/Upload/" + year + "/" + month + "" + getData + "/";
                if (headurl == headurl1 || headurl == "") {
                    $(".userLogin").css("backgroundImage", "url(img/imgMR.jpg)")
                } else {
                    $(".userLogin").css("backgroundImage", "url(" + cucr + headurl + ")")
                }
            }
        });
    }



})

function ifjl() {

    if (localStorage.roleId) {
        window.location.href = "projectRaise.html";
    } else {
        console.log(1)
        layer.msg('没有权限发起项目');
    }
}