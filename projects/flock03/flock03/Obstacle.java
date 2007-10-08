package flock03;

import java.util.Collection;
import java.awt.*;

import flock03.util.*;

public class Obstacle extends FlockObject {	
	public Obstacle() {
		position = World.randomPosition();
		velocity = null;
		radius = MathUtils.rand(20, 50);
		color = ColorUtils.randomColor(0, 100);
	}
	
	public void update(Collection<FlockObject> neighborhood) {
		// do nothing... obstacles don't move
	}
}
