<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<title> </title>
	
	<script type="text/javascript" language="javascript" src="HTLIB_optimized.js">
	</script>
	
	<script language="javascript" type="text/javascript">
		
		hexa = new makearray(16);
    
		for(var i = 0; i < 10; i++) hexa[i] = i;
    hexa[10]="a"; hexa[11]="b"; hexa[12]="c";
    hexa[13]="d"; hexa[14]="e"; hexa[15]="f";
		
		var fadeObjectArray = new Array();
		var fadeObjectIndex = 0;
		
		var countArray = new Array();
		var step = 255;
		
		var total;
		
		var startColors = new Array();
		var endColors = new Array(51,51,51);
		var goingArray = new Array();
		
		function makearray(n)
		{
      this.length = n;
      for(var i = 1; i <= n; i++)
      this[i] = 0;
      return this;
    }
    
		function hex(i)
		{
			if (i < 0) return "00";
      else if (i >255) return "ff";
      else return "" + hexa[Math.floor(i/16)] + hexa[i%16];
    }
    
		function setbgColor(r, g, b, which)
		{	
      var hr = hex(r); 
			var hg = hex(g);
			var hb = hex(b);
			var theObj = HT_getStyleObject(which);
			
			theObj.backgroundColor = "#"+hr+hg+hb;
			return true;
		}
    function fade(which)
		{
			if(countArray[which] <= step)
			{
				setbgColor(Math.floor(startColors[which][0] * ((step-countArray[which])/step) + endColors[0] * (countArray[which]/step)),
									 Math.floor(startColors[which][1] * ((step-countArray[which])/step) + endColors[1] * (countArray[which]/step)),
									 Math.floor(startColors[which][2] * ((step-countArray[which])/step) + endColors[2] * (countArray[which]/step)),
									 which);
				countArray[which]++;
				setTimeout("fade(" + which + ");",10);
			}
			else
			{
				countArray[which] = 0;
				goingArray[which] = false;
			}
    }
		
		function randomColor()
		{
			var arr = new Array();
			arr[0] = Math.floor(Math.random() * 255);
			arr[1] = Math.floor(Math.random() * 255);
			arr[2] = Math.floor(Math.random() * 255);
			return arr;			
		}
		
		function startFade(which)
		{
			if(goingArray[which])
				return true;
			else
			{
				startColors[which] = randomColor();
				goingArray[which] = true;
				fade(which);
			}
			return true;
		}
		
		function init()
		{
			total = document.getElementsByTagName("div").length - 1;
			for(var i = 1; i <= total; i++)
			{
				startColors[i] = new Array(0,0,0);
				countArray[i] = 0;
				goingArray[i] = false;
			}
		}
	</script>
	
	<style type="text/css">
		a:link, a:visited
		{
			color:#333333;
			text-decoration:underline;
		}
		a:hover,a:active
		{
			color:#333333;
			text-decoration:none;
			background-color:#333333;
		}
	</style>
	<meta http-equiv= "pragma" CONTENT="no-cache">
	<meta name="ROBOTS" content="ALL">
	<meta name="DESCRIPTION" content="">
	<meta name="KEYWORDS" content="">
	<meta name="AUTHOR" content="will mccutchen - will@humortree.org">
	
</head>

<body bgcolor="#cccccc" onload="HT_init(); init();">

<div style="position:absolute; top:100px; left:100px; width:250px;">
<?php

	for($x = 1; $x <= 50; $x++)
	{
?>
	<div style="position:absolute; top:0px; left:<?php echo ($x - 1) * 5?>px; height:100px; width:5px; background-color:#333333;" onmouseover="startFade(<?php echo $x ?>);">
	</div>
<?php
	}
?>
</div>

<div style="position:absolute; top:200px; left:100px; width:250px; background-color:white;">
	<div style="padding:5px; font:11px verdana,arial; color: #333333;">
		<strong>Humor Tree Beauty™</strong>
		<br>
		&nbsp;&nbsp;&nbsp;<strong>Color Fade©</strong> version B
		<br>
		<br>
		Mouse over the gray rectangle above for something nice (after
		you run your mouse across, let the stripes do their thing for a little while).
		<br>
		<br>
		Go slowly for the best effect.  Also, this works better (faster, that is) in
		Internet Explorer 5.5 than Netscape 6.  Not tested in any other browsers.
		<br>
		<br>
		Expect better performance on a Macintosh computer or a computer running Windows NT or 2000.
		<br>
		<br>
		<a href="../../index.html">&lt;- back to humor tree</a>
	</div>
</div>

</body>
</html>
