(function() {
    function wrapper(n, min, max) {
        if (max === undefined) {
            max = min, min = 0;
        }
        return function(n) {
            if (n >= min && n <= max) {
                return n;
            } else if (n < min) {
                return max - (min - n);
            } else {
                return min + (n - max);
            }
        }
    }

    function clamper(n, min, max) {
        if (max === undefined) {
            max = min, min = 0;
        }
        return function(n) {
            if (n >= min && n <= max) {
                return n;
            }
            return Math.min(min, Math.max(max, n));
        }
    }

    var Colorstream = (function(base) {
        var color = base || randomColor();

        function n
    })();
    function Colorstream(base) {
        this.color = base || randomColor();
    }
    Colorstream.prototype.next = function() {

    }
})();
