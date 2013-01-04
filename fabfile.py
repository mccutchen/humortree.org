from fabric.api import env, run

env.forward_agent = True
env.hosts = ['mccutchen@overloaded.org']

def deploy():
    run('cd humortree.org && git pull --rebase')
