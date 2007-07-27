package flock03;

import flock03.util.MathUtils;
import java.util.Collection;

public class Vector2f {
	public float x, y;
	
	static float DEFAULT_X = 0;
	static float DEFAULT_Y = 0;
	
	// constructors
	public Vector2f() {
		this(DEFAULT_X, DEFAULT_Y);
	}
	public Vector2f(float x, float y) {
		this.x = x;
		this.y = y;
	}
	
	// utility constructors
	public static Vector2f randomVector(float xrange, float yrange) {
		return Vector2f.randomVector(0.0f, xrange, 0.0f, yrange);
	}
	public static Vector2f randomVector(float xmin, float xmax, float ymin, float ymax) {
		return new Vector2f(MathUtils.rand(xmin, xmax), MathUtils.rand(ymin, ymax));
	}
    
	// instance methods
	public void add(Vector2f v) {
        x += v.x;
        y += v.y;
    }
    public void subtract(Vector2f v) {
        x -= v.x;
        y -= v.y;
    }
	
    public float magnitude() {
        return (float)Math.sqrt((x * x) + (y * y));
    }
    public void scale(float n) {
        x *= n;
        y *= n;
    }    
    public void normalize() {
        float magnitude = magnitude();
        if(magnitude == 0.0f) {
            scale(0);
        }
        else {
            scale(1/magnitude());
        }
    }
    
    // static methods
    public static Vector2f add(Vector2f v1, Vector2f v2) {
    	return new Vector2f(v1.x + v2.x, v1.y + v2.y);
    }
    public static Vector2f add(Collection<Vector2f> vectors) {
    	float newX = 0;
    	float newY = 0;
    	for (Vector2f v : vectors) {
    		newX += v.x;
    		newY += v.y;
    	}
    	return new Vector2f(newX, newY);
    }
    
    public static Vector2f subtract(Vector2f v1, Vector2f v2) {
    	return new Vector2f(v1.x - v2.x, v1.y - v2.y);
    }
    
    public static Vector2f average(Collection<Vector2f> vectors) {
        Vector2f total = add(vectors);
        total.scale(1/vectors.size());
        return total;
    }
    
    public static float distanceBetween(Vector2f v1, Vector2f v2) {
        return (float)Math.sqrt(quickDistanceBetween(v1, v2));
    }
    public static float quickDistanceBetween(Vector2f v1, Vector2f v2) {
        return (float)Math.pow(v1.x - v2.x, 2) + (float)Math.pow(v1.y - v2.y, 2);
    }
    
    public String toString() {
        return "(" + x + ", " + y + ")";
    }
}
