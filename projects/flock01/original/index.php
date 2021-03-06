<?php
	if(!isset($b)) $b = 10;
	if(!isset($f)) $f = 1;
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<title> </title>
	<script type="text/javascript" src="Utils.js"></script>
	<script type="text/javascript" src="Array.js"></script>
	<script type="text/javascript" src="Point.js"></script>
	<script type="text/javascript" src="Vector.js"></script>
	<script type="text/javascript" src="FlockWorld.js"></script>
	<script type="text/javascript" src="Boid.js"></script>
	<script type="text/javascript" src="Flock.js"></script>
	<script type="text/javascript" src="UI.js"></script>
	<script type="text/javascript">
		var nboids = <?= $b ?>;
		var nflocks = <?= $f ?>;
		
		var b1, b2;
		var f;
		
		function init() {
		
			//alert('init()');
			
			FlockWorld.init('world');
			
			var f, b;
			for(var i = 0; i < nflocks; i++) {
				f = new Flock(i);
				for(var h = 0; h < nboids; h++) {
					b = new Boid(h,f);
					b.create();
					f.add(b);
				}
				FlockWorld.add(f);
			}
		}
	</script>
	
	<link rel="stylesheet" type="text/css" href="flock01.css">
	
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta http-equiv= "pragma" CONTENT="no-cache">
	
</head>

<body onload="init();">

<div id="world" style="position:absolute; top:20px; left:0px; height: 300px; width: 100%;">
	<div id="controls">
		<form>
			Boids:<br><input id="nBoids" name="b" class="text" type="text" value="<?= $b ?>"><br>
			Flocks:<br><input id="nFlocks" name="f" class="text" type="text" value="<?= $f ?>"><br>
			<input id="reload" class="button" type="submit" value="reload">
		</form>
		<form onsubmit="return false;">
			<input id="start" class="button" type="submit" value="start" onclick="return UI.start();"><br>
			<input id="stop" class="button" type="submit" value="stop" onclick="return UI.stop();"><br>
			<input id="step" class="button" type="submit" value="step" onclick="return UI.step();">
		</form>
	</div>
</div>



<div id="explanation">
	<h1>Flock 01&mdash;</h1>
	<h3>a very basic flocking simulation</h3>
	<p>
		I'm pretty disappointed by this.  It is my first attempt to simulate
		flocking behavior.  I got the idea from the work of
		<a href="http://www.cs.toronto.edu/~dt/siggraph97-course/cwr87/" target="_blank">Craig W. Reynolds</a>,
		who invented the concept of 'boids' that fly according to three simple
		rules:
		<ul>
			<li>Collision avoidance: avoid collisions with nearby flockmates</li>
			<li>Velocity matching: attempt to match velocity with nearby flockmates</li>
			<li>Flock Centering: attempt to stay close to nearby flockmates</li>
		</ul>
	</p>
	<p>
		Of these three rules, I've partially implemented two of them.  In the example
		above, the boids try to steer towards the center of the flock, and also try to
		steer in the same direction as their nearby flockmates.  They do not change speed,
		or avoid each other.
	</p>
	<p>
		The behaviors that I have implemented are implemented very
		poorly, so don't expect much from this example.  There will
		be more to follow, for sure.
	</p>
	<p>
		By the way, this is not going to run very well on any system, as far as I can
		tell.  It's way too computationally expensive to be run in a web browser, so
		I will be porting it to Java, where it will do fine.
	</p>
	<p>
		&laquo; <a href="../../">back to Humor Tree</a>
	</p>
	
</div>

</body>
</html>
