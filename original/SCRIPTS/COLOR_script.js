var COLOR_colors = new Array("00","33","66","99","cc","ff");

var COLOR_rr = 0;
var COLOR_gg = 0;
var COLOR_bb = 0;


function COLOR_makeColor()
{
	var colorString = "#";
	
	var rr = COLOR_colors[Math.floor(Math.random() * COLOR_colors.length)];
	var gg = COLOR_colors[Math.floor(Math.random() * COLOR_colors.length)];
	var bb = COLOR_colors[Math.floor(Math.random() * COLOR_colors.length)];
			
	colorString = colorString + rr + gg + bb;				
	return colorString;
}

function COLOR_randomBG(delay)
{
	document.bgColor = COLOR_makeColor();
	setTimeout("COLOR_randomBG(" + delay + ");",delay);
}


function COLOR_bgFade(delay)
{
	
	if(COLOR_rr <= 5)
	{	
		var thisColor = "#" + COLOR_colors[COLOR_rr] + COLOR_colors[COLOR_gg] + COLOR_colors[COLOR_bb];
		document.bgColor = thisColor;
		
		if(COLOR_bb < COLOR_colors.length)
			COLOR_bb++;
		
		if(COLOR_bb >= COLOR_colors.length)
		{
			COLOR_bb = 0;
			COLOR_gg++;
		}
		
		if(COLOR_gg >= COLOR_colors.length)
		{
			COLOR_gg = 0;
			COLOR_rr++;
		}
	}
	else
	{
		COLOR_rr = 0;
		COLOR_gg = 0;
		COLOR_bb = 0;
	}
	
	setTimeout("COLOR_bgFade(" + delay + ");",delay);
}