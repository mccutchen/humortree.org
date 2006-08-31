package org.humortree.projects.flock03;

import java.util.ArrayList;

public class World {
	public ArrayList<Boid> boids;
	public ArrayList<Obstacle> obstacles;
	
	public int width;
	public int height;
	
	public World(int width, int height) {
		this.width = width;
		this.height = height;
		
		boids = new ArrayList<Boid>();
		obstacles = new ArrayList<Obstacle>();
		
		for (int i = 0; i < 10; i++) {
			boids.add(new Boid());
		}
	}
	
	public void update() {
		// pass
	}
	
	public ArrayList<Boid> getNeighborhood(Boid b) {
		ArrayList<Boid> neighborhood = new ArrayList<Boid>();
		for (Boid b2 : boids) {
			if ((b2 != b) && (Vector2f.distanceBetween(b.position, b2.position) < b.NEIGHBORHOOD_RADIUS)) {
				neighborhood.add(b2);
			}
		}
		return neighborhood;
	}
}
