<?php
	$n = (isset ($n)) ? $n : 4;
	$f = (isset ($f)) ? $f : 20;
	$e = (isset ($e)) ? $e : 1.3;
	$r = (isset ($r)) ? $r : 12;
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<title>Humor Tree&nbsp;&nbsp;/&nbsp;&nbsp;Physics 02&nbsp;&nbsp;/&nbsp;&nbsp;Friction, Elasticity and Repulsion</title>
	<script type="text/javascript">	
		var isIE = (document.all && document.getElementById) ? true : false;
		var isNS = (document.getElementById && !document.all) ? true : false;
		
		var physicsModels = new Array ();
		var physicsModelCount = 0;
		var objects = new Array ();
		
		var df = 6;
		var de = 1.3;
		var dr = 10;
		
		var mousex = 0;
		var mousey = 0;
		var xoff = 20;
		var yoff = 20;
		var maxx = 0;
		var maxy = 0;
		var minx = 30;
		var miny = 30;
		
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
				var dx = mousex - this.x;
				var dy = mousey - this.y;
				
				this.vx = (this.vx + (dx / this.f)) / this.e;
				this.vy = (this.vy + (dy / this.f)) / this.e;
				
				// secondary calculations, for repulsion
				if (this.r != null) {
					for (var i = 0; i < physicsModels.length; i++) {
						if (i != this.index) {
							var pm = physicsModels[i];
							dx = Math.abs (pm.x - this.x);
							dy = Math.abs (pm.y - this.y);
							
							if (dx < this.r) this.vx = (this.vx + (dx / this.f)) * this.e;
							if (dy < this.r) this.vy = (this.vy + (dy / this.f)) * this.e;
						} // endif
					} // endfor
				}// endif
			} // end function
		}
		
		function slideTo () {
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
			
			setTimeout ("slideTo ();", 20);
		}
		
		function update (n, nf, ne, nr) {
			nf = Math.abs (nf);
			ne = Math.abs (ne);
			nr = Math.abs (nr);
			
			if (n == -1) {
				for (var i = 0; i < physicsModels.length; i++) {
					var pm = physicsModels[i];
					pm.f = nf;
					pm.e = ne;
					pm.r = nr;
				}
			}
			else {
				var pm = physicsModels[n];
				pm.f = nf;
				pm.e = ne;
				pm.r = nr;
			}
			return false;
		}
		
		function init (n) {
			var t;
			for (var i = 0; i < n; i++) {
				objects[i] = document.getElementById ("ball" + i);
				t = new PhysicsModel (<?=$f?>,<?=$e?>,<?=$r?>);
			}
			
			document.f1.f.value = <?=$f?>;
			document.f1.e.value = <?=$e?>;
			document.f1.r.value = <?=$r?>;
			document.f2.n.value = <?=$n?>;
					
			document.onmousemove = updateMouse;
			
			maxx = parseInt (document.getElementById ("container").offsetWidth);
			maxy = parseInt (document.getElementById ("container").offsetHeight);
			
			slideTo ();
		}
		
		function updateMouse (e) {
			mousex = (isIE) ? parseInt (window.event.clientX) : parseInt (e.pageX);
			mousey = (isIE) ? parseInt (window.event.clientY) : parseInt (e.pageY);
			
			if (mousey >= maxy) mousey = maxy;
			if (mousey <= miny) mousey = miny;
			
			if (mousex >= maxx) mousex = maxx;
			if (mousex <= minx) mousex = minx;
			
			mousex -= xoff;
			mousey -= yoff;
		}
		
	</script>
	<link rel="stylesheet" type="text/css" href="physics02.css">
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
	<form name="f1" style="display:inline;">
		Which Ball:&nbsp;&nbsp;<select name="nn" class="inputText">
													<option value="-1">All balls</option>
													<?php	for ($i = 0; $i < $n; $i++) {?><option value="<?=$i?>">ball <?php echo ($i < 10) ? "0" . $i : $i; ?></option><?php } ?>
													</select><br>
		Friction:&nbsp;&nbsp;<input name="f" type="text" value="" class="inputText"><br>
		Elasticity:&nbsp;&nbsp;<input name="e" type="text" value="" class="inputText"><br>
		Repulsion:&nbsp;&nbsp;<input name="r" type="text" value="" class="inputText"><br>
		<input type="submit" class="inputButton" value="update values" onclick="return update (this.parentElement.nn.value, this.parentElement.f.value, this.parentElement.e.value, this.parentElement.r.value);">
	</form><br><br>
	<form name="f2" style="display:inline;" action="index.php" method="GET">
		How many?&nbsp;&nbsp;<input name="n" type="text" value="" size="2" class="inputText"><br>
		<input type="submit" class="inputButton" value="reset">
	</form>
	</div>
</div>

<div id="explanation">
	<div id="logo">Humor Tree&nbsp;&nbsp;/&nbsp;&nbsp;<strong>Physics 02</strong>&nbsp;&nbsp;/&nbsp;&nbsp;"Friction, Elasticity and Repulsion"</div>
	<p>
		<strong>Physics 02</strong> builds on <a href="../physics01">Physics 01</a>,
		by adding another force to those acting on the balls: <strong>repulsion</strong>.
	</p>
	
	<p>
		The balls are all trying to get to your mouse.  They are hindered
		by friction and elasticity, as they were in Physics 01.  This time,
		they are also hindered by each other;  each ball is repulsed by
		the other balls, so they can never sit still.  They are all trying
		to get to the exact same place, but at the same time, they are trying
		to get away from each other.
	</p>
	
	<p>
		I managed to add the repulsion part of the equation myself, without
		looking at any reference material.  I'm quite pleased with myself,
		if you want to know the truth.  It worked on the first try, even.
	</p>
	<p class="tip">
		<strong>Tips</strong><br><br>
		This time, you can set the friction, elasticity, and repulsion of
		the balls either globally or individually by selecting either "All
		balls" or an individual ball from the "Which Ball" list.
		<br><br>
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
