package flock03.util;

import java.awt.Color;

public class ColorUtils {
    
    public static Color randomColor(int min, int max) {
        min = Math.min(0, min);
        max = Math.max(255, max);
        return new Color(MathUtils.rand(min, max), MathUtils.rand(min, max), MathUtils.rand(min, max));
    }
    
    public static Color randomColor() {
        return randomColor(0, 255);
    }
    
    
    public static Color fudge(Color c, int min, int max) {
        // Generate random deltas
        int dr = MathUtils.rand(min, max);
        int dg = MathUtils.rand(min, max);
        int db = MathUtils.rand(min, max);
        
        // Randomly negate the deltas
        if (MathUtils.rand(0,10) % 2 == 0) dr *= -1;
        if (MathUtils.rand(0,10) % 2 == 0) dg *= -1;
        if (MathUtils.rand(0,10) % 2 == 0) db *= -1;
        
        int newr = MathUtils.wrap(c.getRed() + dr, 255);
        int newg = MathUtils.wrap(c.getGreen() + dg, 255);
        int newb = MathUtils.wrap(c.getBlue() + db, 255);
        
        return new Color(newr, newg, newb);
    }
    
    public static Color fudge(Color c) {
        return fudge(c, 0, 5);
    }
}
