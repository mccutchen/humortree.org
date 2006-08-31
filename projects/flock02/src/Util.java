// Util.java
// copyright © Will McCutchen - will@humortree.org

// just a few utility functions... nothing special
public class Util {
    
    private static java.util.Random generator = new java.util.Random(new java.util.Date().getTime());
    
    public static int sq(int n) { return n*n; }
    public static double sq(double n) { return n*n; }
    
    public static int rand(int lo, int hi) { return generator.nextInt(hi - lo) + lo; }
    public static double dRand(int lo, int hi) { return (generator.nextDouble() * (hi - lo)) + lo; }
    
    public static Bird[] resizeArray(Bird[] oldArray, int newSize) {
        Bird[] newArray = new Bird[newSize];
        for(int i = 0; i < oldArray.length && i < newSize; i++) {
            newArray[i] = oldArray[i];
        }
        return newArray;
    }
}
