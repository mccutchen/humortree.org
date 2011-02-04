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

    System.FACTOR = 6;
    System.MIN_DISTANCE = 100;
}

System.prototype.add = function add(particle) {
    if (particle === undefined) {
        var loc = new Vector(this.center.x, this.center.y),
            vel = new Vector(Utils.rand(-8, 8), Utils.rand(-8, 8)),
            acc = new Vector(0, 0);
        // loc = new Vector(Utils.rand(0, this.width), Utils.rand(0, this.height));
        console.log(loc, vel, acc);
        particle = new Particle(loc, vel, acc);
        console.log('Created particle', particle);
    }
    this.particles.push(particle);
};

System.prototype.step = function step() {
    var ps = this.particles,
        count = ps.length,
        i, j,
        p1, p2, // each particle we're comparing
        dv, // vector between positions of p1 and p2
        d, // distance between p1 and p2
        dead = []; // dead particle accumulator
    
    // n-body acceleration accumulation, from
    // http://codeflow.org/entries/2010/aug/22/html5-canvas-and-the-flying-dots/
    //
    // My understanding is that this slight shortcut allows us to avoid
    // looping through each particle twice to accumulate accelerations by
    // taking advantage of the fact that the forces accumulate over the whole
    // simulation due to, what, the commutative nature of Newtonian physics?
    for (i = 0; i < count; i++) {
        p1 = ps[i];
        for (j = i + 1; j < count; j++) {
            p2 = ps[j];
            dv = p1.loc.sub(p2.loc);
            d = dv.length();

            // Only apply the calculations to these two vectors if they're
            // above a minimum distance apart, to avoid accelerations
            // approaching infinity.
            if (d > System.MIN_DISTANCE){
                // Scale the vector based on the inverse of the distance
                dv = dv.div(Math.pow(d, 3) / System.FACTOR);
                p1.acc = p1.acc.sub(dv);
                p2.acc = p2.acc.add(dv);
            }
        }
        
        p1.step();

        if (p1.loc.x > this.width || p1.loc.x < 0 ||
            p1.loc.y > this.height || p1.loc.y < 0) {
            dead.push(i);
        }
    }

    // Clean up dead particles and respawn
    for (i = 0; i < dead.length; i++) {
        ps.remove(dead[i]);
        this.add();
    }
};
