
(function(){
	var _w = $(window).width();
	var _h = $(window).height();
	var _newH = 1136*_w/640;
	//document.body.style.zoom = document.body.clientWidth / 320;
	var _zoom = document.body.clientWidth / 320;

	var _score = 10;
	var _w = $(window).width();
	var _gw = _w*0.9;
	var MOUSEhit = function(stageEle,bit,control,time){
		this.stage = stageEle;
		this.palying = false;
		this.time = time||20000;
		this.boxARRY =  [];
		this.control = control;
		this.bit = bit || 1000; //1000毫秒
		this.init();
	};
	MOUSEhit.prototype = {
		init:function(){
			// this.play_arry = [0,1,2,3,4,5,6,7,8];
			this.bringEle();
		},
		addScore:function(){
			this.control.addScore();
		},
		deduct:function(){
			this.control.deduct();
		},
		countdown:function(){
			var that = this;
			this.timeoutFun = setTimeout(function(){
			that.gameover();
			},this.time);
		},
		start:function(){
			this.palying = true;
			this.control.countdown();
			this.bits();
			this.countdown();
		},
		gameover:function(){
			this.palying = false;
			clearInterval(this.bitsinterval);
			this.control.gameover();
			clearTimeout(this.timeoutFun);
		},
		bringEle:function(){
			var that = this;
			this.stage.find(".mbox").each(function(i){
				var newBox = new MOUSEbox($(this),that,i);
				that.boxARRY.push(newBox);
			});
		},
		bits:function(){
			var that = this;
			function getNum(){
					var len = that.boxARRY.length;
					var num = Math.floor(Math.random()*len);
					// if(that.boxARRY[num].isplay){
					// 	getNum();
					// }else{
					// 	// console.log(num);
					// 	that.boxARRY[num].showmouse();
					// }
					that.boxARRY[num].showmouse();
			}
			this.bitsinterval = setInterval(function(){
				var randomNum = (Math.random()>0.2)?true:false;
				// console.log(randomNum);
			 	if(randomNum){
			 		getNum();
			 	}
			},this.bit);
		}
	};
	var MOUSEbox = function(ele,parent,index){
		this.ele = ele.find(".c").eq(0);
		this.ele2 = ele.find(".n").eq(0);
		this.stage = parent.stage;
		this.parent = parent;
		this.index = index;
		this.isplay = false;
		this.init();
	};
	MOUSEbox.prototype = {
		init:function(){
			//this.create();
		},
		create:function(){
			// this.ele = $("<div />");
			// this.ele.addClass("mouse_box");
			// this.stage.append(this.ele);
		},
		showmouse:function(){
			if(this.isplay){
				return false;
			}
			this.ele.html("");
			var randomnum = (Math.random()>0.6)?2:1; //比例
			this.mouse =new MOUSE(randomnum,this);
			this.isplay = true;
			var that = this;

			setTimeout(function(){
				if(that.mouse!=" "){
					that.isplay = false;
					that.mouse.hide();
					that.mouse = " ";
				}
			},1300);
		}
	};
	var MOUSE = function(type,parent){
		this.type = type || 1;
		this.parent = parent;
		this.hasclick = false;
		this.init();
	};
	MOUSE.prototype = {
		init:function(){
			this.create();
			this.events();
		},
		create:function(){
			var that = this;
			this.ele = $("<div />");
			if(this.type == 1){
				this.ele.addClass("game_b1");
			}else{
				var arr = ['2','3','4'];
				var num = Math.floor(Math.random()*3);
				var classname = 'game_b'+arr[num];
				this.ele.addClass(classname);
			}
			this.parent.ele.append(this.ele);
			// that.ele.addClass("game_b_ani1");
			setTimeout(function(){
				that.ele.addClass("game_b_ani1");
			},50);
		},
		hide:function(classname){
			var that = this;
			// if(this.type==2){
			// 	that.ele.addClass("game_b_boom2");
			// }else{
			// 	that.ele.removeClass("game_b_ani1");
			// }
			that.ele.removeClass("game_b_ani1");
			//this.ele.addClass(classname);
			// setTimeout(function(){
			// 	that.ele.remove();
			// 	that.parent.isplay = false;
			// },300);	
			setTimeout(function(){
				that.ele.remove();
				that.parent.isplay = false;
			},1000)
		},
		hide2:function(classname){
			var that = this;
			if(this.type==2){
				that.ele.addClass("game_b_boom2");
			}else{
				that.ele.removeClass("game_b_ani1");
			}
			//this.ele.addClass(classname);
			// setTimeout(function(){
			// 	that.ele.remove();
			// 	that.parent.isplay = false;
			// },300);	
			setTimeout(function(){
				that.ele.remove();
				that.parent.isplay = false;
			},1000)
		},
		clickFun:function(){
				this.hide("animationbig");
				this.parent.mouse = " ";
		},
		events:function(){
			var that = this;
			this.ele.click(function(){
				if(that.hasclick){
					return false;
				}
				that.hasclick= true;
				if(that.parent.parent.palying){
					that.parent.mouse = " ";
					if(that.type == 1){
						that.ele[0].style.transition="all 0s ease-in 0s";
						that.ele[0].style.webkitTransition="all 0s ease-in 0s";
						that.ele.addClass('game_b1_1');
						that.parent.parent.addScore();
						that.parent.ele2.html("+2");
						document.getElementsByTagName('audio')[0].play();
					}else{
						that.ele[0].style.transition="all 0s ease-in 0s";
						that.ele[0].style.webkitTransition="all 0s ease-in 0s";
						that.ele.addClass('game_b1_boom');
						that.parent.parent.deduct();
						that.parent.ele2.html("-1");
						document.getElementsByTagName('audio')[0].play();
					}
					that.parent.ele2.addClass('socreTextAni');
					setTimeout(function(){
						that.ele[0].style.transition="all 0.3s ease-in 0s";
						that.ele[0].style.webkitTransition="all 0.3s ease-in 0s";
						that.parent.ele2.removeClass('socreTextAni');
						that.parent.ele2.html("");
						that.hide2();

					},500);
				}
			});
		}
	};

	//
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

	var GAMECONTROL = function(gameTime,timeEle,scoreEle){
		this.gameTime = gameTime||20000; //20s
		this.score = 0;
		this.scoreEle = scoreEle;
		this.timeEle = timeEle;
	};
	GAMECONTROL.prototype = {
		countdown:function(){
			var that = this;
			this.scoreEle.html(0);
			this.countdownFun = setInterval(function(){
				if(that.gameTime==0){
					//clearInterval(that.countdownFun);
					//that.timeout();
					//that.timeEle.html("时间到");
					return false;
				}else{
					that.gameTime =that.gameTime-1000;
					var timeText = that.gameTime/1000;
					that.timeEle.html(timeText);
				}
			},1000);
		},
		gamestart:function(){
			
		},
		gameend:function(){
			
		},
		// timeout:function(){
		// 	$(".start").show();
		// 	$(".start").html("重新开始");
		// 	this.gameTime = 20000;
		// 	this.timeEle.html("时间到");
		// 	this.score = 0;
		// },
		gameover:function(){
			clearInterval(this.countdownFun);
			// $(".start").show();
			// $(".start").html("重新开始");
			this.timeEle.html("0");
			if(this.score>=_score){
				_cjs_num =3;
				game_mask.tem1();
			}else{
				game_mask.tem2();
			}
			// this.gameTime = 20000;
			// this.score = 0;
		},
		events:function(){
			
		},
		addScore:function(){
			this.score+=2;
			this.scoreEle.html(this.score);
		},
		deduct:function(){
			this.score-=1;
			if(this.score<0){
				this.score = 0;
			}
			this.scoreEle.html(this.score);
		}
	};
	// window.MOUSEhit  = MOUSEhit;
	// window.GAMECONTROL  = GAMECONTROL;

	var control = new GAMECONTROL(10000,$(".countdown"),$(".score"));
	var mousehitGame = new MOUSEhit($("#mouseGame"),550,control,10000);
	window.mousehitGame = mousehitGame;
	window.gamecontrol = control;
})();

// var control = new GAMECONTROL(20000,$(".countdown"),$(".score"));
// var mousehitGame = new MOUSEhit($(".gameStage"),600,control);



// $(".start").click(function(){
// 	mousehitGame.start();
// 	$(this).hide();
// });






