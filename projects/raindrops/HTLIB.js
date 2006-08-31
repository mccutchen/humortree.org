// HTLIB.js version 2.0
// Copyright © 1981 - 2001 Will McCutchen

// browser information
var useragent = navigator.userAgent.toLowerCase ();
var isIE = (document.all);
var isNS4 = (document.layers);
var isNS6 = (useragent.indexOf ("gecko") != -1);
var isDOM = (document.getElementById);
var isOLD = (!isIE && !isNS4 && !isNS6 && !isDOM);

// HTLIB global variables
var HT_screenWidth = parseInt(screen.availWidth);
var HT_screenHeight = parseInt(screen.availHeight);
var HT_getElementById_pre = "";
var HT_getElementById_post = "";
var HT_getElementByIndex_pre = "";
var HT_getElementByIndex_post = "";
var HT_styleSelector = "";
var HTlayerObjectIndex = 0;
var HTlayers = new Array ();
var HTlayersByID = new Array ();
var HTLIB = true;

if (isDOM) {
	HT_getElementById_pre = "document.getElementById(\"";
	HT_getElementById_post = "\")";
	HT_getElementByIndex_pre = "document.getElementsByTagName(\"div\")[";
	HT_getElementByIndex_post = "]";
	HT_styleSelector = ".style";
}
else if (isIE) {
	HT_getElementById_pre = "document.all['";
	HT_getElementById_post = "']";
	HT_getElementByIndex_pre = "document.all.tags('div')[";
	HT_getElementByIndex_post = "]";
	HT_styleSelector = ".style";
}
else if (isNS4) {
	HT_getElementById_pre = "document.layers['";
	HT_getElementById_post = "']";
	HT_getElementByIndex_pre = "document.layers[";
	HT_getElementByIndex_post = "]";
	HT_styleSelector = "";
}
else HTLIB = false;
	

function HTlayer (x) {
	// properties
	this.id = x;
	this.style = HT_getStyleObject (x);
	this.object = HT_getObject (x);
	this.index = HTlayerObjectIndex;
	HTlayers[this.index] = this;
	HTlayersByID[this.id] = this;
	HTlayerObjectIndex++;
	this.string = "HTlayers[" + this.index + "]"; // useful for writing methods for the HTlayer object that use setTimeout ()
	
	// method declarations
	this.moveTo = moveTo;
	this.getLeft = getLeft;
	this.getTop = getTop;
	this.getHeight = getHeight;
	this.getWidth = getWidth;
	this.hide = hide;
	this.show = show;
	
	// methods
	function moveTo (x, y) {
		if (this.style) {
			if (isNS4) this.object.moveTo (x, y);
			else {
				this.style.left = x + "px";
				this.style.top = y + "px";
			}
			return true;
		}
		else return false;
	}
	function getLeft () {
		if (this.style.left) return parseInt (this.style.left);
		else return false;
	}
	function getTop () {
		if (this.style.top) return parseInt (this.style.top);
		else return false;
	}
	function getHeight () {
		if (this.object.offsetHeight) return parseInt (this.object.offsetHeight);
		else return false;
	}
	function getWidth () {
		if (this.object.offsetWidth) return parseInt (this.object.offsetWidth);
		else return false;
	}
	function hide (method) {
		if (this.style) {
			if (!method) method = "v";
			method = method.toLowerCase ();
			if (method == "v" || isNS4) this.style.visibility = "hidden";
			else if (method == "d") this.style.display = "none";
			return true;
		}
		else return false;
	}
	function show (method) {
		if (this.style) {
			if (!method) method = "v";
			method = method.toLowerCase ();
			if (method == "v" || isNS4) this.style.visibility = "visible";
			else if (method == "d") {
				if (this.style.position == "absolute") this.style.display = "block";
				else this.style.display = "inline";
			}
			return true;
		}
		else return false;
	}
}

function HT_getObject(what) {
	var HT_tempObj = false;
	if(isNaN(what)) HT_tempObj = eval(HT_getElementById_pre + what + HT_getElementById_post);
	else HT_tempObj = eval(HT_getElementByIndex_pre + what + HT_getElementByIndex_post);
	if (HT_tempObj) return HT_tempObj;
	else return false;
}
function HT_getStyleObject(what) {
	var HT_tempObj = HT_getObject (what);
	var HT_tempObj = eval ("HT_tempObj" + HT_styleSelector);
	if (HT_tempObj) return HT_tempObj;
	else return false;
}