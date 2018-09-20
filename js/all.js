    // 获取屏幕高度
	function HeightTOP(){
		if(window.innerHeight<800){
			$(".all-content").css("height","800px")
		}else{
			$(".all-content").css("height",window.innerHeight)
		}
	}
	function HeightCenter(){
		var AllHight = window.innerHeight-80;
		var centerLeft = $(".center-left").height();
		var centerRight = $(".center-right").height();
		
		if(AllHight < centerLeft){
			if(centerLeft < centerRight){
				$(".center-left").css("height",centerRight);
			}
			else{
				$(".center-right").css("height",centerLeft);
			}
		}
		else if(AllHight > centerLeft){
			if(AllHight < centerRight){
				$(".center-left").css("height",centerRight);
			}
			else{
				$(".center-left").css("height",AllHight);
				$(".center-right").css("height",AllHight);
			}
		}
	}
  //点击获取短息验证码(无图形验证码)
    function getInfoReg(btn,one,tow){
        btn.click(function(){
            if(checkPhone(one,tow)){
                var $tar=$(this);
                $tar["prop"]("disabled",true).css({
                    color:"#fff",
                    background:"#999"
                });
                var n=60;
                $tar["html"](n+"秒");
                var timer=setInterval(function(){
                    n--;
                    $tar["html"](n+"秒");
                    if(n<=0){
                        $tar["html"]("获取验证码");
                        clearInterval(timer);
                        $tar["prop"]("disabled",false).css({
                            color:"#fff",
                            background:"#00BB9C"
                        })
                    }
                },1000);
                var phones = one.val();
                $.ajax({
                    url:"http://47.104.204.162:8088/store/regist/sendSmsCode?storeTel="+phones,
                    success:function(data){
                        console.log(data)
                        if(data.status == 200){
                            console.log("成功获取验证码");
                        }
                        else if(data.status == 400){
                           $(".captchaBottom").html("验证码错误")
                        }
                    }
                });
            }
        });
    };
    //点击获取短息验证码+图形验证码
    function getInfoRegTow(btn){
        btn.click(function(){
            if(checkPhone($(".userName"),$(".userNameSpan"))&&checkBear($(".codeImg"),$(".codeImgSpan"))){
                var $tar=$(this);
                $tar["prop"]("disabled",true).css({
                    color:"#fff",
                    background:"#999"
                });
                var n=60;
                $tar["html"](n+"秒");
                var timer=setInterval(function(){
                    n--;
                    $tar["html"](n+"秒");
                    if(n<=0){
                        $tar["html"]("获取验证码");
                        clearInterval(timer);
                        $tar["prop"]("disabled",false).css({
                            color:"#fff",
                            background:"#00BB9C"
                        })
                    }
                },1000);
                var $phones = $(".userName").val(),$captchas = $(".codeImg").val();
                $.ajax({
                    url:"http://47.104.204.162:8088/store/back/sendSmsCode",
                    data:{
                        phone:$phones,
                        captcha:$captchas
                    },
                    success:function(data){
                        if(data.status == 200){
                            console.log("成功获取验证码");
                        }
                        else if(data.status == 400){
                           $(".codeImgSpan").html("图片验证码错误")
                        }
                    }
                })
            }
        });
    };
    //转换时间戳
    function timestampToTime(timestamp) {
        var date = new Date(timestamp);
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
	};
