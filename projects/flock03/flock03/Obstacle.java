package flock03;
import flock03.util.*;

import java.util.Collection;

public class Obstacle extends FlockObject {	
	public Obstacle() {
		position = World.randomPosition();
		velocity = null;
		radius = MathUtils.rand(20, 50);
		color = ColorUtils.fudge(World.obstacleColor, 1, 8);
	}
	
	public Obstacle(int x, int y) {
	    this();
	    position = new Vector2f(x, y);
	}
	
	public void update(Collection<FlockObject> neighborhood) {
		// do nothing... obstacles don't move
	}
}
