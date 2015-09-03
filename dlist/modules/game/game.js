(function(){
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
			this.createStage();
		},
		addScore:function(){
			this.control.addScore();
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
		createStage:function(){
			var i = 0,len = 9 ;
			var box_w = _gw*0.3;
			for(i;i<len;i++){
				var b = new MOUSEbox(this,i);
				this.boxARRY.push(b);
				var left = i%3*box_w,
					top = Math.floor(i/3)*box_w;
				b.ele.css({'left':left+"px",'top':top+"px","width":box_w+"px","height":box_w+"px"});
			}
		},
		bits:function(){
			var that = this;
			this.bitsinterval = setInterval(function(){
				function getNum(){
					var len = that.boxARRY.length;
					var num = Math.floor(Math.random()*len);
					if(that.boxARRY[num].isplay){
						getNum();
					}else{
						that.boxARRY[num].showmouse();
					}
				}
				var randomNum = (Math.random()>0.3)?true:false;
			 	if(randomNum){
			 		getNum();
			 	}
			},this.bit);
		}
	};
	var MOUSEbox = function(parent,index){
		this.stage = parent.stage;
		this.parent = parent;
		this.index = index;
		this.isplay = false;
		this.init();
	};
	MOUSEbox.prototype = {
		init:function(){
			this.create();
		},
		create:function(){
			this.ele = $("<div />");
			this.ele.addClass("mouse_box");
			this.stage.append(this.ele);
		},
		showmouse:function(){
			this.ele.html("");
			var randomnum = (Math.random()>0.6)?2:1; //比例
			this.mouse =new MOUSE(randomnum,this);
			this.isplay = true;
			var that = this;
			setTimeout(function(){
				if(that.mouse!=" "){
					that.mouse.hide("animationSmall");
					that.mouse = " ";
				}
			},700);
		}
	};
	var MOUSE = function(type,parent){
		this.type = type || 1;
		this.parent = parent;
		this.init();
	};
	MOUSE.prototype = {
		init:function(){
			this.create();
			this.events();
		},
		create:function(){
			this.ele = $("<div />");
			if(this.type == 1){
				this.ele.addClass("mouse");
			}else{
				this.ele.addClass("mouse2");
			}
			this.parent.ele.append(this.ele);
		},
		hide:function(classname){
			var that = this;
			this.ele.addClass(classname);
			setTimeout(function(){
				that.ele.remove();
				that.parent.isplay = false;
			},300);
		},
		clickFun:function(){
				this.hide("animationbig");
				this.parent.mouse = " ";
		},
		events:function(){
			var that = this;
			this.ele.click(function(){
				if(that.parent.parent.palying){
					if(that.type == 1){
						that.hide("animationbig");
						that.parent.mouse = " ";
						that.parent.parent.addScore();
					}else{
						that.parent.parent.gameover();
					}
				}
			});
		}
	};
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
					that.gameTime =that.gameTime-100;
					var timeText = (that.gameTime/1000%1 == 0)?that.gameTime/1000+".0":that.gameTime/1000;
					that.timeEle.html(timeText+"s");
				}
			},100);
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
			$(".start").show();
			$(".start").html("重新开始");
			this.timeEle.html("游戏结束");
			this.gameTime = 20000;
			this.score = 0;
		},
		events:function(){
			
		},
		addScore:function(){
			this.score++;
			this.scoreEle.html(this.score);
		}
	};
	window.MOUSEhit  = MOUSEhit;
	window.GAMECONTROL  = GAMECONTROL;
})();

var control = new GAMECONTROL(20000,$(".countdown"),$(".score"));
var mousehitGame = new MOUSEhit($(".gameStage"),600,control);


$(".start").click(function(){
	mousehitGame.start();
	$(this).hide();
});






