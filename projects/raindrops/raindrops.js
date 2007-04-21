var Utils = {
    randInt: function(lo, hi) {
        hi = hi || lo; lo = (hi == lo) ? 0 : lo
        return Math.floor(Math.random() * (hi - lo)) + lo
    },
    randFloat: function(lo, hi) {
        hi = hi || lo; lo = (hi == lo) ? 0 : lo
        return Math.random() * (hi - lo) + lo
    },
    randChoice: function(array) {
        return array[Utils.randInt(array.length - 1)]
    }
}


var Raindrops = {
    // Array to hold the individual Raindrop objects
    raindrops: [],
    
    // The HTML element that will contain the Raindrops
    container_id: 'surface',
    container: null,
    container_width: 0,
    container_height: 0,
    
    // Some basic settings
    initial_count: 15,
    delay: 40,
    timer: null,
    
    // Bounds on the various values for Raindrop objects.  The values for
    // each Raindrop will be randomly-chosen numbers between these bounds.
    t_step_min: 0.5,
    t_step_max: 3,
    slope_min: -1,
    slope_max: 1,
    t_mod_min: 1,
    t_mod_max: 6,
    sine_mod_min: 1,
    sine_mod_max: 10,
    
    // Paths to the images used for the Raindrops
    drop_left: 'img/drop_left.gif',
    drop_right: 'img/drop_right.gif',
    drop_center: 'img/drop_center.gif',
    
    init: function() {
        // Initialize the container object
        Raindrops.container = $('#' + Raindrops.container_id)
        Raindrops.container_width = Raindrops.container.width()
        Raindrops.container_height = Raindrops.container.height()
        
        // Create the initial set of Raindrops and start animating them
        Raindrops.add(Raindrops.initial_count)
        Raindrops.start()
        
        // Hook up events so the user can control the Raindrops
        $('#add_drops').click(function() {
            Raindrops.add(parseInt($('#drops').attr('value')))
            return false
        })
        $('#start_pause').click(function() {
            if (Raindrops.timer) {
                Raindrops.stop()
                this.value = 'Start'
            } else {
                Raindrops.start()
                this.value = 'Pause'
            }
            return false
        })
        $('form').submit(function () {
            return false
        })
    },
    
    add: function(count) {
        count = count || 1
        for (var i = 0; i < count; i++) {
            var el = $('<img src="drop_center.gif" class="raindrop" alt="">').appendTo(Raindrops.container)
            Raindrops.raindrops.push(new Raindrop(el))
        }
    },
    
    update: function() {
        $.each(Raindrops.raindrops, function(i, drop) {
            drop.update()
        })
    },
    
    start: function() {
        Raindrops.timer = setInterval(Raindrops.update, Raindrops.delay)
    },
    stop: function() {
        clearInterval(Raindrops.timer)
        Raindrops.timer = null
    }
}

var Raindrop = function(el) {
    this.el = el
    this.left = 0
    this.top = 0
    
    // Math values affecting the animation
    this.t = 0
    this.slope = 0
    this.t_step = 0
    this.t_mod = 0
    this.sine_mod = 0
    this.period  = 0
    
    this.init = function() {
        // Give this Raindrop a random starting position
        this.left = Utils.randInt(Raindrops.container.width())
        this.top = Utils.randInt(Raindrops.container.height() / 2)
        this.el.css({
            left: this.left,
            top: this.top
        })
        
        // Reset the math values
        this.reset()
    }
    
    this.reset = function() {
        this.t = 0
        this.slope = Utils.randFloat(Raindrops.slope_min, Raindrops.slope_max)
        this.t_step = Utils.randFloat(Raindrops.t_step_min, Raindrops.t_step_max)
        this.t_mod = Utils.randInt(Raindrops.t_mod_min, Raindrops.t_mod_max)
        this.sine_mod = Utils.randInt(Raindrops.sine_mod_min, Raindrops.sine_mod_max)
        this.period  = this.t_mod * 2 * Math.PI
    }
    
    this.update = function() {
        if (this.top > Raindrops.container_height) {
            // This Raindrop has moved off of the bottom of the container,
            // so we recreate it and skip the rest of this function
            this.init()
            return true
        }
        
        if (this.t > this.period) {
            // This Raindrop has completed one period of animation, so we
            // give it new math values to change its movement
            this.reset();
        }
        
        this.t += this.t_step
        
        var oldleft = this.left
        var oldtop = this.top
        
        this.left += Math.round(Math.sin(this.t / this.t_mod) * this.sine_mod +  this.slope)
        this.top += Math.round(this.t_step)
        this.el.css({
            left: this.left,
            top: this.top
        })
        
        // Figure out which image to use for this Raindrop
        if (this.left < oldleft)
            this.el.attr('src', Raindrops.drop_left)
        else if (this.left > oldleft)
            this.el.attr('src', Raindrops.drop_right)
        else
            this.el.attr('src', Raindrops.drop_center)
    }
    
    // Initialize this Raindrop on construction
    this.init()
}

// Initialize the Raindrops when the DOM is ready
$(Raindrops.init)