import java.util.*;
import java.awt.*;
import javax.swing.*;

public class OrganicView extends JPanel {
	Dimension preferredSize;
	private static int width, height;
	private OrganicWorld world;
	
	public OrganicView(int width, int height, OrganicWorld world) {
		this.preferredSize = new Dimension(width,height);
		this.width = width;
		this.height = height;
		this.world = world;
		setBackground(new Color(238,238,238));
	}
	
	public void tick() {
		repaint();
	}
	
	public void paintComponent(Graphics g) {
		super.paintComponent(g); //paint background
		
		//g.fillRect(0,0,this.width,this.height);
		
		ListIterator els = this.world.getElements();
		while(els.hasNext()) {
			OrganicMover currentMover = (OrganicMover)els.next();
			currentMover.paint(g);
		}
	}
	
	public Dimension getPreferredSize() { return preferredSize; }
	
	public static int wrapx(int x) { return (x > width) ? x - width : (x < 0) ? width + x : x; }
	public static int wrapy(int y) { return (y > height) ? y - height : (y < 0) ? height + y : y; }
}