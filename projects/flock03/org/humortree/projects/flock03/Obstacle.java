package org.humortree.projects.flock03;

public class Obstacle extends Boid {
	public Vector2f position;
	public Vector2f velocity;
	
	public Obstacle() {
		position = new Vector2f();
		velocity = new Vector2f(0,0);
	}
	
	public void update() {
		// do nothing... obstacles don't move
	}
}
