public class OrganicAngle {
	
	public static int DEFAULT_RANGE = 20;
	public static int FICKLENESS_MIN = 10;
	public static int FICKLENESS_MAX = 30;
	public static int STEP_MIN = -5;
	public static int STEP_MAX = 5;
	
	private int range,
							degrees,
							fickleness,
							step,
							ticks;
	
	// constructor
	public OrganicAngle() {
		this.range			= DEFAULT_RANGE;
		this.degrees		= RandomNumber.between(0,360);
		this.fickleness	= RandomNumber.between(FICKLENESS_MIN, FICKLENESS_MAX);
		this.step				= RandomNumber.between(STEP_MIN, STEP_MAX);
		this.ticks			= 0;
	}
	
	// methods
	public double next() {
		this.ticks++;
		if(this.ticks == this.fickleness)
			this.renew();
		int newd = this.degrees + this.step; // increment the degree by step
		this.degrees = this.fixDegrees(newd);
		return this.toRadians();
	}
	
	private void renew() {
		this.ticks			= 0;
		int newd				= RandomNumber.between(this.degrees-this.range, this.degrees+this.range);
		this.degrees		= this.fixDegrees(newd);
		this.fickleness	= RandomNumber.between(FICKLENESS_MIN, FICKLENESS_MAX);
		this.step				= RandomNumber.between(STEP_MIN, STEP_MAX);
	}
	
	private double toRadians() {
		return (double)(this.degrees * (Math.PI / 180)); // convert degrees to radians and return
	}
	
	private int fixDegrees(int deg) {
		return (deg >= 360) ? deg - 360 : (deg < 0) ? 360 + deg : deg;
	}
}