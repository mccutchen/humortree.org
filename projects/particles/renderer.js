function Renderer(system, ctx) {
    this.system = system;
    this.ctx = ctx;
}

Renderer.prototype.render = function render() {
    var sys = this.system,
        ps = sys.particles,
        end = Math.PI * 2,
        ctx = this.ctx,
        p;

    ctx.fillStyle = '#fff';
    for (var i = 0; i < ps.length; i++) {
        p = ps[i];
        r = p.mass * p.vel.magnitude();
        ctx.beginPath();
        ctx.arc(p.loc.x, p.loc.y, r, r, 0, end);
        ctx.closePath();
        ctx.fill();
    }
};
