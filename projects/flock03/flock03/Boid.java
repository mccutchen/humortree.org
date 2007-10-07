package flock03;

import java.util.Collection;
import java.awt.Color;

import flock03.util.MathUtils;

public class Boid {
	public Vector2f position;
	public Vector2f velocity;
	public Color color;
	
	public float MINIMUM_DISTANCE = 40.0f;
	public float NEIGHBORHOOD_RADIUS = 100.0f;
	
	public Boid() {
	    position = new Vector2f(MathUtils.rand(0f, World.width), MathUtils.rand(0f, World.height));
	    velocity = new Vector2f(MathUtils.rand(-2f, 2f), MathUtils.rand(-2f, 2f));
	    color = new Color(MathUtils.rand(0, 255), MathUtils.rand(0, 255), MathUtils.rand(0, 255));
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