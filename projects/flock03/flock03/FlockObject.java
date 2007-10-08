package flock03;

import java.util.Collection;
import java.awt.Color;
import java.awt.Rectangle;

public abstract class FlockObject {
	public Vector2f position;
	public Vector2f velocity;
	public float radius;
	public Color color;
	
	public abstract void update(Collection<FlockObject> neighborhood);
	
	public Rectangle getBounds() {
	    // The bounds are expanded to cover a safe distance from any
	    // obstacles.
	    return new Rectangle(
	        (int)(position.x - radius) - Settings.OBSTACLE_SAFE_DISTANCE,
	        (int)(position.y - radius) - Settings.OBSTACLE_SAFE_DISTANCE,
	        (int)(radius + Settings.OBSTACLE_SAFE_DISTANCE) * 2,
	        (int)(radius + Settings.OBSTACLE_SAFE_DISTANCE) * 2
	    );
	}
}
