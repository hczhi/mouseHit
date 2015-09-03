/**
	* @require mousegame.js
	* @require cj.js
**/
var _cjs_num = 0;
(function(){
	var _score = 0;
	var _w = $(window).width();
	var _h = $(window).height();
	var _newH = 1136*_w/640;
	document.body.style.zoom = document.body.clientWidth / 320;
	var _zoom = document.body.style.zoom;
	$(".c_box").css({"height":_newH/_zoom,"width":_w/_zoom});
	//$("body").css({"height":_newH/_zoom,"overflow":"hidden"});
	//
	$("#gamebox").css({"top":_newH/_zoom+"px"});

	//loading
	var progressFun = function(arry,callback){
		var pro = $(".progress-bar");
		var len = arry.length,dis = (len/10)*100,tot=0;
		var ns = 0;
		for(var i = 0 ; i<len ; i++){
			var imgs = new Image();
			imgs.onload = function(){
				tot++;
				ns++;
				pro.width(dis*tot+"%");
				if(ns==len-1&&callback){
					setTimeout(function(){
						callback();
					},1000);
				}
			};
			imgs.src = 'css/images/'+arry[i];
		}
	};	
	progressFun(['index_bg.jpg','index_p5.png','index_p6.png','index_p1.png','index_p4.png','index_p3.png','index_p2.png','game_bg.png','girl.png','game_p1.png','game_p2.png','cj.jpg','cj_p5.png','cj_p6.png','g1.png','g2.png','g3.png','g4.png','g5.png','g6.png'],function(){
		//加载资源完毕
		$(".gamebox").hide();
		$(".logo").show();
		$(".index").show().addClass("indexhosw");
		setTimeout(function(){
			$(".index .b1").show().addClass("index_b1ani");
			$(".index .b2").show().addClass("index_b1ani");
		},500)
	});			

	//mask
	var MSAK = function(){
		this.ele = $("<div />");
	};
	MSAK.prototype = {
		tem1:function(){
			this.ele.html(" ");
			var _h =    '<div class="mask c_box">'+
						'		<div class="m1"></div>'+
						'		<div class="m2"></div>'+
						'		<div class="m3">'+
						'			<span>恭喜你</span>'+
						'			<p>获得<em>1</em>次抽奖机会</p>'+
						'		</div>'+
						'		<span class="cj_btn" id="cj_btn"></span>'+
						'	</div>';
			this.ele.append(_h);
			this.ele.css({"height":_newH/_zoom,"width":_w/_zoom,'position':'absolute','top':0});
			this.creace();
		},
		tem2:function(){
			this.ele.html(" ");
			var _h = '<div class="mask2 c_box">'+
					'		<div class="m1"></div>'+
					'		<div class="m2"></div>'+
					'		<div class="m3">'+
					'			<span>很遗憾</span>'+
					'			<p>虽然很努力了，仍需继续！</p>'+
					'		</div>'+
					'		<span class="again_btn" id="again_btn"></span>'+
					'		<div class="m4">'+
					'			<p>看【春纪】为你的恋爱保驾护航~</p>'+
					'		</div>'+
					'		<a href="#" class="a_btn"></a>'+
					'	</div>';
			this.ele.append(_h);
			this.ele.css({"height":_newH/_zoom,"width":_w/_zoom,'position':'absolute','top':0});
			this.creace();
		},
		creace:function(n){
			$("body").append(this.ele);
			this.events();
		},
		events:function(){
			var that = this;
			$(".again_btn").click(function(){
				that.ele.html("");
				gamecontrol.gameTime = 10000;
				gamecontrol.score = 0;
				setTimeout(function(){
					mousehitGame.start();
				},500);
				setTimeout(function(){
					//console.log(gamecontrol.score);
					var score = gamecontrol.score;
					if(score>=_score){
						_cjs_num =1 ;
						that.tem1();
					}else{
						that.tem2();
					}
				},22000);
			});
			$(".cj_btn").click(function(){
				that.ele.html("");
				//$(".c_box").css({"height":_newH/_zoom,"width":_w/_zoom});
				cjbox.show(_newH/_zoom,_w/_zoom,_cjs_num);
				$(".logo").hide();
			});
		}
	};
	var game_mask = new MSAK();
	//开始游戏
	$("#start").click(function(){
		$(".index").addClass("indexhid");
		$("#gamebox").show();
		$("#gamebox").css({"top":0});
		setTimeout(function(){
			mousehitGame.start();
		},1000);
		// setTimeout(function(){
		// 	//console.log(gamecontrol.score);
		// 	var score = gamecontrol.score;
		// 	if(score>=_score){
		// 		_cjs_num = 1 ;
		// 		game_mask.tem1();
		// 	}else{
		// 		game_mask.tem2();
		// 	}
		// },5000);
	});

})();


























