#!/bin/sh

# clean up old class files
rm flock03/*.class flock03/threads/*.class flock03/util/*.class

# I'm confused by this classpath stuff.
# this will compile and run the applet
javac -cp . -Xlint:deprecation flock03/FlockApplet.java && appletviewer index.html