package flock03;

import java.util.ArrayList;
import java.util.concurrent.CopyOnWriteArrayList;
import java.awt.Color;

import flock03.util.*;

public class World {
	public static int width;
	public static int height;
	
	public static CopyOnWriteArrayList<Boid> boids;
	public static CopyOnWriteArrayList<Obstacle> obstacles;
	
	public static Color boidColor;
	public static Color obstacleColor;
	
	public static void init(int w, int h) {
		width = w;
		height = h;
		
		boids = new CopyOnWriteArrayList<Boid>();
		obstacles = new CopyOnWriteArrayList<Obstacle>();
		
		boidColor = ColorUtils.randomColor(50, 200);
		obstacleColor = ColorUtils.randomColor(0, 50);
		
		for (int i = 0; i < Settings.INITIAL_BOID_COUNT; i++) {
		    boids.add(new Boid());
	    }
	    
	    for (int i = 0; i < Settings.INITIAL_OBSTACLE_COUNT; i++) {
 	        obstacles.add(new Obstacle());
	    }
	}
	
	public static void update() {
		for (Boid b : boids) {
		    b.update(getNeighborhood(b));
		}
	}
	
	public static CopyOnWriteArrayList<FlockObject> getNeighborhood(Boid b) {
		CopyOnWriteArrayList<FlockObject> neighborhood = new CopyOnWriteArrayList<FlockObject>();
		for (Boid b2 : boids) {
			if ((b2 != b) && (Vector2f.distanceBetween(b.position, b2.position) < b.vision)) {
				neighborhood.add(b2);
			}
		}
		return neighborhood;
	}
	
	public static void addBoids(int count) {
	    for (int i = 0; i < count; i++)
	        boids.add(new Boid());
	}
	
	public static void addObstacle(int x, int y) {
	    obstacles.add(new Obstacle(x, y));
	}
	
	public static Vector2f randomPosition() {
	    return new Vector2f(MathUtils.rand(0, width), MathUtils.rand(0, height));
	}
}
