var Utils = {
    rand: function(low,hi) {
        return Math.floor(Math.random() * (hi - low)) + low;
    },
    wrap: function(n, max) {
        if (n >= 0 && n <= max) return n;
        if (n > max) return n - max;
        return n + max;
    },
    bounce: function(n, max) {
        if (n >= 0 && n <= max) return n;
        if (n > max) return max + (max - n);
        return 0 - n;
    }
};

function Point(x, y) {
    return { x: x, y: y };
}

// Dummy console object
if (typeof console == 'undefined') console = { log: function() {} };