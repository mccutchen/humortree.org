public class RandomNumber {
	private int hi, low;
	
	public RandomNumber(int low, int hi) {
		this.low = low;
		this.hi = hi;
	}
	
	public int next() {
		return (int) (Math.random () * (this.hi - this.low) + this.low);
	}
	
	public static int between(int low, int hi) {
		return (int) (Math.random () * (hi - low) + low);
	}
}