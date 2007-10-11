package flock03;

public class Settings {
    // Applet settings
    public static int ANIMATION_DELAY = 40;
    public static int UPDATE_DELAY = ANIMATION_DELAY;
    
    // World settings
    public static int INITIAL_BOID_COUNT = 100;
    public static int INITIAL_OBSTACLE_COUNT = 4;
    
    // Boid settings
    public static int BOID_SIZE = 12;
    public static int BOID_RADIUS = BOID_SIZE / 2;
    public static int BOID_TAIL_SIZE = 6;
    
    public static int BOID_MIN_FRIENDLINESS = 20;
    public static int BOID_MAX_FRIENDLINESS = 30;
    
    public static int BOID_MIN_VISION = 50;
    public static int BOID_MAX_VISION = 70;
    
    public static float MAX_ACCELERATION = 0.5f;
    public static float MAX_VELOCITY = 3;
    public static float WANDER_SIZE = 1;
    
    // Obstacle settings
    public static int OBSTACLE_SAFE_DISTANCE = 20;
}