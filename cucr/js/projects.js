$(function(){
    projectList(1,"","");
    //状态切换
    $(".projectsdl>dd").click(function(){
        $(this).addClass("projectSelect").siblings().removeClass("projectSelect")
    })
})
var flag=0;
//全部众筹
function raiseAll(){
    flag=1;
    projectList(1,"","")
}
//众筹中
function raiseProcess(){
    flag=2;
    projectList(1,1,"")
}
//众筹成功
function raiseSuccess(){
    flag=3;
    projectList(1,"",1)
}
//众筹失败
function raiseError(){
    flag=4;
    projectList(1,"",2)
}
//结束众筹
function raiseComplete(){
    flag=5;
    projectList(1,2,"")
}

function projectList(e,s,a){
    //获取项目列表
    var datas = {
        "option":"getList",
        "userId":localStorage.userId,
        "page":e,
        "pageSize":8,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "queryUserId":"",
        "isrecomm":"",
        "surplusName":s,
        "amountState":a
    };
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
                    html +='<a href="projectInfo.html?projectId='+data.resData.dataList[i].projectId+'" class="index-board-item  col-xl-3" >'+
                            '<div class="index-board-item-inner flwidth">'+
                                '<div class="index-board-item-inner-left bgcenter" style="background-image:url('+cucr+data.resData.dataList[i].pictureUrl+')">'+
                                    '<p class="surplusNameText'+(i+1)+'">'+data.resData.dataList[i].surplusName+'</p>'+
                                '</div>'+
                                '<div class="index-board-item-inner-right flwidth">'+
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
                $(".rowPagesCon").html(html)
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
            $(".tcdPageCode").createPage({
                pageCount:data.resData.totalPage,
                current:data.resData.pageIndex,
                backFn:function(p){
                    if(flag==0){
                        projectList(p,"","")
                    }
                    if(flag==1){
                        projectList(p,"","")
                    }
                    if(flag==2){
                        projectList(p,1,"")
                    }
                    if(flag==3){
                        projectList(p,"",1)
                    }
                    if(flag==4){
                        projectList(p,"",2)
                    }
                    if(flag==5){
                        projectList(p,2,"")
                    }
                }
            });
        }
    }); 
}

//搜索
function projectSearch(e){
    //获取项目列表
    var datas = {
        "option":"getList",
        "userId":localStorage.userId,
        "page":e,
        "pageSize":8,
        "searchKey":$(".searchInput").val(),
        "startTime":"",
        "endTime":"",
        "queryUserId":"",
        "isrecomm":"",
        "surplusName":"",
        "amountState":""
    };
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
            console.log(data)
            if(data.success=="y"){
                for(var i=0;i<data.resData.dataList.length;i++){
                    html +='<a href="projectInfo.html?projectId='+data.resData.dataList[i].projectId+'" class="index-board-item  col-xl-3" >'+
                            '<div class="index-board-item-inner flwidth">'+
                                '<div class="index-board-item-inner-left bgcenter" style="background-image:url('+cucr+data.resData.dataList[i].pictureUrl+')">'+
                                    '<p></p>'+
                                '</div>'+
                                '<div class="index-board-item-inner-right flwidth">'+
                                    '<div class="index-board-div1">'+
                                        '<h2>'+data.resData.dataList[i].name+'</h2>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</a>';
                }
                $(".rowPagesCon").html(html)
            }
            $(".tcdPageCode").createPage({
                pageCount:data.resData.totalPage,
                current:data.resData.pageIndex,
                backFn:function(p){
                    projectSearch(p)
                }
            });
        }
    }); 
}