$.fn.toggle = function( fn, fn2 ) {
    var args = arguments,guid = fn.guid || $.guid++,i=0,
    toggle = function( event ) {
      var lastToggle = ( $._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
      $._data( this, "lastToggle" + fn.guid, lastToggle + 1 );
      event.preventDefault();
      return args[ lastToggle ].apply( this, arguments ) || false;
    };
    toggle.guid = guid;
    while ( i < args.length ) {
      args[ i++ ].guid = guid;
    }
    return this.click( toggle );
  };
$(function(){
    $(".proNav1").click(function(){
        $(".proNav1").addClass("borderStyle");
        $(".proCon1").show();
        $(".proNav2").removeClass("borderStyle");
        $(".proCon2").hide();
        $(".proNav3").removeClass("borderStyle");
        $(".proCon3").hide();
    })
    $(".proNav2").click(function(){
        $(".proNav2").addClass("borderStyle");
        $(".proCon2").show();
        $(".proNav1").removeClass("borderStyle");
        $(".proCon1").hide();
        $(".proNav3").removeClass("borderStyle");
        $(".proCon3").hide();
    })
    $(".proNav3").click(function(){
        $(".proNav3").addClass("borderStyle");
        $(".proCon3").show();
        $(".proNav1").removeClass("borderStyle");
        $(".proCon1").hide();
        $(".proNav2").removeClass("borderStyle");
        $(".proCon2").hide();
    })
    $(".con2ddBtn p").toggle(function(){
        $(this).parent().next().next().slideDown();
    },function(){
        $(this).parent().next().next().slideUp();
    })
    var h=$("html").height();
    var w=$("html").width();
    $(".supportCon").css("height",h+"px").css("width",w+"px");
    $(".proInfodd6 div").click(function(){
        $(".supportCon").fadeIn()
    })
    $(".closeSupport").click(function(){
        $(".supportCon").fadeOut()
    })
});
//获取projectId
(function ($) {
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
})(jQuery);
var projectId = $.getUrlParam('projectId');
$(function(){
  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        window.location.href = "projectInfoPhone.html?projectId="+projectId+"";
  }
})
//私聊接收人ID
var accUserId;
var projectName;
var projectMode;
var projectAmount;
var projectMaxcopies;

$(function(){
    //获取页面信息
    var datas={
        "option":"getProjectInfo",
        "userId":localStorage.userId,
        "projectId":projectId
    };
    var htmlInfo="";
    var originator="";
    var detailInfo="";

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
            if(data.resData.cfType=="1"){
                $(".auditDiv").show();
            }
            if(data.resData.cfType=="2"){
                $(".equityDiv").show();
            }
            if(data.success=="y"){
                // console.log(data)
                singlePrice=data.resData.singlePrice;
                accUserId=data.resData.userId;
                projectName=data.resData.name;
                projectMode=data.resData.mode;
                projectAmount=data.resData.amount;
                projectMaxcopies=data.resData.maxcopies;
                // 头部信息
                htmlInfo = '<div class="projectInfoConTl fl bgcenter" style="background-image:url('+cucr+data.resData.pictureUrl+')"></div>'+
                                '<div class="projectInfoConTr fr">'+
                                    '<h1>'+data.resData.name+'</h1>'+
                                    '<dl>'+
                                        '<dd class="proInfodd1" style="float:left;width:50%">所属公司：'+data.resData.companyName+'</dd>'+
                                        '<dd class="proInfodd1">项目编号：'+data.resData.projectNo+'</dd>'+
                                        '<dd class="proInfodd1">已筹到</dd>'+
                                        '<dd class="proInfodd2">'+
                                            '<span>￥</span>'+
                                            '<span>'+data.resData.totalPrice +'</span>'+
                                        '</dd>'+
                                        '<dd class="proInfodd3">'+
                                            '<div style="width:'+data.resData.percent+'%"></div>'+
                                        '</dd>'+
                                        '<dd class="proInfodd4">'+
                                            '<span>当前进度为<i>'+data.resData.percent+'%</i></span>'+
                                            '<span>目标金额￥<em>'+data.resData.amount+'</em></span>'+
                                        '</dd>'+
                                        '<dd class="proInfodd5 fl">'+
                                            '<div class="fl">'+
                                                '<p><span>'+data.resData.surplus+'</span>天</p>'+
                                                '<p>剩余时间</p>'+
                                            '</div>'+
                                            '<div class="fr">'+
                                                '<p><span>'+data.resData.totalPerson+'</span>位</p>'+
                                                '<p>支持者</p>'+
                                            '</div>'+
                                        '</dd>'+
                                        '<div class="clear"></div>'+
                                        '<dd class="proInfodd6">'+
                                            '<div onclick="onceSupport()">立即支持</div>'+
                                        '</dd>'+
                                            '<div class="focus fr" onclick="collection()"></div>'+
                                        '</div>'+
                                    '</dl>'+
                            '</div>';
                // isColl为2为收藏为1已收藏
                $(".projectInfoConT").prepend(htmlInfo)
                if(data.resData.isColl=="2"){
                    $(".focus").text("收藏")
                }
                if(data.resData.surplusName=="项目已结束"){
                    $(".proInfodd6>div").text("项目已结束").css("background-color","#eee").css("color","#666").css("pointer-events","none")
                }
                if(data.resData.isColl=="1"){
                    $(".focus").text("已收藏")
                }
                $(".proInfodd7").show();
                //发起人信息
                originator='<div>'+
                                '<h1>项目发起人</h1>'+
                                '<div class="projectInfoConCrChild1div">'+
                                    '<div class="projectInfoConCrChild1divl fl">'+
                                        '<div class="bgcenter" style="background-image:url('+cucr+data.resData.headUrl+')"></div>'+
                                    '</div>'+
                                    '<div class="projectInfoConCrChild1divr fr">'+
                                        '<ul>'+
                                            '<li class="projectInfoConCrChild1divrli1">'+data.resData.nickName+'</li>'+
                                            '<li class="projectInfoConCrChild1divrli2">'+data.resData.autograph+'</li>'+
                                            '<li class="projectInfoConCrChild1divrli3"></li>'+
                                        '</ul>'+
                                    '</div>'+
                                '</div>'+
                                '<div style="margin-bottom:3rem">'+
                                '<textarea class="directMsgTxt" style="margin-left: 0rem;width: 100%;margin-top:2rem" rows="5"></textarea>'+
                                '<div class="fl proConBtn">'+
                                    '<div class="fr sendText" onclick="directMsg('+"'"+data.resData.userId+"'"+')">私信</div>'+
                                '</div>'+
                            '</div>'+
                            '</div>';
                $(".projectInfoConCrChild1").append(originator)
                //获取项目详情
                var b = new Base64();  
                var str = b.decode(data.resData.details); 
                detailInfo = "<p>"+str+"</p>";
                $(".proCon1").html(detailInfo); 
            }
        }
    });
    //获取所有评论
    allComments();
})
//收藏项目
function collection(){
    if(localStorage.userId!=undefined){
        if($(".focus").text()=="收藏"){
            var datas={
                "option":"add",
                "userId":localStorage.userId,
                "projectId":projectId
            };
            $.ajax({
                cache:true,
                url:cucr+"/api/ClzcProjectCollect",
                type:"POST",
                data:datas,
                async:true,
                error:function(request){
                    return;
                },
                success:function(data){
                    console.log(data)
                    $(".focus").text("已收藏")
                    layer.alert('收藏成功！', {
                      icon: 1,
                      skin: 'layer-ext-moon'
                    },function(index){
                         layer.close(index);
                    }) 
                }
            }); 
        }else{
            layer.alert('你已经收藏了！', {
              icon: 1,
              skin: 'layer-ext-moon'
            },function(index){
                 layer.close(index);
            }) 
        }
    }else{
        layer.alert('只有登录后才能收藏咯！', {
          icon: 2,
          skin: 'layer-ext-moon'
        })
    }
}

//私信
function directMsg(e){
    if(localStorage.userId!=undefined){
        var datas={
            "option":"add",
            "userId":localStorage.userId,
            "accUserId":e,
            "projectId":projectId,
            "comment":$(".directMsgTxt").val()
        };
        $.ajax({
            cache:true,
            url:cucr+"/api/ClzcProjectComment",
            type:"POST",
            data:datas,
            async:true,
            error:function(request){
                return;
            },
            success:function(data){
                if(data.success=="y"){
                    if($(".directMsgTxt").val()==""){
                        layer.alert('私信内容不能为空！', {
                          icon: 2,
                          skin: 'layer-ext-moon'
                        },function(index){
                             layer.close(index);
                        }) 
                    }else{
                        layer.alert('私信成功！', {
                          icon: 1,
                          skin: 'layer-ext-moon'
                        },function(index){
                            $(".directMsgTxt").val("")
                             layer.close(index);
                        })
                    }
                }  
            }
        }); 
    }else{
        layer.alert('只有登录后才能私信咯！', {
          icon: 2,
          skin: 'layer-ext-moon'
        })
    }
}
//发送评论
function questionProject(){
    if(localStorage.userId!=undefined){
        var datas={
            "option":"add",
            "userId":localStorage.userId,
            "projectId":projectId,
            "accuserid":localStorage.userId,
            "question":$(".proConBtnTxt").val()
        };
        $.ajax({
            cache:true,
            url:cucr+"/api/ClzcProjectQuestion",
            type:"POST",
            data:datas,
            async:true,
            error:function(request){
                return;
            },
            success:function(data){
                if(data.success=="y"){
                    if($(".proConBtnTxt").val()==""){
                        layer.alert('评论不能为空！', {
                          icon: 2,
                          skin: 'layer-ext-moon'
                        },function(index){
                             layer.close(index);
                        }) 
                    }else{
                        layer.alert('评论成功！', {
                          icon: 1,
                          skin: 'layer-ext-moon'
                        },function(index){
                            $(".proConBtnTxt").val("");
                            allComments();
                             layer.close(index);
                        })
                    }
                }  
            }
        });
    }else{
        layer.alert('只有登录后才能评论咯！', {
          icon: 2,
          skin: 'layer-ext-moon'
        })
    }
    
}
//获取所有评论

function allComments(){
    var datas={
        "option":"getList",
        "userId":localStorage.userId,
        "page":1,
        "pageSize":2,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "sendUserId":"",
        "projectId":projectId
    };
    var commentsDl="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectQuestion",
        type:"POST",
        data:datas,
        async:true,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data)
            if(data.success=="y"){
                $(".pageSpan").text(data.resData.totalCount);
                for(var i=0;i<data.resData.dataList.length;i++){
                    commentsDl +='<dd>'+
                                    '<ul class="con2ddul fl">'+
                                        '<li class="bgcenter con2ddli1" style="background-image:url('+cucr+data.resData.dataList[i].sendHeadUrl+')"></li>'+
                                        '<li class="con2ddli2">'+data.resData.dataList[i].sendNickName +'</li>'+
                                        '<li class="con2ddli3">'+data.resData.dataList[i].createTime+'</li>'+
                                    '</ul>'+
                                    '<p>'+data.resData.dataList[i].question+'</p>'+
                                    '<div class="clear"></div>'+
                                    '<div class="con2ddBtn fl">'+
                                        '<p>&nbsp;</p>'+
                                    '</div>'+
                                    '<div class="clear"></div>'+
                                    '<div style="display:none">'+
                                        '<textarea class="childtext" rows="5"></textarea>'
                                        '<div class="fl proConBtn">'+
                                            '<div class="fr sendText">发送</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</dd>';
                }
                $(".commentsDl").html(commentsDl)
            }
            $(".tcdPageCode").createPage({
                pageCount:data.resData.totalPage,
                current:data.resData.pageIndex,
                backFn:function(p){
                    pageClass1(p)
                }
            });
        }
    });
}
function pageClass1(e){
    var datas={
        "option":"getList",
        "userId":localStorage.userId,
        "page":e,
        "pageSize":2,
        "searchKey":"",
        "startTime":"",
        "endTime":"",
        "sendUserId":"",
        "projectId":projectId
    };
    // console.log(projectId)
    var commentsDl="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectQuestion",
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
                    commentsDl +='<dd>'+
                                    '<ul class="con2ddul fl">'+
                                        '<li class="bgcenter con2ddli1" style="background-image:url('+cucr+data.resData.dataList[i].sendHeadUrl+')"></li>'+
                                        '<li class="con2ddli2">'+data.resData.dataList[i].sendNickName +'</li>'+
                                        '<li class="con2ddli3">'+data.resData.dataList[i].createTime+'</li>'+
                                    '</ul>'+
                                    '<p>'+data.resData.dataList[i].question+'</p>'+
                                    '<div class="clear"></div>'+
                                    '<div class="con2ddBtn fl">'+
                                        '<p>&nbsp;</p>'+
                                    '</div>'+
                                    '<div class="clear"></div>'+
                                    '<div style="display:none">'+
                                        '<textarea class="childtext" rows="5"></textarea>'
                                        '<div class="fl proConBtn">'+
                                            '<div class="fr sendText">发送</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</dd>';
                }
                $(".commentsDl").html(commentsDl)
            }
        }
    });
}
//立即支持页面
function onceSupport(){
    if(localStorage.userId!=undefined){
        var datas={
            "option":"projectReturn",
            "userId":localStorage.userId,
            "projectId":projectId
        };
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
                materialId=data.resData.materialId;
                quotaId=data.resData.quotaId;
                stockId=data.resData.stockId;
                layer.open({
                    type: 2,
                    title: '立即支持',
                    shadeClose: true,
                    shade: 0.4,
                    area: ['880px', '580px'],
                    content: './onceSupport1.html',
                    success: function (layero, index){
                        var body = layer.getChildFrame('body', index);
                        body.contents().find(".projectId").val(projectId);
                        body.contents().find(".projectName").val(projectName);
                        body.contents().find(".materialId").val(materialId);
                        body.contents().find(".quotaId").val(quotaId);
                        body.contents().find(".stockId").val(stockId);
                    }
                });
            }
        })
        /*if(projectMode==1){
             
        }else{
            layer.open({
                type: 2,
                title: '立即支持',
                shadeClose: true,
                shade: 0.4,
                area: ['380px', '280px'],
                content: '../onceSupport2.html',
                success: function (layero, index){
                    var body = layer.getChildFrame('body', index);
                    body.contents().find(".projectName").val(projectName);
                    body.contents().find(".projectId").val(projectId);
                }
            }); 
        }*/
    }else{
        layer.alert('只有登录后才能支持咯！', {
          icon: 2,
          skin: 'layer-ext-moon'
        })
    }  
}
// 实物，定额，股份tab切换
$(function(){
    $(".divUlSupport li").click(function(){
        var i=$(this).index();
        $(this).addClass("select").siblings().removeClass("select");
        $(".divliSupport").eq(i).show().siblings().hide();
    })
})
// 根据项目id获取项目参与方式
var materialId,quotaId,stockId;
$(function(){
    var datas={
            "option":"projectReturn",
            "userId":localStorage.userId,
            "projectId":projectId
        };
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProject",
        type:"POST",
        data:datas,
        async:false,
        error:function(request){
            return;
        },
        success:function(data){
            materialId=data.resData.materialId;
            quotaId=data.resData.quotaId;
            stockId=data.resData.stockId;
        }
    })
    divliSupport1(1)
    divliSupport2(1)
    divliSupport3(1)
})
//获取实物支持参与人列表
function divliSupport1(e){
    var datas={
            "option":"getInfoByProjectId",
            "userId":localStorage.userId,
            "projectId":projectId,
            "beUserId":"",
            "page":e,
            "pageSize":3
        };
    var html="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectMaterialPartake",
        type:"POST",
        data:datas,
        async:false,
        error:function(request){
            return;
        },
        success:function(data){
            // console.log(data)
            for(var i=0;i<data.resData.dataList.length;i++){
                html +="<dl><dd>"+data.resData.dataList[i].userName+"</dd><dd>"+data.resData.dataList[i].number+"</dd><dd>"+data.resData.dataList[i].totalPrice+"</dd><dd>"+data.resData.dataList[i].createTime+"</dd></dl>"
            }
            $(".dlddInfo2").html(html);
            $(".tcdPageCode2").createPage({
                pageCount:data.resData.totalPage,
                current:data.resData.pageIndex,
                backFn:function(p){
                    divliSupport1(p)
                }
            });
        }

    })
    
}
//获取定额支持参与人列表
function divliSupport2(e){
    var datas={
            "option":"getInfoByProjectId",
            "userId":localStorage.userId,
            "projectId":projectId,
            "beUserId":"",
            "page":e,
            "pageSize":3
        };
    var html="";
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectQuotaPartake",
        type:"POST",
        data:datas,
        async:false,
        error:function(request){
            return;
        },
        success:function(data){
            for(var i=0;i<data.resData.dataList.length;i++){
                html +="<dl><dd>"+data.resData.dataList[i].userName+"</dd><dd>"+data.resData.dataList[i].number+"</dd><dd>"+data.resData.dataList[i].totalPrice+"</dd><dd>"+data.resData.dataList[i].createTime+"</dd></dl>"
            }
            $(".dlddInfo3").html(html);
            $(".tcdPageCode3").createPage({
                pageCount:data.resData.totalPage,
                current:data.resData.pageIndex,
                backFn:function(p){
                    divliSupport2(p)
                }
            });
        }
    })
}
//获取股份支持参与人列表
function divliSupport3(e){
    var datas={
            "option":"getProjectDynamic",
            "userId":localStorage.userId,
            "projectId":projectId,
            "beUserId":"",
            "page":e,
            "pageSize":6
        };
    var html="";
    console.log(datas)
    $.ajax({
        cache:true,
        url:cucr+"/api/ClzcProjectMaterialPartake",
        type:"POST",
        data:datas,
        async:false,
        error:function(request){
            return;
        },
        success:function(data){
            console.log(data)
            for(var i=0;i<data.resData.dataList.length;i++){
                if(data.resData.dataList[i].support=="实物支持"){
                    if(data.resData.dataList[i].headImg==""){
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url(img/imgMR.jpg)'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd1 swbtn'>"+data.resData.dataList[i].support+"</span><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd></dl><h2 class='border80'></h2></div>"
                    }else{
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url("+cucr+data.resData.dataList[i].headImg+")'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd1 swbtn'>"+data.resData.dataList[i].support+"</span><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd></dl><h2 class='border80'></h2></div>"
                    }
                }
                if(data.resData.dataList[i].support=="定额支持"){
                    if(data.resData.dataList[i].headImg==""){
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url(img/imgMR.jpg)'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd1 debtn'>"+data.resData.dataList[i].support+"</span><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd></dl><h2 class='border80'></h2></div>"
                    }else{
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url("+cucr+data.resData.dataList[i].headImg+")'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd1 debtn'>"+data.resData.dataList[i].support+"</span><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd></dl><h2 class='border80'></h2></div>"
                    }
                }
                if(data.resData.dataList[i].support=="股份支持"){
                    if(data.resData.dataList[i].headImg==""){
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url(img/imgMR.jpg)'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd1 gfbtn'>"+data.resData.dataList[i].support+"</span><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd></dl><h2 class='border80'></h2></div>"
                    }else{
                        html +="<div class='dddiv'><p class='ddp bgcenter'style='background-image:url("+cucr+data.resData.dataList[i].headImg+")'></p>"+"<dl class='dddl'><dd><span class='ddspan1'>"+data.resData.dataList[i].userName+"</span><span class='ddspan2'>"+data.resData.dataList[i].createTime+"</span></dd><dd><span class='ddspandd1 gfbtn'>"+data.resData.dataList[i].support+"</span><span class='ddspandd2'>支持份数：1</span><span class='ddspandd3'>总金额：￥"+data.resData.dataList[i].totalPrice+"<span></dd></dl><h2 class='border80'></h2></div>"
                    }
                }
                 
            }
            $(".dlddInfo4").html(html);
            $(".tcdPageCode4").createPage({
                pageCount:data.resData.totalPage,
                current:data.resData.pageIndex,
                backFn:function(p){
                    divliSupport3(p)
                }
            });
        }
    })
}

