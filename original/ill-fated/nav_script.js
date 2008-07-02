var Xoff,Yoff;
var moving = false;
var moveObj = null;

var ns_left, ns_right, ns_top, ns_bottom;

function nav_init()
{
	if(document.layers)
		document.captureEvents(Event.MOUSEDOWN | Event.MOUSEMOVE | Event.MOUSEUP);
	document.onmousedown = nav_depress;
	document.onmousemove = nav_move;
	document.onmouseup = nav_release;
}

function nav_depress(ev)
{
	nav_findhandle(ev);
	if(moveObj)
	{
		moving = true;
		if(document.all)
		{
			Xoff = window.event.offsetX;
			Yoff = window.event.offsetY;
		}
		else if(document.layers)
		{
			Xoff = ev.pageX - moveObj.left;
			Yoff = ev.pageY - moveObj.top;
		}
	}
	return false;
}

function nav_move(ev)
{
	if(moving)
	{
		if(document.all)
			nav_move_to(moveObj, (window.event.clientX - Xoff), (window.event.clientY + Yoff));
			
		else if(document.layers)
			nav_move_to(moveObj, ev.pageX - Xoff, ev.pageY - Yoff);
	}
	return false;
}

function nav_move_to(obj,x,y)
{
	if(x <= 10)
		x = 0;
	if(y <= 24)
		y = 14;
	if(document.all)
	{
		obj.style.left = x;
		obj.style.top = y;
	}
	
	else if(document.layers)
	{
		obj.moveTo(x,y);
		//alert(obj.left);
	}
}

function nav_release(ev)
{
	moving = false;
	moveObj = null;
	return;
}

function nav_findhandle(ev)
{
	var el;
	if(document.layers)
	{
		nav_getcoords();
		var eventX = ev.pageX;
		var eventY = ev.pageY;
		
		//alert(ns_left + " " + ns_right + " " + ns_top + " " + ns_bottom);
		//alert(ev.pageX + " " + ev.pageY);
		
		if(eventY >= ns_top && eventY <= ns_bottom && eventX >= ns_left && eventX <= ns_right)
		{ // user has the handle!
			moveObj = document.layers["nav"];
			return;
		}
	}
	
	else if(document.all)
	{
		el = window.event.srcElement;
		
		if(el.tagName == "BODY")  // if they click on the body of the document, do nothing.
		{
			moveObj = false;
			return;
		}
		
		while(el.className != "handle" && el.tagName != "BODY") // cycle through elements until there are none left
		{
			el = el.parentElement;
		}
				
		if(el.className == "handle")
		{
			while(el.className != "navigation")
				el = el.parentElement;
			
			moveObj = el; // set moveObj to "navigate" if you have found the "handle"
			return;
		}
					
		else
		{
			moveObj = false;
			return;
		}		
	}
}

function nav_getcoords()
{
	ns_left = parseInt(document.layers["nav"].left);
	ns_right = ns_left + 194;
	
	ns_top = parseInt(document.layers["nav"].top) - 14;
	ns_bottom = ns_top + 14;
	//alert(document.layers["nav"].left);
}

/********************************************************************************************
*********************************************************************************************
*********************************************************************************************
*********************************************************************************************
*********************************************************************************************
*********************************************************************************************
*********************************************************************************************
*********************************************************************************************
/*******************************************************************************************/
var nav_list = new Array("replace","about","ht","squares","circles","greyman","drugs","nipples","will","no","liberty",
			"this_is","kid","colors","bricks","swear","fotograf","smalltype","herman","reminder","grid",
			"voyeur","frames");
function nav_swap(which,state)
{

}