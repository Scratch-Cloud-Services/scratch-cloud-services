#!/usr/bin/env python3

import sys
import scratchapi
import urllib.request
import datetime
import time
from getpass import getpass
from bs4 import BeautifulSoup

# import configuration
import config

# get a tweet and set cloud variables
def get_tweet():
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

# encode a string
def encode(s):
    n = ''
    for i in range(0, len(s)):
        if len(str(ord(s[i]))) == 3:
            n += str(ord(s[i]))
        elif len(str(ord(s[i]))) == 2:
            n += '0' + str(ord(s[i]))
        elif len(str(ord(s[i]))) == 1:
            n += '00' + str(ord(s[i]))
    return n

scratch = scratchapi.ScratchUserSession(input("Scratch Username: "), getpass("Scratch Password: "))

if not scratch.tools.verify_session():
    print("Error: could not log in!", file=sys.stderr)
    sys.exit(1)
while True:
    get_tweet()
    time.sleep(config.config['delay'])
