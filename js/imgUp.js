// base64的形式传输
// var image = '';
// var imgNumber = 0 ;
// //点击选择图片
// function selectImage(file){
//     var htmls= "";
//     console.log(file.files[0])
//     if(!file.files || !file.files[0]){
//         return;
//     }
//     var formdata = new FormData();
//     formdata.append("uploadFile", file.files[0]);
//     // 上传到服务器的字段名称
//     var reader = new FileReader();
//     reader.readAsDataURL(file.files[0]);//以base64的形式输出
//     reader.onload = function(evt){
//         image = evt.target.result;
//         imgNumber++;
//         htmls = ' <dl class="display-lin text-center m-sm-r m-sm-t">'+
//                 ' <input type="hidden" value="" id="'+imgNumber+'">'+
//                 ' <dt><img src="'+image+'" alt=""></dt>'+
//                 ' <dd class="m-sm-t" style="cursor: pointer;"><button type="button" class="btn btn-default btn-sm clickDelImg">删除上图 </button></dd>'+
//                 ' </dl>';
//         $(".Imgall").append(htmls);      
//         $.ajax({
//             type:'post',
//             url: 'http://47.104.204.162:8081/picture/upload/'+$.cookie("storeId"),
//             // 上传图片不能以对象的形式
//             data: formdata,
//             async: false,
//             dataType: 'json',
//             contentType:false,
//             processData:false,
//             success: function(data){
//                 console.log(data)
//                 $("#"+imgNumber+"").val(data.url);
//                 if(data.success){
//                     alert('上传成功');
//                 }else{
//                     alert('上传失败');
//                 }
//             },
//             error: function(err){
//                 alert('网络故障');
//             }  
//         });
//     };
// }
var image = '';
var ListVal = [];
var imgNumber = 0 ;
var clcikDisbaled = 0;
//点击选择图片
function selectImage(file){
    if(clcikDisbaled < 5 ){
        var htmls= "";
        var formdata = new FormData();
        formdata.append("uploadFile", file.files[0]);
        if(!file.files || !file.files[0]){
            return;
        }
        $.ajax({
            type:'post',
            url: 'http://47.104.204.162:8081/picture/upload/'+$.cookie("storeId"),
            // 上传图片不能以对象的形式
            data: formdata,
            async: false,
            dataType: 'json',
            cache:false,
            contentType:false,
            processData:false,
            success: function(data){
                if(data.error == 0){
                    htmls = ' <dl class="display-lin text-center m-sm-r m-sm-t chiNumberImg">'+
                            ' <dt><img src="'+data.url+'" alt=""></dt>'+
                            ' <dd class="m-sm-t" style="cursor: pointer;"><button type="button" class="btn btn-default btn-sm clickDelImg">删除上图 </button></dd>'+
                            ' </dl>';
                    ListVal.push(data.url);
                    $(".Imgall").append(htmls);
                    $(".goodsImageMore").val(ListVal);  
                    clcikDisbaled = $(".Imgall").children(".chiNumberImg").length
                }
            },
            error: function(err){
                alert('网络故障');
            }
        });
    }else{
        $(".error400").hmtl("图片上传已达上限");
        $('.add-success').modal('toggle');
    }

}
