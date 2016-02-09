#!/usr/bin/env nodejs

const Scratch = require('scratch-api');
const config  = require('./config.js');

Scratch.UserSession.load(function(err, user) {
  if(err)
    throw err;
  console.log('Logged in...');
  console.log('Connecting to cloud for project %s...', config.project);
  user.cloudSession(config.project, cloudSession);
});

function cloudSession(err, cloud) {
  if(err)
    throw err;
  console.log('Connected to cloud!');
  var tweet = 'test tweet 2... :D';
  var encoded = encode(tweet);
  console.log('Encoded tweet is %s', encoded);
  cloud.set('☁ tweet', encoded);
  console.log('Set variable, ending...');
  cloud.end();
}

function decode(n) {
	var str = '';
	var arr = n.match(/.{1,3}/g);
	for(var i = 0; i < arr.length; i++) {
		str += String.fromCharCode(parseInt(arr[i]));
	}
	return str;
}

function encode(str) {
	var n = '';
	for(var i = 0; i < str.length; i++) {
		if(str.charCodeAt(i).toString().length == 3)
			n += str.charCodeAt(i);
		else if(str.charCodeAt(i).toString().length == 2)
			n += '0'  + str.charCodeAt(i);
		else if(str.charCodeAt(i).toString().length == 1)
			n += '00' + str.charCodeAt(i);
	}
	return n;
}
