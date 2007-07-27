package flock03.util;

public class MathUtils {    
    private static java.util.Random generator = new java.util.Random(new java.util.Date().getTime());
    
    public static int sq(int n) { return n*n; }
    public static double sq(double n) { return n*n; }
    
    public static int rand(int lo, int hi) { return generator.nextInt(hi - lo) + lo; }
    public static float rand(float lo, float hi) { return (generator.nextFloat() * (hi - lo)) + lo; }
    public static double rand(double lo, double hi) { return (generator.nextDouble() * (hi - lo)) + lo; }
}
