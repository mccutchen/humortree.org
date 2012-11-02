function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype.mag = function() {
    return Math.sqrt(this.mag2());
};
Vector.prototype.mag2 = function() {
    return this.x * this.x + this.y * this.y;
};

Vector.prototype.scale = function(n) {
    return new Vector(this.x * n, this.y * n);
};

Vector.prototype.add = function(v) {
    return new Vector(this.x + v.x, this.y + v.y);
};

Vector.prototype.normalize = function() {
    var m = this.magnitude();
    return (m !== 0) ? this.scale(1/m) : new Vector(0, 0);
};

Vector.prototype.limit = function(min, max) {
    if (max === undefined)
        min = 0, max = min;
    var m = this.magnitude();
    if (m < min) {
        return this.normalize().scale(min);
    } else if (m > max) {
        return this.normalize().scale(max);
    } else {
        return this;
    }
};

Vector.prototype.clone = function() {
    return new Vector(this.x, this.y);
};

Vector.prototype.toString = function() {
    return 'Vector(' + this.x + ', ' + this.y + ')';
};
