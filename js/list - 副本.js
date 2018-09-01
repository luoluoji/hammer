$(function(){
	var onOff = true;
	$(window).scroll(function(){
		var s = $(document).scrollTop();
		if(s>=200 && onOff){
			$('#title').css({
				position:'fixed',
				top:0,
				zIndex:9999,
				height:0,
				opacitiy:0,
				boxShadow:'1px 3px 30px #808080',
				background:'linear-gradient(#fefefe, #f2f2f2)'
			})
			onOff = false;
			};
			if(s >= 200){
			$('#title').stop().animate({
				height:92,
				opacity:1,
			})
			}
		if(s<=200){
			$('#title').css({
				position:'relative',
				top:0,
				height:92,
				opacitiy:1,
				boxShadow:'0px 0px 0px #888888'
			})
			onOff = true;
		}
		});
		function title(arr){
				$('#title_connect ul li a').each(function(i){
					$(this).html(arr.title_connect[i]);
					$(this).attr('class',arr[i]);
				})
				$('.blue_ad').html(arr.blue_ad);
			}
		$.ajax({
 			url: 'code/index.json',
 			success: function(arr){
 				title(arr);
 			},
 			error: function(msg){
 				console.log(msg);
 			}
 		})
		.done(function(){
			$('#title_connect ul li:eq(1)').hover(
				function(){
					$('.down_title').stop().animate(
						{
							height:380,
							opacity:1
						}
					)
				},
				function(){
					$('.down_title').stop().animate(
						{
							height:0,
							opacity:0
						}
					)
				}
			)
			
	//parts
	var json_1 = null;
	$.ajax({
 			url: 'code/list.json',
 			success: function(arr){
 				json_1 = arr;
 				var parts = $('#connect_box');
 				godead(arr,parts);
 				//console.log(arr);
 			},
 			error: function(msg){
 				console.log(msg);
 			}
 	}).done(function(){
 			var obj_1 = $('#connect_box a');
 			var index = 'list';
 			onhover(index,obj_1); 
 			mouseover_btn(index,obj_1);
 			var idp = {};
 			$('.small').click(function(){
 				$('#connect_box').html('');
 				function sortNumber_1(a,b){return a - b};
						ajax(json_1,sortNumber_1);	
 			});
 			$('.big').click(function(){
 				function sortNumber_2(a,b){return b - a};
						ajax(json_1,sortNumber_2);	
 				
 			})
 		})
	 //down_title
	 function ajax(arr,sortNumber){
	 					var idp= {};
		 				for(var i = 0; i < arr.length; i++){
		 					var oPrice = arr[i].price;
		 					idp[oPrice] = arr[i].id;
		 				}
		 				var arr_1 = [];
		 				for(var key in idp){
		 					arr_1.push(parseFloat(key));
		 				}
		 				var arr_1 = arr_1.sort(sortNumber);
		 				var arr_2 = [];
		 				$.each(arr_1,function(i,value){
		 					var num = value + '.00';
		 					arr_2.push(num);
		 				})
		 				var id_num = [];
		 				$.each(arr_2,function(i,value){
		 					var id_n = idp[value];
		 					id_num.push(id_n);
		 				});
		 				var parts = $('#connect_box');
		 				$('#connect_box').html('');
		 				for(var i = 0; i<id_num.length; i++){
		 					godeaddead(id_num[i],parts,arr,i);
		 				};
		 				var obj_1 = $('#connect_box a');
			 			var index = 'list';
			 			
			 			onhover(index,obj_1,id_num); 
			 			mouseover_btn(index,obj_1,id_num);
		 				
		 	};
		 			
		 			
		 			
		 			
	function godead(arr,parts){
			
		for(var i = 0; i < arr.length; i++){
					//console.log(arr.hot_goods_box[i].name);
					godeaddead(i,parts,arr);
			}
	}
	function godeaddead(i,parts,arr,k){
		parts.append($(`<a href="#" title=${arr[i].id}><div class="parts_box_connect">
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
				//console.log($(this).index());
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
					//console.log($(this).index());
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
	//获取cookieID
	$('#connect_box').on('click','a',function(){
		//console.log($(this).attr('title'));
		var id = this.title;
		$.cookie('goods', `[{id:${id}}]`, {expires: 7});
		location.href = 'detail_1.html';
	})
	})

	
	
