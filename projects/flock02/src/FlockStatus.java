// FlockArtist.java
// Copyright © Will McCutchen - will@humortree.org

// the status box, a shitty deal
import java.awt.*;

public class FlockStatus {
    
    private static Color backgroundColor = new Color(0,0,0,10);
    private static Color borderColor = new Color(204,204,204);
    private static Color textColor = new Color(53,53,53);
    private static Font font = new Font("Monospaced",Font.PLAIN,11);
    private static int cornerRadius = 8;
    
    public static int WIDTH = 173;
    public static int HEIGHT = 140;
    public static int X = 10;
    public static int Y = 450;
    
    public static void paintTo(Graphics g) {
        g.setColor(backgroundColor);
        g.fillRoundRect(X,Y, WIDTH, HEIGHT, cornerRadius, cornerRadius);
        
        g.setColor(borderColor);
        g.drawRoundRect(X,Y, WIDTH, HEIGHT, cornerRadius, cornerRadius);
        
        String[] text = new String[9];
        text[0] = "";
        text[1] = "";
        text[2] = World.size() + " bird(s)";
        text[3] = "";
        text[4] = "Flocking Rules:\r";
        text[5] = "(Keys 1,2,3 to toggle)";
        text[6] = "   Cohesion....." + onOff(FlockingRules.APPLY_COHESION) + "\n";
        text[7] = "   Separation..." + onOff(FlockingRules.APPLY_SEPARATION) + "\n";
        text[8] = "   Alignment...." + onOff(FlockingRules.APPLY_ALIGNMENT) + "\n";
        
        int yOffset = 15;
        int xOffset = 10;
        int x = X + xOffset;
        int y = Y;
        
        g.setFont(font);
        g.setColor(textColor);
        for(int i = 0; i < text.length; i++) {
            g.drawString(text[i], x, y);
            y += yOffset;
        }
    }
    
    private static String onOff(boolean b) {
        return (b) ? "ON" : "OFF";
    }
}
