package flock03;

import java.awt.*;

public class Renderer {
    
    static Color backgroundColor = Color.WHITE;
    
	public static void render(Graphics g) {
	    // fill in the background
		g.setColor(backgroundColor);
		g.fillRect(0,0, World.width, World.height);
		
		// render each obstacle
		for (Obstacle o: World.obstacles) {
		    render(o, g);
		}
		
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
		//renderVision(b, g);
		//renderBounds(b.getBounds(), g);
	}
	public static void render(Obstacle o, Graphics g) {
		g.setColor(o.color);
		g.fillOval(
		    (int)(o.position.x - o.radius),
		    (int)(o.position.y - o.radius),
		    (int)o.radius * 2,
		    (int)o.radius * 2
		);
		//renderBounds(o.getBounds(), g);
	}
	
	public static void renderVision(Boid b, Graphics g) {
	    g.setColor(Color.GRAY);
	    g.drawOval(
	        (int)(b.position.x - b.vision),
	        (int)(b.position.y - b.vision),
	        (int)(b.vision * 2),
	        (int)(b.vision * 2)
	    );
	}
	
	public static void renderBounds(Rectangle bounds, Graphics g) {
	    g.setColor(Color.RED);
	    g.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
	}
}