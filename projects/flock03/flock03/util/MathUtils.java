package flock03.util;

public class MathUtils {    
    private static java.util.Random generator = new java.util.Random(new java.util.Date().getTime());
    
    public static int sq(int n) { return n*n; }
    public static double sq(double n) { return n*n; }
    
    public static int rand(int lo, int hi) { return generator.nextInt(hi - lo) + lo; }
    public static float rand(float lo, float hi) { return (generator.nextFloat() * (hi - lo)) + lo; }
    public static double rand(double lo, double hi) { return (generator.nextDouble() * (hi - lo)) + lo; }
    
    public static int wrap(int n, int at) {
    	return (n >= 0 && n < at) ? n : (n < 0) ? at + n : n - at;
    }
    
    public static boolean lineIntersectsCircle(int x1, int y1, int x2, int y2, int cx, int cy, int r) {
        // Adapted from http://www.vb-helper.com/howto_net_line_circle_intersections.html
        
        int dx = x2 - x1;
        int dy = y2 - y1;
        
        int A = dx*dx + dy*dy;
        int B = 2 * (dx*(x1 - cx) + dy*(y1 - cy));
        int C = (x1 - cx)*(x1 - cx) + (y1 - cy)*(y1 - cy) - r*r;
        int det = B * B - 4 * A * C;
        
        if (A <= 1 || det < 0) {
            return false;
        }
        return true;
    }
}
