
// global variables...
var Xoff,Yoff;
var over = false;
var lastX,lastY = null;

var ns_left, ns_right, ns_top, ns_bottom; // netscape specific variables

function move_init() // changed to move_init() to accomodate new navigation system
{
	// set mouse capturing
	if(document.layers)
		document.captureEvents(Event.MOUSEMOVE);
	document.onmousemove = movement;
}

function movement(ev)
{
	findbox(ev);
	if(document.all)
	{
		Xoff = window.event.offsetX;
		Yoff = window.event.offsetY;
		lastX = moveObj.style.left; // store current x and y positions before jumping to next position
		lastY = moveObj.style.top; //
	}
	else if(document.layers)
	{
		Xoff = ev.pageX - moveObj.left;
		Yoff = ev.pageY - moveObj.top;
		lastX = moveObj.left;
		lastY = moveObj.top;
	}
	
	return false;
}

function findbox(ev)
{
	var el;
	if(document.layers)
	{
		nav_getcoords(); // getcoords() finds the coordinates of the box that makes up the handle,
										 // and stores them in global variables
		var eventX = ev.pageX;
		var eventY = ev.pageY;
			
		if(eventY >= ns_top && eventY <= ns_bottom && eventX >= ns_left && eventX <= ns_right)
		{ // user has clicked inside the coordinates of the handle
			moveObj = document.layers["nav"]; //set moveObj
			return;
		}
	}
	
	else if(document.all)
	{
		el = window.event.srcElement;
		
		if(el.tagName == "BODY")  // if they click on the body of the document, do nothing.
		{
			over = false;
			return;
		}
		
		while(el.className != "handle" && el.tagName != "BODY") // cycle through elements until there are none left
		{
			el = el.parentElement;
		}
				
		if(el.className == "handle")
		{
			while(el.className != "navigation") // if user clicked on handle, cycle up through elements until you reach "navigation"
				el = el.parentElement;
			
			moveObj = el; // set moveObj
			return;
		}
					
		else // handle was not clicked on
		{
			moveObj = false;
			return;
		}		
	}
}

function nav_getcoords()
{
	// this is a netscape function, to find the box that the handle makes up
	// and store the box's top, bottom, left, and right coords and store them
	// in global variables
	ns_left = parseInt(document.layers["nav"].left);
	ns_right = ns_left + 194;
	
	ns_top = parseInt(document.layers["nav"].top) - 14;
	ns_bottom = ns_top + 14;
	return;
}
