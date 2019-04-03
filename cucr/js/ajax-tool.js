var ip = "http://192.168.1.99:5000"

function Get(url, params, successCallback) {

    return $.ajax({
        method: "get",
        url: ip + url,
        params,
        contentType: "application/json",
        success: successCallback

    })
}


function Post(url, datas, successCallback) {
    $.ajax({
        cache: true,
        url: ip + url,
        type: "POST",
        data: JSON.stringify(datas),
        async: true,
        dataType: "json",
        contentType: "application/json",
        error: function(request) {
            layer.alert('网络连接超时！', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return;
        },
        success: successCallback
    });

}



function addBankCard(data, successCallback) {
    return Post("/api/CucrSaas/ZC/Admin/ZCSetting/addBankCrad", data, successCallback)
}