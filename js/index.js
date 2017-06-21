$(document).ready(function(){
	$('.enter').click(function(){
		$('#c_n3').css("display","none");
		$('.page-1').addClass('gaiBian');
		$('.page-2').addClass('show');
	})
	//电影界面背景移动
	var pageX;
	var pageY;
	
	$('body').mousemove(function(event){
		$('.x').css('background-position',event.pageX/10+'px 0px');
		$('.y').css('background-position','0px '+event.pageY/10+'px');
	})

	//电影区域轮播
/*	var movieWrap = document.getElementsByClassName('movieWrap');
	
	var next = document.getElementById('next');
	var prev = document.getElementById('prev');
	
	//单个DIV宽度
	var divWidth = 950;
	
	//DIV的数量
	var listCount =  document.getElementsByClassName('list').length;
		
	//当前的索引
	var currIndex = 0;
	
	//左箭头事件
	prev.onclick = function(){
		//调用运动函数，传入偏移量
		animate(divWidth);
		currIndex --;
		if(currIndex < 0)
			currIndex = listCount - 1;
	}
	
	//右箭头事件
	next.onclick = function(){
		currIndex ++;
		if(currIndex > listCount - 1)
			currIndex = 0;
		//调用运动函数
		animate(-divWidth)
	}
	
	//运动函数
	function animate(offset){
		//计算出新的位置
		var newLeft = parseInt(movieWrap[0].style.left) + offset;
		//判断如果超过第一张，就设置到最后一张
		if(newLeft > 0)
			newLeft = -(listCount - 1) * divWidth;
			
		//判断如果超过最后一张，就设置到第一张
		if(newLeft < -(listCount - 1) * divWidth)
			newLeft = 0;
			
		//设置图片列表的新位置
		movieWrap[0].style.left = newLeft + 'px';	
	}*/
	
	/*
	 电影轮播
	 * */
	//左箭头事件
	$('#prev').click(function(event){
		$('.movieWrap').stop(true,true);	
		if(parseInt($('.movieWrap').css("left")) >= 0){
			$('.movieWrap').css("left",-4750);
		}
		$('.movieWrap').animate({left:'+=950'},1000);
				
	});
	
	//右箭头事件
	$('#next').click(function(event){
		$('.movieWrap').stop(true,true);
		if(parseInt($('.movieWrap').css("left")) <= -4750){
			$('.movieWrap').css("left",0);			
		}
		$('.movieWrap').animate({left:'-=950'},1000);
				
	});
	
	//第二个界面导航栏消失
	$('.closeDiv').click(function(){
		
		$('.nav').addClass('yincang');
//		$('.nav').fadeOut(2000);
	});
	
	//第二个界面导航栏显示
	$('.direBtn').click(function(event){
		$('.nav').removeClass('yincang');
		$('.nav').css('display','block');
//		$('.nav').css('opacity',1);
		$('.nav').css('left','-320px');	
		$(".navUl li").hide();
		$('.nav').animate({left:0},1000,function(){
			$('.active').show(1000,function(){
				$(this).next('li').show(500,arguments.callee);
			});
		});
	});
	
	//第二个界面消失
	$('.clothesA').click(function(event){
		$('.page-2').fadeOut(1000);
		$('.page-3').animate({left:0},1500);
		
		
	});
	
	//第三个界面显示
	creatDiv();
	function creatDiv(){
		
		var clientW = document.documentElement.clientWidth - 100; //获得视口宽度
		var clientH = document.documentElement.clientHeight - 100;  //获得视口高度
		
		for(var j = 0;j < data.length;j ++){
										
			var randomDeg = 10 * Math.floor((360 * Math.random()) / 10);
			var imgTop = 10 * Math.floor((clientH * Math.random()) / 10);
			var imgLeft = 10 * Math.floor((clientW * Math.random()) / 10);
			
			if(imgTop < 0.5 * clientH + 300 && imgTop > 0.5 * clientH - 300 && imgLeft < 0.5 * clientW + 250 && imgLeft > 0.5 * clientW - 250){
				j --;				
			}else{
				var html = '';
				html += '<div class="pagePhoto" style="top:' + imgTop + 'px;left:' + imgLeft + 'px;-webkit-transform: rotate(' + randomDeg + 'deg);position: absolute;" >';
				html +=		'<div class="pagePhoto-p">';
				html += 		'<div class="page-img" style="background: url(img/' + data[j].imgurl +') no-repeat;background-size:cover"></div>';
				html +=			'<div class="imgText">'+ data[j].name +'</div>';
				html += 	'</div>';
				html += 	'<div class="pagePhoto-t">'+ data[j].desc +'</div>';
				html += '</div>';
				
				$(".pageClose").append(html);
			}
						
		}
		
		/*
		 图片移动
		 * */
		
		var pagePhoto = $('.pagePhoto');
		
		$.each(pagePhoto, function(index,el) {
			
			el.onmousedown = function(e){
			
				e = e || window.event;
				
				//获得鼠标相对于事件源的偏移量
				var offsetX = e.offsetX;
				var offsetY = e.offsetY;
				
				//鼠标移动事件
				document.onmousemove = function(e){
					
		//			//计算位置
					var vLeft = e.clientX - offsetX;
					var vTop = e.clientY - offsetY;
		
					// 判断div是否超过视口范围
//					if(vLeft < 0)
//						vLeft = 0;
//					else if(vLeft + el.offsetWidth > document.documentElement.clientWidth)
//						vLeft = document.documentElement.clientWidth - el.offsetWidth;
//	
//					if(vTop < 0)
//						vTop = 0;
//					else if(vTop + el.offsetHeight > document.documentElement.clientHeight)
//						vTop = document.documentElement.clientHeight - el.offsetHeight;
	
					
					//图片获得新的位置
					el.style.left = vLeft + "px";
					el.style.top = vTop + "px";				
				}	
						
				el.style.zIndex="999";
			
				//鼠标抬起
				el.onmouseup = function(){
				
					document.onmousemove = null;
					document.onmouseup = null;
					el.style.zIndex="0";
				}	
			}
			
			//图片双击居中
			$(el).dblclick(function(event) {
				
				$(this).css({
					top: '0',
					left: '0',
					right: '0',
					bottom: '0',
					margin: 'auto',
					'-webkit-transform': 'rotate:0deg',
					transition:'all 1s'
				});

			});
			
		});
				
	}
			
		
		
		
		
});

