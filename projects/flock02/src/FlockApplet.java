// FlockApplet.java
// copyright © Will McCutchen - will@humortree.org

import java.applet.Applet;
import java.awt.Graphics;
import java.awt.Color;
import java.awt.Image;
import java.awt.Dimension;
import java.awt.event.KeyListener;
import java.awt.event.KeyEvent;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;

// pretty self-explanatory, I think
public class FlockApplet extends Applet implements Runnable, KeyListener {
    Dimension size;              
    Image buffer;                  
    Graphics bufferGraphics;       
    Thread animator;               
    Image logo;
	
	int INITIAL_COUNT = 50;
    boolean PLAY= true;
	int DELAY = 30;
	boolean DRAW_STATUS = true;
	boolean DRAW_LOGO = true;
	String LOGO_PATH = "logo.gif";
    
    public void init() {
        
        setBackground(FlockArtist.BACKGROUND_COLOR);
		
		handleParameters();
                
        size = this.getSize();
        buffer = this.createImage(size.width, size.height);
        bufferGraphics = buffer.getGraphics();
        
        World.initialize(size.width, size.height);
        World.populateWith(INITIAL_COUNT);
		
		logo = getImage(getCodeBase(),LOGO_PATH);
                
        addKeyListener(this);
		
		// do the initial painting
		step();
    }
    
    public void handleParameters() {
		String param;
		
		// Applet parameters
		param = getParameter("applet_play");
		if(param != null) PLAY = Boolean.valueOf(param).booleanValue();
		param = getParameter("applet_draw_logo");
		if(param != null) DRAW_LOGO = Boolean.valueOf(param).booleanValue();
        param = getParameter("applet_draw_status");
		if(param != null) DRAW_STATUS = Boolean.valueOf(param).booleanValue();
		param = getParameter("applet_logo_path");
		if(param != null) LOGO_PATH = param;
        param = getParameter("applet_delay");
		if(param != null) DELAY = Integer.parseInt(param);
		
		// World parameters
		param = getParameter("world_initial_count");
		if(param != null) INITIAL_COUNT = Integer.parseInt(param);
		
        // Bird parameters
        param = getParameter("bird_vector_min");
        if(param != null) Bird.DEFAULT_VECTOR_MIN = Integer.parseInt(param);
        param = getParameter("bird_vector_max");
        if(param != null) Bird.DEFAULT_VECTOR_MAX = Integer.parseInt(param);
        param = getParameter("bird_min_speed");
        if(param != null) Bird.DEFAULT_MIN_SPEED = Integer.parseInt(param);
        param = getParameter("bird_max_speed_min");
        if(param != null) Bird.DEFAULT_MAX_SPEED_MIN = Integer.parseInt(param);
        param = getParameter("bird_max_speed_max");
        if(param != null) Bird.DEFAULT_MAX_SPEED_MAX = Integer.parseInt(param);
        param = getParameter("bird_min_accel");
        if(param != null) Bird.DEFAULT_MIN_ACCEL = Integer.parseInt(param);
        param = getParameter("bird_max_accel_min");
        if(param != null) Bird.DEFAULT_MAX_ACCEL_MIN = Integer.parseInt(param);
        param = getParameter("bird_max_accel_max");
        if(param != null) Bird.DEFAULT_MAX_ACCEL_MAX = Integer.parseInt(param);
        param = getParameter("bird_vision_min");
        if(param != null) Bird.DEFAULT_VISION_MIN = Integer.parseInt(param);
        param = getParameter("bird_vision_max");
        if(param != null) Bird.DEFAULT_VISION_MAX = Integer.parseInt(param);
        param = getParameter("bird_friendliness_min");
        if(param != null) Bird.DEFAULT_FRIENDLINESS_MIN = Integer.parseInt(param);
        param = getParameter("bird_friendliness_max");
        if(param != null) Bird.DEFAULT_FRIENDLINESS_MAX = Integer.parseInt(param);
        
        // FlockingRules parameters
        param = getParameter("rules_cohesion_weight");
        if(param != null) FlockingRules.COHESION_WEIGHT = Double.parseDouble(param);
        param = getParameter("rules_separation_weight");
        if(param != null) FlockingRules.SEPARATION_WEIGHT = Double.parseDouble(param);
        param = getParameter("rules_alignment_weight");
        if(param != null) FlockingRules.ALIGNMENT_WEIGHT = Double.parseDouble(param);
        param = getParameter("rules_inertia");
        if(param != null) FlockingRules.INERTIA = Double.parseDouble(param);
        
        // FlockArtist parameters
        param = getParameter("artist_draw_body");
        if(param != null) FlockArtist.DRAW_BODY = Boolean.valueOf(param).booleanValue();
        param = getParameter("artist_draw_velocity");
        if(param != null) FlockArtist.DRAW_VELOCITY = Boolean.valueOf(param).booleanValue();
        param = getParameter("artist_draw_steering");
        if(param != null) FlockArtist.DRAW_STEERING = Boolean.valueOf(param).booleanValue();
        param = getParameter("artist_draw_vision");
        if(param != null) FlockArtist.DRAW_VISION = Boolean.valueOf(param).booleanValue();
        param = getParameter("artist_draw_friendliness");
        if(param != null) FlockArtist.DRAW_FRIENDLINESS = Boolean.valueOf(param).booleanValue();
        param = getParameter("artist_draw_fill");
        if(param != null) FlockArtist.DRAW_FILL = Boolean.valueOf(param).booleanValue();
    }
    
    public void paint(Graphics g) { g.drawImage(buffer, 0, 0, this); }
    public void update(Graphics g) { paint(g); }

    public void run() {
        while(true) {
            
            if(PLAY) {
                step();
            }

            try { Thread.sleep(DELAY); } 
            catch (InterruptedException e) { ; }
        }
        //animator = null;
    }
    
    public void step() {
        // paint the background
        bufferGraphics.setColor(this.getBackground());
        bufferGraphics.fillRect(0, 0, size.width, size.height);

        // paint all the birds
        Bird[] birds = World.getBirds();
        for(int i = 0; i < birds.length; i++) {
            FlockArtist.paintBird(birds[i], bufferGraphics);
        }

        // update birds
        for(int i = 0; i < birds.length; i++) {
            birds[i].update();
        }
        
		if(DRAW_STATUS) {
        	FlockStatus.paintTo(bufferGraphics);
		}
        
        if(DRAW_LOGO) {
			bufferGraphics.drawImage(logo, size.width - logo.getWidth(this) - 10, 10, this);
		}
        
        repaint();
    }
    
    public void pause() {
        PLAY = !PLAY;
    }

    public void start() {
        if (animator == null) {
            animator = new Thread(this);
            animator.start();
        }
    }

    public void stop() {
		PLAY = false;
		animator = null;
	}
    
    public void handleDrawVision() {
        FlockArtist.DRAW_VISION = !FlockArtist.DRAW_VISION;
    }
    public void handleDrawFriendliness() {
        FlockArtist.DRAW_FRIENDLINESS = !FlockArtist.DRAW_FRIENDLINESS;
    }
    public void handleDrawSteering() {
        FlockArtist.DRAW_STEERING = !FlockArtist.DRAW_STEERING;
    }
    public void handleDrawFill() {
        FlockArtist.DRAW_FRIENDLINESS = true;
        FlockArtist.DRAW_VISION = true;
        FlockArtist.DRAW_FILL = !FlockArtist.DRAW_FILL;
    }
    public void handleApplyCohesion() {
        FlockingRules.APPLY_COHESION = !FlockingRules.APPLY_COHESION;
    }
    public void handleApplySeparation() {
        FlockingRules.APPLY_SEPARATION = !FlockingRules.APPLY_SEPARATION;
    }
    public void handleApplyAlignment() {
        FlockingRules.APPLY_ALIGNMENT = !FlockingRules.APPLY_ALIGNMENT;
    }
    public void handlePause() {
        pause();
    }
    public void handleAdd() {
        World.addNewBird();
    }
    public void handleStep() {
        if(!PLAY) {
            step();
        }
    }
    
    public void keyPressed(KeyEvent e) {
        switch(e.getKeyCode()) {
            case 49: // 1
                handleApplyCohesion();
                break;
            case 50: // 2
                handleApplySeparation();
                break;
            case 51: // 3
                handleApplyAlignment();
                break;
            case 81: // q
                handleDrawVision();
                break;
            case 87: // w
                handleDrawFriendliness();
                break;
            case 69: // e
                handleDrawSteering();
                break;
            case 70: // f
                handleDrawFill();
                break;
            case 80: // p
                handlePause();
                break;
            case 32: // space
                handleAdd();
                break;
            case 61: // + or =
                handleAdd();
                break;
            //case 45: // -
                //World.removeLastBird();
                //break;
            case 39: // ->
                handleStep();
                break;
        }
    }
    public void keyReleased(KeyEvent e) { ; }
    public void keyTyped(KeyEvent e) { ; }
}
