# $Id: simplecgi.py 25 2006-03-21 16:34:59Z mccutchen $

import cgi, os, sys, time

# redirect stderr to stdout
# TODO: Is this a good idea?
sys.stderr = sys.stdout

# enable traceback support
import cgitb; cgitb.enable()

# optionally create a debug file
debugpath = 'debug'
debugfile = None

# get the querystring
try:
    querystring = os.environ['QUERY_STRING']
except KeyError:
    querystring = ''

# parse the querystring into a list of key, value pairs
args = cgi.parse_qsl(querystring)

def arg(key, func=str):
    if key in args:
        return func(args[key])
    else:
        return None

def debug(msg):
    global debugfile
    if debugfile is None:
        debugfile = file(debugpath,'wa')
        print >> debugfile, '--- %s ---' % time.strftime('%Y/%m/%d @ %H:%M:%S')
    print >> debugfile, msg

def header(name, value):
    """Print the named header to the output stream."""
    debug("Adding header '%s: %s'" % (name, value))
    print '%s: %s\n' % (name, value)

def init(content_type='text/html'):
    """Print the required Content-type header.  This
    method should be called before any output is sent
    to the browser."""
    header('Content-type', content_type)
