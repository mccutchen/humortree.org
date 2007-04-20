var delay = 20;
var divs = new Array ();
var ints = new Array (1, .5, Math.PI / 6, Math.PI / 4, 1.5);
var slopes = new Array (1,-1,0,.5,-.5);
var raindrops = new Array ();
var timers = new Array ();

function init () {
	if (!isDOM) {
		window.location = "http://www.webstandards.org/upgrade/";
	}
	divs = document.getElementsByTagName ("div");
	var dropcount = 0;
	for (var i = 0; i < divs.length; i++) {
		if (divs[i].className == "drop") {
			raindrops[dropcount] = new sineWave (i);
			raindrops[dropcount].newWave ();
			raindrops[dropcount].spawn ();
			dropcount++;
		}
	}
	for (i = 0; i < raindrops.length; i++) {
		doSine (i);				
	}
}

function sineWave (index) {
	this.style = document.getElementsByTagName ("div")[index].style;
	this.index = index;
	this.t = 0;
	this.t_total = 0;
	this.t_mod;
	this.sine_mod;
	this.period;
	this.left;
	this.slope;
	this.t_max = 500;
	this.t_int = 1;
	this.spawn = spawn;
	this.newWave = newWave;
				
	function newWave () {
		this.t = 0;
		this.slope = slopes[Math.floor (Math.random () * slopes.length)];
		this.t_int = ints [Math.floor (Math.random () * ints.length)];
		this.t_mod = Math.floor (Math.random () * 20 + 4);
		this.sine_mod = Math.floor (Math.random () * 40 + 4);
		this.period = this.t_mod * 2 * Math.PI;
	}
	function spawn () {
		var newx = Math.floor (Math.random () * 500);
		var newy = Math.floor (Math.random () * 250);
		this.style.left = newx + "px";
		this.style.top = newy + "px";
		this.left = newx;
		this.t_total = newy;
	}
	return this;
}

function doSine (n) {
	if (raindrops[n].t_total <= raindrops[n].t_max) {
		with (raindrops[n]) {
			if (t > period) newWave ();
			t += t_int;
			t_total += t_int;
			left += slope;
			var x = Math.sin (t / t_mod) * sine_mod + left;
			var y = t_total;
			var lastx = parseInt (divs[index].style.left);
			style.left = x + "px";
			style.top = y + "px";
			if (x < lastx) document.images[index - 1].src = "drop_left.gif";
			else if (x > lastx) document.images[index - 1].src = "drop_right.gif";
			else if (x == lastx) document.images[index - 1].src = "drop_center.gif";
		}
		timers[n] = setTimeout ("doSine (" + n + ");",delay);
	}
	else {
		clearTimeout (timers[n]);
		raindrops[n].newWave ();
		raindrops[n].spawn ();
		doSine (n);
	}
}