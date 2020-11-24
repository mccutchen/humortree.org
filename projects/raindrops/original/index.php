<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<title>R-a-i-n-d-r-o-p-s rolling down a window</title>
	<style>
		BODY {
			background-color: #eee;
			margin: 10px;
		}
		SPAN {
			font: 11px tahoma;
		}
		DIV.container {
			background-color: white;
			border: 1px solid #ccc;
			font: 11px tahoma, verdana, arial, sans-serif;
			color: #999;
		}
		DIV#explanation {
			position: absolute;
			top: 10px;
			left: 520px;
			padding:10px;
		}
		DIV#choose {
			padding:10px;
		}
		.input {
			border: 1px solid #ccc;
			background-color: #eee;
			font: 11px tahoma, verdana, arial, sans-serif;
			color: #999;
			width: 20px;
		}
		.button {
			border: 2px solid #999;
			background-color: #ccc;
			font: 11px tahoma, verdana, arial, sans-serif;
			color: #666;
			margin-top:5px;
		}
		a:link, a:visited, a {
			color: #666;
			text-decoration: none;
		}
		a:hover, a:active {
			color: #3399ff;
			text-decoration: underline;
		}
		.dropLarge {
			padding-right: 10px;
			padding-bottom: 10px;
		}
	</style>
	<script type="text/javascript" src="HTLIB.js"></script>
	<script type="text/javascript" src="raindrops.js"></script>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta http-equiv= "pragma" CONTENT="no-cache">
</head>

<body bgcolor="white" onload="init();">

<div id="surface" class="container" style="position:absolute; top:10px; left:10px; height:500px; width:500px; overflow:hidden;">
	<?php
		if (isset ($_GET['drops'])) {
			for ($i = 0; $i < $_GET['drops']; $i++) {
	?>
	<div class="drop" style="position:absolute; top:-20px; left:-20px; padding:0px; margin:0px;"><img src="drop_center.gif" alt=""></div>
	<?php
			}
	?>
	<div class="choose" style="position:absolute; bottom:0px; right:10px;">
		<form action="index.php" method="GET">
			<input type="text" class="input" name="drops" value="10">
			<img src="drop_left.gif" alt="raindrops"><img src="drop_center.gif" alt="raindrops"><img src="drop_right.gif" alt="raindrops">
			<input type="submit" class="button" value="restart">
		</form>
	</div>
	<?php
		}
		else {
	?>
		<div id="choose">
			<strong>How Much Rain?</strong>
			<br>
			<br>
			<br>
			Because this experiment is very processor intensive, you get to decide
			how many raindrops you would like to see at once.
			<br>
			<br>
			I'm using an 800Mhz PIIIEB processor and Windows 2000.
			<br>
			<br>
			<strong>Using IE 5/6:</strong> With 10 raindrops,
			the processor load is ~2%.  With 15, processor load is ~50%, and with 20, it's all
			the way up to 100%.  Hopefully, that helps.
			<br>
			<br>
			<strong>Using Netscape 6/Mozilla 0.94</strong> With 1 raindrop,
			the processor load is ~1%.  With 2, processor load is ~15%, and with 3 or more the processor
			load is all the way up to 100%.
			<br><br>
			<form action="index.php" method="GET">
				<input type="text" class="input" name="drops" value="10">
				<img src="drop_left.gif" alt="raindrops"><img src="drop_center.gif" alt="raindrops"><img src="drop_right.gif" alt="raindrops">
				<input type="submit" class="button" value="let it pour">
			</form>
		</div>
	<?
		}
	?>
</div>

<div id="explanation" class="container">
	<strong>RAINDROPS - organic motion #2</strong>
	<br>
	<br>
	<br>
	<img src="drop_center.gif" height="120" width="60" alt="splash" align="left" class="dropLarge">This is another experiment that attempts to simulate Organic Motion,
	much like "<a href="../organic01/">organic01</a>."  This one, however, tries to simulate raindrops
	rolling down a surface, like a window.<br><br>
	The whole thing is based on sine waves.  Each "raindrop" is started
	at a random place on the "surface" to the left, and runs down it,
	with its horizontal position dictated by an equation for a sine
	wave.  The equation is different for each raindrop.  Also, for
	each raindrop, the equation is changed after it has run through
	one whole period (the period of the equation <strong>y&nbsp;=&nbsp;sin&nbsp;x</strong>
	is 2PI).<br><br>
	I don't know how much sense that made.<br><br>
	This is <strong>very</strong> processor intensive, so your computer
	may get quite sluggish while looking at this.  This is the reason
	that I am letting you decide how many raindrops to look at, to the
	left.<br><br>
	It looks very nice on Windows NT/2000, and might look decent on a Mac.
	If you happen to be using Windows 9x/ME, just imagine that the raindrops
	are all rolling smoothly down the surface to the left, instead of skipping
	slowly down it.
	<br>
	<br>
	<br>
	<br>
	<strong>&laquo; <a href="../../">back to Humor Tree</a></strong>
</div>

</body>
</html>
