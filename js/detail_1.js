$(function(){
	var onOff = true;
	$(window).scroll(function(){
		var s = $(document).scrollTop();
		if(s>=85){
			$('#title').css({
				position:'fixed',
				top:0,
				zIndex:9999,
				height:60,
				background:'linear-gradient(#fefefe, #f2f2f2)',
				lineHeight:'60px'
			})
			};
			if(s > 85){
			$('.scroll_1').stop().animate({
				fontSize:14
			});
			$('#title_connect ul li').css({
				lineHeight:'60px'
			})
			$('#scroll').css({
				display:'block'
			})
			}
		if(s <= 85 || s==0){
			$('#title').css({
				position:'relative',
				top:0,
				height:40,
				boxShadow:'0px 0px 0px #888888'
			})
			}
		if(s <= 85 || s==0){
			$('.scroll_1').css({
				fontSize:'12px'
			});
			$('#title_connect ul li').css({
				lineHeight:'40px'
			})
			$('#scroll').css({
				display:'none'
			})
		}
		if(s<=7900){
			$('#buy_car_tit').css({
				position:'fixed',
				bottom:0
			})}else{
			$('#buy_car_tit').css({
			position:'relative'
		})	
			}
		
		});
var arr_detail = null;
	$.ajax({
 			url: 'code/list.json',
 			success: function(arr){
 				arr_detail = arr;
 				var parts = $('.PageSpeed_box');
 				godead(arr,parts);
 				//console.log(arr);
 			},
 			error: function(msg){
 				console.log(msg);
 			}
 		}).done(function(){
 			var obj_1 = $('.PageSpeed_box a');
 			var index = 'list';
 			onhover(index,obj_1);
 			mouseover_btn(index,obj_1)
 		})
		 			
	function godead(arr,parts){
			
		for(var i = 0; i < 8; i++){
					//console.log(arr.hot_goods_box[i].name);
					godeaddead(i,parts,arr);
			}
	}
	function godeaddead(i,parts,arr,k){
		parts.append($(`<a href="#"><div class="parts_box_connect">
							<div class="parts_box_connect_img"><img src=${arr[i].img} alt="" /></div>
							<div class="parts_box_connect_h4"><h4>${arr[i].name}</h4></div>
							<div class="parts_box_connect_h6"><h6>${arr[i].title}</h6></div>
							<div class="parts_box_connect_icon"></div>
							<div class = "price">
								<div class="discount-price"><span>¥</span><span>${arr[i].price}</span></div>
							</div>
						</div></a>`));
						var part_color = parts.find(".parts_box_connect_icon");
						console.log(i);
						if(arr[i].color){
							if(k){
							for(var j = 0; j < arr[i].color.length; j++){
								($(`<div class="parts_box_connect_btn">
								<div class="parts_box_connect_in"></div>
								</div>`)).appendTo(part_color[k]);
								
								part_color.eq(k).find($(".parts_box_connect_in")).eq(j).css('background',arr[i].color[j]).attr('title',arr[i].color[j]);
							}
								part_color.find('.parts_box_connect_btn:first').addClass('active');
					}else{
							for(var j = 0; j < arr[i].color.length; j++){
									($(`<div class="parts_box_connect_btn">
									<div class="parts_box_connect_in"></div>
									</div>`)).appendTo(part_color[i]);
									
									part_color.eq(i).find($(".parts_box_connect_in")).eq(j).css('background',arr[i].color[j]).attr('title',arr[i].color[j]);
								}
									part_color.find('.parts_box_connect_btn:first').addClass('active');
					}
				}
		}
	//点击弹出语言选择框
	$('.language_btn').click(function(){
		$('.language').css('display','block');	
		event.stopPropagation();
	})
	$(document).click(function(){
		$('.language').css('display','none');
	})
	
	//cookie同步
	var str = $.cookie('goods');
	var arr = eval(str);
	var id = arr[0].id;
	$.ajax({
		url: 'code/list.json',
		success: function(arr){
			$('#connect_left img').attr('src',arr[id].img);
			$('#connect_right h1').html(arr[id].name);
			$('#connect_right h2').html(arr[id].title);
			$(`<span class="price">¥${arr[id].price}</span>`).appendTo('#connect_right h2');
			var color = arr[id].color;
			console.log(color);
			for(var i = 0; i < arr[id].color.length; i++){
				var colorA = arr[id].color[i];
				var colorB = arr[id].hover[0];
				var color_text = colorB[colorA];
				$(`<div class="color_box">
						<span class="color_1" title=${colorA}>
							<a class="color_2" style="background:${colorA}" href="javascript:;"></a>
						</span>
						<span class="color_text">${color_text[1]}</span>
					</div>`).appendTo('.activity_color .activity_right');
			}
			$('.color_1').eq(0).attr('id','active');
			$('.price_btn').attr('title',id);
		},
		error: function(msg){
			console.log(msg);
		}
	})
	
	
	//数量选择按钮
	
		$('.add').click(function(){
		var str = $('.num').html(); 
			str++;
		if(str > 3){
			str = 3;
		}
		$('.num').html(str);
	});
		$('.minus').click(function(){
		var str = $('.num').html(); 
		str--;
		if(str < 1){
			str = 1;
		}
		$('.num').html(str);
	});
//颜色选择
$('.activity_right').on('click','.color_1',function(){
	$('.activity_right .color_1').attr('id','');
	$(this).attr('id','active');
	var big_color = $(this).attr('title');
	//alert(big_color);
	
	$('#connect_left img').attr('src',arr_detail[id].hover[0][big_color][0]);
})



//加入购物车
$('.price_btn').click(function(){
	var name = $('#connect_right h1').html();
	var num = $('.activity_right .num').html();
	var img = $('#connect_left img').attr('src');
	var str = name + '×' + num;
	var id = $('.price_btn').attr('title');
	var color = $('.activity_right #active').parent('.color_box').find('.color_text').html();
	var price = $('#connect_right h2 .price').html();
	var price_num = '¥'+ parseFloat(price.slice(1))*num;
	$('.buy_car_2 h4').html(str);
	$('.buy_car_2 span').html(color);
	$('#buy_car_tit .price span').html(price_num);
	var str = $.cookie('buyCar');
		console.log(str);
	if(!str){
		$.cookie('buyCar', `[{"id":"${id}","name":"${name}","num":"${num}","img":"${img}","color":"${color}","price":"${price}","price_num":"${price_num}"}]`, {expires: 7});
	}else{
		var new_str = $.cookie('buyCar');
		var new_arr = JSON.parse(new_str);
		var onOff = false;
		for(var i = 0; i< new_arr.length; i++){
			if(new_arr[i].id == id){
			new_arr[i].num = Number(new_arr[i].num) + Number(num);
			new_arr[i].price_num = '¥' + parseFloat(price.slice(1)) * parseFloat(new_arr[i].num);
			var new_str_1 = JSON.stringify(new_arr);
			$.cookie('buyCar', new_str_1, {expires: 7});
			onOff = true;
			console.log(new_arr);
			}
		}
		if(!onOff){
			var new_obj = {"id":id,"name":name,"num":num,"img":img,"color":color,"price":price,"price_num":price_num};
			console.log(new_arr);
			//console.log(new_arr);		
			new_arr.push(new_obj);
			//console.log(new_arr);
			var new_str_1 = JSON.stringify(new_arr);
			$.cookie('buyCar', new_str_1, {expires: 7});
		}
		/*var new_obj = {"id":id,"name":name,"num":num,"img":img,"color":color,"price":price_num};
		//console.log(new_arr);		
		new_arr.push(new_obj);
		//console.log(new_arr);
		var new_str_1 = JSON.stringify(new_obj);
		$.cookie('buyCar', new_str_1, {expires: 7});*/
		
	}

	
})

	function onhover(url_1,obj_a,arr){
		obj_a.hover(function(){
			var that = $(this);
			if(arr){
				var get = $(this).index();
				var index = arr[get];
				console.log($(this).index());
			}else{
				var index = $(this).index();
			}
				
				//alert(index);
				$.ajax({
		 			url: 'code/'+ url_1 +'.json',
		 			success: function(arr){
		 				that.find('.price').html('<div class="price_icon">查看详情</div>');
		 				if(arr[index].inventory){
		 					var buy_car = $(`<button class="buy_car">加入购物车</button>`);
		 					that.find('.price').append(buy_car);
		 				}
		 			},
		 			error: function(msg){
		 				console.log(msg);
		 			}
		 		})
				
			},function(){
				var that = $(this);
				if(arr){
					var get = $(this).index();
					var index = arr[get];
					console.log($(this).index());
				}else{
					var index = $(this).index();
				}
				//alert(index);
				$.ajax({
		 			url: 'code/'+ url_1 +'.json',
		 			success: function(arr){

		 				//alert(index);arr.hot_goods_box[i].title
		 				that.find('.price').html(`<div class="discount-price"><span>¥</span><span>${arr[index].price}</span></div>`);
		 				//html(`<div class="discount-price"><span>¥</span><span>${arr.hot_goods_box[index].price}</span></div>
							//	<div class="original-price"><span>¥</span><span>${arr.hot_goods_box[index].originalPrice}</span></div>`);
		 				
		 			},
		 			error: function(msg){
		 				console.log(msg);
		 			}
		 		})
			})
	}
	//事件委托实现按钮切换
	function mouseover_btn(url_1,obj_a,arr){
		obj_a.on('mouseover','.parts_box_connect_btn',function(){
			var that = $(this);
			var color = $(this).find('.parts_box_connect_in').attr('title');
			var get_num = $(this).parents('a').index();
			if(arr){	
			var index = arr[get_num];
			}else{
				var index = get_num;
			}
			$.ajax({
		 			url: 'code/'+ url_1 +'.json',
		 			success: function(arr){
		 				that.siblings().attr('class','parts_box_connect_btn');
						that.addClass('active');
						that.parents('.parts_box_connect').find('.parts_box_connect_img img').attr('src',arr[index].hover[0][color][0]);
		 			},	 
		 			error: function(msg){
		 				console.log(msg);
		 			}
		 		})
			
		})
	}
	//go 购物车页
	$('.price_btn1').click(function(){
		location.href = 'buy_car.html';
	})
	})
	

	
	
