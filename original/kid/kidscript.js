var xx = 0;
var xpos = 0;
var step = 10;
var inc = 1;
var flag = 2;
var init_flag = 0;

var width;

PhysicsModel = {
    position: 0,
    friction: 6,
    elasticity: 1.2,
    velocity: 0,
    target: 0,
    timer: null,
    callback: 'function() { return; }',
    
    step: function() {
        var dx = this.target - this.position;
        this.velocity = (this.velocity + (dx / this.friction)) / this.elasticity;
        this.position += this.velocity;
        this.callback.call(position);
    }
};

function ani1(step) {
	var delay = 3500;
	if(step != -1) {
		xx += inc;
		window.scroll(xx,0);
		
		if(xx == 3072) {
			step = -1;
			delay = 7500;
		}
		if(xx == width || xx == width*2 || xx == width*3)
			setTimeout("ani1('" + step + "');",delay);				
		else
			setTimeout("ani1('" + step + "');",0);
	}	
	else
		ani2('left',16);
}
	 
function ani2(dir,inc) {
	if (flag < 25) {
		if (inc > 3072)
			inc = 25;	
		inc *= Math.floor( (flag*flag) / 2);
	
		if (dir == 'left') xx -= inc;
		else xx += inc;
				
		if (xx < 1) {
			dir = 'right';
		}
		if (xx >= 3072) {
			dir = 'left';
			flag++;
		}
		
		window.scroll(xx,0);
		setTimeout("ani2('" + dir + "','" + inc + "');",50);
	}
			
	else {
		window.scroll(0,0);
		if(document.all.finished)
			document.all.finished.innerHTML = "<a href='../colors class="savedWord"' target='_parent'>finished? continue-&gt;</a>";
		document.bgColor="#000000";
	}			
}

$(function() {
    width = $('#intro').width();
    PhysicsModel.target = width;
    PhysicsModel.callback = function(position) {
        window.scroll(position, 0);
    }
    PhysicsModel.callback = 'sex';
    
    alert("About to animate");
    setInterval(PhysicsModel.step, 20);
    
    // flag++;
    //  if(flag == 3)
    //      ani1(1);
});
