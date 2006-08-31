int NUM_COORDS = 4;
boolean GO = true;

Cursor cursor = new Cursor();
Peinter peinter = new Peinter(new FudgeableColor(rand(0,255), rand(0,255), rand(0,255)));

void setup() {  
	size(800, 300);
	noBackground();
	strokeWidth(1.5);
}  

void loop()  {
	if(!GO) return;
	
	peinter.addCoords(cursor.x, cursor.y);
	peinter.peint();
	cursor.update();
}

// pause animation if the spacebar is pressed
void keyPressed() {
	if(key == ' ') GO = (!GO);
}



// Peinter
// does the actual drawing
class Peinter {
	public static final int NUM_COORDS = 4;
	
	float stroke = .5;
	float strokeDelta = .5;
	float strokeLimit = 20;
	
	FudgeableColor c;
	int[] x, y;
	
	public Peinter(FudgeableColor c) {
		this.c = c;
		x = new int[NUM_COORDS];
		y = new int[NUM_COORDS];
	}
	
	// give the peinter somewhere new to paint
	void addCoords(int newx, int newy) {
		for(int i = 1; i < NUM_COORDS; i++) {
			x[i - 1] = x[i];
			y[i - 1] = y[i];
		}
		x[x.length - 1] = newx;
		y[y.length - 1] = newy;
	}
	
	void peint() {
		// if the mouse is pressed, pick a more 'fudged' color
		c = (mousePressed) ? c.reallyFudge() : c.slightlyFudge();
		setStroke(c);
		strokeWidth(stroke);
		
		// the brush strokes are a series of bezierVertexes
		beginShape(LINE_STRIP);
		for(int i = 0; i < NUM_COORDS; i++) {
			bezierVertex(x[i], y[i]);
		}
		endShape();
		
		// modify the stroke weight a little bit
		stroke += strokeDelta;
		if(stroke >= strokeLimit) strokeDelta *= -1;
		if(stroke <= .5) strokeDelta *= -1;
	}
}


// Cursor
// provides some random movement for a Peinter to follow
class Cursor {
	int delta = 20;
	int x, y;
	
	public Cursor() {
		x = rand(0, width);
		y = rand(0, height);
	}
	
	void update() {
		x = wrap(x + rand(-delta,delta), width);
		y = wrap(y + rand(-delta,delta), height);
	}
}


// FudgeableColor
// a color that can be changed just a little bit,
// to produce a new color that is random but is
// similar to the original color...
class FudgeableColor {
	int r, g, b;
	public FudgeableColor(int r, int g, int b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
	FudgeableColor slightlyFudge() {
		return fudge(0,3);
	}
	FudgeableColor reallyFudge() {
		return fudge(5,20);
	}
	FudgeableColor fudge(int min_diff, int max_diff) {
		int dr = rand(min_diff, max_diff);
		int dg = rand(min_diff, max_diff);
		int db = rand(min_diff, max_diff);
		
		if(rand(0,10) % 2 == 0) dr *= -1;
		if(rand(0,10) % 2 == 0) dg *= -1;
		if(rand(0,10) % 2 == 0) db *= -1;
		
		return new FudgeableColor(wrap(r + dr,256), wrap(g + dg,256), wrap(b + db,256));
	}
}


/////////////////////////////
//    utility functions    //
/////////////////////////////
void setStroke(FudgeableColor c) {
	stroke(c.r, c.g, c.b);
}

int rand(int lo, int hi) {
	return int(random(lo,hi));
}

int wrap(int n, int at) {
	return (n >= 0 && n < at) ? n : (n < 0) ? at + n : n - at;
}
