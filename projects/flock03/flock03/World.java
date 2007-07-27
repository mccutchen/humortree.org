package flock03;

import java.util.ArrayList;

public class World {
	public static ArrayList<Boid> boids;
	
	public static int width;
	public static int height;
	
	public static void init(int _width, int _height) {
		width = _width;
		height = _height;
		
		boids = new ArrayList<Boid>();
		
		for (int i = 0; i < Settings.INITIAL_BOID_COUNT; i++) {
            boids.add(new Boid());
	    }
	}
	
	public static void update() {
		for (Boid b : boids) {
		    b.update(getNeighborhood(b));
		}
	}
	
	public static ArrayList<Boid> getNeighborhood(Boid b) {
		ArrayList<Boid> neighborhood = new ArrayList<Boid>();
		for (Boid b2 : boids) {
			if ((b2 != b) && (Vector2f.distanceBetween(b.position, b2.position) < b.NEIGHBORHOOD_RADIUS)) {
				neighborhood.add(b2);
			}
		}
		return neighborhood;
	}
}
