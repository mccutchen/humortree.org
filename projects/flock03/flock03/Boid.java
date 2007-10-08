package flock03;

import java.util.Collection;
import java.awt.*;

import flock03.util.*;

public class Boid {
	public Vector2f position;
	public Vector2f velocity;
	public Color color;
	public Vector2f[] tail;
	
	public float MINIMUM_DISTANCE = 20;
	public float NEIGHBORHOOD_RADIUS = 50;
	
	public Boid() {
	    position = new Vector2f(MathUtils.rand(0f, World.width), MathUtils.rand(0f, World.height));
	    velocity = new Vector2f(MathUtils.rand(-2f, 2f), MathUtils.rand(-2f, 2f));
	    color = ColorUtils.fudge(World.baseColor, 2, 10);
	    
	    // Initialize the tail
	    tail = new Vector2f[Settings.BOID_TAIL_SIZE];
	    for (int i = 0; i < Settings.BOID_TAIL_SIZE; i++) {
	        tail[i] = new Vector2f(position);
	    }
	}
	public Boid(Vector2f position, Vector2f velocity) {
		this.position = position;
		this.velocity = velocity;
	}
	
	void update(Collection<Boid> neighborhood) {
	    Vector2f newSteering = Rules.apply(this, neighborhood);
	    limitAcceleration(newSteering);
	    
		velocity.add(newSteering);
		limitVelocity(velocity);
		
		// Update the tail
		for (int i = tail.length - 1; i > 0; i--) {
		    tail[i] = new Vector2f(tail[i-1]);
		}
		tail[0] = new Vector2f(position);
		
		// Update the position
		position.add(velocity);
		
		// Fudge the color a little bit
		//color = ColorUtils.fudge(color, 1, 5);
	}
	
	void limitAcceleration(Vector2f accel) {
	    limitMagnitude(accel, Settings.MAX_ACCELERATION);
	}
	
	void limitVelocity(Vector2f velocity) {
	    limitMagnitude(velocity, Settings.MAX_VELOCITY);
	}
	
	void limitMagnitude(Vector2f v, float max) {
	    if (v.magnitude() > max) {
	        v.normalize();
	        v.scale(max);
	    }
	}
	
	public Rectangle getBounds() {
	    return new Rectangle(
	        (int)position.x - Settings.BOID_RADIUS,
	        (int)position.y - Settings.BOID_RADIUS,
	        Settings.BOID_SIZE,
	        Settings.BOID_SIZE
	    );
	}
	
	
	public String toString() {
	    return "<Boid position=" + position + " velocity=" + velocity + ">";
	}
}