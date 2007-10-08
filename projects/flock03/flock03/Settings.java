package flock03;

public class Settings {
    public static int ANIMATION_DELAY = 30;
    public static int UPDATE_DELAY = ANIMATION_DELAY;
    
    public static int INITIAL_BOID_COUNT = 100;
    public static int BOID_SIZE = 12;
    public static int BOID_RADIUS = BOID_SIZE / 2;
    public static int BOID_TAIL_SIZE = 3;
    
    public static int BOID_MINIMUM_FRIENDLINESS = 5;
    public static int BOID_MAXIMUM_FRIENDLINESS = 20;
    
    public static int BOID_MINIMUM_VISION = 50;
    public static int BOID_MAXIMUM_VISION = 200;
    
    public static float MAX_ACCELERATION = 1;
    public static float MAX_VELOCITY = 4;
    public static float WANDER_SIZE = 2;
}