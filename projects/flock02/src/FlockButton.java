import java.awt.Button;

public class FlockButton extends Button {
    private boolean isActive;
    private String activeString, inactiveString, labelString;
    
    public static int WIDTH = 100;
    public static int HEIGHT = 25;
    
    public FlockButton(String activeString, String inactiveString, String labelString) {
        super(inactiveString + " " + labelString);
        
        this.labelString = labelString;
        this.activeString = activeString;
        this.inactiveString = inactiveString;
        isActive = true;
        
        setSize(WIDTH, HEIGHT);
    }
    
    public void toggle() {
        isActive = !isActive;
        if(isActive) {
            setLabel(activeString + " " + labelString);
        } else {
            setLabel(inactiveString + " " + labelString);
        }
    }
    
    public String getLabel() { return labelString; }
    
    public boolean isActive() {
        return isActive;
    }
}
