function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vector.prototype.scale = function(n) {
    return new Vector(this.x * n, this.y * n);
};
Vector.prototype.add = function(v) {
    return new Vector(this.x + v.x, this.y + v.y);
};

Vector.prototype.subtract = function(v) {
    return this.add(v.scale(-1));
};

Vector.prototype.magnitude = function() {
    return Math.sqrt(this.fastMagnitude());
};

Vector.prototype.fastMagnitude = function() {
    return this.x * this.x + this.y * this.y;
};

Vector.prototype.normalize = function() {
    var m = this.magnitude();
    return (m === 0) ? this.scale(0) : this.scale(1/m);
};

Vector.prototype.toString = function() {
    return '(' + this.x + ',' + this.y + ')';
};
