// tab切换
    $(function(){
        setTimeout(function(){
            // console.log($(".materialId").val())
            // console.log($(".quotaId").val())
            // console.log($(".stockId").val())
            if($(".materialId").val()==""){
                $(".noneli1").hide()
            }
            if($(".quotaId").val()==""){
                $(".noneli2").hide()
            }
            if($(".stockId").val()==""){
                $(".noneli3").hide()
            }
            materialIdInfo()
            quotaIdInfo()
            stockIdInfo()    
        }, 200)
        /*$(".tabli li").click(function(){
            var i=$(this).index();
            $(this).addClass("select1").siblings().removeClass("select1");
            $(".con").eq(i).show().siblings().hide();
        })*/
    })
     function txtfocus(){
        var copies=$(".copies").val();
        var singleNumber=parseInt($(".singleNumber").val())
        if(copies>=singleNumber){
            var copies=$(".copies").val(singleNumber);
            var copiesies=singleNumber*parseInt($(".singlePrice").val())+".00"
            $(".amount").val(copiesies)
        }else{
            var copiesies=copies*parseInt($(".singlePrice").val())+".00"
            $(".amount").val(copiesies)
        }
     }
     function txtfocus2(){
        var copies=$(".copies2").val();
        var singleNumber=parseInt($(".singleNumber2").val())
        if(copies>=singleNumber){
            var copies=$(".copies2").val(singleNumber);
            var copiesies=singleNumber*parseInt($(".singlePrice2").val())+".00"
            $(".amount2").val(copiesies)
        }else{
            var copiesies=copies*parseInt($(".singlePrice2").val())+".00"
            $(".amount2").val(copiesies)
        }
     }
     function submitBtn1(){
        var projectId=$(".projectId").val();
        var datas={
            "option":"add",
            "userId":localStorage.userId,
            "projectId":projectId,
            "materialId":$(".materialId").val(),
            "number":$(".copies").val(),
            "singlePrice":$(".singlePrice").val(),
            "totalPrice":$(".amount").val()
        }
        console.log(datas);
        if($(".projectId").val()==""||$(".copies").val()==""){
            layer.msg('信息填写完整');
        }else{
            layer.confirm('是否提交？', {
                btn: ['是','否'] //按钮
            }, function(){
                $.ajax({
                    cache:true,
                    url:cucr+"/api/ClzcProjectMaterialPartake",
                    type:"POST",
                    data:datas,
                    async:true,
                    error:function(request){
                        return;
                    },
                    success:function(data){
                        if(data.success=="y"){
                            layer.msg('支持成功');
                            setTimeout(function(){
                                var index = parent.layer.getFrameIndex(window.name);
                                parent.layer.close(index);
                                window.parent.location.reload();
                            }, 1000)
                        }else{
                            layer.msg(data.message);
                        }
                    }
                })
            }, function(){
                  layer.msg('支持失败');
            })
        }
     }
     //根据实物Id获取详情
     function materialIdInfo(){
        var datas={
            "option":"getMaterialInfo",
            "userId":localStorage.userId,
            "id":$(".materialId").val()
        };
        $.ajax({
            cache:true,
            url:cucr+"/api/ClzcProjectMaterial",
            type:"POST",
            data:datas,
            async:false,
            error:function(request){
                return;
            },
            success:function(data){
                if(data.success=="y"){
                    $(".singlePrice").val(data.resData.singlePrice)
                    $(".singleNumber").val(data.resData.singleNumber)
                    $(".amount").val(data.resData.singlePrice)
                    // console.log(data)
                }
            }
        })
     }
     //根据定额Id获取详情
     function quotaIdInfo(){
        var datas={
            "option":"getQuotaInfo",
            "userId":localStorage.userId,
            "id":$(".quotaId").val()
        };
        $.ajax({
            cache:true,
            url:cucr+"/api/ClzcProjectQuota",
            type:"POST",
            data:datas,
            async:false,
            error:function(request){
                return;
            },
            success:function(data){
                if(data.success=="y"){
                    $(".singlePrice2").val(data.resData.singlePrice)
                    $(".singleNumber2").val(data.resData.singleNumber)
                    $(".amount2").val(data.resData.singlePrice)
                    // console.log(data)
                }
            }
        })
     }
     //根据股权Id获取详情
     function stockIdInfo(){
        var datas={
            "option":"getStockInfo",
            "userId":localStorage.userId,
            "id":$(".stockId").val()
        };
        $.ajax({
            cache:true,
            url:cucr+"/api/ClzcProjectStock",
            type:"POST",
            data:datas,
            async:true,
            error:function(request){
                return;
            },
            success:function(data){
                if(data.success=="y"){
                    // $(".singlePrice2").val(data.resData.singlePrice)
                    // $(".singleNumber2").val(data.resData.singleNumber)
                    console.log(data)
                }
            }
        })
     }
     //支持定额回报提交
     function submitBtn2(){
        var projectId=$(".projectId").val();
        var datas={
            "option":"add",
            "userId":localStorage.userId,
            "projectId":projectId,
            "quotaId":$(".quotaId").val(),
            "number":$(".copies2").val(),
            "singlePrice":$(".singlePrice2").val(),
            "totalPrice":$(".amount2").val()
        }
        console.log(datas);
        if($(".projectId").val()==""||$(".copies2").val()==""){
            layer.msg('信息填写完整');
        }else{
            layer.confirm('是否提交？', {
                btn: ['是','否'] //按钮
            }, function(){
                $.ajax({
                    cache:true,
                    url:cucr+"/api/ClzcProjectQuotaPartake",
                    type:"POST",
                    data:datas,
                    async:true,
                    error:function(request){
                        return;
                    },
                    success:function(data){
                        if(data.success=="y"){
                            layer.msg('支持成功');
                            setTimeout(function(){
                                var index = parent.layer.getFrameIndex(window.name);
                                parent.layer.close(index);
                                window.parent.location.reload();
                            },1000)
                        }else{
                            layer.msg(data.message);
                        }
                    }
                })
            }, function(){
                  layer.msg('支持失败');
            })
        }
     }
     //支持股份回报提交
     function submitBtn3(){
        var projectId=$(".projectId").val();
        var datas={
            "option":"add",
            "userId":localStorage.userId,
            "projectId":projectId,
            "stockId":$(".stockId").val(),
            "totalPrice":$(".amount3").val()
        }
        console.log(datas);
        if($(".projectId").val()==""||$(".amount3").val()==""){
            layer.msg('信息填写完整');
        }else{
            layer.confirm('是否提交？', {
                btn: ['是','否'] //按钮
            }, function(){
                $.ajax({
                    cache:true,
                    url:cucr+"/api/ClzcProjectStockPartake",
                    type:"POST",
                    data:datas,
                    async:true,
                    error:function(request){
                        return;
                    },
                    success:function(data){
                        if(data.success=="y"){
                            layer.msg('支持成功');
                            setTimeout(function(){
                                var index = parent.layer.getFrameIndex(window.name);
                                parent.layer.close(index);
                                window.parent.location.reload();
                            },1000)
                        }else{
                            layer.msg(data.message);
                        }
                    }
                })
            }, function(){
                  layer.msg('支持失败');
            })
        }
     }
//实物支持
function submitBtns1(){
    if($(".copies").val()==0||$(".copies").val()==""){
        layer.msg('支持份数不能为零')
    }else{
        window.parent.location.replace("/cucr/raiseOrder.html?projectId="+$(".projectId").val()+"&copies="+$(".copies").val()+"&amount="+$(".amount").val()+"&materialId="+$(".materialId").val()+"&singleNumber="+$(".singleNumber").val()+"&singlePrice="+$(".singlePrice").val()+"&bs=1"+"");
    }
}
//定额支持
function submitBtns2(){
    if($(".copies2").val()==0||$(".copies2").val()==""){
        layer.msg('支持份数不能为零')
    }else{
        window.parent.location.replace("/cucr/raiseOrder.html?projectId="+$(".projectId").val()+"&copies="+$(".copies2").val()+"&amount="+$(".amount2").val()+"&quotaId="+$(".quotaId").val()+"&singleNumber="+$(".singleNumber2").val()+"&singlePrice="+$(".singlePrice2").val()+"&bs=0"+"");
    }
}
//股份支持
function submitBtns3(){
    if($(".amount3").val()==0||$(".amount3").val()==""){
        layer.msg('出资金额不能为零')
    }else{
        window.parent.location.replace("/cucr/raiseOrder1.html?projectId="+$(".projectId").val()+"&amount="+$(".amount3").val()+"&stockId="+$(".stockId").val()+"&bs=0"+"");
    }
}


function clearNoNum(obj){ 
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        obj.value= parseFloat(obj.value); 
    } 
} 