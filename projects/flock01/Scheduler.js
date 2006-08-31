//==============================================================//
//	Color.js
//	copyright © 2001-2009 Will McCutchen
//	will@shifk.com
//==============================================================//

var Scheduler = {

	DEFAULT_DELAY : 50,
	queue : new Array(),
	timer : null,
	index : 0,
	
	add : function(object) {
		if(object.tick) {
			this.queue[this.index] = object;
			this.enable(this.index);
			return this.index++;
		} else { return -1; }
	},
	
	tick : function() {
		for(var i = 0; i < this.queue.length; i++)
			if(this.queue[i].ENABLED)
				this.queue[i].tick();
	},
	
	find : function(id) {
		for(var i = 0; i < this.queue.length; i++)	if(this.queue[i].id && this.queue[i].id == id) return i;
		return -1;
	},
	
	start : function(delay) {
		this.timer = window.setInterval(	"Scheduler.tick()",
													(delay > 0) ? delay : this.DEFAULT_DELAY );
	},
	
	stop : function(pause, delay) {
		window.clearInterval(this.timer);
		if(pause > 0) setTimeout("Scheduler.run(" + delay + ");", pause);
	},
	
	enable	: function(id) { this.queue[id].ENABLED = true; },
	disable	: function(id) { this.queue[id].ENABLED = false; },
	create	: function() { return this; }
};