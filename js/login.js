$(function(){
	$('.C_icon').click(function(){
		$('.C_select').css('display','block');
		event.stopPropagation();
	})
	$(document).click(function(){
		$('.C_select').css('display','none');
	});
	var onOff = true;
	$('.yes_btn').on('click',function(){
		if(onOff){
			$(this).addClass('active');
			onOff=false;
		}else{
			$(this).attr('class','yes_btn');
			onOff = true;
		}
	})
	var tel_onOff = false;
	var password_onOff = false;
	$('.oInp').focusin(function(){
		$(this).attr('class','oInp focusin');
	})
	$('.iphone').blur(function(){
		var username = $('.iphone').val();
		var that = $(this);
		if((/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.value))|| this.value == ""){ 
			$('.warning_tel').css('display','none');
			$(this).parent('.oInp').attr('class','oInp');
		}else{
			$('.warning_tel').css('display','block');
			$('.warning_tel').html('电话号码格式错误');
			that.parent('.oInp').attr('class','oInp blur');
			tel_onOff = false;
		}
	})
	$('.password').blur(function(){
			$(this).parent('.oInp').attr('class','oInp');
			$('.warning_password').css('display','none');
	});
	$('.reg_btn').click(function(){
		var tel = $('.iphone').val();
		var password_1 = $('.password').val();
		$('.password').parent('oInp').attr('class','oInp');
		$.ajax({
		type:"post",
		url:"code/login.php",
		data:`oTel=${tel}&oPassword=${password_1}`,
		success:function(data){
			console.log(data);
			if(data == '用户名不存在'){
				$('.warning_tel').css('display','block');
				$('.warning_tel').html('电话号码不存在');
				$('.iphone').parent('.oInp').attr('class','oInp blur');
			}else{ 
				if(data == '密码错误'){
				$('.password').parent('oInp').attr('class','oInp blur');
				$('.warning_password').css('display','block');
				$('.warning_password').html('密码错误');
				$('#dd').addClass('dd');
				}else if(data == 1){
					alert('登录成功');
				}
			}
				}
			});
	})
/* $("#dd").mouseenter(function () {
            $(this).addClass("dd");
        });
        $("#dd").mouseleave(function () {
            $(this).removeClass("dd");
        });*/
})
