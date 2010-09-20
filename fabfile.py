from fabric.api import *

env.hosts = ['mccutchen@overloaded.org']

def deploy():
    run('cd humortree.org && git pull --rebase')
