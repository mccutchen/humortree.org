function Body(mass, pos, vel) {
    this.mass = mass;
    this.pos = pos;
    this.vel = vel;
    this.acc = new Vector();
}

Body.prototype.applyForce = function(f) {
    this.acc = this.acc.add(f.scale(1/this.m));
};

Body.prototype.draw = function(ctx) {
    ctx.fillStyle = '#ccc';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.mass, 0, Math.PI * 2, true);
    ctx.fill();
};


function Actor(mass, pos) {
    this.mass = mass;
    this.pos = pos;
    this.G = 0.4;
}

Attractor.prototype.act = function(body) {
    var dir = this.pos.sub(body.pos),
        dist = dir.mag(), // TODO: constrain?
        strength = (this.G * this.mass * body.mass) / (dist * dist);
    return dir.norm().scale(strength);
};

Attractor.prototype.draw = function(ctx) {
    ctx.fillStyle = '#999';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.mass, 0, Math.PI * 2, true);
    ctx.fill();
};
