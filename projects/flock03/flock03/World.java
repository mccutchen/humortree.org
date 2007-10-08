package flock03;

import java.util.ArrayList;
import java.awt.Color;

import flock03.util.*;

public class World {
	public static int width;
	public static int height;
	
	public static ArrayList<Boid> boids;
	public static ArrayList<Obstacle> obstacles;
	
	public static Color boidColor;
	public static Color obstacleColor;
	
	public static void init(int w, int h) {
		width = w;
		height = h;
		
		boids = new ArrayList<Boid>();
		obstacles = new ArrayList<Obstacle>();
		
		boidColor = ColorUtils.randomColor(50, 200);
		obstacleColor = ColorUtils.randomColor(0, 50);
		
		for (int i = 0; i < Settings.INITIAL_BOID_COUNT; i++) {
		    boids.add(new Boid());
	    }
	    
	    for (int i = 0; i < Settings.OBSTACLE_COUNT; i++) {
 	        obstacles.add(new Obstacle());
	    }
	}
	
	public static void update() {
		for (Boid b : boids) {
		    b.update(getNeighborhood(b));
		}
	}
	
	public static ArrayList<FlockObject> getNeighborhood(Boid b) {
		ArrayList<FlockObject> neighborhood = new ArrayList<FlockObject>();
		for (Boid b2 : boids) {
			if ((b2 != b) && (Vector2f.quickDistanceBetween(b.position, b2.position) < b.NEIGHBORHOOD_RADIUS * b.NEIGHBORHOOD_RADIUS)) {
				neighborhood.add(b2);
			}
		}
		return neighborhood;
	}
	
	public static void addBoids(int count) {
	    try {
	        for (int i = 0; i < count; i++) {
    	        boids.add(new Boid());
    	    }
    	} catch (java.util.ConcurrentModificationException e) {
    	    System.out.println("Error adding boids.");
    	}
	}
	
	public static void addObstacle(int x, int y) {
	    try {
	        obstacles.add(new Obstacle(x, y));
	    } catch (java.util.ConcurrentModificationException e) {
            System.out.println("Error adding obstacle.");
        }
	}
	
	public static Vector2f randomPosition() {
	    return new Vector2f(MathUtils.rand(0, width), MathUtils.rand(0, height));
	}
}
