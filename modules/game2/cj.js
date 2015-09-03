/**
	* @require mousegame.js
**/
(function(){
	// var _w = $(window).width();
	// var _h = $(window).height();
	// var _newH = 1136*_w/640;
	// //document.body.style.zoom = document.body.clientWidth / 320;
	// var _zoom = document.body.clientWidth / 320;

	var html =  '	<div class="cj_c">'+
				'		<div class="cell"  style="left:5px;top:3px;"></div>'+
				'		<div class="cell"  style="left:106px;top:3px;"></div>'+
				'		<div class="cell"  style="left:208px;top:3px;"></div>'+
				'		<div class="cell"  style="left:5x;top:102px;"></div>'+
				'		<div class="cell"  style="left:106px;top:102px;"></div>'+
				'		<div class="cell"  style="left:208px;top:102px;"></div>'+
				'		<div class="cell"  style="left:5x;top:201px;"></div>'+
				'		<div class="cell"  style="left:106px;top:201px;"></div>'+
				'		<div class="cell"  style="left:208px;top:201px;"></div>'+
				'	</div>'+
				'	<div class="cj_btn" id="cj_btn"></div>'+
				'	<div class="palyagain_btn" id="palyagain_btn"></div>'+
				'	<a class="zhuangbei_btn" href="#"></a>';
	var _ele = $("<div />");
	_ele.addClass('cj_box');
	_ele.addClass('c_box');
	_ele.append(html);

	var CJBOX = function(ele){
		this.ele = ele;
		this.hasCreat = false;
	};
	CJBOX.prototype = {
		init:function(){

		},
		show:function(h,w,n){
			this.cj_num = (n>=2)?2:n;
			_ele.css({"width":w,"height":h});
			if(this.hasCreat){
				this.ele.show();
			}else{
				$("body").append(this.ele);
				this.hasCreat = true;
				this.events();
			}
		},
		events:function(){
			// console.log("ssseqqq");
			var that = this;
			$("#cj_btn").click(function(){
				if(that.cj_num<=0){
					alert("抱歉，没有抽奖次数了");
				}else{
					that.cj_num --;
					$(".cj_c .cell .c").remove();
					$(this).hide();
					that.cj_interval();
				}
			});
			$("#palyagain_btn").click(function(){
				that.ele.hide();
				$(".logo").show();
				gamecontrol.gameTime = 10000;
				gamecontrol.score = 0;
				setTimeout(function(){
					mousehitGame.start();
				},500);
			});
		},
		cj_interval:function(){
			var num = 35;
			var n0 = 0;
			var result = 5;
			var that = this;
			this.intervalFun = setInterval(function(){
				if(n0 == num){
					$(".cj_c .cell").removeClass("cnt");
					// $(".cj_c .cell").eq(result).addClass("cnt");
					switch(result){
						case 1:
							$(".cj_c .cell").eq(0).append("<div class='c c1'></div>");
						break;
						case 2:
							$(".cj_c .cell").eq(2).append("<div class='c c2'></div>");
						break;
						case 3:
							$(".cj_c .cell").eq(5).append("<div class='c c3'></div>");
						break;
						case 4:
							$(".cj_c .cell").eq(4).append("<div class='c c4'></div>");
						break;
						default:
							$(".cj_c .cell").eq(4).append("<div class='c c5'></div>");
						break;

					}
					clearInterval(that.intervalFun);
					$("#cj_btn").show();
					return false;
				}
				var n = Math.floor(Math.random()*9);
				$(".cj_c .cell").eq(n).siblings().removeClass("cnt");
				$(".cj_c .cell").eq(n).addClass("cnt");
				n0++;
			},100);
		}
	};
	var cjbox = new CJBOX(_ele);
	window.cjbox = cjbox;
})();

// var control = new GAMECONTROL(20000,$(".countdown"),$(".score"));
// var mousehitGame = new MOUSEhit($(".gameStage"),600,control);



// $(".start").click(function(){
// 	mousehitGame.start();
// 	$(this).hide();
// });






