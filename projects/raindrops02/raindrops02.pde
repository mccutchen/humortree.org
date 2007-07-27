//float t = 0.0;
//float t_step = 0.01;

int DROP_COUNT = 500;
ArrayList RAINDROPS;

void setup() {
  size(800, 400);
  
  RAINDROPS = new ArrayList();
  for (int i = 0; i < DROP_COUNT; i++) {
    RAINDROPS.add(new Raindrop());
  }
}

void draw() {
  background(204);
  
  for (int i = 0; i < RAINDROPS.size(); i++) {
    Raindrop drop = (Raindrop)RAINDROPS.get(i);
    drop.update();
    drop.render();
  }
}

class Raindrop {
    float x, y;
    float r;
    color c;
    Tail tail;
    
    // values to feed to the noise generator
    float t, t_step;
    
    public Raindrop() {
        t = random(10000);
        t_step = 0.01;
        tail = new Tail(r, c);
        
        reset();
    }
    
    void update() {
        // add the last position to the tail
        tail.push(x, y);
        
        t += t_step;
        x = noise(t) * width;
        y += 1;
        
        if (y > height) {
            reset();
        }
        
        //println("Noise: " + noise(t) + " (from t " + t + ")");
    }
    
    void render() {
        // draw the tail first
        tail.render();
        
        // draw the current location
        fill(c);
        ellipse(x, y, r, r);
    }
    
    void updateAndRender() {
      update();
      render();
    }
    
    void reset() {
        y = random(height/3);
        r = random(3, 8);
        c = color(33);
    }
}

class Tail {
    float r;
    color c;
    ArrayList pieces = new ArrayList();
    
    static final int TAIL_LENGTH = 5;
    
    public Tail(float rr, color cc) {
        r = rr;
        c = cc;
    }
    
    void push(float x, float y) {
        pieces.add(new TailPiece(x, y, r, c));
        
        if (pieces.size() > TAIL_LENGTH) {
            pieces.remove(0);
        }
    }
    
    void render() {
        for (int i = 0; i < pieces.size(); i++) {
            TailPiece piece = (TailPiece)pieces.get(i);
            piece.render();
        }
    }
}

class TailPiece {
    float x, y;
    float r;
    color c;
    
    int step;
    
    public TailPiece(float xx, float yy, float rr, color cc) {
        x = xx;
        y = yy;
        r = max(rr - 2, 1);
        c = cc;
        step = 0;
    }
    
    void render() {
        fill(66);
        ellipse(x, y, r, r);
    }
}
