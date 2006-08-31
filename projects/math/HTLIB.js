// HTLIB.js version 1.2 
// Copyright © 1981 - 2001 Will McCutchen -- will@humortree.org
// reference: http://www.humortree.org/LAB/HTLIB/



  

var isIE = (document.all) ? true : false;
var isNS4 = (document.layers) ? true : false;
var isNS6 = (document.getElementById && !isIE) ? true : false;
var isDOM = (document.getElementById) ? true : false;
var HT_screenWidth;
var HT_screenHeight;
var HT_getElementById_pre = "";
var HT_getElementById_post = "";
var HT_getElementByIndex_pre = "";
var HT_getElementByIndex_post = "";
var HT_styleSelector = "";
var HTLIB = false;

function HT_getObject(what)
{
	var HT_tempObj = false;
	
	if(isNaN(what))
		HT_tempObj = eval(HT_getElementById_pre + what + HT_getElementById_post);
	else
		HT_tempObj = eval(HT_getElementByIndex_pre + what + HT_getElementByIndex_post);
	
	if (HT_tempObj)
		return HT_tempObj;
	else 
		return false;
}

function HT_getStyleObject(what)
{
	var HT_tempObj = false;
	if(isNaN(what))
		HT_tempObj = eval(HT_getElementById_pre + what + HT_getElementById_post + HT_styleSelector);
	else
		HT_tempObj = eval(HT_getElementByIndex_pre + what + HT_getElementByIndex_post + HT_styleSelector);
		
	if (HT_tempObj)
		return HT_tempObj;
	else 
		return false;
}

function HT_moveTo(obj,x,y)
{
	var HT_tempObj = HT_getObject(obj);
	if(isNS4)
		HT_tempObj.moveTo(x,y);
	else if(isIE || isNS6)
	{
		HT_tempObj.style.left = x + "px";
		HT_tempObj.style.top = y + "px";
	}
	return;
}

function HT_show(what, dv)
{
	dv = dv.toLowerCase();
	var HT_tempObj = HT_getStyleObject(what);
	if (dv == "v")
		HT_tempObj.visibility = "visible";
	else if (dv == "d")
		HT_tempObj.display = "block";
}

function HT_hide(what, dv)
{
	dv = dv.toLowerCase();
	var HT_tempObj = HT_getStyleObject(what);
	if (dv == "v")
		HT_tempObj.visibility = "hidden";
	else if (dv == "d")
		HT_tempObj.display = "none";
}

function HT_randomColor()
{
	var HT_colors = new Array("00","33","66","99","cc","ff");
	var colorString = "#";
	var rr = HT_colors[Math.floor(Math.random() * HT_colors.length)];
	var gg = HT_colors[Math.floor(Math.random() * HT_colors.length)];
	var bb = HT_colors[Math.floor(Math.random() * HT_colors.length)];
	colorString += rr + gg + bb;				
	return colorString;
}


function HT_randomNumber(low,high)
{
	return Math.floor(Math.random() * high) + low;
}

function HT_init()
{
	if (isIE)
	{
		HT_getElementById_pre = "document.all['";
		HT_getElementById_post = "']";
		HT_getElementByIndex_pre = "document.all.tags('div')[";
		HT_getElementByIndex_post = "]";
		HT_styleSelector = ".style";
	}
	else if (isNS4)
	{
		HT_getElementById_pre = "document.layers['";
		HT_getElementById_post = "']";
		HT_getElementByIndex_pre = "document.layers[";
		HT_getElementByIndex_post = "]";
		HT_styleSelector = "";
	}
	else if (isNS6)
	{
		HT_getElementById_pre = "document.getElementById(\"";
		HT_getElementById_post = "\")";
		HT_getElementByIndex_pre = "document.getElementsByTagName(\"div\")[";
		HT_getElementByIndex_post = "]";
		HT_styleSelector = ".style";
	}
	HT_screenWidth = parseInt(screen.availWidth);
	HT_screenHeight = parseInt(screen.availHeight);
	HTLIB = true;
}