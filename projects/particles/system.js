function System(width, height, count) {
    this.width = width;
    this.height = height;
    this.particles = [];

    if (count !== undefined) {
        for (var i = 0; i < count; i++) {
            this.add();
        }
    }
}

System.prototype.add = function add(particle) {
    if (particle === undefined) {
        var x = Utils.rand(0, this.width),
            y = Utils.rand(0, this.height),
            loc = new Vector(x, y),
            vel = new Vector(Utils.rand(0, 1), Utils.rand(0, 1)),
            acc = new Vector(Utils.rand(0, 1), Utils.rand(0, 1)),
            mass = Utils.rand(2, 4);
        particle = new Particle(loc, mass, vel, acc);
        console.log('Created particle', particle);
    }
    this.particles.push(particle);
};

System.prototype.step = function step() {
    var i, j, p1, p2, f;
    var ps = this.particles;
    for (i = 0; i < ps.length; i++) {
        p1 = ps[i];
        f = p1.acc;
        for (j = 0; j < ps.length; j++) {
            if (i === j) continue;
            p2 = ps[j];
            f = f.add(p1.attractionTo(p2));
        }
        //p1.acc = f;
        p1.step();
    }
};
