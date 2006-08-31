public class Vector {
    double x, y;
    
    public double getX() { return x; }
    public double getY() { return y; }
    public void setX(double x) { this.x = x; }
    public void setY(double y) { this.y = y; }
    
    public Vector(double x, double y) {
        this.x = x;
        this.y = y;
    }
    
    public double magnitude() {
        return Math.sqrt((x * x) + (y * y));
    }
    public void scale(double n) {
        x *= n;
        y *= n;
    }
    public void normalize() {
        double magnitude = magnitude();
        if(magnitude == 0) {
            scale(0);
        }
        else {
            scale(1/magnitude());
        }
    }
    public void add(Vector v) {
        x += v.x;
        y += v.y;
    }
    public void subtract(Vector v) {
        x -= v.x;
        y -= v.y;
    }
    public void dot(Vector v) {
        x *= v.x;
        y *= v.y;
    }
    public void cross(Vector v) {
        x *= v.y;
        y *= v.x;
    }
    public String toString() {
        return VectorMath.getHeading(this) + " degrees for " + magnitude() + " units; [" + x + ", " + y + "]";
    }
    public Object clone() {
        return new Vector(x, y);
    }
}