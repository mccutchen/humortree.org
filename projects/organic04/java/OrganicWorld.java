import java.util.*;

public class OrganicWorld {
	private LinkedList		elements;
	private OrganicMover	currentMover;
	
	public OrganicWorld() {
		this.elements	= new LinkedList();
		System.out.println("OrganicWorld: new OrganicWorld created");
	}
	
	public int add(OrganicMover m) {
		this.elements.add(m);
		return this.elements.size();
	}
	
	public int remove() {
		try {
			this.elements.removeLast();
		} catch(NoSuchElementException e) {}
		return this.elements.size();
	}
	
	public void tick() {
		ListIterator li = this.elements.listIterator();
		
		while(li.hasNext()) {
			this.currentMover = (OrganicMover)li.next();
			this.currentMover.tick();
		}
	}
	
	public int getSize() { return this.elements.size(); }
	
	public ListIterator getElements() { return this.elements.listIterator(); }
}