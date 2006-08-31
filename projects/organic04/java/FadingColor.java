import java.awt.Color;
public class FadingColor {
	private Color start, current, end;
	private int steps;
	private Color[] sequence;
	private double	deltaR,
						deltaG,
						deltaB,
						doubleR,
						doubleG,
						doubleB;
	private boolean finished = false;
	private int index = 0;
	
	
	public FadingColor(Color start, Color end, int steps) {
		this.start = start;
		this.end = end;
		this.steps = steps;
		this.sequence = new Color[steps];
		reset();
	}
	
	public Color at(int i) {
		try {
			return sequence[i];
		} catch(NullPointerException e) {
			return end;
		}
	}
	
	public Color next() {
		try {
			return sequence[index];
		} catch(NullPointerException e) {
			return end;
		}
	}
	public boolean hasNext() {
		return (index < steps);
	}
	
	private void reset() {
		sequence = new Color[steps];
		setDeltas();
		for(int i = 0; i < steps; i++) {
			doubleR += deltaR;
			doubleG += deltaG;
			doubleB += deltaB;
			int r = (int)(Math.round(doubleR));
			int g = (int)(Math.round(doubleG));
			int b = (int)(Math.round(doubleB));
			sequence[i] = new Color(r,g,b);
		}
		finished = false;
		index = 0;
		
		for(int i = 0; i < steps; i++) {
			int r = sequence[i].getRed();
			int g = sequence[i].getGreen();
			int b = sequence[i].getBlue();
		}
	}
	
	private void setDeltas() {
		deltaR = (double)(start.getRed() - end.getRed()) / steps * -1;
		deltaG = (double)(start.getGreen() - end.getGreen()) / steps * -1;
		deltaB = (double)(start.getBlue() - end.getBlue()) / steps * -1;
		
		doubleR = (double)start.getRed();
		doubleG = (double)start.getGreen();
		doubleB = (double)start.getBlue();
	}
}