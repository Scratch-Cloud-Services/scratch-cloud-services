#!/usr/bin/nodejs
//
// s2ssh
// OpenSSH client wrapper for Scratch cloud variables
//

/*** required modules ***/
var Scratch       = require('scratch-api');
var child_process = require('child_process');

/*** parse command line arguments ***/
if(process.argv.length < 4) {
	console.error('Error: required arguments\n');
	console.log('Usage: %s s2ssh.js project-id [username@]host',
							process.argv[0]);
	process.exit(1);
}	

// get arguments
var project  = process.argv[2],
		host     = process.argv[3];

/*** server ***/
var cloudSession; // Scratch cloud session
var ssh; // OpenSSH client child process

// connect to Scratch
Scratch.UserSession.load(function (err, user) {
	if(err) {
		console.error(err);
		process.exit(1);
	}
	console.log('Logged in to Scratch...');
	user.cloudSession(project, connected);
});

// connected to cloud server, start SSH
function connected(err, cloud) {
	if(err) {
		console.error(err);
		process.exit(1);
	}
	console.log('Connected!');

	cloudSession = cloud;

	ssh = child_process.spawn('ssh', ['-T', host]);
	console.log('Opened OpenSHH client, PID %d', ssh.pid);

	// send data to Scratch
	function out(data) {
		cloudSession.set(vn('stdout'), encode(data.toString()));
		process.stdout.write(new Buffer(data));
	}
	ssh.stdout.on('data', out);
	ssh.stderr.on('data', out);
	
	ssh.on('exit', function(code) {
		console.log('OpenSSH client exited with %d', code);
		cloudSession.set(vn('exitcode'), code);
		cloudSession.end();
		process.exit(code);
	});

	old = cloudSession.get(vn('stdin'));
	cloudSession.on('set', stdin);
}

function stdin(name, val) {
	if(name != vn('stdin')) return;

	var str = decode(val);
	process.stdout.write(new Buffer(str));
	if(!allowed(str)) {
		ssh.stdin.write(new Buffer('echo Command not allowed\n'));
	}
	ssh.stdin.write(new Buffer(str + '\n'));
}

/*** utility functions ***/
// function to append U+2601 and a space to a variable name
function vn(name) {
	return String.fromCharCode(0x2601) + ' ' + name;
}

// functions for decoding/encoding of strings
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

// WARNING: modification of whitelist and/or allowed() function may result in
// horrible things happening!

// whitelisted tokens
var whitelist = /cat|grep|ls|clear|echo|| |hi|how|are|you|doing|cool|fun|this|that|you|me|i|have|wow|need|yay|boo|what|no|yay|aww|man|woman|safe|cool|awesome|horrid|horrible|weather|sun|shine|rain|rainy|day|night|week|light|dark|dog|house|what|when|why|if|is|many|much|such|doge|money|dollar|dollars|so|mad|happy|sad|way|good|bad|int|integer|float|floating|point|decimal|number|main|for|can|it|it's|a|world|earth|wonder|wonderous|google|search|thing|things|know|game|toy|board|boring|bring|ring|my|your|their|there|amaze|amazing|so|that's|works|people|work|job|time|hour|minute|month|year|pi|pie|chocolate|choc|choco|pine|tree|coca|pineapple|magic|do|while|true|false|y|n/gim;
// determine wether or not a command is safe to execute
function allowed(cmd) {
	if(cmd.indexOf('>') != -1)
		return false;
	tokens = cmd.split(/ |<|;|\|/);
	for(var i = 0; i < tokens.length; i++) {
		if(!whitelist.test(tokens[i]))
			return false;
	}
	return true;
}
