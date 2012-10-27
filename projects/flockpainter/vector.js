function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype.magnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};
Vector.prototype.toString = function() {
    return '(' + this.x + ',' + this.y + ')';
};

// Vectors as immutable objects
Vector.prototype.scale = function(n) {
    return new Vector(this.x * n, this.y * n);
};
Vector.prototype.add = function(v) {
    return new Vector(this.x + v.x, this.y + v.y);
};
Vector.prototype.normalize = function() {
    var m = this.magnitude();
    return (m === 0) ? this.scale(0) : this.scale(1/m);
};

// In-place operations
Vector.prototype.iscale = function(n) {
    this.x *= n;
    this.y *= n;
};
Vector.prototype.iadd = function(v) {
    this.x += v.x;
    this.y += v.y;
};
Vector.prototype.inormalize = function() {
    var m = this.magnitude();
    this.iscale((m === 0) ? 0 : 1/m);
};
