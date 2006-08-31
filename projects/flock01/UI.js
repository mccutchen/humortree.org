var UI = {
	timer : null,
	delay : 40,
	
	start : function start() {
		if(!this.timer)
			this.timer = window.setInterval('FlockWorld.tick();', this.delay);
		return false;
	},
	stop : function stop() {
		window.clearInterval(this.timer);
		this.timer = null;
		return false;
	},
	step : function step() {
		if(this.timer) this.stop();
		FlockWorld.tick();
		return false;
	},
	addBoid : function addBoid() {
		FlockWorld.flocks.lastElement().addNewBoid();
		return false;
	},
	addFlock : function addFlock() {
		FlockWorld.addNewFlock();
		return false;
	}
	
	/* 
	
	! not implemented !
	
	removeBoid : function removeBoid() {
		this.currentFlock.removeLastBoid();
		return false;
	},
	removeFlock : function removeFlock() {
		FlockWorld.remove(this.currentFlock);
		this.currentFlock = FlockWorld.flocks.lastElement();
		return false;
	},
	*/
};