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
		});

		
		 			
		 			
	function godead(arr,parts){
			
		for(var i = 0; i < arr.length; i++){
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
	
	

	
	
