package org.humortree.projects.flock03.rules;

import java.util.Collection;

import org.humortree.projects.flock03.*;

public class Cohesion extends BaseRule {
	/*
	 * The cohesion rule tries to steer a given Boid toward
	 * the center of its neighbors
	 */
	
	static float WEIGHT = 0.1f;
	
	static Vector2f apply(Boid b, Collection<Boid> neighborhood) {
		Vector2f localCenter = new Vector2f();
		for (Boid b2 : neighborhood) {
			localCenter.add(b2.position);
		}
		
		// average the total position
		localCenter.scale(1.0f/neighborhood.size());
		
		// is this helpful or necessary?
		localCenter.subtract(b.position);
		
		// apply this rule's weight
		localCenter.scale(WEIGHT);
		
		return localCenter;
	}
}
