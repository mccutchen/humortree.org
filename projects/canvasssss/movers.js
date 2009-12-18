function Mover(bounds) {
    this.bounds = bounds;
    this.x = Utils.rand(bounds.x);
    this.y = Utils.rand(bounds.y);

    this.constrain = function() {
        this.x = Utils.bounce(this.x, this.bounds.x);
        this.y = Utils.bounce(this.y, this.bounds.y);
    };
    this.next = function() {
        return { x: 0, y: 0 };
    };
    this.step = function() {
        var delta = this.next();
        this.x += delta.x;
        this.y += delta.y;
        this.constrain();
    };
}

function RandomMover(bounds) {
    var mover = new Mover(bounds);
    var MAX_DELTA = 10;
    var MIN_DELTA = 2;
    mover.next = function() {
        return {
            x: Utils.fudge(0, MAX_DELTA, MIN_DELTA),
            y: Utils.fudge(0, MAX_DELTA, MIN_DELTA)
        }
    };
    return mover;
}