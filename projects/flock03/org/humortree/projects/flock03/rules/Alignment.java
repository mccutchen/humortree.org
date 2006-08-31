package org.humortree.projects.flock03.rules;

import java.util.Collection;

import org.humortree.projects.flock03.*;

public class Alignment extends BaseRule {
	static float WEIGHT = 0.125f;
	
	static Vector2f apply(Boid b, Collection<Boid> neighborhood) {
		Vector2f perceivedVelocity = new Vector2f();
		
		for (Boid b2 : neighborhood) {
			perceivedVelocity.add(b2.velocity);
		}
		
		// average the total velocities
		perceivedVelocity.scale(neighborhood.size());
		
		// I'm not sure
		perceivedVelocity.subtract(b.velocity);
		
		// apply this rule's weight
		perceivedVelocity.scale(WEIGHT);
		
		return perceivedVelocity;
	}
}
