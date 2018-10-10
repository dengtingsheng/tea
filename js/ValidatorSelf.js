// 检查是否为手机号
function checkPhone(one,tow) {
    if (!validator.isLength(one.val(), {min: 11, max: 11})) {
        tow.html("输入不足11位");
        // one.focus();
    }else if(!validator.isMobilePhone(one.val(),["zh-CN"])) {
        tow.html("请输入手机号");
        // one.focus();
    }else {
        tow.html("");
        return true;	
    }
     
}
// 检查字符串是否只包含字母和数字。
function checkNull(one,tow) {
    if (validator.isEmpty(one.val())) {
        tow.html("不能为空");
        // one.focus();
    }else if(!validator.isAlphanumeric(one.val(),["en-US"])) {
        tow.html("格式不对");
        // one.focus();
    }else {
        tow.html("");
        return true;
    } 
}
// 检查是否为空
function checkBear(one,tow) {
    if (validator.isEmpty(one.val())) {
        tow.html("不能为空");
        // one.focus();
    }else {
        tow.html("");
        return true;
    } 
}
//检查两次是否输入一致
function towchanged(one,tow,tre) {
    if(one.val()!=tow.val()){
        tre.html("两次密码输入不一致");
    }
    else{
        tre.html("")
        return true;
    }
    
}
// 检查是否为空
function checkOneBear(one) {
    if (validator.isEmpty(one.val())) {
        // one.focus();
    }else {
        return true;
    } 
}

$("#reg input").focus(function () {
    $(this).parent().parent().find("span").html('')
});