function Particle(loc, vel, acc) {
    this.loc = loc || new Vector(0, 0);
    this.vel = vel || new Vector(0, 0);
    this.acc = acc || new Vector(0, 0);
    Particle.MAX_SPEED = 5;
}

Particle.prototype.step = function step() {
    this.acc = this.acc.validate();
    this.vel = this.vel.add(this.acc);
    
    var speed = this.vel.length();
    if (speed > Particle.MAX_SPEED){
        this.vel = this.vel.mul(1/(speed/Particle.MAX_SPEED));
    }
    
    this.loc = this.loc.add(this.vel);
    this.acc = this.acc.zero();
};
