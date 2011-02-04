function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vector.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
Vector.prototype.toString = function() {
    return '(' + this.x + ',' + this.y + ')';
};

// Vectors as immutable objects
Vector.prototype.mul = function(n) {
    return new Vector(this.x * n, this.y * n);
};
Vector.prototype.div = function(n) {
    return this.mul(1/n);
};
Vector.prototype.add = function(v) {
    return new Vector(this.x + v.x, this.y + v.y);
};
Vector.prototype.sub = function(v) {
    return this.add(v.mul(-1));
};
Vector.prototype.normalize = function() {
    var m = this.length();
    return (m === 0) ? this.scale(0) : this.scale(1/m);
};
Vector.prototype.zero = function() {
    return new Vector(0, 0);
};
Vector.prototype.validate = function() {
    if (isNaN(this.x + this.y)) {
        return this.zero();
    } else {
        return new Vector(this.x, this.y);
    }
};

// In-place operations
Vector.prototype.imul = function(n) {
    this.x *= n;
    this.y *= n;
};
Vector.prototype.idiv = function(n) {
    this.imul(1/n);
};
Vector.prototype.iadd = function(v) {
    this.x += v.x;
    this.y += v.y;
};
Vector.prototype.isub = function(v) {
    this.x -= v.x;
    this.y -= v.y;
};
Vector.prototype.inormalize = function() {
    var m = this.length();
    this.scale((m === 0) ? 0 : 1/m);
};
Vector.prototype.izero = function() {
    this.x = x;
    this.y = y;
};
Vector.prototype.ivalidate = function() {
    if(isNaN(this.x + this.y)) {
        this.izero();
    }
};
