$(function () {
    var storeIds = $.cookie("storeId")
    $(".heightAllDiv>.lf").css("height", $(".heightAllDiv").height());
    var arrHeight = [];
    for (var i = 0; i < $(".heightAllDiv>.lf>div").length; i++) {
        arrHeight.push($($(".heightAllDiv>.lf>div")[i]).height());
    };
    for (var j = 0; j < $(".heightAllDiv>.lf>div").length; j++) {
        $($(".heightAllDiv>.lf>div")[j]).css("margin-top", (Math.max.apply(null, arrHeight) - $($(".heightAllDiv>.lf>div")[j]).height()) / 2);
    };
    // 获取店铺常用分类
    $.ajax({
        url: "http://47.104.204.162:8081/goods/class_staple/store",
        type: "post",
        data: {
            storeId: $.cookie("storeId")
        },
        success: function (data) {
            if (data.status == 200) {
                for (var i = 0, html = ""; i < data.data.length; i++) {
                    html += '<option value="' + data.data[i].gcId + '">' + data.data[i].stapleName + '</option>'
                };
                $(".seachSelect").append(html);
            }
        }
    });
    //点击删除
    $(".ctentList").on("click", ".delClick", function () {
        var goosIds = $(this).attr("data-id");
        if (confirm("你确定删除吗？")) {
            $.post('http://47.104.204.162:8081/goods/store/del/' + storeIds, { goodsId: goosIds }, function (data) {
                if (data.status == 200) {
                    window.location.reload();
                }
            })
        }

    });
    // 点击编辑
    $(".ctentList").on("click", ".editClick", function () {
        $.cookie("goosIds", $(this).attr("data-id"), { expires: 7, path: '/' })
        window.location.href = 'index.html';

    });
    //全部删除
    $(".clickAll").click(function () {
        if (arrGoogsId.length > 0) {
            var goosIds = arrGoogsId.join(',');
            if (confirm("你确定删除吗？")) {
                $.post('http://47.104.204.162:8081/goods/store/del/' + storeIds, { goodsId: goosIds }, function (data) {
                    if (data.status == 200) {
                        window.location.reload();
                    }
                })
            }
        }
    });
    //全部下架
    $(".clickXia").click(function () {
        if (arrGoogsId.length > 0) {
            var goosIds = arrGoogsId.join(',');
            $.post('http://47.104.204.162:8081/goods/store/outon/' + storeIds, { goodsIds: goosIds, goodsShow: false }, function (data) {
                if (data.status == 200) {
                    window.location.reload();
                }
            })
        }
    });
    //全选
    var arrGoogsId = [];
    function checkallInput() {
        var $hobbies = $(".ctentList input[type=checkbox].tc");
        $(".checkall").change(function () {
            var boole = $(this).prop("checked");
            $hobbies.each(function (index, e) {
                if (boole == true) {
                    arrGoogsId.push(e.value);
                }
                else {
                    arrGoogsId = [];
                }
                e.checked = boole;
            });
        });
        //单选
        $hobbies.change(function () {
            var boole = $(this).prop("checked");
            var Inputs = $(this).val();
            var count = 0;
            $(".ctentList input[type=checkbox].tc").each(function () {
                if ($(this).prop('checked') == false) {
                    // 判断一组复选框是否有未选中的 
                    $('.checkall').prop('checked', false);
                } else {
                    count++;
                    if (count == $(".ctentList input[type=checkbox].tc").length) {
                        $('.checkall').prop('checked', true);
                    }
                };
            });
            //单选确认
            if (boole) {
                if (arrGoogsId.indexOf(Inputs) < 0) {
                    arrGoogsId.push(Inputs);
                };
            }
            //单选取消
            else {
                for (var i = 0; i <= arrGoogsId.length; i++) {
                    if (arrGoogsId[i] == $(this).val()) {
                        arrGoogsId.splice(i, 1)
                    }
                }
            }
        });
    }
    // 渲染列表
    function pageContent(data) {
        console.log('data is ', data)
        $(".ctentList").html("");
        for (var i = 0, html = "", time = ""; i < data.data.length; i++) {
            time = timestampToTime(data.data[i].goodsAddTime);
            for (var j = 0, one = "", tow = "", tre = ""; j < data.data[i].listSpec.length; j++) {
                one += '<div class="diandian m-xs-b">' + data.data[i].listSpec[j].spec_name + '</div>';
                tow += '<div class="diandian m-xs-b">' + data.data[i].listSpec[j].spec_goods_price + '元</div>';
                tre += '<div class="diandian m-xs-b">' + data.data[i].listSpec[j].spec_goods_storage + '</div>';
            }
            html += '<div class="bg-f8 m-md-b">' +
                '<div class="b-samll-b border-color-e8 m-sm-r m-sm-l p-md-t p-xs-b" >' +
                '<div class="lf">' +
                '<label style="font-weight: normal;" class="position-r">' +
                '<input type="checkbox" id="' + data.data[i].goodsId + '" class="regular-checkbox tc"  value="' + data.data[i].goodsId + '">' +
                '<label for="' + data.data[i].goodsId + '" class="m-none-b  m-xs-r" style="margin-top: 1px;"></label>' +
                '<span class="rt">商家编号：</span>' +
                '</label>' +
                '</div>' +
                '<div class="rt">' + data.data[i].gcName + '</div>' +
                '<div class="clear"></div>' +
                '</div>' +
                '<div class="p-lg-b p-lg-t">' +
                '<div class="heightAllDiv">' +
                '<div class="lf text-center b-samll-r border-color-e8" style="width: 250px">' +
                '<div class="p-md-r p-md-l m-sm-t position-r" style="text-align: left;">' +
                '<img src="' + data.data[i].goodsImage + '" alt="" style="height: 80px;width: 80px;">' +
                '<div class="shName m-xs-t position-a " style="width: 130px;height: 40px;overflow: hidden;right: 10px;top: 15px">' + data.data[i].goodsName + '</div>' +
                '</div>' +
                '</div>' +
                '<div class="lf text-center one" style="width: 460px">' +
                '<div class="lf text-center" style="width: 260px">' +
                '<div class="p-md-l p-md-r b-samll-r border-color-e8" >' + one + '</div>' +
                '</div>' +
                '<div class="lf text-center" style="width: 100px">' +
                '<div  class="p-md-l p-md-r b-samll-r border-color-e8" >' + tow + '</div>   ' +
                '</div>' +
                '<div class="lf text-center " style="width: 97px">' +
                '<div   class="p-sm-l p-sm-r b-samll-r border-color-e8">' + tre + '</div>' +
                '</div> ' +
                '</div>' +
                '<div class="lf text-center b-samll-r border-color-e8" style="width: 130px">' +
                '<div  style="width: 100px;margin: 0 auto;"> ' +
                '<div class="diandian m-xxl-t">' + time + '</div>  ' +
                '</div>  ' +
                '</div>' +
                '<div class="lf text-center " style="width: 80px">' +
                '<div class="m-lg-t">' +
                '<a href="index.html?' + data.data[i].goodsId + '" class="btn btn-sm color-b9c b-samll color-w bg-color-w editClick"  style="border-color: #00BB9C;height: 25px;width: 60px;line-height: 10px">编辑</a>' +
                '<button class="btn btn-sm m-sm-t color-999 b-samll color-w bg-color-w delClick" data-id="' + data.data[i].goodsId + '" style="border-color: #999;height: 25px;width: 60px;line-height: 10px">删除</button>' +
                '</div>' +
                '</div>  ' +
                '<div class="clear"></div>' +
                '</div>' +
                '</div>' +
                '<div class="clear"></div>' +
                '</div>'
        }
        $(".ctentList").html(html);
    };
    var dataPages = 0;
    function pageList() {
        $(".simplePaging2").simplePaging({
            allPage: dataPages,//总页数
            showPage: 9,//显示页数
            startPage: 1,//第一页页码数字
            // initPage: 1,//加载完毕自动跳转到第n页
            callBack: function (num) {
                getPage(num, 3);
            }
        });
    };
    //加载列表
    var indexS = true;
    function getPage(pages, conNum) {
        var seachSelect = $(".seachSelect").val(), goodsNames = $(".goodsName").val();
        if (indexS == false) {
            // 搜索
            $.ajax({
                url: "http://47.104.204.162:8081/goods/store/query",
                type: "post",
                dataType: "json",
                async: false,
                data: {
                    storeId: storeIds,
                    goodsName: goodsNames,
                    gcId: seachSelect,
                    page: pages,
                    pageSize: conNum,
                    goodsShow: true
                },
                success: function (data) {
                    // 有值
                    if (data.status == 200) {
                        // 渲染数据
                        pageContent(data);
                        // 点击全选
                        checkallInput();
                        // 渲染分页
                        dataPages = data.totalPage;

                    }
                    // 无值
                    else {
                        $(".simplePaging2").children().remove();
                        $(".ctentList").html('<div class="text-center m-xxl-t m-xxl-b"><img src="../../images/null.png"><div class="m-md-t">暂无订单信息</div></div>');
                    };
                    // 设置左侧高度
                    HeightCenter();
                }
            });
        }
        else {
            $.ajax({
                url: "http://47.104.204.162:8081/goods/store/query",
                type: "post",
                async: false,
                data: {
                    storeId: storeIds,
                    page: pages,
                    pageSize: conNum,
                    goodsShow: true
                },
                success: function (data) {
                    // 有值
                    if (data.status == 200) {
                        // 渲染数据
                        pageContent(data);
                        // 点击全选
                        checkallInput();
                        // 渲染分页
                        dataPages = data.totalPage;

                    }
                    // 无值
                    else {
                        $(".simplePaging2").children().remove();
                        $(".ctentList").html('<div class="text-center m-xxl-t m-xxl-b"><img src="../../images/null.png"><div class="m-md-t">暂无订单信息</div></div>');
                    };
                    // 设置左侧高度
                    HeightCenter();
                }
            });
        }

    };
    //渲染
    getPage(0, 3);
    //渲染分页
    if (dataPages > 1) {
        pageList();
    } else {
        $(".simplePaging2").children().remove();
    };
    $(".submitSeach").click(function () {
        indexS = false;
        $(".simplePaging2").children().remove();
        getPage(0, 3);
        if (dataPages > 1) {
            pageList();
        } else {
            $(".simplePaging2").children().remove();
        }
    });
})