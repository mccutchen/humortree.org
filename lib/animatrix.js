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
    animate: function(drawFn, setupFn, canvasEl, containerEl) {
        var canvas = canvasEl || document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            step = 0,
            initialState = (setupFn !== undefined) ? setupFn(ctx) : null;

        if (!canvasEl) {
            (containerEl || document.body).appendChild(canvas);
        }

        (function loop(step, state) {
            window.requestAnimationFrame(function() {
                loop(step + 1, drawFn(ctx, step, state));
            }, canvas);
        })(0, initialState);
    }
};
