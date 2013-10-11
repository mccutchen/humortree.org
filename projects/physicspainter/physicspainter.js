var width = 1000,
    height = 500;


function Rabbit(x, y) {
    this.position = new Vector();
}
Rabbit.prototype.step = function(n) {
    // There's a good chance the rabbit won't actually move on any given step
    if (Utils.chance(0.75)) return;

    // But if it does, there's a good chance it'll just move a little bit.
    var max = Utils.chance(0.75) ? 10 : 100,
        x = Utils.fudge(this.position.x, max),
        y = Utils.fudge(this.position.y, max),
        v = new Vector(x, y);

    this.position.iadd(v);
}


function PhysicsPen(rabbit) {
    this.rabbit = rabbit || new Rabbit;
    this.position = new Vector();
    this.velocity = new Vector();

    this.f = 6; // friction
    this.e = 1.3; // elasticity
    this.r = 10; // repulsion
}
PhysicsPen.prototype.step = function(n) {
    var dv = this.rabbit.position.sub(this.position),
        ax = (this.velocity.x + (dv.x / this.f)) / this.e,
        ay = (this.velocity.y + (dv.y / this.f)) / this.e,
        a = new Vector(ax, ay);
    this.velocity.iadd(a);
    this.position.iadd(this.velocity);
}


function setup(ctx) {
    console.log('Setup:', ctx);
    var rabbit = new Rabbit(),
        pen = new PhysicsPen(rabbit);
    return {
        'rabbit': rabbit,
        'pen': pen
    };
}


function draw(ctx, step, state) {
    state.rabbit.step();
    state.pen.step();
    console.log('Rabbit:', state.rabbit.position.x, state.rabbit.position.y);
    console.log('Pen:   ', state.pen.position.x, state.pen.position.y);
    return state;
}


Animatrix.animate(draw, setup);
