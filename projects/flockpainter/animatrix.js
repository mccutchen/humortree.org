var Animatrix = {
    /**
     * Create and run an animation.
     * 
     * @param drawFn {function(context, step, ?state)} the function to call on
     * every frame of the animation, where `step` is the current frame number
     * and `state` is an optional, arbitrary value returned from the last call
     * to `drawFn`.
     * 
     * @param setupFn {?function(context)} the function to call after the
     * <canvas> element is created but before the animation has started.
     * 
     * @param containerEl {?Element} the element to which the <canvas> should
     * be appended. Defaults to `document.body`.
     * 
     * @returns {null}
     */
    animate: function create(drawFn, setupFn, containerEl) {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            step = 0;

        (containerEl || document.body).appendChild(canvas);
        
        if (setupFn !== undefined){
            setupFn(ctx);
        }

        (function loop(step, state) {
            window.requestAnimationFrame(function() { 
                loop(step + 1, drawFn(ctx, step, state));
            }, canvas);
        })(0, null);
    }
};


// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
// https://gist.github.com/1579671
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
