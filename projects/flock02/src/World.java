// World.java
// copyright © Will McCutchen - will@humortree.org

// holds all of the birds, and tells the birds who their neighbors are
// needs to be initialized with a height and width before use
public class World {
    private static int width, height;
    private static Bird[] birds;
    private static java.util.ArrayList birdList;
    
    private static final int INITIAL_CAPACITY = 50;
    
    public static void initialize(int width, int height) {
        birdList = new java.util.ArrayList();
        makeBirdArray();
        World.width = width;
        World.height = height;
    }
    public static int getWidth() { return width; }
    public static int getHeight() { return height; }
    
    private static void makeBirdArray() {
        Object[] temp = birdList.toArray();
        birds = new Bird[temp.length];
        for(int i = 0; i < birds.length; i++) {
            birds[i] = (Bird)temp[i];
        }
    }
    
    public static Bird[] getBirds() {
        return birds;
    }
    
    public static void addNewBird() {
        addBird(new Bird());
    }
    
    public static void addBird(Bird newBird) {
        birdList.add(newBird);
        newBird.setId(birdList.size() - 1);
        makeBirdArray();
    }
    
    public static void removeLastBird() {
        if(birdList.size() > 0) {
            birdList.remove(birdList.size() - 1);
            makeBirdArray();
        }
    }
    
    public static int size() {
        return birdList.size();
    }
    
    public static Bird[] getMyNeighbors(int birdId) {
        if(birds.length > 0) {
            Bird[] neighbors = new Bird[birds.length - 1];
            Bird bird = birds[birdId];
            int count = 0;
            for(int i = 0; i < birds.length; i++) {
                if(i != birdId) {
                    Vector displacement = VectorMath.subtract(bird.getPosition(), birds[i].getPosition());
                    if(displacement.magnitude() < bird.VISION) {
                        neighbors[count++] = birds[i];
                    }
                }
            }
            return Util.resizeArray(neighbors, count);
        } else {
            return new Bird[0];
        }
    }
    
    public static void selfPopulate() {
        for(int i = 0; i < INITIAL_CAPACITY; i++) {
            addNewBird();
        }
    }
    public static void populateWith(int count) {
        for(int i = 0; i < count; i++) {
            addNewBird();
        }
    }
}