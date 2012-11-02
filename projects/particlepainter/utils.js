var Utils = {
    randInt: function(hi, low) {
        return Math.floor(Utils.randFload(hi, low));
    },
    randFloat: function(hi, low) {
        low = low || 0;
        return Math.random() * (hi - low) + low;
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
    }
};
