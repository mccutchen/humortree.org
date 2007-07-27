package flock03;

import java.awt.*;

public class Renderer {
    
    static Color backgroundColor = Color.WHITE;
    static Color boidColor = Color.BLACK;
    
	public static void render(Graphics g) {
	    // fill in the background
		g.setColor(backgroundColor);
		g.fillRect(0,0, World.width, World.height);
		
		// render each boid
		for (Boid b : World.boids) {
		    render(b, g);
		}
	}
	public static void render(Boid b, Graphics g) {
	    g.setColor(boidColor);
		g.fillOval(
		    (int)b.position.x - Settings.BOID_RADIUS,
		    (int)b.position.y - Settings.BOID_RADIUS,
		    Settings.BOID_SIZE,
		    Settings.BOID_SIZE
		);		
	}
	public static void render(Obstacle o, Graphics g) {
		// pass
	}
}