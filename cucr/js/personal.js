$.fn.toggle = function(fn, fn2) {
    var args = arguments,
        guid = fn.guid || $.guid++,
        i = 0,
        toggle = function(event) {
            var lastToggle = ($._data(this, "lastToggle" + fn.guid) || 0) % i;
            $._data(this, "lastToggle" + fn.guid, lastToggle + 1);
            event.preventDefault();
            return args[lastToggle].apply(this, arguments) || false;
        };
    toggle.guid = guid;
    while (i < args.length) {
        args[i++].guid = guid;
    }
    return this.click(toggle);
};
var provinceid, cityid, areaid, qjName, companyId;

$(function() {
    /*$(".personalConldd1").click(function(){
        $(this).addClass("personalSelect1")
    })
    $(".personalConldd2").click(function(){
        $(".personalConldd1").removeClass("personalSelect1")
    })*/
    /*个人中心nav切换*/
    $(".connavspan1").click(function() {
        $(".connavspan1").addClass("connavselect");
        $(".connavspan2").removeClass("connavselect");
        $(".conspan1").show();
        $(".conspan2").hide();
    });
    $(".connavspan2").click(function() {
        $(".connavspan2").addClass("connavselect");
        $(".connavspan1").removeClass("connavselect");
        $(".conspan2").show();
        $(".conspan1").hide();
    });
    /*侧边切换右边内容*/
    $(".personalConldl dd").click(function() {
            var i = $(this).index();
            $(this).addClass("selectBr").addClass("selectBr" + i).siblings().removeClass("selectBr").removeClass("selectBr" + i);
            $(".personalConr>div").eq(i).show().siblings().hide();
        })
        /*消息中心nav切换*/
    $(".connav2span1").click(function() {
        $(".connav2span1").addClass("connavselect");
        $(".connav2span2").removeClass("connavselect");
        $(".con2span1").show();
        $(".con2span2").hide();
    });
    $(".connav2span2").click(function() {
        $(".connav2span2").addClass("connavselect");
        $(".connav2span1").removeClass("connavselect");
        $(".con2span2").show();
        $(".con2span1").hide();
    });
    /*回复按钮切换*/

    /*发起项目按钮*/
    /*$(".personalConlli3 div").click(function(){
        $(".personalContent").hide();
        $(".aProject").show();
    });*/
    /*发起项目回报方式tab切换*/
    $(".aProjectdiv4dd1").click(function() {
        $(".aProjectdiv4dd1").addClass("aProjectdivSelect");
        $(".aProjectdiv4dd2").removeClass("aProjectdivSelect");
        $(".aProjectdiv4dd3").removeClass("aProjectdivSelect");
        $(".aProjectdiv4Con1").show();
        $(".aProjectdiv4Con2").hide();
        $(".aProjectdiv4Con3").hide();
    });
    $(".aProjectdiv4dd2").click(function() {
        $(".aProjectdiv4dd2").addClass("aProjectdivSelect");
        $(".aProjectdiv4dd1").removeClass("aProjectdivSelect");
        $(".aProjectdiv4dd3").removeClass("aProjectdivSelect");
        $(".aProjectdiv4Con2").show();
        $(".aProjectdiv4Con1").hide();
        $(".aProjectdiv4Con3").hide();
    });
    $(".aProjectdiv4dd3").click(function() {
        $(".aProjectdiv4dd3").addClass("aProjectdivSelect");
        $(".aProjectdiv4dd2").removeClass("aProjectdivSelect");
        $(".aProjectdiv4dd1").removeClass("aProjectdivSelect");
        $(".aProjectdiv4Con3").show();
        $(".aProjectdiv4Con2").hide();
        $(".aProjectdiv4Con1").hide();
    });
    /*获取个人中心资料*/
    var datas = {
        "option": "getUserInfo",
        "userId": localStorage.userId,
    };
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
            // console.log(data.resData);
            //昵称
            var nickName = data.resData.nickname;
            // 姓名
            var name = data.resData.name;

            qjName = data.resData.name;
            // 个性签名
            var autograph = data.resData.autograph;
            // 所在地
            var region = data.resData.region;
            // 详细地址
            var address = data.resData.address;
            // 性别
            var sex = data.resData.sex;
            // 职业
            var profession = data.resData.profession;
            // 公司名称
            var companyname = data.resData.companyname;
            // 微博地址
            var homePage = data.resData.homepage;
            //手机号
            var phone = data.resData.phone;
            // 身份证
            var idcard = data.resData.idcard;
            //头像图片
            headimg = data.resData.headimg;

            var headurl = data.resData.headurl;
            var provinceId = data.resData.provinceid;
            var cityId = data.resData.cityid;
            var areaId = data.resData.areaid;
            $(".personalConlli2>p").text(nickName);
            $(".idcard").val(idcard);
            $(".phone").val(phone);
            $(".nickName").val(nickName);
            $(".userName").val(name);
            $(".autograph").val(autograph);
            $(".region").val(region);
            $(".address").val(address);
            $(".provinceId").val(provinceId);
            $(".cityId").val(cityId);
            $(".areaId").val(areaId)
            if (sex == 1) {
                $(".gender1").attr("checked", 'checked');
            }
            if (sex == 2) {
                $(".gender2").attr("checked", 'checked');
            };
            $(".profession").val(profession);
            $(".companyName").val(companyname);
            $(".homePage").val(homePage);
            var date = new Date;
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var getData = date.getDate();
            var headurl1 = "/Upload/" + year + "/" + month + "" + getData + "/";
            if (headurl == headurl1 || headurl == "") {
                $(".personalConlli1>div").css("backgroundImage", "url(img/imgMR.jpg)")
                $(".conspan1photo").css("backgroundImage", "url(img/imgMR.jpg)")
            } else {
                $(".personalConlli1>div").css("backgroundImage", "url(" + cucr + headurl + ")")
                $(".conspan1photo").css("backgroundImage", "url(" + cucr + headurl + ")")
            }
        }
    });

    //退出登录按钮显影
    if (localStorage.getItem(localStorage.key(0)) != null) {
        $(".logOut").show();
    } else {
        $(".logOut").hide();
    }





















});

var headImgres = "";
//修改用户数据
function saveDates() {
    addBankCard({
        "no": "string",
        "userId": "string",
        "bank": "string",
        "isDefault": true,
        "belongTo": "string"
    }, () => {
        alert(1);
    });
    if (headImgres != "") {
        headImg = headImgres
    } else {
        headImg = headimg
    }
    var datas = {
        "option": "update",
        "userId": localStorage.userId,
        "name": $(".userName").val(),
        "nickName": $(".nickName").val(),
        "headImg": headImg,
        "sex": $("input[name='gender']:checked").val(),
        "region": $(".region").val(),
        "address": $(".address").val(),
        "companyName": $(".companyName").val(),
        "idCard": $(".idcard").val(),
        "provinceId": $(".provinceId").val(),
        "cityId": $(".cityId").val(),
        "areaId": $(".areaId").val(),
        "homePage": $(".homePage").val(),
        "profession": $(".profession").val(),
        "autograph": $(".autograph").val()
    };
    console.log(datas)
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

            if (data.success == "y") {
                layer.alert('资料保存成功！', {
                    icon: 1,
                    skin: 'layer-ext-moon'
                }, function() {
                    $(".layui-layer-shade").fadeOut();
                    $(".layui-layer").fadeOut();
                    window.location.reload()
                })
            }
            console.log(data)
        }
    });
};

//修改密码保存
function editPwd() {
    var datas = {
        "option": "updatePwd",
        "userId": localStorage.userId,
        "phone": $(".phone").val(),
        "code": $(".phoneNewCode").val(),
        "newPwd": $(".phoneNewPwd").val()
    };
    if ($(".phoneNewPwd").val().length > 5) {
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
                console.log(data);
                if (data.success == "n") {
                    layer.alert('信息为空或填写错误！', {
                        icon: 2,
                        skin: 'layer-ext-moon'
                    })
                } else {
                    layer.alert('密码修改成功！', {
                        icon: 1,
                        skin: 'layer-ext-moon'
                    })
                }
            }
        });
    } else {
        layer.alert('密码设置不能小于六位！', {
            icon: 2,
            skin: 'layer-ext-moon'
        })
    }


};
// 退出登录
function logOutClick() {
    localStorage.clear();
    window.location.replace("/cucr/index.html");
};
//省份区域选择
//定义省份id
var regionId1, regionId2, regionId3;
//定义省份文字
var regionTx1, regionTx2, regionTx3;

function regionClick() {
    var datas = {
        "pId": "0",
        "userId": localStorage.userId,
    };
    $.ajax({
        cache: true,
        url: cucr + "/api/SysArea",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            $(".dlregion1>dd").remove();
            var html = "";
            for (var i = 0; i < data.resData.length; i++) {
                html += "<dd onclick=d2(" + "'" + data.resData[i].name + "'" + "," + data.resData[i].id + ")>" + data.resData[i].name + "</dd>";
            }
            $(".dlregion1").append(html)
        }
    });
    $(".dlregion1").show()
};

function d2(n, id) {
    regionId1 = id;
    regionTx1 = n;
    if (regionTx1 == "台湾省" || regionTx1 == "香港特别行政区" || regionTx1 == "澳门特别行政区") {
        $(".region").val(regionTx1)
        $(".provinceId").val(regionId1)
        $(".dlregion1").hide();
        $(".dlregion1>dd").remove();
    }
    var datas = {
        "pId": id,
        "userId": localStorage.userId,
    };
    $.ajax({
        cache: true,
        url: cucr + "/api/SysArea",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            $(".dlregion1>dd").remove();
            var html = "";
            for (var i = 0; i < data.resData.length; i++) {
                html += "<dd onclick=d3(" + "'" + data.resData[i].name + "'" + "," + data.resData[i].id + ")>" + data.resData[i].name + "</dd>";
            }
            $(".dlregion1").append(html)
        }
    });

};

function d3(n, id) {
    regionId2 = id;
    regionTx2 = n;
    var datas = {
        "pId": id,
        "userId": localStorage.userId,
    };
    $.ajax({
        cache: true,
        url: cucr + "/api/SysArea",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            $(".dlregion1>dd").remove();
            console.log(data.resData);
            var html = ""
            for (var i = 0; i < data.resData.length; i++) {
                html += "<dd  onclick=hidedd(" + "'" + data.resData[i].name + "'" + "," + data.resData[i].id + ")>" + data.resData[i].name + "</dd>";
            }
            $(".dlregion1").append(html)
        }
    });

};

function hidedd(n, id) {
    regionId3 = id;
    regionTx3 = n;
    $(".region").val(regionTx1 + "--" + regionTx2 + "--" + regionTx3)
    $(".provinceId").val(regionId1)
    $(".cityId").val(regionId2)
    $(".areaId").val(regionId3)
    $(".dlregion1").hide();
    $(".dlregion1>dd").remove();
};

function imgdown() {
    var datas = new FormData($('#uploadForm')[0]);
    $.ajax({
        url: cucr + '/api/Files',
        type: 'POST',
        data: datas,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            if (data.success) {
                headImgres = data.resData.fileId;
                $(".layui-layer").fadeOut();
                $(".layui-layer-shade").fadeOut()
            } else {
                console.log(data.message);
            }
        },
        error: function(data) {
            console.log(data.success);
        }
    });
}

function uploadSubmit() {
    imgdown();
    saveDates();
}

//修改头像弹窗
function layerPhoto() {
    layer.open({
        type: 1,
        title: "修改头像",
        skin: 'layui-layer-rim', //加上边框
        area: ['420px', '314px'], //宽高
        content: '<dd style="margin-top:2rem;margin-bottom: -1.5rem;"><span style="display:none">修改头像</span><form id="uploadForm" enctype="multipart/form-data" ><div class="form-group" style="margin-left: 6rem;margin-top: -1.5rem;"><div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload"><div class="fileinput-new thumbnail" style="width: 200px;height: auto;max-height:150px;"><img id="picImg" style="width: 100%;height:100%" src="" alt="" /></div><div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div><div><span class="btn btn-primary btn-file" style="background:white;border:1px solid white;width:50%;text-align: left;cursor: pointer;"><span class="fileinput-new" style="width:50%;text-align:center;cursor: pointer;color: #999;">选择图片</span><span class="fileinput-exists" style="width:100%;text-align:center;cursor: pointer;color:#333">换一张</span><input type="file" name="pic1" val="1" id="picID" accept="image/gif,image/jpeg,image/x-png" /></span></div></div></div><div id="uploadSubmit" onclick="uploadSubmit()" style="width: 100%;" class="btn btn-info">保存</div></form></dd>'
    });
}
var pageNums;
var pageIndex;

// 获取审核页面
function submitAudit(page) {
    //获取项目列表
    var datas = {
        "option": "getMyList",
        "userId": localStorage.userId,
        "page": page,
        "pageSize": 9,
        "searchKey": "",
        "startTime": "",
        "endTime": "",
        "queryUserId": localStorage.userId,
        "isrecomm": "",
        "state": "",
        "surplusName": "",
        "amountState": ""
    };
    var html = "";
    var pages = "";
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProject",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            console.log(data)
            if (data.success == "y") {
                for (var i = 0; i < data.resData.dataList.length; i++) {
                    html += '<a href=auditEditRaise.html?projectId=' + data.resData.dataList[i].projectId + ' class="index-board-item  col-xl-4" >' +
                        '<div class="index-board-item-inner flwidth">' +
                        '<div class="index-board-item-inner-left bgcenter" style="background-image:url(' + cucr + data.resData.dataList[i].pictureUrl + ')">' +
                        '</div>' +
                        '<div class="index-board-item-inner-right flwidth">' +
                        '<div class="index-board-div1">' +
                        '<h2>' + data.resData.dataList[i].name + '</h2>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>'
                }
                $(".personalCon7con").html(html);
                $(".tcdPageCode1").createPage({
                    pageCount: data.resData.totalPage,
                    current: data.resData.pageIndex,
                    backFn: function(p) {
                        // console.log(p)
                        submitAudit(p)
                    }
                });
            }
        }
    });
}

// 获取收藏列表
function collectionList(page) {
    //获取收藏列表
    var datas = {
        "option": "getList",
        "userId": localStorage.userId,
        "page": page,
        "pageSize": 9,
        "searchKey": "",
        "startTime": "",
        "endTime": "",
        "queryUserId": ""
    };
    var html = "";
    var pages = "";
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectCollect",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            console.log(data)
            if (data.success == "y") {
                for (var i = 0; i < data.resData.dataList.length; i++) {
                    /*html +='<a href=projectInfo.html?projectId='+data.resData.dataList[i].projectId+' class="index-board-item  col-xl-4" >'+
                            '<div class="index-board-item-inner flwidth">'+
                                '<div class="index-board-item-inner-left bgcenter" style="background-image:url('+cucr+data.resData.dataList[i].pictureUrl+')">'+
                                '</div>'+
                                '<div class="index-board-item-inner-right flwidth">'+
                                    '<div class="index-board-div1">'+
                                        '<h2>'+data.resData.dataList[i].name+'</h2>'+
                                        '<span class="cancelCollection cursor" onclick="cancelCollection('+"'"+data.resData.dataList[i].projectId+"'"+')">取消收藏</span>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</a>'*/
                    html += '<a href="projectInfo.html?projectId=' + data.resData.dataList[i].projectId + '" class="index-board-item  col-xl-4" >' +
                        '<div class="index-board-item-inner flwidth">' +
                        '<div class="index-board-item-inner-left index-board-item-inner-left-index bgcenter" style="background-image:url(' + cucr + data.resData.dataList[i].pictureUrl + ')">' +
                        '<p class="surplusNameText' + (i + 1) + '">' + data.resData.dataList[i].surplusName + '</p>' +
                        '</div>' +
                        '<div class="index-board-item-inner-right flwidth">' +
                        '<div class="index-board-div1">' +
                        '<h2>' + data.resData.dataList[i].name + '</h2>' +
                        '<dd class="proInfodd3">' +
                        '<div style="width:' + data.resData.dataList[i].percent + '%"></div>' +
                        '</dd>' +
                        '<dl>' +
                        '<dd>' +
                        '<p>' + data.resData.dataList[i].percent + '%</p>' +
                        '<p>已达</p>' +
                        '</dd>' +
                        '<dd>' +
                        '<p>' + data.resData.dataList[i].totalPrice + '</p>' +
                        '<p>已筹</p>' +
                        '</dd>' +
                        '<dd>' +
                        '<p>' + data.resData.dataList[i].surplus + '天</p>' +
                        '<p>剩余时间</p>' +
                        '</dd>' +
                        '</dl>' +
                        '</div>' +
                        '<div>' + '<span class="cancelCollection cursor" onclick="cancelCollection(' + "'" + data.resData.dataList[i].projectId + "'" + ')">取消收藏</span></div>' +
                        '</div>' +
                        '</div>' +
                        '</a>';
                }
                $(".personalCon5>.row").html(html);
                $(".tcdPageCode2").createPage({
                    pageCount: data.resData.totalPage,
                    current: data.resData.pageIndex,
                    backFn: function(p) {
                        collectionList(p)
                    }
                });
            }
        }
    });
}

//取消收藏
function cancelCollection(e) {
    var datas = {
        "option": "cancel",
        "userId": localStorage.userId,
        "projectId": e
    };
    var html = "";
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectCollect",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            layer.alert('取消收藏成功！', {
                icon: 1,
                skin: 'layer-ext-moon'
            }, function(index) {
                collectionList(1)
                layer.close(index);
            })
        }
    });
}
//获取消息中心数据
function messageCenter(page) {
    var datas = {
        "option": "getList",
        "userId": localStorage.userId,
        "page": page,
        "pageSize": 6,
        "searchKey": "",
        "startTime": "",
        "endTime": ""
    };
    var html = "";
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectComment",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            // console.log(data)
            if (data.success == "y") {
                for (var i = 0; i < data.resData.dataList.length; i++) {
                    html += '<dd>' +
                        '<ul class="con2span1ul fl">' +
                        '<li class="con2span1li1 bgcenter" style="background-image:url(' + cucr + data.resData.dataList[i].sendHeadUrl + ')"></li>' +
                        '<li class="con2span1li2">' + data.resData.dataList[i].sendNickName + '</li>' +
                        '<li class="con2span1li3">' + data.resData.dataList[i].createtime + '</li>' +
                        '<li class="con2span1li4"><a href=projectInfo.html?projectId=' + data.resData.dataList[i].projectId + '></a>' + data.resData.dataList[i].projectName + '</li>' +
                        '<p class="pmatop-2">' + data.resData.dataList[i].comment + '</p>' +
                        '</ul>' +

                        '<div class="clear"></div>' +
                        '<p class="con2span1li5  cursor" onclick="deleteComment(' + "'" + data.resData.dataList[i].commId + "'" + ')">删除</p>' +
                        '<div class="fl hhdivp" onclick="replyUp(this)">' +
                        '<p class="fr">回复</p>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                        '<div style="display:none" class="textCon">' +
                        '<textarea class="" rows="5"></textarea>' +
                        '<div class="fl sendText" onclick="directMsg(this,' + "'" + data.resData.dataList[i].sendUserId + "'" + ',' + "'" + data.resData.dataList[i].accUserId + "'" + ',' + "'" + data.resData.dataList[i].projectId + "'" + ')">' +
                        '<div class="fr">发送</div>' +
                        '</div>' +
                        '</div>' +
                        '<em class="emborder"></em>' +
                        '</dd>';
                }
                $(".con2span2 dl").html(html)
                $(".tcdPageCode3").createPage({
                    pageCount: data.resData.totalPage,
                    current: data.resData.pageIndex,
                    backFn: function(p) {
                        messageCenter(p)
                    }
                });
            }
        }
    });
}
// console.log(localStorage.userId)
//删除私信
function deleteComment(e) {
    var datas = {
        "option": "delete",
        "userId": localStorage.userId,
        "commentId": e
    };
    layer.confirm('确定删除该私信？', {
        btn: ['是', '否'] //按钮
    }, function() {
        $.ajax({
            cache: true,
            url: cucr + "/api/ClzcProjectComment",
            type: "POST",
            data: datas,
            async: true,
            error: function(request) {
                return;
            },
            success: function(data) {
                if (data.success == "y") {
                    layer.alert('删除成功！', {
                        icon: 1,
                        skin: 'layer-ext-moon'
                    }, function(index) {
                        messageCenter(1);
                        layer.close(index);
                    })
                }
            }
        });
    }, function() {

    });
}
//私信回复弹出收起
function replyUp(a) {
    if ($(a).children('p').text() == "回复") {
        $(a).children('p').text("收起");
        $(a).next().next().slideDown();
    } else {
        $(a).children('p').text("回复");
        $(a).next().next().slideUp();
    }
}
//私信回复
function directMsg(e, s, a, p) {
    var datas = {
        "option": "add",
        "userId": a,
        "accUserId": s,
        "projectId": p,
        "comment": $(e).prev().val()
    };
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectComment",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            if (data.success == "y") {
                if ($(".directMsgTxt").val() == "") {
                    layer.alert('私信内容不能为空！', {
                        icon: 2,
                        skin: 'layer-ext-moon'
                    }, function(index) {
                        layer.close(index);
                    })
                } else {
                    layer.alert('私信成功！', {
                        icon: 1,
                        skin: 'layer-ext-moon'
                    }, function(index) {
                        $(e).prev().val("");
                        messageCenter(1);
                        layer.close(index);
                    })
                }
            }
        }
    });
}

$(function() {
    allComments(1);
});
//获取个人中心评论
function allComments(page) {
    var datas = {
        "option": "getPersonList",
        "userId": localStorage.userId,
        "page": page,
        "pageSize": 6,
        "searchKey": "",
        "startTime": "",
        "endTime": ""
    };
    var html = "";
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectQuestion",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            // console.log(data)
            if (data.success == "y") {
                for (var i = 0; i < data.resData.dataList.length; i++) {
                    html += '<dd>' +
                        '<ul class="con2span1ul fl">' +
                        '<li class="con2span1li1 bgcenter" style="background-image:url(' + cucr + data.resData.dataList[i].sendHeadUrl + ')"></li>' +
                        '<li class="con2span1li2">' + data.resData.dataList[i].sendNickName + '</li>' +
                        '<li class="con2span1li4"><a href=projectInfo.html?projectId=' + data.resData.dataList[i].projectId + '></a>' + data.resData.dataList[i].projectName + '</li>' +
                        '<li class="con2span1li3">' + data.resData.dataList[i].createTime + '</li>' +
                        '<p class="pmatop-2">' + data.resData.dataList[i].question + '</p>' +
                        '</ul>' +
                        '<p class="con2span1li5 cursor" onclick="deleteCom(' + "'" + data.resData.dataList[i].questionId + "'" + ',' + "'" + data.resData.dataList[i].sendUserId + "'" + ')">删除</p>' +
                        '<em class="emborder"></em>' +
                        '<div class="clear"></div>' +
                        '<div class="fl displayNone">' +
                        '<p class="fr">回复</p>' +
                        '</div>' +
                        '<div class="clear"></div>' +
                        '<div style="display:none" class="textCon">' +
                        '<textarea class="" rows="5"></textarea>' +
                        '<div class="fl sendText">' +
                        '<div class="fr">发送</div>' +
                        '</div>' +
                        '</div>' +
                        '</dd>';
                }
                $(".con2span1>dl").html(html)
            }
            $(".tcdPageCode4").createPage({
                pageCount: data.resData.totalPage,
                current: data.resData.pageIndex,
                backFn: function(p) {
                    allComments(p)
                }
            });
        }
    });
}
//删除个人中心评论
function deleteCom(e, sendId) {
    if (sendId == localStorage.userId) {
        var datas = {
            "option": "delete",
            "userId": localStorage.userId,
            "questionId": e
        };
        layer.confirm('确定删除该评论？', {
            btn: ['是', '否'] //按钮
        }, function() {
            $.ajax({
                cache: true,
                url: cucr + "/api/ClzcProjectQuestion",
                type: "POST",
                data: datas,
                async: true,
                error: function(request) {
                    return;
                },
                success: function(data) {
                    if (data.success == "y") {
                        layer.alert('评论删除成功', {
                            icon: 1,
                            skin: 'layer-ext-moon'
                        }, function(index) {
                            window.location.reload()
                            allComments();
                            layer.close(index);
                        })
                    } else {
                        layer.alert('评论删除失败', {
                            icon: 2,
                            skin: 'layer-ext-moon'
                        }, function(index) {
                            window.location.reload()
                            allComments();
                            layer.close(index);
                        })
                    }
                }
            });
        }, function() {

        });
    } else {
        layer.alert('没权限删除别人的评论', {
            icon: 2,
            skin: 'layer-ext-moon'
        }, function(index) {
            window.location.reload()
            layer.close(index);
        })
    }
}
//获取历史浏览记录
function historicalRecord(page) {
    var datas = {
        "option": "getList",
        "userId": localStorage.userId,
        "page": page,
        "pageSize": 9,
        "searchKey": "",
        "startTime": "",
        "endTime": ""
    };
    var html = "";
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectBrowse",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            // console.log(data)
            if (data.success == "y") {
                for (var i = 0; i < data.resData.dataList.length; i++) {
                    /*html +='<div class="index-board-item historyDiv col-xl-4"><a href="projectInfo.html?projectId='+data.resData.dataList[i].projectId+'" >'+
                            '<div class="index-board-item-inner flwidth">'+
                                '<div class="index-board-item-inner-left bgcenter" style="background-image:url('+cucr+data.resData.dataList[i].pictureUrl+')">'+
                                '</div>'+
                                '<div class="index-board-item-inner-right flwidth">'+
                                    '<div class="index-board-div1">'+
                                        '<h2>'+data.resData.dataList[i].name+'</h2>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</a>'+
                        '<ol>'+
                            '<li class="historyli">'+
                                '<p class="timep fl">'+data.resData.dataList[i].createTime+'</p>'+
                                '<p class="deletep fr" onclick="recordDelete('+"'"+data.resData.dataList[i].projectId+"'"+')">删除</p>'+
                            '</li>'+
                        '</ol></div>'
                        ;*/
                    html += '<a href="projectInfo.html?projectId=' + data.resData.dataList[i].projectId + '" class="index-board-item  col-xl-4" >' +
                        '<div class="index-board-item-inner flwidth">' +
                        '<div class="index-board-item-inner-left index-board-item-inner-left-index bgcenter" style="background-image:url(' + cucr + data.resData.dataList[i].pictureUrl + ')">' +
                        '<p class="surplusNameText' + (i + 1) + '">' + data.resData.dataList[i].surplusName + '</p>' +
                        '</div>' +
                        '<div class="index-board-item-inner-right flwidth">' +
                        '<div class="index-board-div1">' +
                        '<h2>' + data.resData.dataList[i].name + '</h2>' +
                        '<dd class="proInfodd3">' +
                        '<div style="width:' + data.resData.dataList[i].percent + '%"></div>' +
                        '</dd>' +
                        '<dl>' +
                        '<dd>' +
                        '<p>' + data.resData.dataList[i].percent + '%</p>' +
                        '<p>已达</p>' +
                        '</dd>' +
                        '<dd>' +
                        '<p>' + data.resData.dataList[i].totalPrice + '</p>' +
                        '<p>已筹</p>' +
                        '</dd>' +
                        '<dd>' +
                        '<p>' + data.resData.dataList[i].surplus + '天</p>' +
                        '<p>剩余时间</p>' +
                        '</dd>' +
                        '</dl>' +
                        '</div>' +
                        '<p class="deletep fr" style="width:100%" onclick="recordDelete(' + "'" + data.resData.dataList[i].projectId + "'" + ')">删除</p>' +
                        '</div>' +

                        '</div>' +
                        '</a>';
                }
                $(".personalCon6>.row").html(html)
            }
            $(".tcdPageCode5").createPage({
                pageCount: data.resData.totalPage,
                current: data.resData.pageIndex,
                backFn: function(p) {
                    historicalRecord(p)
                }
            });
        }
    });
}
//删除历史浏览记录
function recordDelete(e) {
    var datas = {
        "option": "delete",
        "userId": localStorage.userId,
        "projectId": e
    };
    layer.confirm('确定删除该记录？', {
        btn: ['是', '否'] //按钮
    }, function() {
        $.ajax({
            cache: true,
            url: cucr + "/api/ClzcProjectBrowse",
            type: "POST",
            data: datas,
            async: true,
            error: function(request) {
                return;
            },
            success: function(data) {
                if (data.success == "y") {
                    layer.alert('删除成功！', {
                        icon: 1,
                        skin: 'layer-ext-moon'
                    }, function(index) {
                        historicalRecord(1);
                        layer.close(index);
                    })
                }
            }
        });
    }, function() {

    });
}

$(function() {
        initiateList(1);
    })
    //获取已发起的项目
function initiateList(page) {
    //获取项目列表
    var datas = {
        "option": "getMyList",
        "userId": localStorage.userId,
        "page": page,
        "pageSize": 9,
        "searchKey": "",
        "startTime": "",
        "endTime": "",
        "isrecomm": "",
        "state": 2,
        "surplusName": "",
        "amountState": ""
    };
    var html = "";
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProject",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            // console.log(data)
            if (data.success == "y") {
                for (var i = 0; i < data.resData.dataList.length; i++) {
                    /*html +='<a href=projectInfo.html?projectId='+data.resData.dataList[i].projectId+' class="index-board-item initiateList col-xl-4" >'+
                            '<div class="index-board-item-inner flwidth">'+
                                '<div class="index-board-item-inner-left bgcenter" style="background-image:url('+cucr+data.resData.dataList[i].pictureUrl+')">'+
                                '</div>'+
                                '<div class="index-board-item-inner-right flwidth">'+
                                    '<div class="index-board-div1">'+
                                        '<h2>'+data.resData.dataList[i].name+'</h2>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</a>'*/
                    html += '<a href="projectInfo.html?projectId=' + data.resData.dataList[i].projectId + '" class="index-board-item  col-xl-4" >' +
                        '<div class="index-board-item-inner flwidth">' +
                        '<div class="index-board-item-inner-left index-board-item-inner-left-index bgcenter" style="background-image:url(' + cucr + data.resData.dataList[i].pictureUrl + ')">' +
                        '<p class="surplusNameText' + (i + 1) + '">' + data.resData.dataList[i].surplusName + '</p>' +
                        '</div>' +
                        '<div class="index-board-item-inner-right flwidth">' +
                        '<div class="index-board-div1">' +
                        '<h2>' + data.resData.dataList[i].name + '</h2>' +
                        '<dd class="proInfodd3">' +
                        '<div style="width:' + data.resData.dataList[i].percent + '%"></div>' +
                        '</dd>' +
                        '<dl>' +
                        '<dd>' +
                        '<p>' + data.resData.dataList[i].percent + '%</p>' +
                        '<p>已达</p>' +
                        '</dd>' +
                        '<dd>' +
                        '<p>' + data.resData.dataList[i].totalPrice + '</p>' +
                        '<p>已筹</p>' +
                        '</dd>' +
                        '<dd>' +
                        '<p>' + data.resData.dataList[i].surplus + '天</p>' +
                        '<p>剩余时间</p>' +
                        '</dd>' +
                        '</dl>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>';
                }
                $(".personalCon4>.row").html(html);
                $(".tcdPageCode6").createPage({
                    pageCount: data.resData.totalPage,
                    current: data.resData.pageIndex,
                    backFn: function(p) {
                        initiateList(p)
                    }
                });
            }
        }
    });
}

$(function() {
        $(".tabli li").click(function() {
            var i = $(this).index();
            $(this).addClass("select1").siblings().removeClass("select1");
            $(".conrow").eq(i).show().siblings().hide();
        })
    })
    //获取实物列表
$(function() {
    participateProject1(1)
    participateProject2(1)
    participateProject3(1)
})

function participateProject1(e) {
    var datas = {
        "option": "getInfoByProjectId",
        "userId": localStorage.userId,
        "projectId": "",
        "beUserId": localStorage.userId,
        "page": e,
        "pageSize": 9
    }
    var html = "";
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectMaterialPartake",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            // console.log(data)
            if (data.success == "y") {
                for (var i = 0; i < data.resData.dataList.length; i++) {
                    html += '<a href=projectInfo.html?projectId=' + data.resData.dataList[i].projectId + ' class="index-board-item initiateList col-xl-4" >' +
                        '<div class="index-board-item-inner flwidth">' +
                        '<div class="index-board-item-inner-left bgcenter" style="background-image:url(' + cucr + data.resData.dataList[i].imgUrl + ')">' +
                        '</div>' +
                        '<div class="index-board-item-inner-right flwidth">' +
                        '<div class="index-board-div1">' +
                        '<h2>' + data.resData.dataList[i].projectName + '</h2>' +
                        '<dd class="proInfodd3">' +
                        '<div style="width:' + data.resData.dataList[i].percent + '%"></div>' +
                        '</dd>' +
                        '<h4>我出资' + data.resData.dataList[i].totalPrice + '元</h4>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>'
                }
                $(".rows1>.row").html(html);
                $(".tcdPageCode7").createPage({
                    pageCount: data.resData.totalPage,
                    current: data.resData.pageIndex,
                    backFn: function(p) {
                        participateProject1(p)
                    }
                });
            }
        }
    })
}
//定额支持列表获取
function participateProject2(e) {
    var datas = {
        "option": "getInfoByProjectId",
        "userId": localStorage.userId,
        "projectId": "",
        "beUserId": localStorage.userId,
        "page": e,
        "pageSize": 9
    }
    var html = "";
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectQuotaPartake",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            console.log(data)
            if (data.success == "y") {
                for (var i = 0; i < data.resData.dataList.length; i++) {
                    html += '<a href=projectInfo.html?projectId=' + data.resData.dataList[i].projectId + ' class="index-board-item initiateList col-xl-4" >' +
                        '<div class="index-board-item-inner flwidth">' +
                        '<div class="index-board-item-inner-left bgcenter" style="background-image:url(' + cucr + data.resData.dataList[i].imgUrl + ')">' +
                        '</div>' +
                        '<div class="index-board-item-inner-right flwidth">' +
                        '<div class="index-board-div1">' +
                        '<h2>' + data.resData.dataList[i].projectName + '</h2>' +
                        '<h4>我出资' + data.resData.dataList[i].totalPrice + '元</h4>' +
                        '<dd class="proInfodd3">' +
                        '<div style="width:' + data.resData.dataList[i].percent + '%"></div>' +
                        '</dd>' +
                        '<dd style="width:50%;display: inline-block;border-right:1px solid #ded2bf "><p class="textalgin">￥' + data.resData.dataList[i].incomePrice + '</p>' + '<p class="textalgin">已回报金额</p></dd>' +
                        '<dd style="width:50%;display: inline-block;"><p class="textalgin">￥' + data.resData.dataList[i].retPrice + '</p>' + '<p class="textalgin">总回报金额</p></dd>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>'
                }
                $(".rows2>.row").html(html);
                $(".tcdPageCode8").createPage({
                    pageCount: data.resData.totalPage,
                    current: data.resData.pageIndex,
                    backFn: function(p) {
                        participateProject2(p)
                    }
                });
            }
        }
    })
}
//股份支持列表获取
function participateProject3(e) {
    var datas = {
        "option": "getInfoByProjectId",
        "userId": localStorage.userId,
        "projectId": "",
        "beUserId": localStorage.userId,
        "page": e,
        "pageSize": 9
    }
    var html = "";
    $.ajax({
        cache: true,
        url: cucr + "/api/ClzcProjectStockPartake",
        type: "POST",
        data: datas,
        async: true,
        error: function(request) {
            return;
        },
        success: function(data) {
            // console.log(data)
            if (data.success == "y") {
                for (var i = 0; i < data.resData.dataList.length; i++) {
                    html += '<a href=projectInfo.html?projectId=' + data.resData.dataList[i].projectId + ' class="index-board-item initiateList col-xl-4" >' +
                        '<div class="index-board-item-inner flwidth">' +
                        '<div class="index-board-item-inner-left bgcenter" style="background-image:url(' + cucr + data.resData.dataList[i].imgUrl + ')">' +
                        '</div>' +
                        '<div class="index-board-item-inner-right flwidth">' +
                        '<div class="index-board-div1">' +
                        '<h2>' + data.resData.dataList[i].projectName + '</h2>' +
                        '<h4>我出资' + data.resData.dataList[i].totalPrice + '元</h4>' +
                        '<dd class="proInfodd3">' +
                        '<div style="width:' + data.resData.dataList[i].percent + '%"></div>' +
                        '</dd>' +
                        '<dd style="width:50%;display: inline-block;border-right:1px solid #ded2bf "><p class="textalgin">￥' + data.resData.dataList[i].incomePrice + '</p>' + '<p class="textalgin">已回报金额</p></dd>' +
                        '<dd style="width:50%;display: inline-block;"><p class="textalgin">￥' + data.resData.dataList[i].retPrice + '</p>' + '<p class="textalgin">总回报金额</p></dd>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>'
                }
                $(".rows3>.row").html(html);
                $(".tcdPageCode9").createPage({
                    pageCount: data.resData.totalPage,
                    current: data.resData.pageIndex,
                    backFn: function(p) {
                        participateProject3(p)
                    }
                });
            }
        }
    })
    ifxm()

    $(".bankCard-title-right").click(() => {


        if ($(".yhk-box").length > 4) {

        } else {
            let html =
                `
        <div class="yhk-box">
            <dd>
                <span>银行卡</span>
                <input class="address" type="text" value="">
            </dd>
            <dd>
                <span>所属银行</span>
                <input class="idcard" type="text" value="">
            </dd>
            <dd>
                <span>所属人</span>
                <input class="address" type="text" value="">
            </dd>
            <div class="sc">
                <div class="sc-box">
                    <input type="radio" name="defaults" value="1" checked="checked" />
                    <label>设为默认</label>
                </div>
                <div class="sc-right" onclick='scyhk(this)'>
                    <span>删除银行卡</span>
                    <img src="./img/sd1.png" alt="">
                </div>
            </div>
        </div>

        `
            $(".yhk").append(html)
        }

    })
}


function ifxm() {
    if (localStorage.roleId == "产品经理") {
        $(".diva").show();
        $(".cw").hide();
    } else {
        $(".diva").hide();
        $(".cw").show();
    }
}

function cwfnshow() {
    $(".applyFor-model").fadeIn();
    $("#sqsqr").val(qjName)

}

function cwfnheid() {
    $(".applyFor-model").fadeOut()
}

function scyhk(e) {

    console.log($(e).parent().parent().remove())
}








// 提交保存项目经理申请





// function file(params) {

// }





var zzfileCode

$(function() {

    // 资质上传码
    $(".zzfile").change(function() {
        console.log(this.files[0])
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            var img = $(".applyFor-show").attr("src", objUrl);
            var reader = new FileReader();
            reader.onload = function(e) {
                // 这里写上传逻辑
                let datas = e.target.result;
                $.ajax({
                    url: cucr + '/api/Files',
                    type: 'POST',
                    data: datas,
                    async: false,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(data) {
                        console.log(data);
                        if (data.success) {
                            //  console.log('upload success');
                            //  console.log(data.resData);
                            zzfileCode = data.resData.fileId
                            console.log(zzfileCode);
                            //  headImgres = data.resData.fileId;
                        } else {
                            console.log(data.message);
                        }
                    },
                    error: function(data) {
                        console.log(data.success);
                    }
                });
            }
            reader.readAsDataURL(this.files[0]);
        }
    });


    //建立一個可存取到該file的url
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }










})








function jl() {




    var gsname = $("#sqgs").val();
    var sqrname = $("#sqsqr").val();
    var jjname = $("#sqjj").val();
    var sjname = $("#sqsj").val();
    var zztp = zzfileCode;

    if (gsname == "" || sqrname == "" || jjname == "" || zztp == "") {
        layer.alert('信息不完整', {
            icon: 2,
            skin: 'layer-ext-moon'
        })
    } else {


        layer.msg('提交后不能修改 请仔细确认信息？', {
            time: 0 //不自动关闭
                ,
            btn: ['继续提交', '再看看'],
            yes: function(index) {

                var datas = {
                    "userId": localStorage.getItem("userId"),
                    companyId,
                    "summary": jjname,
                    "fileId": zztp,
                    "phone": sjname
                }

                let url = "http://192.168.1.99:5000/api/CucrSaas/ZC/ZCCompany/submitProjectManageApply"
                $.ajax({
                    url,
                    type: 'POST',
                    crossDomain: true,
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify(datas),
                    success: function(data) {
                        console.log(data)
                        layer.close(index);
                        layer.msg(data.message, {
                            icon: 6
                        }, function() {
                            cwfnheid()
                        });
                    },
                    error: function(data) {
                        console.log(data.success);
                    }
                });





            }
        });




    }


}









$(function() {
    $("#sqgs").focus(() => {
        $(".xl").children().remove();
        var datas = {
            "keyword": ""
        }
        let url = "http://192.168.1.99:5000/api/CucrSaas/ZC/ZCCompany/searchCompany"
        $.ajax({
            url,
            type: 'POST',
            crossDomain: true,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(datas),
            success: function(data) {
                var list = data.resdata.companys

                if (list == "") {

                } else {
                    for (let i = 0; i < list.length; i++) {
                        var html =
                            `
                            <li onclick="ontext(this)">${list[i].name}</li>
                        `
                        $(".xl").append(html)
                    }
                }


            },
            error: function(data) {
                console.log(data.success);
            }
        });
    })
    $("#sqgs").blur(() => {
        setTimeout(() => {
            $(".xl").children().remove();
        }, 100)

    })




    $("#sqgs").live('input propertychange', () => {
        $(".xl").children().remove();
        let text = $("#sqgs").val();
        var datas = {
            "keyword": text
        }
        let url = "http://192.168.1.99:5000/api/CucrSaas/ZC/ZCCompany/searchCompany"
        $.ajax({
            url,
            type: 'POST',
            crossDomain: true,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(datas),
            success: function(data) {
                var list = data.resdata.companys
                for (let i = 0; i < list.length; i++) {
                    var html =
                        `
                        <li onclick="ontext(this,\"${list[i].id})\"">${list[i].name}</li>
                    `
                    $(".xl").append(html)
                }
            },
            error: function(data) {
                console.log(data.success);
            }
        });
    })







})


function ontext(c, id) {
    companyId = id
    let text = $(c).text()
    $("#sqgs").val("");
    $("#sqgs").val(text)
}