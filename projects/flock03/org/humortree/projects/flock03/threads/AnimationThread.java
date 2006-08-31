package org.humortree.projects.flock03.threads;

import org.humortree.projects.flock03.*;

public class AnimationThread extends Thread {
	public FlockApplet flockApplet;
	public boolean running = false;
	
	public AnimationThread(FlockApplet flockApplet) {
		this.flockApplet = flockApplet;
	}
	
	public void run() {
		while (flockApplet.PLAY) {
			Renderer.render(flockApplet.world, flockApplet.bufferGraphics);
			
			// sleep for a bit
			try {
				sleep(flockApplet.ANIMATION_DELAY);
			} catch (InterruptedException e) { ; }
		}
	}
}
