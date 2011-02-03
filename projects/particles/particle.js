function Particle(loc, mass, vel, acc) {
    this.loc = loc || new Vector(0, 0);
    this.mass = mass || 1;
    this.vel = vel || new Vector(0, 0);
    this.acc = acc || new Vector(1, 1);
}

Particle.prototype.distanceTo = function distanceTo(p) {
    return this.loc.subtract(p.loc).magnitude();
};

Particle.prototype.fastDistanceTo = function fastDistanceTo(p) {
    return this.loc.subtract(p.loc).fastMagnitude();
};

Particle.prototype.attractionTo = function attractionTo(p) {
    var dir = this.loc.subtract(p.loc);
    var d2 = dir.fastMagnitude();
    var G = .5;
    var f = (G * this.mass * p.mass) / (d2);
    return dir.normalize().scale(f);
};

Particle.prototype.step = function step() {
    console.log('Before step', this);
    this.vel = this.vel.add(this.acc);
    this.loc = this.loc.add(this.vel);
    console.log('After step', this);
};
