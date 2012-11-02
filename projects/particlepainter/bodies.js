var Env = {
    w: 600,
    h: 300,
    G: 0.4,

    bodies: [],

    step: function() {
        var i, j, // loop counters/indexes
            a, b, // bodies
            f,    // force
            bodies = Env.bodies,
            l = bodies.length;
        for (i = 0; i < l; i++) {
            a = bodies[i];
            for (j = i + 1; j < l; j++) {
                b = bodies[j];
                f = a.actOn(b);
                a.applyForce(f);
                b.applyForce(f.scale(-1));
            }
            a.step();
        }
    },

    draw: function(ctx) {
        Env.bodies.forEach(function(body) { body.draw(ctx); });
    },

    bound: function(pos) {
        var x = (pos.x < 0) ? 0 : (pos.x > Env.w) ? Env.w : pos.x,
            y = (pos.y < 0) ? 0 : (pos.y > Env.h) ? Env.h : pos.y;
        return new Vector(x, y);
    }
};

var Body = function(mass, pos, vel, acc) {
    this.mass = mass;
    this.pos = pos;
    this.vel = vel;
    this.acc = acc || new Vector();
};

// Calculate the force vector that results from this body acting on the given
// other body. The result should be applied to this body and its inverse
// should be applied to the other body.
Body.prototype.actOn = function(other) {
    var dir = this.pos.sub(other.pos),
        dist = dir.mag(), // TODO: constrain?
        strength = (Env.G * this.mass * other.mass) / (dist * dist);
    return dir.norm().scale(strength);
};

Body.prototype.applyForce = function(f) {
    this.acc = this.acc.add(f.scale(1/this.mass));
};

Body.prototype.step = function() {
    this.vel = this.vel.add(this.acc).limit(1, 10);
    this.pos = Env.bound(this.pos.add(this.vel));
    this.acc = new Vector();
};

Body.prototype.draw = function(ctx) {
    ctx.fillStyle = '#ccc';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.mass, 0, Math.PI * 2, true);
    ctx.fill();
};


var Particle = function() { Body.apply(this, arguments); };
Particle.prototype = Object.create(Body.prototype);


var Attractor = function() { Body.apply(this, arguments); };
Attractor.prototype = Object.create(Body.prototype);

Attractor.prototype.step = function() {};

Attractor.prototype.draw = function(ctx) {
    ctx.fillStyle = '#999';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.mass, 0, Math.PI * 2, true);
    ctx.fill();
};
