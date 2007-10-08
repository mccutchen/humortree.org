package flock03;

import flock03.threads.*;

import java.applet.Applet;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Dimension;

public class FlockApplet extends Applet {
	public Dimension size;              
    public Image buffer;                  
    public Graphics bufferGraphics;       
    
    AnimationThread animationThread;
    UpdateThread updateThread;
	
    public boolean play = true;
    
    public void init() {
        size = getSize();
        buffer = createImage(size.width, size.height);
        bufferGraphics = buffer.getGraphics();
        
        // initialize the World with this applet's size
        World.init(size.width, size.height);
	}
    
    public void start() {
        if (animationThread == null) {
            animationThread = new AnimationThread(this);
            animationThread.start();
        }
        if (updateThread == null) {
            updateThread = new UpdateThread(this);
            updateThread.start();
        }
    }
        
    public void pause() {
        play = !play;
    }

    public void destroy() {
        animationThread = null;
        updateThread = null;
    }
    
    public void paint(Graphics g) { g.drawImage(buffer, 0, 0, this); }
    public void update(Graphics g) { paint(g); }
}