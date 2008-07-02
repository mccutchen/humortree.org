///////////////////////////////////////////////
//
//           HTLIB.js
//
// Humor Tree Javascript Library
//
// version 1.0 - 02/16/01
//
// Copyright © 1981 - 2001 Will McCutchen
//
// feel free to use and abuse this
// home-made javascript library.  If
// you do use it, send me some thanks
// or some hate mail.  Or questions.
//
// this is not a very large library.  it
// just covers some of the basic things
// that i use over and over and over in
// making dhtml-heavy websites, so i
// thought i'd put it all in one handy
// file.  i'm watching out for those damn
// repetetive-stress injuries.
//
// hopefully, this library will grow and
// or continue to be improved as time
// passes and i get smarter.
//
// documentation will be spread throughout
// this file, as needed. note that in the
// comments, anything represented with
// brackets ( [yourValue], for example )
// means that whatever is in the brackets
// is up to either the function or you.
//
// use responsibly.
//
//
// will mccutchen
//
// will@humortree.org
//
///////////////////////////////////////////////



/*********************************************************************************************************/
/*********************************************************************************************************/
/*             NOTE: HT_init() MUST be called before you use any HTLIB values or functions               */
/*********************************************************************************************************/
/*********************************************************************************************************/


// global variables
//
// these are available to scripts that are
// local to the html document that calls on
// this javascript file, too.

// variables that are either true or false, depending on user's browser
var isIE = (document.all) ? true : false;
var isNS4 = (document.layers) ? true : false;
var isNS6 = (document.getElementById && !isIE) ? true : false;

// variables containing the user's screen height and width as
// real numbers, not just strings, so they can be compared to other
// numbers with no extra work.
//
// will be set by HT_init();
var HT_screenWidth;
var HT_screenHeight;


// variables to be used by functions inside HTLIB.js, you don't
// need to worry about these.
// 
// set by HT_init();
var HT_getElementById_pre = "";
var HT_getElementById_post = "";
var HT_getElementByIndex_pre = "";
var HT_getElementByIndex_post = "";




// HTLIB functions
// 
// syntax:
// all function names begin with prefix "HT_"
// all function names use internal capitalization

function HT_getObject(what)
{
	// HT_getObject
	//
	// 'what' must be either the index or the ID of an
	// absolutely positioned div or layer tag.
	// 
	// returns an object that can be manipulated like so: [returnedObject].left = [yourValue]
	//                                                or: [returnedObject].fontColor = [yourValue]
	//                                                or: any other CSS property/value combo
	//
	// this function is used by the other HTLIB
	// functions... you will probably not ever
	// need to use it.
	
	var HT_tempObj;
	
	if(isNaN(what)) // 'what' is not a number
		HT_tempObj = eval(HT_getElementById_pre + what + HT_getElementById_post);
	else // 'what' is a number
		HT_tempObj = eval(HT_getElementByIndex_pre + what + HT_getElementByIndex_post);
	
	return HT_tempObj;
}


function HT_moveTo(what,x,y)
{
	// HT_moveTo
	//
	// 'what' must be either the index or the ID of an
	// absolutely positioned div or layer tag.
	//
	// 'x' and 'y' are the x- and y-coordinates you
	// want 'what' moved to.
	// 
	// moves 'what' div to coordinates 'x' and 'y'
	
	var HT_tempObj = HT_getObject(what); // get object to move
	
	if(isNS4)
		HT_tempObj.moveTo(x,y);
	else if(isIE || isNS6)
	{
		HT_tempObj.left = x;
		HT_tempObj.top = y;
	}
	return;
}


function HT_randomColor()
{
	// HT_randomColor
	//
	// returns a random web-safe color in hexadecimal
	// form, like so: #ffcc00 or #aa99ff
	
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
	// HT_randomNumber
	//
	// returns a random number between
	// 'high' and 'low'
	
	return Math.floor(Math.random() * high) + low;
}


function HT_init()
{
	// initialization function... needs to be called by your
	// web page before you can use any of the HTLIB values
	// and/or functions...
	
	// the following series of if-else statements just
	// fill up the HTLIB global variables based on which
	// browser the user is looking through...
	if (isIE)
	{
		HT_getElementById_pre = "document.all['";
		HT_getElementById_post = "'].style";
		
		HT_getElementByIndex_pre = "document.all.tags('div')[";
		HT_getElementByIndex_post = "].style";
		
		HT_screenWidth = parseInt(document.body.clientWidth);
		HT_screenHeight = parseInt(document.body.clientHeight);
	}
	else if (isNS4)
	{
		HT_getElementById_pre = "document.layers['";
		HT_getElementById_post = "']";
		
		HT_getElementByIndex_pre = "document.layers[";
		HT_getElementByIndex_post = "]";
		
		HT_screenWidth = parseInt(screen.availWidth);
		HT_screenHeight = parseInt(screen.availHeight);
	}
	else if (isNS6)
	{
		HT_getElementById_pre = "document.getElementById(\"";
		HT_getElementById_post = "\").style";
		
		HT_getElementByIndex_pre = "document.getElementsByTagName(\"div\")[";
		HT_getElementByIndex_post = "].style";
		
		HT_screenWidth = parseInt(screen.availWidth);
		HT_screenHeight = parseInt(screen.availHeight);
	}
}

