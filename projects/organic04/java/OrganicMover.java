import java.util.*;
import java.awt.Color;
import java.awt.Graphics;

public class OrganicMover {

	public static int FICKLENESS_MIN = 20;
	public static int FICKLENESS_MAX = 100;
	public static int STEP_RANGE = 2;
	public static int STEP_MIN = 2;
	public static int STEP_MAX = 6;
	public static int MAX_TAIL_LENGTH = 8;
	public static int MIN_TAIL_LENGTH = 3;
	
	public int 						id;
	private int						x,
												y,
												step,
												fickleness,
												ticks,
												tailLength;
	private final int			r = 1;
	private OrganicAngle	angle;
	private Color					color;
	private LinkedList		tail;
	private FadingColor		tailColor;

	public OrganicMover(int id) {
		this.id = id;
		this.x = 0;
		this.y = 0;
		this.fickleness	= RandomNumber.between(FICKLENESS_MIN, FICKLENESS_MAX);
		this.step	= RandomNumber.between(STEP_MIN, STEP_MAX);
		this.angle = new OrganicAngle();
		this.tail = new LinkedList();
		this.color = new Color(51,51,51);
		this.tailColor = new FadingColor(this.color, new Color(238,238,238), MAX_TAIL_LENGTH);
		this.tailLength = RandomNumber.between(MIN_TAIL_LENGTH,MAX_TAIL_LENGTH);
		this.ticks = 0;
	}
	
	public void tick() {
		move();
		if (ticks++ == fickleness) renew();
	}
	
	private void renew() {
		fickleness	= RandomNumber.between(FICKLENESS_MIN, FICKLENESS_MAX);
		step = RandomNumber.between(step - STEP_RANGE, step + STEP_RANGE);
		step = (step < STEP_MIN) ? STEP_MIN : (step > STEP_MAX) ? STEP_MAX : step;
		ticks = 0;
	}
	
	private void handleTail() {
		if (tail.size() >= tailLength) tail.removeLast();
		tail.addFirst(new TailElement(this.x, this.y));
	}

	private void move() {
		double a = this.angle.next();
		int dx = (int)Math.ceil(Math.cos(a) * this.step); // what to change x by
		int dy = (int)Math.ceil(Math.sin(a) * this.step); // what to change y by
		this.x = OrganicView.wrapx(this.x + dx);
		this.y = OrganicView.wrapy(this.y + dy);
                handleTail();	
	}

	public void paint(Graphics g) {
		g.setColor(color);
		g.drawLine(x - r, y, x + r, y);
		g.drawLine(x, y - r, x, y + r);
		
		int count = 0;
		ListIterator li = tail.listIterator();
		while(li.hasNext()) {
			TailElement el = (TailElement)li.next();
			Color c = tailColor.at(count++);
			g.setColor(c);
			g.drawLine(el.x - r, el.y, el.x + r, el.y);
			g.drawLine(el.x, el.y - r, el.x, el.y + r);
		}
		count = 0;
	}
}