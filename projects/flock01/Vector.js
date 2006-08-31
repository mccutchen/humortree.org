function Vector($x, $y, $z) {
	// properties
	this.x = $x;
	this.y = $y;
	this.z = $z;
	
	this.weight = 1;
	
	// Methods
	// 	void		scale(int $n)
	// 	double	getNorm()
	// 	void		normalize()
	// 	void		dot(Vector $v)
	// 	void		cross(Vector $v)
	//		Vector	clone()
}

Vector.prototype.scale = function($n) {
	this.x *= $n;
	this.y *= $n;
}
Vector.prototype.getNorm = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y);
}
Vector.prototype.normalize = function() {
	this.scale(1/this.getNorm());
}
Vector.prototype.dot = function($v) {
	this.x *= $v.x;
	this.y *= $v.y;
}
Vector.prototype.cross = function($v) {
	this.x *= $v.y;
	this.y *= $v.x;
}
Vector.prototype.getHeading = function() {
	if(this.x == 0) {
		return (this.y >= 0) ? 90 : 270;
	}
	else {
		var plus = 0;
		if(this.x > 0 && this.y < 0)	plus = 360;
		else if(this.x < 0) plus = 180;
				
		var theta = VectorMath.getDegrees(Math.atan(this.y/this.x));
		return VectorMath.fixDegrees(theta + plus);
	}
}
Vector.prototype.clone = function() {
	var v = Vector.createFromComponents(this.x, this.y, this.z);
	v.weight = this.weight;
	return v;
}


// STATIC METHODS
Vector.createFromHeading = function($d) {
	var x = VectorMath.getX($d);
	var y = VectorMath.getY($d);
	
	return new Vector(x,y);
}
Vector.createFromComponents = function($x, $y, $z) {
	if($x == 0 && $y == 0) $x = 1;
	var v = new Vector($x, $y, $z);
	v.normalize();
	
	return v;
}



////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

var VectorMath = {
	sin : new Array(360),
	cos : new Array(360),
	
	init : function() {
		for(var i = 0; i < 360; i++) {
			this.sin[i] = Math.sin(i * (Math.PI / 180));
			this.cos[i] = Math.cos(i * (Math.PI / 180));
			//alert('sin[' + i + ']: ' + this.sin[i] + ' ;; cos[' + i + ']: ' + this.cos[i]);
		}
	},
	
	add : function() {
		var x = 0;
		var y = 0;
		if(arguments.length == 1) arguments = arguments[0];
		for(var i = 0; i < arguments.length; i++) {
			x += arguments[i].x * arguments[i].weight;
			y += arguments[i].y * arguments[i].weight;
		}
		return Vector.createFromComponents(x,y);
	},
	
	averagePoints : function($a) {
		var xsum = 0;
		var ysum = 0;
		for(var i = 0; i < $a.length; i++) {
			xsum += $a[i].x;
			ysum += $a[i].y;
		}
		return new Point(xsum/$a.length, ysum/$a.length);
	},
	average : function($a) {
		var sum = 0;
		for(var i = 0; i < $a.length; i++) sum += $a[i];
		return sum / $a.length;
	},
	
	fixDegrees : function($d) { return Math.abs(Math.round($d)) % 360; },
	getX : function($d) {
		if(isNaN($d)) $d = 90;
		var d = this.fixDegrees($d);
		//alert(d);
		return this.cos[d];
	},
	getY : function($d) {
		if(isNaN($d)) $d = 90;
		var d = this.fixDegrees($d);
		//alert(d);
		return this.sin[d];
	},
	getDegrees : function($r) { return ($r/Math.PI) * 180; }
}; VectorMath.init();