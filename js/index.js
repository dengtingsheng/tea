function indexContent() {
    var $storeId = $.cookie("storeId");
    $.ajax({
        url: "http://47.104.204.162:8088/store/mine/data",
        type: "post",
        data: {
            storeId: $storeId
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authentication", $.cookie("token"));
        },
        success: function (data) {
            $(".className").text(data.data.owner);
            $(".classShopName").html(data.data.store_name);
            $(".shapingName").html(data.data.store_name);
            //近期售出 
            $("#tj_order30").html(data.data.monthSales);
            //违规下架的商品
            $("#tj_goods_show0").html(data.data.foulGoods);
            $("#tj_goods_show0").parent("a").attr("href", "http://47.104.204.162:8081/goods/store/repository/" + data.data.store_id);
            //待付款
            $("#tj_pending").html(data.data.orderStateOne);
            $("#tj_shipped").html(data.data.orderStateTwo);
            //仓库待上架商品
            $("#tj_goods_storage").html(data.data.offGoods);
            $("#tj_goods_storage").parent("a").attr("href", "http://47.104.204.162:8081/goods/store/repository/" + data.data.store_id);
            //出售中的商品
            $("#tj_goods_selling").html(data.data.onsaleGoods);
            $("#tj_goods_selling").parent("a").attr("href", "http://47.104.204.162:8081/goods/store/" + data.data.store_id);
            //待收货
            $("#tj_shipping").html(data.data.orderStateThree);
        }
    });

    // 点击退出
    $('.quit').click(function () {
        console.log('quit!');
        $.ajax({
            url: "http://47.104.204.162:8088/store/logout",
            type: "post",
            // async: false,
            data: {
                token: $.cookie('token'),
            },
            success: function (data) {
                window.location.href="../login/login.html";
            },
            error: function () {
                alert("退出失败");
            }
        });
    });
}