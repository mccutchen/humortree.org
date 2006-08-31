int W = 500, H = 200;
int FOCUS = rand(0,W);
int TARGET = rand(0,W);

Color[] colors = new Color[W];


// Spring simulation constants 
float M = 0.8;   // Mass 
float K = 0.2;   // Spring constant 
float D = 0.92;  // Damping 
 
// Spring simulation variables 
float ps = 0.0; // Position 
float vs = 0.0;  // Velocity 
float as = 0;    // Acceleration 
float f = 0;     // Force 

void updateSpring() 
{ 
  // Update the spring position 
  f = -K * (ps - TARGET);    // f=-ky 
  as = f / M;           // Set the acceleration, f=ma == a=f/m 
  vs = D * (vs + as);   // Set the velocity 
  ps = ps + vs;         // Updated position
  FOCUS = int(ps);
   
  if(abs(vs) < 0.01) { 
    vs = 0.0; 
  }
}


void setup() {
  size(500, 200);
  background(100);

  colors[0] = randomColor();

  println("Base Color: " + colors[0]);
  println("Focus: " + FOCUS);

  for(int i = 1; i < colors.length; i++) {
    colors[i] = fudgeColor(colors[i - 1]);
  }
}


void loop() {
  TARGET = mouseX;
  
  updateSpring();
  
  colors[FOCUS] = fudgeColor(colors[FOCUS]);
  
  // go left
  for(int i = 0; i < FOCUS; i++) {
    colors[i] = slightlyFudgeColor(colors[i + 1]);
  }


  // go right
  for(int i = colors.length - 1; i > FOCUS; i--) {
    colors[i] = slightlyFudgeColor(colors[i - 1]);
  }

  drawLines(colors);
  delay(40);
}

void drawLines(Color[] colors) {
  for(int i = 0; i < W; i++) {
    setStroke(colors[i]);
    line(i,0,i,H);
  }
}

void setStroke(Color c) {
  stroke(c.r, c.g, c.b);
}

int rand(int lo, int hi) {
  return int(random(lo,hi));
}

class Color {
  int r, g, b;

  public Color(int r, int g, int b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  public String toString() {
    return "rgb(" + r + "," + g + "," + b + ")";
  }
}

Color fudgeColor(Color baseColor) {
  return fudge(baseColor, 5, 20);
}

Color slightlyFudgeColor(Color baseColor) {
  return fudge(baseColor, 0, 3);
}

Color fudge(Color baseColor, int MIN_DIFF, int MAX_DIFF) {
  int dr = rand(MIN_DIFF, MAX_DIFF);
  int dg = rand(MIN_DIFF, MAX_DIFF);
  int db = rand(MIN_DIFF, MAX_DIFF);

  if(rand(0,10) % 2 == 0) dr *= -1;
  if(rand(0,10) % 2 == 0) dg *= -1;
  if(rand(0,10) % 2 == 0) db *= -1;

  return new Color(wrap(baseColor.r + dr,256), wrap(baseColor.g + dg,256), wrap(baseColor.b + db,256));
}

Color randomColor() {
  return new Color(rand(0,255),rand(0,255),rand(0,255));
}

int wrap(int n, int at) {
  return (n >= 0 && n < at) ? n : (n < 0) ? at + n : n - at;
}
