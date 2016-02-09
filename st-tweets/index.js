const Scratch = require('scratch-api');
const config  = require('./config.js');

Scratch.UserSession.load(function(err, user) {
  if(err)
    throw err;
  user.cloudSession(config.project, cloudSession);
});

function cloudSession(err, cloud) {
  if(err)
    throw err;
  var tweet = 'test tweet...'
  cloud.set(String.fromCharCode(2601) + ' tweet', tweet);
}
