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
    },
}


var Raindrops = {
    raindrops: [],
    
    container_id: 'surface',
    container: null,
    container_width: 0,
    container_height: 0,
    
    initial_count: 15,
    delay: 40,
    timer: null,
    
    t_steps: [1, .5, Math.PI/6, Math.PI/4, 1.5],
    slope_min: -1,
    slope_max: 1,
    t_mod_min: 1,
    t_mod_max: 6,
    sine_mod_min: 1,
    sine_mod_max: 6,
    
    drop_left: 'img/drop_left.gif',
    drop_right: 'img/drop_right.gif',
    drop_center: 'img/drop_center.gif',
    
    init: function() {
        Raindrops.container = $('#' + Raindrops.container_id)
        Raindrops.container_width = Raindrops.container.width()
        Raindrops.container_height = Raindrops.container.height()
        
        Raindrops.add(Raindrops.initial_count)
        Raindrops.start()
        
        $('form').submit(function () {
            return false
        })
        $('#add_drops').click(function() {
            console.debug('Adding %d raindrops', $('#drops').attr('value'))
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
    },
    
    add: function(count) {
        count = count || 1
        for (var i = 0; i < count; i++) {
            var el = $('<img src="drop_center.gif" class="raindrop" alt="">').appendTo(Raindrops.container)
            var drop = new Raindrop(el)
            drop.init()
            Raindrops.raindrops.push(drop)
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
    
    this.t = 0
	this.slope = 0
	this.t_step = 0
	this.t_mod = 0
	this.sine_mod = 0
	this.period  = 0
    
    this.init = function() {
        this.left = Utils.randInt(Raindrops.container.width())
        this.top = Utils.randInt(Raindrops.container.height() / 2)
        this.el.css({
            left: this.left,
            top: this.top,
        })
        this.reset()
	}
	
	this.reset = function() {
	    this.t = 0
		this.slope = Utils.randFloat(Raindrops.slope_min, Raindrops.slope_max)
		this.t_step = Utils.randChoice(Raindrops.t_steps)
		this.t_mod = Utils.randInt(Raindrops.t_mod_min, Raindrops.t_mod_max)
	    this.sine_mod = Utils.randInt(Raindrops.sine_mod_min, Raindrops.sine_mod_max)
		this.period  = this.t_mod * 2 * Math.PI
	}
	
	this.update = function() {
	    if (this.top > Raindrops.container_height) {
	        this.init()
	        return true
	    }
	    
	    if (this.t > this.period) {
	        this.reset();
        }
        
        this.t += this.t_step;
        
        var oldleft = this.left
        var oldtop = this.top
		
		this.left = Math.round(Math.sin(this.t / this.t_mod) * this.sine_mod + this.left + this.slope)
		this.top += Math.round(this.t_step)
		
		this.el.css({
		    left: this.left,
		    top: this.top,
		})
		
		if (this.left < oldleft)
		    this.el.attr('src', Raindrops.drop_left)
		else if (this.left > oldleft)
		    this.el.attr('src', Raindrops.drop_right)
		else
		    this.el.attr('src', Raindrops.drop_center)
    }
}

// hook up events
$(Raindrops.init)