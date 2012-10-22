var Vector = (function() {
    function create(x, y) {
        return {
            x: x || 0,
            y: y || 0
        };
    }

    function magnitude(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }

    function scale(v, n) {
        return create(v.x * n, v.y * n);
    }

    function add(v1, v2) {
        return create(v1.x + v2.x, v1.y + v2.y);
    }

    function normalize(v) {
        var m = magnitude(v);
        return (m === 0) ? create() : scale(v, 1/m);
    }

    // public interface
    return {
        create: create,
        magnitude: magnitude,
        scale: scale,
        add: add,
        normalize: normalize
    };
})();
