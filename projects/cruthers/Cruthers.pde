int W = 800, H = 300;
int FOCUSx2 = rand(0,W/4);
int FOCUSx3 = rand(0,W/8);
int FOCUSx4 = rand(0,W/16);

Color[] x2 = new Color[W/4];
Color[] x3 = new Color[W/8];
Color[] x4 = new Color[W/16];

void setup() {
  size(800, 300);
  background(100);

  x2[0] = randomColor();
  x3[0] = randomColor();
  x4[0] = randomColor();

  for(int i = 1; i < x2.length; i++) {
    x2[i] = fudgeColor(x2[i - 1]);
  }
  for(int i = 1; i < x3.length; i++) {
    x3[i] = fudgeColor(x3[i - 1]);
  }
  for(int i = 1; i < x4.length; i++) {
    x4[i] = fudgeColor(x4[i - 1]);
  }
}

void loop() {

  /* Just too complicated for me to deal with right now
  FOCUSx2 = (mouseY <= 100) ? mouseX / 4 : FOCUSx2;
  FOCUSx3 = (mouseY > 100 && mouseY <= 200) ? mouseX / 8 : FOCUSx3;
  FOCUSx4 = (mouseY > 200) ? mouseX / 16 : FOCUSx4;
  */

  FOCUSx2 = mouseX / 4;
  FOCUSx3 = mouseX / 8;
  FOCUSx4 = mouseX / 16;

  x2[FOCUSx2] = (mousePressed && mouseY <= 100) ? fudgeColor(x2[FOCUSx2]) : slightlyFudgeColor(x2[FOCUSx2]);
  x3[FOCUSx3] = (mousePressed && mouseY > 100 && mouseY <= 200) ? fudgeColor(x3[FOCUSx3]) : slightlyFudgeColor(x3[FOCUSx3]);
  x4[FOCUSx4] = (mousePressed && mouseY > 200) ? fudgeColor(x4[FOCUSx4]) : slightlyFudgeColor(x4[FOCUSx4]);

  // go left
  for(int i = 0; i < FOCUSx2; i++) {
    x2[i] = slightlyFudgeColor(x2[i + 1]);
    if(i < FOCUSx3) x3[i] = slightlyFudgeColor(x3[i + 1]);
    if(i < FOCUSx4) x4[i] = slightlyFudgeColor(x4[i + 1]);
  }

  // go right
  for(int i = x2.length - 1; i > FOCUSx4; i--) {
    if(i > FOCUSx2) x2[i] = slightlyFudgeColor(x2[i - 1]);
    if(i < x3.length && i > FOCUSx3) x3[i] = slightlyFudgeColor(x3[i - 1]);
    if(i < x4.length) x4[i] = slightlyFudgeColor(x4[i - 1]);
  }

  drawLines();
  //delay(100);
}

void drawLines() {
  int x = -4;
  for(int i = 0; i < x2.length; i++) {
    noStroke();
    setFill(x2[i]);
    rect(x+=4,0,4,100);
  }

  x = -8;
  for(int i = 0; i < x3.length; i++) {
    noStroke();
    setFill(x3[i]);
    rect(x+=8,100,8,100);
  }

  x = -16;
  for(int i = 0; i < x4.length; i++) {
    noStroke();
    setFill(x4[i]);
    rect(x+=16,200,16,100);
  }
}

void setStroke(Color c) {
  stroke(c.r, c.g, c.b);
}
void setFill(Color c) {
  fill(c.r, c.g, c.b);
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
  if(n >= 0 && n < at) return n;
  else if(n < 0) return at + n;
  else return n - at;
}
