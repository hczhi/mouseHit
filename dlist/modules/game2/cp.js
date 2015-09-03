var _w = $(window).width();
var _h = $(window).height();
var _newH = 1136*_w/640;
document.body.style.zoom = document.body.clientWidth / 320;
var _zoom = document.body.style.zoom;
$(".cp_box").css({"height":_newH/_zoom,"width":_w/_zoom});
var _ww = (_newH/_zoom)*1920/1136;
$(".cp_bg").css({"height":_newH/_zoom,"width":_ww});
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
progressFun(['m8.jpg','m7.jpg','m6.jpg','m5.jpg','m4.jpg','m3.jpg','m2.jpg','m1.jpg','cp.jpg'],function(){
	$(".gamebox").hide();
	$(".cp_box").show();
});
$(".cp_box span").each(function(){
	$(this).click(function(){
		var _cnt = $(this).attr("num");
		$(".cp_pic img").attr({"src":"css/images//m"+_cnt+".jpg"});
		$(".cp_pic").show();

	});
});
$(".cp_pic span").click(function(){
	$(".cp_pic").hide();
});