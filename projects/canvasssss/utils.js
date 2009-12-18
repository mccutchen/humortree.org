var Utils = {
    rand: function(hi, low) {
        low = low || 0;
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
    },
    fudge: function(n, maxdelta, mindelta) {
        mindelta = mindelta || 0;
        delta = Utils.rand(maxdelta-mindelta, -(maxdelta-mindelta));
        return n + ((delta >= 0) ? delta + mindelta : delta - mindelta);
    },
    rgba: function(c) { 
        return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')';
    }
};

// Dummy console object
if (typeof console == 'undefined') console = { log: function() {} };