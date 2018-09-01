$(function(){
	$('.C_select ul li').each(function(i){
		var tel = '0'+ i;
		$(this).attr('title',tel);
		$(this).click(function(){
			$('.C_icon span').html($(this).find('a').html());
			$('.C_num').html($(this).attr('title'));
		})
	});
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
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.value))){ 
			$('.warning_tel').css('display','block');
			$('.warning_tel').html('电话号码格式错误');
			that.parent('.oInp').attr('class','oInp blur');
			tel_onOff = false;
		}else{
		$.ajax({
		type:"post",
		url:"code/registor.php",
		data:`oUsername=${username}`,
		success:function(data){
			console.log(data);
				if(data == '已存在'){
					$('.warning_tel').css('display','block');
					$('.warning_tel').html('用户名已存在');
					that.parent('.oInp').attr('class','oInp blur');
					tel_onOff = false;
				}else{
					$('.warning_tel').css('display','none');
					that.parent('.oInp').attr('class','oInp');	
					tel_onOff = true;
					}
				}
			});
		}
	})
	$('.password').focus(function(){
		$(this).parent('.oInp').find('.C_password').css('display','block');
	});
	$('.password_1').focus(function(){
		$(this).parent('.oInp').find('.C_password').css('display','block');
	});
	$('.password').blur(function(){
		$(this).parent('.oInp').find('.C_password').css('display','none');
		if(!(/^[A-Za-z0-9]{6,20}$/.test(this.value))){
			$(this).parent('.oInp').find('.warning_password').css('display','block');
			$(this).parent('.oInp').attr('class','oInp blur');
			password_onOff = false;
		}else{
			$(this).parent('.oInp').find('.warning_password').css('display','none');
			$(this).parent('.oInp').attr('class','oInp');
			password_onOff = true;
		}
	});
	$('.password_1').blur(function(){
		$(this).parent('.oInp').find('.C_password').css('display','none');
		var password_before = $('.password').val();
		var password_after = $('.password_1').val();
		if(password_before != password_after){
			$(this).parent('.oInp').find('.warning_password').css('display','block');
			$(this).parent('.oInp').attr('class','oInp blur');
		}else{
			$(this).parent('.oInp').find('.warning_password').css('display','none');
			$(this).parent('.oInp').attr('class','oInp');
		}
	});
	$('.reg_btn').click(function(){
		var tel = $('.iphone').val();
		var password_1 = $('.password').val();
		$.ajax({
		type:"post",
		url:"code/registor_1.php",
		data:`oTel=${tel}&oPassword=${password_1}`,
		success:function(data){
			console.log(data);
				alert(data);
				}
			});
	})
})
