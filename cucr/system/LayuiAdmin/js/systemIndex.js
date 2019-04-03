$(function(){
    var htmlH=$("html").height();
    var htmlW=$("html").width();
    var conH=htmlH-$(".systemNav").height();
    $(".systemCon").css("height",conH+"px").css("width","100%");
    $(".systemConl>ul>li").click(function(){
        var i = $(this).index();
        $(this).addClass("select").siblings().removeClass("select");
        $(".if").eq(i).show().siblings().hide();
    });
    console.log(localStorage.sysUserId);
})
//退出登录
function logOut(){
    localStorage.clear();
    window.location.replace("systemLogin.html");
}
