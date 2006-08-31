package org.humortree.projects.flock03.rules;

import java.util.Collection;

import org.humortree.projects.flock03.*;


public class Separation extends BaseRule {
	
	static float WEIGHT = 1.0f;
	
	static Vector2f apply(Boid b, Collection<Boid> neighborhood) {
		Vector2f newVelocity = new Vector2f();
		for (Boid b2 : neighborhood) {
			if (Vector2f.distanceBetween(b.position, b2.position) < b.MINIMUM_DISTANCE) {
				Vector2f offset = Vector2f.subtract(b.position, b2.position);
				newVelocity.subtract(offset);
			}
		}
		newVelocity.scale(WEIGHT);
		return newVelocity;
	}
}
