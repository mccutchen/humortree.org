// FlockArtist.java
// copyright © Will McCutchen - will@humortree.org

import java.awt.Graphics;
import java.awt.Color;

// The "view" of the flock... this class knows how to draw
// the birds and their vectors
public class FlockArtist {
    public static Color BACKGROUND_COLOR = Color.white;
    
    public static Color BIRD_COLOR = new Color(102,102,0);
    public static int BIRD_RADIUS = 4;
        
    public static Color FRIENDLINESS_COLOR = new Color(185,210,185);
    public static Color VISION_COLOR = new Color(240,240,240);
    
    public static int FILL_ALPHA = 20;
    public static Color VISION_FILL_COLOR = new Color(VISION_COLOR.getRed(), VISION_COLOR.getGreen(), VISION_COLOR.getBlue(), FILL_ALPHA);
    public static Color FRIENDLINESS_FILL_COLOR = new Color(FRIENDLINESS_COLOR.getRed(), FRIENDLINESS_COLOR.getGreen(), FRIENDLINESS_COLOR.getBlue(), FILL_ALPHA);
    
    public static Color STEERING_COLOR = FRIENDLINESS_COLOR;
    public static Color VELOCITY_COLOR = BIRD_COLOR;
    public static int VECTOR_MULTIPLIER = 10;
    
    public static boolean DRAW_BODY = true;
    public static boolean DRAW_STEERING = true;
    public static boolean DRAW_VELOCITY = true;
    public static boolean DRAW_VISION = true;
    public static boolean DRAW_FRIENDLINESS = true;
    public static boolean DRAW_FILL = false;
    
    public static void paintBird(Bird bird, Graphics graphics) {
        Vector velocity = bird.getVelocity();
        Vector steering = bird.getSteering();
        Vector position = bird.getPosition();
        int x = (int)Math.round(position.getX());
        int y = (int)Math.round(position.getY());
        
        // bird vision
        if(DRAW_VISION) {
            if(DRAW_FILL) {
                graphics.setColor(VISION_FILL_COLOR);
                graphics.fillOval(x - (int)bird.VISION, y - (int)bird.VISION, (int)bird.VISION*2,(int)bird.VISION*2);
            }
            graphics.setColor(VISION_COLOR);
            graphics.drawOval(x - (int)bird.VISION, y - (int)bird.VISION, (int)bird.VISION*2,(int)bird.VISION*2);
        }
        // bird friendliness
        if(DRAW_FRIENDLINESS) {
            if(DRAW_FILL) {
                graphics.setColor(FRIENDLINESS_FILL_COLOR);
                graphics.fillOval(x - (int)bird.FRIENDLINESS, y - (int)bird.FRIENDLINESS, (int)bird.FRIENDLINESS*2,(int)bird.FRIENDLINESS*2);
            }
            graphics.setColor(FRIENDLINESS_COLOR);
            graphics.drawOval(x - (int)bird.FRIENDLINESS, y - (int)bird.FRIENDLINESS, (int)bird.FRIENDLINESS*2,(int)bird.FRIENDLINESS*2);
        }
        
        // steering vector
        if(DRAW_STEERING) {
            paintVector((Vector)steering.clone(), x, y, STEERING_COLOR, graphics);
        }
        
        // velocity vector
        if(DRAW_VELOCITY) {
            paintVector((Vector)velocity.clone(), x, y, VELOCITY_COLOR, graphics);
        }
        
        // bird body
        if(DRAW_BODY) {
            graphics.setColor(BIRD_COLOR);
            graphics.fillOval(x - BIRD_RADIUS, y - BIRD_RADIUS, BIRD_RADIUS*2, BIRD_RADIUS*2);
        }
    }
    public static void paintVector(Vector vector, int x, int y, Color color, Graphics graphics) {
        graphics.setColor(color);
        vector.normalize();
        vector.scale(VECTOR_MULTIPLIER);
        if(color.equals(STEERING_COLOR)) {
            vector.scale(2);
        }
        
        graphics.drawLine(x, y, x + (int)Math.round(vector.getX()), y + (int)Math.round(vector.getY()));
    }
}