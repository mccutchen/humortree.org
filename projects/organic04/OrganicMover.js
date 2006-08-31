// OrganicMover.js

function OrganicMover(id) {
	this.id		= id;
	this.style	= null;
	this.x		= null;
	this.y		= null;
	this.step	= rand(5,10);
	this.angle	= new OrganicAngle( 20 ); // requires OrganicAngle.js
}

OrganicMover.prototype.move = function move() {
	var a = this.angle.next();
	var dx = Math.ceil(sine[a] * this.step); // what to change x by
	var dy = Math.ceil(cosine[a] * this.step); // what to change y by
	this.x = World.wrapx(this.x + dx);
	this.y = World.wrapy(this.y + dy);
	this.style.left = this.x + "px";
	this.style.top = this.y + "px";
}

OrganicMover.prototype.create = function create() {
	var me = document.createElement("img");
		me.style.position = "absolute";
		me.style.left = (World.width/2 - 2) + "px";
		me.style.top = (World.height/2 - 2) + "px";
		me.setAttribute("id",this.id);
		me.setAttribute("src","org.gif");
		me.setAttribute("height",5);
		me.setAttribute("width",5);
		me.onmouseover = showProperties;
		me.onmouseout = showProperties;
	World.obj.appendChild(me);
	
	this.style = me.style;
	this.x = parseInt(this.style.left);
	this.y = parseInt(this.style.top);
}

OrganicMover.prototype.destroy = function destroy() {
	var me = document.getElementById(this.id);
	World.obj.removeChild(me);
}