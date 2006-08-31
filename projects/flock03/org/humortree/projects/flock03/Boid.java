package org.humortree.projects.flock03;

import java.util.Collection;

public class Boid {
	public Vector2f position;
	public Vector2f velocity;
	
	public float MINIMUM_DISTANCE = 100.0f;
	public float NEIGHBORHOOD_RADIUS = 100.0f;
	
	public Boid() {
		this(new Vector2f(), new Vector2f());
	}
	public Boid(Vector2f position, Vector2f velocity) {
		this.position = position;
		this.velocity = velocity;
	}
	
	void update(Collection<Boid> neighborhood) {
		velocity.add(new Vector2f(1.0f, 1.0f));
	}
}