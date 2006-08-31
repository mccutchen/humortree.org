int numCoords = 4;

int[] X = new int[numCoords];
int[] Y = new int[numCoords];
int last = numCoords - 1;
Color currentColor = randomColor();

float stroke = .5;
float strokeDelta = .5;
float strokeLimit = 20;

Cursor cursor = new Cursor();

boolean GO = true;

void setup() {  
  size(800, 300);
  noBackground();
  strokeWidth(1.5);
}  

void loop()  {
  
  if(!GO) return;
  
  push(X, cursor.x);
  push(Y, cursor.y);
  
  beginShape(LINE_STRIP);
  setStroke(currentColor);
  strokeWidth(stroke);
  currentColor = (mousePressed) ? fudgeColor(currentColor) : slightlyFudgeColor(currentColor);
  for(int i = 0; i < numCoords; i++) {
    bezierVertex(X[i], Y[i]);
  }
  endShape();
  
  cursor.update();
  
  stroke += strokeDelta;
  if(stroke >= strokeLimit) strokeDelta *= -1;
  if(stroke <= .5) strokeDelta *= -1;
}

void keyPressed() {
  if(key == ' ') GO = (!GO);
}

void push(int[] arr, int val) {
  for(int i = 1; i < arr.length; i++)
    arr[i - 1] = arr[i];
  arr[arr.length - 1] = val;
}

class Cursor {
  int DELTA = 20;
  int x, y;
  public Cursor() {
    x = rand(0, width);
    y = rand(0, height);
  }
  void update() {
    x = wrap(x + rand(-DELTA,DELTA), width);
    y = wrap(y + rand(-DELTA,DELTA), height);
  }
}


class Color {
  int r, g, b;
  public Color(int r, int g, int b) {
    this.r = r;
    this.b = b;
    this.g = g;
  }
}

void setStroke(Color c) {
  stroke(c.r, c.g, c.b);
}
int rand(int lo, int hi) {
  return int(random(lo,hi));
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