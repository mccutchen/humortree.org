package flock03;

import java.awt.*;

public class Obstacle extends Boid {
	public Vector2f position;
	public Vector2f velocity;
	
	public float radius = 50;
	
	public Obstacle() {
		position = new Vector2f(200, 300);
		velocity = new Vector2f(0,0);
	}
	
	public void update() {
		// do nothing... obstacles don't move
	}
	
	public Rectangle getBounds() {
	    return new Rectangle(
	        (int)(position.x - radius),
	        (int)(position.y - radius),
	        (int)radius * 2,
	        (int)radius * 2
	    );
	}
}
