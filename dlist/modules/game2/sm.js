	var _w = $(window).width();
	var _h = $(window).height();
	var _newH = 1136*_w/640;
	document.body.style.zoom = document.body.clientWidth / 320;
	var _zoom = document.body.style.zoom;
	$(".smbox").css({"width":_w/_zoom});
	$("body").css({'background':"#fefbfc"});
	$(".c_box").css({"height":_newH/_zoom,"width":_w/_zoom});