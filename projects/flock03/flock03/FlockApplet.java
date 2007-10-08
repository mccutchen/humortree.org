package flock03;

import flock03.threads.*;

import java.applet.Applet;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Dimension;

import java.awt.event.*;

public class FlockApplet extends Applet implements KeyListener, MouseListener {
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
        
        // Add event listeners
        //addKeyListener(this);
        //addMouseListener(this);
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

    public void destroy() {
        animationThread = null;
        updateThread = null;
    }
    
    public void paint(Graphics g) { g.drawImage(buffer, 0, 0, this); }
    public void update(Graphics g) { paint(g); }
    
    
    // Implement KeyListener interface
	public void keyPressed(KeyEvent e) {
	    // Pause on spacebar
	    if (e.getKeyCode() == 32)
	        World.addBoids(10);
    }
    public void keyReleased(KeyEvent e) {}
    public void keyTyped(KeyEvent e) {}
    
    // Implement MouseListener interface
    public void mousePressed(MouseEvent e) {
        int button = e.getButton();
        if (button == MouseEvent.BUTTON1) {
            World.addObstacle(e.getX(), e.getY());
        }
    }
    public void mouseReleased(MouseEvent e) {}
    public void mouseEntered(MouseEvent e) {}
    public void mouseExited(MouseEvent e) {}
    public void mouseClicked(MouseEvent e) {}
}