package flock03;

import java.awt.*;

public class Renderer {
    
    static Color backgroundColor = Color.WHITE;
    
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
	    // Draw the tail pieces
	    g.setColor(b.color.brighter());
	    for (Vector2f tailPiece : b.tail) {
	        g.fillOval(
    	        (int)tailPiece.x - (Settings.BOID_RADIUS / 2),
    	        (int)tailPiece.y - (Settings.BOID_RADIUS / 2),
    	        Settings.BOID_SIZE / 2,
    	        Settings.BOID_SIZE / 2
    	    );
	    }
	    
	    // Draw the head
	    g.setColor(b.color);        
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