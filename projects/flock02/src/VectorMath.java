// VectorMath.java
// copyright © Will McCutchen - will@humortree.org

// some utility functions to be used with Vector objects
public class VectorMath {
    
    public static double getHeading(Vector v) {
        double x = v.getX();
        double y = v.getY();
        if(x == 0) {
		return (y >= 0) ? 90 : 270;
	}
	else {
            //something I figured out a while ago, and I've forgotten what it is
            int offset = 0;
            if(x > 0 && y < 0) {
                offset = 360;
            }
            else if(x < 0) {
                offset = 180;
            }
            return degrees(Math.atan(y/x)) + offset;
	}
    }
    
    public static double degrees(double radians) {
        return (radians/Math.PI) * 180;
    }
    
    public static Vector add(Vector[] vectors) {
        Vector total = new Vector(0,0);
        for(int i = 0; i < vectors.length; i++) {
            total.add(vectors[i]);
        }
        return total;
    }
    public static Vector average(Vector[] vectors) {
        Vector total = add(vectors);
        total.scale(1/vectors.length);
        return total;
    }
    public static Vector subtract(Vector v1, Vector v2) {
        return new Vector(v1.getX() - v2.getX(), v1.getY() - v2.getY());
    }
    public static Vector add(Vector v1, Vector v2) {
        return new Vector(v1.getX() + v2.getX(), v1.getY() + v2.getY());
    }
    public static double distanceBetween(Vector v1, Vector v2) {
        return Math.sqrt(quickDistanceBetween(v1, v2));
    }
    public static double quickDistanceBetween(Vector v1, Vector v2) {
        return Math.pow(v1.getX() - v2.getX(), 2) + Math.pow(v1.getY() - v2.getY(), 2);
    }
}