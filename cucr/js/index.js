$(function(){ 
    // 获取推荐项目
    var datas = {
        "option":"getList",
        "userId":"",
        "page":1,
        "pageSize":9,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "queryUserId":"",
        "isrecomm":1,
        "surplusName":"",
        "amountState":"",
    };
    var raiseListHtml="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProject",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data)
            if(data.success=="y"){
                for(var i=0;i<data.resData.dataList.length;i++){
                    raiseListHtml+='<a href="projectInfo.html?projectId='+data.resData.dataList[i].projectId+'" class="index-board-item  col-xl-4" >'+
                                    '<div class="index-board-item-inner flwidth">'+
                                        '<div class="index-board-item-inner-left index-board-item-inner-left-index bgcenter" style="background-image:url('+cucr+data.resData.dataList[i].pictureUrl+')">'+
                                            '<p class="surplusNameText'+(i+1)+'">'+data.resData.dataList[i].surplusName+'</p>'+
                                        '</div>'+
                                        '<div class="index-board-item-inner-right index-board-item-inner-right1 flwidth">'+
                                            '<div class="index-board-div1">'+
                                                '<h2>'+data.resData.dataList[i].name+'</h2>'+
                                                '<dd class="proInfodd3">'+
                                                    '<div style="width:'+data.resData.dataList[i].percent+'%"></div>'+
                                                '</dd>'+
                                                '<dl>'+
                                                    '<dd>'+
                                                        '<p>'+data.resData.dataList[i].percent+'%</p>'+
                                                        '<p>已达</p>'+
                                                    '</dd>'+
                                                    '<dd>'+
                                                        '<p>'+data.resData.dataList[i].totalPrice+'</p>'+
                                                        '<p>已筹</p>'+
                                                    '</dd>'+
                                                    '<dd>'+
                                                        '<p>'+data.resData.dataList[i].surplus+'天</p>'+
                                                        '<p>剩余时间</p>'+
                                                    '</dd>'+
                                                '</dl>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</a>';
                }

                $(".raiseListHtml1>.row1").html(raiseListHtml)
                // console.log($(".surplusNameText").text())
                if($(".surplusNameText1").text()=="项目已结束"){
                    $(".surplusNameText1").css("background","#90a3a5")
                }
                if($(".surplusNameText2").text()=="项目已结束"){
                    $(".surplusNameText2").css("background","#90a3a5")
                }
                if($(".surplusNameText3").text()=="项目已结束"){
                    $(".surplusNameText3").css("background","#90a3a5")
                }
                if($(".surplusNameText4").text()=="项目已结束"){
                    $(".surplusNameText4").css("background","#90a3a5")
                }
                if($(".surplusNameText5").text()=="项目已结束"){
                    $(".surplusNameText5").css("background","#90a3a5")
                }
                if($(".surplusNameText6").text()=="项目已结束"){
                    $(".surplusNameText6").css("background","#90a3a5")
                }
                if($(".surplusNameText7").text()=="项目已结束"){
                    $(".surplusNameText7").css("background","#90a3a5")
                }
                if($(".surplusNameText8").text()=="项目已结束"){
                    $(".surplusNameText8").css("background","#90a3a5")
                }
            }
        }
    }); 
    //获取banner轮播图
    var bannerDatas = {
        "option":"getList",
        "userId":"",
        "page":1,
        "pageSize":8,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "isvalid":""
    };
    var bannerHtml="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcBanner",
        type:"POST",
        data:bannerDatas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data)
            if(data.success=="y"){
                for(var i=0;i<data.resData.dataList.length;i++){
                   bannerHtml+='<div class="swiper-slide">'+
                                    '<a href=projectInfo.html?projectId='+data.resData.dataList[i].projectId+'></a>'+
                                    '<img src='+cucr+data.resData.dataList[i].path+' alt="">'+
                                '</div>';        
                }
                $(".swiper-wrapper").html(bannerHtml)
                var sbanner='<div class="swiper-slide bgcenter" style="background-image:url(img/sbanner.jpg)"></div>';
                $(".swiper-wrapper").prepend(sbanner);
            }
            // swiper轮播图
            new Swiper('.swiper-container',{
                autoplay:5000,
                visibilityFullfit:true,
                loop:true,
                speed: 2000,
                preventClicks:false,
                pagination:'.swiper-pagination',
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
            })  
        }
    }); 
})
//获取分类
$(function(){
    // 获取推荐项目
    projectClass("1","公关传媒")
    projectClass("2","媒体投资")
    projectClass("3","美术设计")
    projectClass("4","展示制作")
    projectClass("5","品牌推广")
    projectClass("6","信息化建设")
    projectClass("7","其他")  
})

//分类请求
function projectClass(a,e){
    var datas = {
        "option":"getList",
        "userId":"",
        "page":1,
        "pageSize":3,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "queryUserId":"",
        "isrecomm":1,
        "surplusName":"",
        "amountState":"",
        "classifyId":a
    };
    var raiseListHtml="";
    var html="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProject",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data)
            if(data.success=="y"){
                for(var i=0;i<data.resData.dataList.length;i++){
                    raiseListHtml+='<a href="projectInfo.html?projectId='+data.resData.dataList[i].projectId+'" class="index-board-item  col-xl-4" >'+
                                    '<div class="index-board-item-inner flwidth">'+
                                        '<div class="index-board-item-inner-left index-board-item-inner-left-index bgcenter" style="background-image:url('+cucr+data.resData.dataList[i].pictureUrl+')">'+
                                            '<p class="surplusNameText'+(i+1)+'">'+data.resData.dataList[i].surplusName+'</p>'+
                                        '</div>'+
                                        '<div class="index-board-item-inner-right index-board-item-inner-right1 flwidth">'+
                                            '<div class="index-board-div1">'+
                                                '<h2>'+data.resData.dataList[i].name+'</h2>'+
                                                '<dd class="proInfodd3">'+
                                                    '<div style="width:'+data.resData.dataList[i].percent+'%"></div>'+
                                                '</dd>'+
                                                '<dl>'+
                                                    '<dd>'+
                                                        '<p>'+data.resData.dataList[i].percent+'%</p>'+
                                                        '<p>已达</p>'+
                                                    '</dd>'+
                                                    '<dd>'+
                                                        '<p>'+data.resData.dataList[i].totalPrice+'</p>'+
                                                        '<p>已筹</p>'+
                                                    '</dd>'+
                                                    '<dd>'+
                                                        '<p>'+data.resData.dataList[i].surplus+'天</p>'+
                                                        '<p>剩余时间</p>'+
                                                    '</dd>'+
                                                '</dl>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</a>';
                }
                html ='<div class="index-board-list raiseListHtml container raiseListHtml2 raiseListHtmls'+a+'"><div class="indexRasie"><p class="fl tjp1">'+e+'</p><p class="cursor fr tjp2"><a href="projects.html">更多项目</a></p></div><div class="row row'+a+'"></div></div>';

                $(".indexCon").append(html)
                $(".raiseListHtml2 .row"+a+"").append(raiseListHtml)
                if(data.resData.dataList.length==0){
                    $(".raiseListHtmls"+a+"").hide()
                }
                // console.log($(".surplusNameText").text())
                if($(".surplusNameText1").text()=="项目已结束"){
                    $(".surplusNameText1").css("background","#90a3a5")
                }
                if($(".surplusNameText2").text()=="项目已结束"){
                    $(".surplusNameText2").css("background","#90a3a5")
                }
                if($(".surplusNameText3").text()=="项目已结束"){
                    $(".surplusNameText3").css("background","#90a3a5")
                }
                if($(".surplusNameText4").text()=="项目已结束"){
                    $(".surplusNameText4").css("background","#90a3a5")
                }
                if($(".surplusNameText5").text()=="项目已结束"){
                    $(".surplusNameText5").css("background","#90a3a5")
                }
                if($(".surplusNameText6").text()=="项目已结束"){
                    $(".surplusNameText6").css("background","#90a3a5")
                }
                if($(".surplusNameText7").text()=="项目已结束"){
                    $(".surplusNameText7").css("background","#90a3a5")
                }
                if($(".surplusNameText8").text()=="项目已结束"){
                    $(".surplusNameText8").css("background","#90a3a5")
                }
            }
        }
    });
}
//获取首页累计金额
$(function(){
    var datas = {
        "option":"getHomeData",
        "userId":"",
    };
    var raiseListHtml="";
    var html="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcBanner",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            console.log(data)
            $(".ljzcje").text(data.resData.ljzcje)
            $(".ljzcrs").text(data.resData.ljzcrs)
            $(".ljtzxm").text(data.resData.ljtzxm)
            $(".dbzgczje").text(data.resData.dbzgczje)
        }
    })
})