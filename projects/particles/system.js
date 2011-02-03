function System(width, height, count) {
    this.width = width;
    this.height = height;
    this.particles = [];
    this.center = new Vector(this.width / 2, this.height / 2);

    if (count !== undefined) {
        for (var i = 0; i < count; i++) {
            this.add();
        }
    }
}

System.MAX_V = 5;
System.MIN_V = .5;

System.MAX_A = 2;
System.MIN_A = 0;

System.MAX_W = 20;
System.MIN_W = 3;

System.prototype.add = function add(particle) {
    if (particle === undefined) {
        var loc = new Vector(this.center.x, this.center.y),
            vel = new Vector(Utils.rand(-8, 8), Utils.rand(-8, 8)),
            acc = new Vector(0, 0),
            mass = 1;
        console.log(loc, mass, vel, acc);
        particle = new Particle(loc, mass, vel, acc);
        console.log('Created particle', particle);
    }
    this.particles.push(particle);
};

System.prototype.constrainA = function constrainA(a) {
    mag = a.fastMagnitude();
    if (mag > Math.pow(System.MAX_A, 2)) {
        a = a.normalize().scale(System.MAX_A);
    } else if (mag < Math.pow(System.MIN_A, 2)) {
        a = a.normalize().scale(System.MIN_A);
    }
    return a;
};



System.prototype.step = function step() {
    var i, j, p1, p2, f, mag;
    var ps = this.particles,
        dead = [];
    for (i = 0; i < ps.length; i++) {
        p1 = ps[i];
        f = new Vector(0, 0);
        for (j = 0; j < ps.length; j++) {
            if (i === j) continue;
            p2 = ps[j];
            f = f.add(p1.attractionTo(p2));
        }
        mag = f.fastMagnitude();
        if (mag > Math.pow(System.MAX_A, 2)) {
            f = f.normalize().scale(System.MAX_A);
        } else if (mag < Math.pow(System.MIN_A, 2)) {
            f = f.normalize().scale(System.MIN_A);
        }
        p1.acc = f;
        p1.step();

        if (p1.loc.x > this.width || p1.loc.x < 0 ||
            p1.loc.y > this.height || p1.loc.y < 0) {
            console.log('Found dead:', p1);
            dead.push(i);
        }
    }

    // Clean up dead particles and respawn
    for (i = 0; i < dead.length; i++) {
        ps.remove(dead[i]);
        this.add();
    }
};
