var Utils = {
    rand: function rand(hi, low) {
        low = low || 0;
        return Math.random() * (hi - low) + low;
    },

    wrap: function wrap(n, max) {
        if (n >= 0 && n <= max) return n;
        if (n > max) return n - max;
        return n + max;
    },

    bounce: function bounce(n, max) {
        if (n >= 0 && n <= max) return n;
        if (n > max) return max + (max - n);
        return 0 - n;
    },

    fudge: function fudge(n, maxdelta, mindelta) {
        mindelta = mindelta || 0;
        delta = Utils.rand(maxdelta-mindelta, -(maxdelta-mindelta));
        return n + ((delta >= 0) ? delta + mindelta : delta - mindelta);
    },

    rgba: function rgba(c) {
        return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')';
    },

    chance: function chance(n) {
        return Math.random() < n;
    }
};

// Array Remove - By John Resig (MIT Licensed)
// http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
