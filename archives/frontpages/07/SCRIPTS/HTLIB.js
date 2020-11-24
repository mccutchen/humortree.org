// HTLIB version 3.0
// a new approach, inspired by youngpup.net

var HTLIB = {

	isIE : (document.all),
	isNS4 : (document.layers),
	isDOM : (document.getElementById),
	isNS6 : null,
	isOld : null,
	
	xResolution : parseInt (screen.width),
	yResolution : parseInt (screen.height),
	
	// called by HTLIB itself, to do some initialization
	init : function () {
		var ua = navigator.userAgent.toLowerCase ();
		HTLIB.isNS6 = (ua.indexOf ("gecko") != -1);
		HTLIB.isOld = (!HTLIB.isIE && !HTLIB.isNS4 && !HTLIB.isNS6 && !HTLIB.isDOM);
	},
	
	getObject : function (id) {
		var tempObj = false;
		if (HTLIB.isDOM) tempObj = document.getElementById (id);
		else if (HTLIB.isIE) tempObj = document.all[id];
		else if (HTLIB.isNS4) tempObj = document.layers[id];
		return (tempObj) ? tempObj : false;
	},
	
	getStyleObject : function (id) {
		var tempObj = false;
		if (!HTLIB.isDOM) tempObj = document.getElementById (id).style;
		else if (HTLIB.isIE) tempObj = document.all[id].style;
		else if (HTLIB.isNS4) tempObj = document.layers[id];
		return (tempObj) ? tempObj : false;
	},
	
	moveTo : function (obj, x, y) {
		if (HTLIB.isNS4) obj.moveTo (x, y);
		else if (!HTLIB.isOld) {
			obj.style.left = x + "px";
			obj.style.top = x + "px";
		}
	},
	
	setStyle : function (obj, selector, property) {
		tempObj = (HTLIB.isDOM || HTLIB.isIE) ? eval ("obj.style") : (HTLIB.isNS4) ? obj : false;
		eval ((tempObj) ? "tempObj." + selector + "=\"" + property + "\";" : null);
	},
	
	getWidth : function (obj) { return (obj.offsetWidth) ? parseInt (obj.offsetWidth) : false; },
	getHeight : function (obj) { return (obj.offsetHeight) ? parseInt (obj.offsetHeight) : false; }
	
};

HTLIB.init ();