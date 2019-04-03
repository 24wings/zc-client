 //省份区域选择
 //定义省份id
 var regionId1, regionId2, regionId3;
 //定义省份文字
 var regionTx1, regionTx2, regionTx3;




 var cardFront, cardCon


 var userId, userName


 //  $(function() {
 //      $(".bankCard-title-right>span").click(() => {
 //          let i = $(".bankCard-box").length
 //          if (i == 5) {
 //              layer.alert("最多只能添加5张银行卡", {
 //                  icon: 2,
 //                  skin: 'layer-ext-moon'
 //              })
 //              return
 //          } else {
 //              var html =
 //                  `
 //           <div class="bankCard-box">
 //               <p class="contentP contentPs">
 //                   <label class="labelNick" for="">银行卡号</label>
 //                   <input class="bankCardNub" type="text">
 //               </p>
 //               <p class="contentP contentPs">
 //                   <label class="labelNick" for="">所在银行</label>
 //                   <input class="bank" type="text">
 //               </p>
 //               <p class="contentP contentPs">
 //                   <label class="labelNick" for="">所属人</label>
 //                   <input class="nameCard" type="text">
 //               </p>
 //               <div class="default contentP contentPs ssf">
 //                   <input type="radio" name="defaults" value="1" checked="checked" />
 //                   <label>设为默认</label>
 //                   <div class="re" onclick="remov(this)">
 //                       <span>删除银行卡</span>
 //                       <img src="./img/sd1.png" alt="">
 //                   </div>
 //               </div>
 //           </div>

 //       `
 //              $(".bankCard").append(html);
 //          }

 //      })

 //  })


 //  function remov(dom) {
 //      $(dom).parent(".default").parent(".bankCard-box").remove()
 //  }




 $(function() {
     $(".option-geren").click(() => {
         $(".option-box").fadeOut(10)
         $(".geren-box").fadeIn(100)
     })
     $(".option-qiye").click(() => {
         $(".option-box").fadeOut(10)
         $(".qiye-box").fadeIn(100)

     })
 })




 function regionClick() {
     var datas = {
         "pId": "0",
         "userId": "",
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
     var datas = {
         "pId": id,
         "userId": "",
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
         "userId": "",
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
     provinceid = regionId1;
     cityid = regionId2;
     areaid = regionId3;
     console.log(regionId1 + "--" + regionId2 + "--" + regionId3)
     $(".dlregion1").hide();
     $(".dlregion1>dd").remove();
 };
 var headImgres = "";
 $(function() {
     // 图片上传
     // $("#uploadSubmit").click(function(){

     // });
     //注册提交
     $(".sendBtn").click(function() {
         if ($(".fileinput-preview>img").attr("src") != undefined) {
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
                     console.log(data);
                     if (data.success) {
                         console.log('upload success');
                         console.log(data.resData);
                         headImgres = data.resData.fileId;
                     } else {
                         console.log(data.message);
                     }
                 },
                 error: function(data) {
                     console.log(data.success);
                 }
             });
         }









         var phone = $(".phone").val();
         var code = $(".phoneNewCode").val();
         var pwd = $(".pwd").val();
         var name = $(".name").val();
         var autograph = $(".autograph").val();
         var profession = $(".profession").val();
         var homePage = $(".homePage").val();
         var nickName = $(".nickName").val();
         var headImg = headImgres;
         var sex = $("input[name='gender']:checked").val();
         var provinceId = regionId1;
         var cityId = regionId2;
         var areaId = regionId3;
         var region = $(".region").val();
         var address = $(".address").val();
         var companyName = $(".companyName").val();
         var idCard = $(".card").val()

         var bankCard = $(".bankCardNub").val()
         var bankName = $(".bank").val()

















         var datas = {
             "option": "register",
             "phone": phone,
             "code": code,
             "pwd": pwd,
             "name": name,
             "idCard": idCard,
             "autograph": autograph,
             "profession": profession,
             "homePage": homePage,
             "nickName": nickName,
             "headImg": headImg,
             "sex": sex,
             "provinceId": provinceId,
             "cityId": cityId,
             "areaId": areaId,
             "region": region,
             "address": address,
             "companyName": companyName,
             "cardFront": cardFront,
             "cardCon": cardCon,
         };


         if (phone == "" || code == "" || pwd == "" || name == "" || headImg == "" || sex == "" || region == "" || areaId == undefined || cityId == undefined || provinceId == undefined || idCard == "" || cardFront == "" || cardCon == '' || bankCard == "" || bankName == '') {
             layer.alert('信息全为必填项，请将信息填写完整！', {
                 icon: 2,
                 skin: 'layer-ext-moon'
             })
         } else {
             if (pwd.length > 5) {
                 $(".agreement-model").fadeIn(100)
                 $(".agreement-model-box-footer-qx-btn").click(() => {
                     $(".agreement-model").fadeOut(100)
                 })
                 $(".agreement-model-box-title>img").click(() => {
                     $(".agreement-model").fadeOut(100)
                 })
                 $(".agreement-model-box-footer-ty-btn").click(() => {
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

                             userName = name
                             userId = data.resData
                             let postData = {
                                 userId: userId,
                                 userName: userName,
                                 bankName: bankName,
                                 bankCard: bankCard,
                                 isDefault: "1"
                             }
                             console.log(postData)
                             $.ajax({
                                 cache: true,
                                 url: cucr + "/api/addBankInfo",
                                 type: "POST",
                                 data: postData,
                                 async: true,
                                 error: function(request) {
                                     return;
                                 },
                                 success: function(data) {
                                     if (data.success == "y") {
                                         layer.alert('注册成功！', {
                                             icon: 1,
                                             skin: 'layer-ext-moon'
                                         }, function(index) {
                                             layer.close(index);
                                             window.location.replace("/cucr/login.html");
                                         })
                                     } else {
                                         layer.alert(data.message, {
                                             icon: 2,
                                             skin: 'layer-ext-moon'
                                         })
                                     }
                                 }
                             });

                         }
                     });
                 })

             } else {
                 layer.alert('密码设置不能小于六位！', {
                     icon: 2,
                     skin: 'layer-ext-moon'
                 })
             }
         }
     })


     $("#file0").change(function() {
         var objUrl = getObjectURL(this.files[0]);
         console.log("objUrl = " + objUrl);
         if (objUrl) {
             var img = $("#img0").attr("src", objUrl);
             var reader = new FileReader();
             reader.onload = function(e) {
                 console.log(e.target);
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
                             cardFront = data.resData.fileId

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





     //  证书返回码
     var fileLicenseCode = "";

     $(".zhuc-btn").click(() => {

         // 公司名字
         var CompanyName = $(".companyNames").val();

         // 登录账号
         var accountNumber = $(".accountNumber").val();
         // 登录密码
         var loginPassword = $(".loginPassword").val();

         // 注册资金
         var registeredCapital = $(".registeredCapital").val();

         //  地区
         var region = $(".region").val();
         // 详细地址
         var site = $(".site").val();
         // 公司法人 
         var legalPerson = $(".legalPerson").val();

         // 手机
         var mobilePhone = $(".mobilePhone").val();
         // 固定电话
         var fixedLineTelephone = $('.fixed-lineTelephone').val();

         // 经营范围
         var businessScope = $(".businessScope").val();
         // 注册日期
         var registrationDate = $("#demo-1").val();
         console.log(registrationDate, CompanyName, accountNumber, loginPassword, registeredCapital, region, site, legalPerson, mobilePhone, fixedLineTelephone, businessScope)


         if (CompanyName == "" || accountNumber == "" || loginPassword == '' || registeredCapital == '' || region == '' || site == '' || legalPerson == '' || mobilePhone == '' || fixedLineTelephone == '' || businessScope == '' || registrationDate == '', fileLicenseCode == '') {
             layer.alert('信息全为必填项，请将信息填写完整！', {
                 icon: 2,
                 skin: 'layer-ext-moon'
             })
         } else {
             if (loginPassword.length < 6) {
                 layer.alert('秘密不能小于6位！', {
                     icon: 2,
                     skin: 'layer-ext-moon'
                 })
             } else {

                 //  area
                 $(".agreement-model").fadeIn(100)
                 $(".agreement-model-box-footer-qx-btn").click(() => {
                     $(".agreement-model").fadeOut(100)
                 })
                 $(".agreement-model-box-title>img").click(() => {
                     $(".agreement-model").fadeOut(100)
                 })



                 let postData = {
                     "account": accountNumber,
                     "pwd": loginPassword,
                     "name": CompanyName,
                     "capital": registeredCapital,
                     "address": site,
                     "legalPerson": legalPerson,
                     "phone": mobilePhone,
                     "telephone": fixedLineTelephone,
                     "license": fileLicenseCode,
                     "business": businessScope,
                     "registerDate": registrationDate,
                     "area": region,
                     "option": "register"
                 }

                 $(".agreement-model-box-footer-ty-btn").click(() => {
                     $.ajax({
                         cache: true,
                         url: cucr + "/api/ClzcCompany",
                         type: "POST",
                         data: postData,
                         async: true,
                         error: function(request) {
                             return;
                         },
                         success: function(data) {
                             if (data.success == "y") {
                                 layer.alert('注册成功！', {
                                     icon: 1,
                                     skin: 'layer-ext-moon'
                                 }, function(index) {
                                     layer.close(index);
                                     window.location.replace("/cucr/login.html");
                                 })
                             } else {
                                 layer.alert(data.message, {
                                     icon: 2,
                                     skin: 'layer-ext-moon'
                                 })
                             }
                         }
                     });
                 })







             }
         }


     })





     $("#file-license").change(function() {
         var objUrl = getObjectURL(this.files[0]);
         if (objUrl) {
             var img = $("#file-license-img").attr("src", objUrl);
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
                             fileLicenseCode = data.resData.fileId

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





     $("#file1").change(function() {
         var objUrl = getObjectURL(this.files[0]);
         console.log("objUrl = " + objUrl);
         if (objUrl) {
             var img = $("#img1").attr("src", objUrl);
             var reader = new FileReader();
             reader.onload = function(e) {
                 console.log(e.target);
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
                             console.log(data);
                             cardCon = data.resData.fileId
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
















 //  2019年3月27日09:51:073





































 // var headImgres="";
 // function imgdown(){
 //     var datas = new FormData($('#uploadForm')[0]);
 //     $.ajax({
 //         url: cucr+'/api/Files',
 //         type: 'POST',
 //         data: datas,
 //         async: false,
 //         cache: false,
 //         contentType: false,
 //         processData: false,
 //         success: function (data) {
 //             window.location.reload()
 //             if(data.success){
 //                 headImgres=data.resData.fileId;
 //                 var userPhoto=cucr+data.resData.filePath;
 //                 $(".userPhoto").attr("src",userPhoto)
 //                 console.log(data)
 //                 console.log(headImgres)
 //                 console.log(userPhoto)
 //                 $(".layui-layer").fadeOut();
 //                 $(".layui-layer-shade").fadeOut()

 //             }else{
 //                 console.log(data.message);
 //             }
 //         },
 //         error: function (data) {
 //             console.log(data.success);
 //         }
 //     });
 // }
 // function uploadSubmit(){
 //     imgdown();

 // }

 // //修改头像弹窗
 // function layerPhoto(){

 //     var html='<dd class="ddForm" style="margin-top:2rem;margin-bottom: -1.5rem;"><span style="display:none">修改头像</span><form id="uploadForm" enctype="multipart/form-data" ><div class="form-group" style="margin-left: 6rem;margin-top: -1.5rem;"><div class="fileinput fileinput-new" data-provides="fileinput" id="exampleInputUpload"><div class="fileinput-new thumbnail" style="width: 200px;height: auto;max-height:150px;"><img id="picImg" style="width: 100%;height:100%" src="" alt="" /></div><div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div><div><span class="btn btn-primary btn-file" style="background:white;border:1px solid white;width:50%;text-align: left;cursor: pointer;"><span class="fileinput-new" style="width:50%;text-align:left;cursor: pointer;color: #999;">选择图片</span><span class="fileinput-exists" style="width:100%;text-align:left;cursor: pointer;color:#333">换一张</span><input type="file" name="pic1" val="1" id="picID" accept="image/gif,image/jpeg,image/x-png" /></span></div></div></div><div id="uploadSubmit" onclick="uploadSubmit()" style="width: 100%;" class="btn btn-info">保存</div></form></dd>';
 //     layer.open({
 //       type: 1,
 //       title:"修改头像",
 //       skin: 'layui-layer-rim', //加上边框
 //       area: ['420px', '314px'], //宽高
 //       content: html
 //     });
 // }