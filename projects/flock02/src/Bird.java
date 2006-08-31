// Bird.java
// copyright © Will McCutchen - will@humortree.org

// the bird object... with randomly-generated attributes,
// and three vectors: position, velocity, steering
public class Bird {
    
    // default values
    public static int DEFAULT_VECTOR_MIN = -2;
    public static int DEFAULT_VECTOR_MAX = 2;
    
    public static int DEFAULT_MAX_SPEED_MIN = 4;
    public static int DEFAULT_MAX_SPEED_MAX = 8;
    public static int DEFAULT_MIN_SPEED = 0;
    
    public static int DEFAULT_MAX_ACCEL_MIN = 2;
    public static int DEFAULT_MAX_ACCEL_MAX = 5;
    public static int DEFAULT_MIN_ACCEL = 0;
    
    public static int DEFAULT_VISION_MIN = 80;
    public static int DEFAULT_VISION_MAX = 120;
    
    public static int DEFAULT_FRIENDLINESS_MIN = 20;
    public static int DEFAULT_FRIENDLINESS_MAX = 50;
    
    // initialize this bird's attributes
    public double MAX_SPEED = Util.dRand(DEFAULT_MAX_SPEED_MIN,DEFAULT_MAX_SPEED_MAX);
    public double MIN_SPEED = DEFAULT_MIN_SPEED;
    public double MAX_ACCEL = Util.dRand(DEFAULT_MAX_ACCEL_MIN,DEFAULT_MAX_ACCEL_MAX);
    public double MIN_ACCEL = DEFAULT_MIN_ACCEL;
    public double VISION = Util.dRand(DEFAULT_VISION_MIN,DEFAULT_VISION_MAX);
    public double FRIENDLINESS = Util.dRand(DEFAULT_FRIENDLINESS_MIN,DEFAULT_FRIENDLINESS_MAX);
    
    private int myId;
    private Vector myVelocity, mySteering, myPosition;

    public Bird() {
        myVelocity = new Vector(Util.dRand(DEFAULT_VECTOR_MIN,DEFAULT_VECTOR_MAX), Util.dRand(DEFAULT_VECTOR_MIN,DEFAULT_VECTOR_MAX));
        mySteering = new Vector(Util.dRand(DEFAULT_VECTOR_MIN,DEFAULT_VECTOR_MAX), Util.dRand(DEFAULT_VECTOR_MIN,DEFAULT_VECTOR_MAX));
        myPosition = new Vector(Util.dRand(0,World.getWidth()), Util.dRand(0,World.getHeight()));
    }

    public int getId() { return myId; }
    public void setId(int id) { myId = id; }

    public Vector getVelocity() { return myVelocity; }
    public Vector getSteering() { return mySteering; }
    public Vector getPosition() { return myPosition; }
    public void setVelocity(Vector velocity) { myVelocity = velocity; }
    public void setPosition(Vector position) { myPosition = position; }
    public void setSteering(Vector steering) { mySteering = steering; }
    
    public void update() {
        FlockingRules.apply(this);
    }

    public String toString() {
        String s = "";
        s += "Id: " + getId() + "\n";
        s += "Position: (" + getPosition().getX() + ", " + getPosition().getY() + ")\n";
        s += "Velocity: " + getVelocity() + "\n";
        s += "Steering: " + getSteering() + "\n";
        return s;
    }
}