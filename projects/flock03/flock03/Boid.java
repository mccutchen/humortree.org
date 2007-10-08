package flock03;
import flock03.util.*;

import java.util.Collection;
import java.awt.Color;

public class Boid extends FlockObject {
	public Vector2f[] tail;
	public Color tailColor;
	
	public float MINIMUM_DISTANCE = 20;
	public float NEIGHBORHOOD_RADIUS = 50;
	
	public Boid() {
	    // Put it in a random position
	    position = World.randomPosition();
	    
	    // Start it going nowhere
	    velocity = new Vector2f(0, 0);
	    
	    // Assign a radius (static, for now)
	    radius = Settings.BOID_RADIUS;
	    
	    // Generate a color like the base Boid color
	    color = ColorUtils.fudge(World.boidColor, 2, 10);
	    tailColor = color.brighter();
	    
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
	
	public void update(Collection<FlockObject> neighborhood) {
	    // Calculate a new steering vector
	    Vector2f newSteering = Rules.apply(this, neighborhood);
	    
	    // Dampen the acceleration of the new steering vector
	    limitAcceleration(newSteering);
	    
	    // Add it to the velocity and limit the total velocity
		velocity.add(newSteering);
		limitVelocity(velocity);
		
		// Update the tail's position(s)
		for (int i = tail.length - 1; i > 0; i--) {
		    tail[i] = new Vector2f(tail[i-1]);
		}
		tail[0] = new Vector2f(position);
		
		// Update the position
		position.add(velocity);
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
	
	public String toString() {
	    return "<Boid position=" + position + " velocity=" + velocity + ">";
	}
}