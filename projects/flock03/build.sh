#!/bin/sh

# clean up old class files
#rm bin/flock03/*.class bin/flock03/threads/*.class bin/flock03/util/*.class

# I'm confused by this classpath stuff.
# this will compile and run the applet
javac -d bin flock03/FlockApplet.java && appletviewer index.html