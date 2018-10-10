//省市区三级联动
function area_cont(pid, id , one , tow , tre) {
    $.ajax({
        url :"http://47.104.204.162:8088/area/getByPid/" + pid,
        async:false,
        success : function(data) {
            // console.log('data:',data);
            var html = "<option value=''>请选择</option>";
            for (var i = 0; i < data.length; i++) {
                html += "<option value="+data[i].id+">"
                        + data[i].name + "</option>";
            }
            switch (id) {
            case 1:
            // 省
                one.html(html);
                break;
            case 2:
            // 市
                tow.html(html);
                break;
            case 3:
            // 县
                tre.html(html);
                break;
            }
        }
    })
}