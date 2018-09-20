$.ajaxSettings.beforeSend = function(xhr,request){
    // 在这里加上你的 token 
    xhr.setRequestHeader('Authentication',$.cookie("token"));
}