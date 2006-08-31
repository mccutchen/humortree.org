// FlockingRules.java
// copyright © Will McCutchen - will@humortree.org

// the logic behind the flocking behavior... separated
// from the birds to be easily extendable
public class FlockingRules {

    public static double COHESION_WEIGHT = 50;
    public static double SEPARATION_WEIGHT = 100;
    public static double ALIGNMENT_WEIGHT = 50;
    public static double INERTIA = 100;
    
    public static boolean APPLY_COHESION = true;
    public static boolean APPLY_SEPARATION = true;
    public static boolean APPLY_ALIGNMENT = true;
    
    public static void apply(Bird bird) {
        
        Bird[] neighbors = World.getMyNeighbors(bird.getId());
        
        if(neighbors.length > 0) {
            
            Vector newSteering = new Vector(0,0);
            
            // calculate and weight the three components of the flocking behavior:
            // cohesion, separation, alignment            
            if(APPLY_COHESION) {
                Vector cohesion = cohesion(bird, neighbors);
                cohesion.scale(COHESION_WEIGHT);
                newSteering.add(cohesion);
            }
            
            if(APPLY_SEPARATION) {
                Vector separation = separation(bird, neighbors);
                separation.scale(SEPARATION_WEIGHT);
                newSteering.add(separation);
            }
            
            if(APPLY_ALIGNMENT) {
                Vector alignment = alignment(bird, neighbors);
                alignment.scale(ALIGNMENT_WEIGHT);
                newSteering.add(alignment);
            }
            
            // normalize and weight the current steering vector
            Vector currentSteering = bird.getSteering();
            currentSteering.normalize();
            currentSteering.scale(INERTIA);
            
            // add the new steering vector to the old one
            newSteering = VectorMath.add(currentSteering, newSteering);
            
            // make sure we'return not accelerating too fast
            limitVector(newSteering, bird.MIN_ACCEL, bird.MAX_ACCEL);
            
            // commit the new steering vector
            bird.setSteering(newSteering);
            
        } else {
            // if there are no other birds around, wander a bit
            addWander(bird.getSteering());
        }
        
        // create the new velocity from the old one and the newly-set steering vector
        Vector newVelocity = VectorMath.add(bird.getVelocity(), bird.getSteering());
        
        // make sure we're not going too fast or slow
        limitVector(newVelocity, bird.MIN_SPEED, bird.MAX_SPEED);
        
        // commit new velocity
        bird.setVelocity(newVelocity);

        // update position vector
        Vector newPosition = VectorMath.add(bird.getPosition(), bird.getVelocity());
        
        // wrap the position if it goes offscreen
        constrainPosition(newPosition);
        bird.setPosition(newPosition);
    }

    // cohesion:
    // steer towards the center of the birds around this one
    public static Vector cohesion(Bird bird, Bird[] neighbors) {
        Vector cohesionVector = new Vector(0,0);
        Vector currentPosition = bird.getPosition();
        
        // get the average position of the neighbors
        for(int i = 0; i < neighbors.length; i++) {
            cohesionVector.add(neighbors[i].getPosition());
        }
        cohesionVector.scale(1/(double)neighbors.length);
        
        // get the vector between this bird and the center of the neighbors
        cohesionVector = VectorMath.subtract(cohesionVector, currentPosition);
        
        // normalize and return
        cohesionVector.normalize();
        return cohesionVector;
    }

    // separation:
    // steer away from birds that are too close
    public static Vector separation(Bird bird, Bird[] neighbors) {
        Vector separationVector = new Vector(0,0);
        Vector displacementVector = null;
        Vector myPosition = bird.getPosition();
        for(int i = 0; i < neighbors.length; i++) {
            displacementVector = VectorMath.subtract(myPosition, neighbors[i].getPosition());
            double distance = VectorMath.quickDistanceBetween(myPosition, neighbors[i].getPosition());
            // if the bird is too close for comfort, move away
            if(distance < Util.sq(bird.FRIENDLINESS)) {
                displacementVector.normalize();
                displacementVector.scale(1/distance);
                separationVector.add(displacementVector);
            }
        }
        separationVector.normalize();
        return separationVector;
    }

    // alignment:
    // steer to match velocity (direction and speed) of neighbors
    public static Vector alignment(Bird bird, Bird[] neighbors) {
        Vector alignmentVector = new Vector(0,0);
        for(int i = 0; i < neighbors.length; i++) {
            alignmentVector.add(neighbors[i].getVelocity());
        }
        if(neighbors.length > 0) {
            alignmentVector.scale(1/(double)neighbors.length);
        }
        alignmentVector.normalize();
        return alignmentVector;
    }
    
    public static void addWander(Vector steering) {
        double xOffset = Math.random() * 1.5;
        double yOffset = Math.random() * 1.5;
        
        if(Math.random() < .5) xOffset *= -1;
        if(Math.random() < .5) yOffset *= -1;
        
        steering.setX(steering.getX() + xOffset);
        steering.setY(steering.getY() + yOffset);
    }
    
    public static void constrainPosition(Vector position) {
        int width = World.getWidth();
        int height = World.getHeight();
        int x = (int)position.getX();
        int y = (int)position.getY();
        
        if(x < 0) position.setX(x + width);
        else if(x > width) position.setX(x - width);
        
        if(y < 0) position.setY(y + height);
        else if(y > height) position.setY(y - height);
    }
    
    public static void limitVector(Vector vector, double min, double max) {
        double magnitude = vector.magnitude();
        if(magnitude < min) {
            vector.normalize();
            vector.scale(min);
        } else if(magnitude > max) {
            vector.normalize();
            vector.scale(max);
        }
    }
}
