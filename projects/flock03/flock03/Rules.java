package flock03;

import java.util.Collection;
import java.util.ArrayList;
import flock03.util.MathUtils;

public class Rules {
    //static ArrayList<Rule> rules = new ArrayList<Rule>();
    static Rule[] rules = {
        new Alignment(),
        new Separation(),
        new Cohesion(),
        new Boundaries(),
        new Wander(),
    };
    
    public static Vector2f apply(Boid b, Collection<Boid> neighborhood) {    
        Vector2f v = new Vector2f(0, 0);
        for (Rule rule : rules) {
            Vector2f result = rule.apply(b, neighborhood);
            //System.out.println("Rule " + rule + ": " + result);
            v.add(result);
        }
        return v;
        //return new Vector2f(MathUtils.rand(-1f, 1f), MathUtils.rand(-1f, 1f));
    }
}

abstract class Rule {
    public abstract Vector2f apply(Boid b, Collection<Boid> neighborhood);
    
    public String toString() {
        return "<Rule \"" + getClass().getName() + "\">";
    }
}

class Alignment extends Rule {
	float weight = 0.25f;
	
	public Alignment() {}

	public Vector2f apply(Boid b, Collection<Boid> neighborhood) {
	    if (neighborhood.size() == 0)
	        return new Vector2f(0,0);

		Vector2f perceivedVelocity = new Vector2f();

		for (Boid b2 : neighborhood) {
			perceivedVelocity.add(b2.velocity);
		}

		// average the total velocities
		perceivedVelocity.scale(neighborhood.size());

		// I'm not sure
		//perceivedVelocity.subtract(b.velocity);

		// apply this rule's weight
		perceivedVelocity.scale(weight);

		return perceivedVelocity;
	}
}

class Cohesion extends Rule {
	/*
	 * The cohesion rule tries to steer a given Boid toward
	 * the center of its neighbors
	 */

	float weight = 0.5f;

	public Vector2f apply(Boid b, Collection<Boid> neighborhood) {
	    if (neighborhood.size() == 0)
            return new Vector2f(0,0);

		Vector2f localCenter = new Vector2f();
		for (Boid b2 : neighborhood) {
			localCenter.add(b2.position);
		}

		// average the total position
		localCenter.scale(1.0f/neighborhood.size());
	    
		// is this helpful or necessary?
		localCenter.subtract(b.position);

		// apply this rule's weight
		localCenter.scale(weight);

		return localCenter;
	}
}

class Separation extends Rule {
	float weight = 2.0f;
	public Vector2f apply(Boid b, Collection<Boid> neighborhood) {
	    if (neighborhood.size() == 0)
            return new Vector2f(0,0);

		Vector2f newVelocity = new Vector2f();
		for (Boid b2 : neighborhood) {
			if (Vector2f.distanceBetween(b.position, b2.position) < b.MINIMUM_DISTANCE) {
				Vector2f offset = Vector2f.subtract(b.position, b2.position);
				newVelocity.add(offset);
			}
		}
		newVelocity.scale(weight);
		return newVelocity;
	}
}

class Boundaries extends Rule {
    float weight = 50;
    public Vector2f apply(Boid b, Collection<Boid> neighborhood) {
        Vector2f bounds = new Vector2f(0,0);
        if (b.position.x - b.MINIMUM_DISTANCE < 0) bounds.x = 1;
        else if (b.position.x + b.MINIMUM_DISTANCE > World.width) bounds.x = -1;
        if (b.position.y - b.MINIMUM_DISTANCE < 0) bounds.y = 1;
        else if (b.position.y + b.MINIMUM_DISTANCE > World.height) bounds.y = -1;
        bounds.scale(weight);
        return bounds;
    }
}

class Wander extends Rule {
    public Vector2f apply(Boid b, Collection<Boid> neighborhood) {
        if (neighborhood.size() == 0) {
            return new Vector2f(
                MathUtils.rand(-Settings.WANDER_SIZE, Settings.WANDER_SIZE),
                MathUtils.rand(-Settings.WANDER_SIZE, Settings.WANDER_SIZE)
            );
        } else {
            return new Vector2f(0,0);
        }
    }
}

