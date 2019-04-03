var countdown=60;    
function settime(e){
    if (countdown == 0) {  
        $(".divqrck").removeClass("disabled"); 
        var a="获取验证码";  
        countdown = 60;  
        $(e).text(a)
    } else {  
        $(".divqrck").addClass("disabled");  
        var a="重新发送(" + countdown + ")";  
        countdown--;  
        setTimeout(function() {  
            settime(e) 
        },1000)  
        $(e).text(a)
    } 
}
 
function verificationCode(e){
    var phone=$(".phone").val()
    if(phone!=""){
        console.log(phone)
        settime(e)
        var datas = {
            "phoneNumber":phone
        }
        $.ajax({
            cache:true,
            url:"http://www.cucrxt.com/interface/checkCode/getCheckCode",
            type:"POST",
            data:datas,
            async:true,
            error:function(request){
                return;
            },
            success:function(data){
                console.log(data)
            }
        })
    }else{
        alert("请填写手机号")
    }
}