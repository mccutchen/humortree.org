package org.humortree.projects.flock03;

import org.humortree.projects.flock03.threads.*;

import java.applet.Applet;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Dimension;

// pretty self-explanatory, I think
public class FlockApplet extends Applet {
	public Dimension size;              
    public Image buffer;                  
    public Graphics bufferGraphics;       
    
    // the two threads to use
    public AnimationThread animationThread;
    public UpdateThread updateThread;
	
    public boolean PLAY = true;
    public int ANIMATION_DELAY = 30;
    public int UPDATE_DELAY = 10;
	
    public World world;
    
	// this is to suppress the warnings about serialization
    private static final long serialVersionUID = 976810895685979471L;
	
    public void init() {
        size = this.getSize();
        buffer = this.createImage(size.width, size.height);
        bufferGraphics = buffer.getGraphics();
        
        animationThread = new AnimationThread(this);
		updateThread = new UpdateThread(this);
        
        world = new World(size.width, size.height);
		Renderer.render(world, bufferGraphics);
    }
    
    public void paint(Graphics g) { g.drawImage(buffer, 0, 0, this); }
    public void update(Graphics g) { paint(g); }
}