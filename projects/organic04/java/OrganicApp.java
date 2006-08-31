import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

class OrganicApp implements ActionListener {
	static Timer timer;
	static OrganicWorld world;
	static OrganicView view;
	
	public static void main(String[] args) {
		int initialSize = 10;
		if (args.length > 0) {
			try { initialSize = Integer.parseInt(args[0]); }
				catch (Exception e) {}
		}
		int count = 0;
		final OrganicApp app = new OrganicApp();
		timer = new Timer(30,app);
		
		world = new OrganicWorld();
		view = new OrganicView(500,500, world);
		view.setBorder(BorderFactory.createLineBorder(new Color(51,51,51),1));
		
		for(int i = 0; i < initialSize; i++) {
			OrganicMover mover = new OrganicMover(count++);
			world.add(mover);
		}
		
		final JLabel label = new JLabel(initialSize + " organisms");
		
		JPanel controlPanel = new JPanel();
		controlPanel.setLayout(new BoxLayout(controlPanel, BoxLayout.X_AXIS));
		controlPanel.setBorder(BorderFactory.createEmptyBorder(10,10,10,10));
		final JButton startButton = new JButton("start");
		final JButton stopButton = new JButton("stop");
		stopButton.setEnabled(false);
		final JButton addButton = new JButton("add");
		addButton.setMnemonic(KeyEvent.VK_A);
		final JButton removeButton = new JButton("remove");
		removeButton.setMnemonic(KeyEvent.VK_R);
		
		// create events
		startButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				app.startAnimation();
				stopButton.setEnabled(true);
				startButton.setEnabled(false);
			}
		});
		stopButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				app.stopAnimation();
				stopButton.setEnabled(false);
				startButton.setEnabled(true);
			}
		});
		addButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				int count = world.add(new OrganicMover(0));
				label.setText(count + " organisms");
			}
		});
		removeButton.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				int count = world.remove();
				label.setText(count + " organisms");
			}
		});
		
		controlPanel.add(label);
		controlPanel.add(Box.createHorizontalGlue());
		controlPanel.add(addButton);
		controlPanel.add(removeButton);
		controlPanel.add(Box.createRigidArea(new Dimension(10, 0)));
		controlPanel.add(startButton);
		controlPanel.add(stopButton);

		JFrame frame = new JFrame("OrganicApp");
    frame.getContentPane().add(app.view,BorderLayout.NORTH);
		frame.getContentPane().add(controlPanel, BorderLayout.SOUTH);

    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.pack();
    frame.setVisible(true);
	}
	
	
	public void actionPerformed(ActionEvent e) {
		this.world.tick();
		this.view.tick();
	}

	public void startAnimation() {
		if (!this.timer.isRunning())
			this.timer.start();
	}
	
	public void stopAnimation() {
		if (this.timer.isRunning())
			this.timer.stop();
	}
}

