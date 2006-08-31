function Point($x, $y) {
	// properties
	// ==========
	this.x = $x;
	this.y = $y;
	
	// methods
	// =======
	// getDistanceTo(Point $p)
	// add(Point $p)
	// scale(int $n)
	// moveTo(int $x, int $y)
	// moveBy(int $x, int $y)
}

// the real distance formula...
Point.prototype.getDistanceTo = function($p) { return Math.sqrt(Math.sqr($p.x-this.x) + Math.sqr($p.y-this.y)); }

// ...is overwritten by a shortcut
//Point.prototype.getDistanceTo = function($p) { return Math.sqr($p.x+this.x) - Math.sqr($p.y+this.y);	}

// and the rest of the methods
Point.prototype.add = function($p) { this.x += $p.x; this.y += $p.y; }
Point.prototype.scale = function($n) { this.x *= $n; this.y *= $n; }
Point.prototype.moveTo = function($x,$y) { this.x = $x; this.y = $y; }
Point.prototype.moveBy = function($x,$y) { this.x += $x; this.y += $y; }

// add the sqr() method to the Math object
Math.sqr = function($n) { return $n*$n; }