#!/usr/bin/env python3

import sys
import os
import scratchapi
import urllib.request
import datetime
import time
from getopt import getopt
from getpass import getpass
from bs4 import BeautifulSoup

import config

def usage():
    """Print usage."""
    print("usage: python3 %s [-d] [-l log]" % sys.argv[0])
    sys.exit(1)

def daemonize():
    """Daemonize the process."""
    pid = os.fork()
    if pid < 0:
        print("Error: fork failed!", file=sys.stderr)
        sys.exit(1)
    if pid > 0:
        os._exit(0)

    # Redirect stdio to /dev/null and redirect stdout and stderr to log file
    fd = os.open("/dev/null", os.O_RDONLY)
    os.dup2(fd, 0)
    if fd > 2:
        os.close(fd)
    fd = os.open(logfile, os.O_WRONLY | os.O_CREAT)
    os.dup2(fd, 1)
    os.dup2(fd, 2)
    if fd > 2:
        os.close(fd)

def get_tweet():
    """Get a tweet and set cloud variables."""
    url = 'https://twitter.com/' + config.config['user']
    response = urllib.request.urlopen(url)
    html = response.read()
    soup = BeautifulSoup(html, 'html.parser')

    tweets = soup.find_all('li', 'js-stream-item')
    tweet_text = soup.find_all('p', 'js-tweet-text')
    tweet_timestamps = soup.find_all('a', 'tweet-timestamp')
    tweet_links = soup.find_all('a', 'js-details')

    if len(tweet_text) < 1:
        print("Error: no tweets!", file=sys.sterr)

    text = tweet_text[0].get_text()
    timestamp = tweet_timestamps[0]['title']
    encoded = encode(text)
    print('Encoded tweet is %s' % encoded)
    scratch.cloud.set_var('tweet', encoded, config.config['project_id'])
    encoded_ts = encode(timestamp)
    scratch.cloud.set_var('timestamp', encoded_ts, config.config['project_id'])

def encode(s):
    """Encode a string to be decoded by Scratch."""
    n = ''
    for i in range(0, len(s)):
        e = str(ord(s[i]))
        if len(e) == 3:
            n += e
        elif len(e) == 2:
            n += '0' + e
        elif len(e) == 1:
            n += '00' + e
    return n

# Default options
daemon = True
logfile = "/dev/null"

try:
    (opts, []) = getopt(sys.argv[1:], 'dl:')
except:
    usage()

for opt, val in opts:
    if opt == '-d':
        daemon = False
    elif opt == '-l':
        logfile = val

scratch = scratchapi.ScratchUserSession(input("Scratch Username: "), getpass("Scratch Password: "))

if not scratch.tools.verify_session():
    print("Error: could not log in!", file=sys.stderr)
    sys.exit(1)

if daemon:
    daemonize()

while True:
    get_tweet()
    time.sleep(config.config['delay'])
