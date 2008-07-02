// LIST_script.js
// for listing pages according to browser compatibility

var pages = new Array("math","image","colorfade","will2","dim_the_lights","stripes","ill-fated","frames","voyeur","grid","reminder","herman",
											"smalltype","fotograf","swear","bricks","colors","kid","this_is","liberty","no","will","nipples","drugs",
											"circles","squares","ht");
var ie = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);

//var ns4 = new Array(1,1,1,1,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,1,1,1);
//"colorfade","will2","dim_the_lights","ill-fated","frames","bricks","will","drugs","circles","squares","ht");
var ns4 = new Array();
for(var i = 0; i < pages.length; i++)
	ns4[i] = 0;

var ns6 = new Array(1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
//"colorfade","will2","dim_the_lights","stripes");


function LIST_print(browser)
{
	var a_start = "<a href=\"";
	var a_middle = "/index.html\" target=\"_parent\">";
	var a_end = "</a><br>";
	var noa_end = "<br>";
	var string = "";
	
	if(browser == "ie")
		browser = ie;
	else if(browser == "ns4")
		browser = ns4;
	else if(browser == "ns6")
		browser = ns6;
	
	for(var i = 0; i < pages.length; i++)
	{
		if(browser[i])
			string += a_start + pages[i] + a_middle + pages[i] + a_end;
		else if(!browser[i])
			string += pages[i] + noa_end;
	}
	
	return string;
}

function upgrade()
{
	var ie4ns4 = false;
	if(document.layers || document.all)
		ie4ns4 = true;
	if(document.getElementById)
		ie4ns4 = false;
	if(ie4ns4)
		window.parent.location = "http://www.webstandards.org/upgrade/";
}