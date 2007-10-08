package flock03;

import java.util.ArrayList;
import java.awt.Color;

import flock03.util.*;

public class World {
	public static int width;
	public static int height;
	
	public static ArrayList<Boid> boids;
	public static Color baseColor;
	
	public static void init(int w, int h) {
		width = w;
		height = h;
		
		boids = new ArrayList<Boid>();
		baseColor = ColorUtils.randomColor(50, 200);
		
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
			if ((b2 != b) && (Vector2f.quickDistanceBetween(b.position, b2.position) < b.NEIGHBORHOOD_RADIUS * b.NEIGHBORHOOD_RADIUS)) {
				neighborhood.add(b2);
			}
		}
		return neighborhood;
	}
}
