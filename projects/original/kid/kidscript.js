var xx = 0;
var xpos = 0;
var step = 10;
var inc = 16;
var flag = 2;
var init_flag = 0;
		
function init() {
	flag++;
	if(flag == 3)
		ani1(10);
}

function ani1(step) {
	var delay = 3500;
	if(step != -1) {
		xx += inc;
		window.scroll(xx,0);
		
		if(xx == 3072) {
			step = -1;
			delay = 7500;
		}
		if(xx == 1024 || xx == 2048 || xx == 3072)
			setTimeout("ani1('" + step + "');",delay);				
		else
			setTimeout("ani1('" + step + "');",75);
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
			document.all.finished.innerHTML = "<a href='../colors/index.html' target='_parent'>finished? continue-&gt;</a>";
		document.bgColor="#000000";
	}			
}
