# st-tweets
## What is st-tweets?
st-tweets will update cloud variables in a Scratch project with the latest tweets by the Scratch Team (ST).

It is written in Python 3 using Dylan5797's ScratchAPI and Beautiful Soup 4.
## How do I use it?
First, install Dylan5797's ScratchAPI and Beautiful Soup 4.

Edit config.py to change the configuration.  

Then simply run `python3 st-tweets.py`.

By default st-tweets will run as a daemon. Currently this only works on Unix-like systems, so to run it on Microsoft Windows just pass the `-d` option.
Use the `-d` option to run st-tweets in the foreground. All output will go to stdout/stderr.

Pass it the `-l` option followed by the file path of the log. When st-tweets daemonizes all output will go here (by default output goes to `/dev/null`).
This option does not have any effect when the `-d` option is used.
