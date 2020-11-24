<?php
	$n = (isset ($n)) ? $n : 5;
	$f = (isset ($f)) ? $f : 200;
	$e = (isset ($e)) ? $e : 1.1;
	$r = (isset ($r)) ? $r : 0;
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<title>Humor Tree&nbsp;&nbsp;/&nbsp;&nbsp;Physics 03 (Organic 3)&nbsp;&nbsp;/&nbsp;&nbsp;Chasers</title>
	<script type="text/javascript">	
		var isIE = (document.all && document.getElementById) ? true : false;
		var isNS = (document.getElementById && !document.all) ? true : false;
		
		var physicsModels = new Array ();
		var physicsModelCount = 0;
		var objects = new Array ();
		var rabbits = new Array ();
		
		var physicsDelay = 20;
		var rabbitDelay = 500;
		
		var rabbitTimer = null;
		var physicsTimer = null;
		
		var df = 6;
		var de = 1.3;
		var dr = 10;
		
		var maxx = 0;
		var maxy = 0;
		var minx = 30;
		var miny = 30;
		
		function randomNumber (min, max) { return Math.floor (Math.random () * max) + min; }
		
		function Rabbit () {
			this.next = next;
			this.next ();
			function next () {
				this.x = randomNumber (minx, maxx);
				this.y = randomNumber (miny, maxy);
			}
		}
		
		function PhysicsModel (f, e, r) {
			this.f = f; // friction
			this.e = e; // elasticity
			this.r = (r) ? r : null; // repulsion
			this.vx = 0;
			this.vy = 0;
			this.x = this.y = 0;
			
			this.index = physicsModelCount;
			physicsModels[this.index] = this;
			physicsModelCount++;
			
			this.setPosition = setPosition;
			this.setV = setV;
			
			function setPosition (x, y) {
				this.x = x;
				this.y = y;
			}
			function setV () {
				var dx = rabbits[this.index].x - this.x;
				var dy = rabbits[this.index].y - this.y;
				
				this.vx = (this.vx + (dx / this.f)) / this.e;
				this.vy = (this.vy + (dy / this.f)) / this.e;
				
				// secondary calculations, for repulsion
				if (this.r != null) {
					for (var i = 0; i < physicsModels.length; i++) {
						if (i != this.index) {
							var pm = physicsModels[i];
							dx = Math.abs (pm.x - this.x);
							dy = Math.abs (pm.y - this.y);
							
							if (dx < this.r) this.vx = (this.vx + (dx / this.f)) / this.e;
							if (dy < this.r) this.vy = (this.vy + (dy / this.f)) / this.e;
						} // endif
					} // endfor
				}// endif
			} // end function
		}
		
		function physicsHandler () {
			for (var i = 0; i < objects.length; i++) {
				var pm = physicsModels[i];
				var o = objects[i];
				var x = parseInt (o.style.left);
				var y = parseInt (o.style.top);
				pm.setPosition (x, y);
				pm.setV ();
				o.style.left = x + pm.vx + "px";
				o.style.top = y + pm.vy + "px";
			}
			
			physicsTimer = setTimeout ("physicsHandler ();", physicsDelay);
		}
		
		function rabbitHandler () {
			for (var i = 0; i < objects.length; i++) {
				rabbits[i].next ();
			}
			rabbitTimer = setTimeout ("rabbitHandler ();", rabbitDelay);
		}
		
		function update (nf, ne, nr) {
			nf = Math.abs (nf);
			ne = Math.abs (ne);
			nr = Math.abs (nr);
			
			for (var i = 0; i < physicsModels.length; i++) {
				var pm = physicsModels[i];
				pm.f = nf;
				pm.e = ne;
				pm.r = nr;
			}
			return false;
		}
		
		function startstop () {
			if (rabbitTimer != null) {
				clearTimeout (rabbitTimer);
				rabbitTimer = null;
			}
			else rabbitHandler ();
			
			return false;
		}
		
		function init (n) {
			var t;
			for (var i = 0; i < n; i++) {
				objects[i] = document.getElementById ("ball" + i);
				rabbits[i] = new Rabbit (500);
				t = new PhysicsModel (<?=$f?>,<?=$e?>,<?=$r?>);
			}
			
			document.f1.f.value = <?=$f?>;
			document.f1.e.value = <?=$e?>;
			document.f1.r.value = <?=$r?>;
			document.f2.n.value = <?=$n?>;
			//document.onmousemove = updateMouse;
			
			maxx = parseInt (document.getElementById ("container").offsetWidth) - parseInt (document.getElementById ("f").offsetWidth);
			maxy = parseInt (document.getElementById ("container").offsetHeight);
			
			physicsHandler ();
			rabbitHandler ();
		}
		
	</script>
	<link rel="stylesheet" type="text/css" href="physics03.css">
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<meta http-equiv= "pragma" CONTENT="no-cache">
</head>

<body onload="init (<?=$n?>);">

<div id="container" style="position:absolute;">
	<?php
		for ($i = 0; $i < $n; $i++) {?>
		<div id="ball<?=$i?>" style="position:absolute; top:0px; left:0px;"><img src="ball.gif" alt=""></div>
	<?php } ?>
	
	<div id="f" style="position: absolute; bottom: 10px; right: 10px;">
	<form name="f3" style="display:inline;">
		<input type="submit" class="inputButton" value="start/stop rabbits" onclick="return startstop ();">
	</form><br><br>
	<form name="f1" style="display:inline;">
		Friction:&nbsp;&nbsp;<input name="f" type="text" value="" class="inputText"><br>
		Elasticity:&nbsp;&nbsp;<input name="e" type="text" value="" class="inputText"><br>
		Repulsion:&nbsp;&nbsp;<input name="r" type="text" value="" class="inputText"><br>
		<input type="submit" class="inputButton" value="update values" onclick="return update (this.parentElement.f.value, this.parentElement.e.value, this.parentElement.r.value);">
	</form><br><br>
	<form name="f2" style="display:inline;" action="index.php" method="GET">
		How many?&nbsp;&nbsp;<input name="n" type="text" value="" size="2" class="inputText"><br>
		<input type="submit" class="inputButton" value="reset">
	</form>
	</div>
</div>

<div id="explanation">
	<div id="logo">Humor Tree&nbsp;&nbsp;/&nbsp;&nbsp;<strong>Physics 03</strong> (Organic 3)&nbsp;&nbsp;/&nbsp;&nbsp;"Chasers"</div>
	<p>
		<strong>Physics 03</strong> builds on <a href="../physics02">Physics 02</a>,
		by making the balls chase a "rabbit" instead of your mouse.
	</p>
	
	<p>
		Each ball has its own rabbit to chase.  The rabbits' movements are
		random.  The effect I was aiming at was some more semi-organic motion
		(hence, the "Organic 3" part of the title, referring to  my original
		attempt at organic motion, <a href="../organic1">Organic 1</a>).
	</p>
	
	<p>
		This time, you cannot set the physics properties for the individual balls.
		You can, however, start or stop the "rabbits" that the balls chase (which
		will, in turn, stop the balls) by pushing the "start/stop rabbits" button
		on the form above.
	</p>
	<p class="tip">
		<strong>Tips</strong><br><br>
		The larger the value of friction, the slower the balls will travel.
		<br><br>
		Elasticity needs to be between 1 and 1.6 to work well.  The closer
		the value is to 1 (say, 1.01), the more elastic the balls are.
		<br><br>
		I think repulsion works best if it is between 5 and 50.  Try different
		values and see the effects.
		<br><br>
		You can also see what this looks like with a lot of balls flying
		around at once.  I like the way it looks with 10 balls, myself.
	</p>
	<p>&laquo;&nbsp;&nbsp;<a href="../../">return to humor tree</a></p>
</div>

</body>
</html>
