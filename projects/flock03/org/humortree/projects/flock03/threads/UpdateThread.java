package org.humortree.projects.flock03.threads;

import org.humortree.projects.flock03.*;

public class UpdateThread extends Thread {
	public FlockApplet flockApplet;
	public boolean running = false;
	
	public UpdateThread(FlockApplet flockApplet) {
		this.flockApplet = flockApplet;
	}
	
	public void run() {
		while (flockApplet.PLAY) {
			flockApplet.world.update();
			
			// sleep for a bit
			try {
				sleep(flockApplet.UPDATE_DELAY);
			} catch (InterruptedException e) { ; }
		}
	}
}