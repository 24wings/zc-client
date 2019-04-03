$(function(){
    $(".noviceConl dl dd").click(function(){
        var i = $(this).index();
        $(this).addClass("noviceSelect").siblings().removeClass("noviceSelect");
        $(".noviceConr>div").eq(i).show().siblings().hide();
    })
})