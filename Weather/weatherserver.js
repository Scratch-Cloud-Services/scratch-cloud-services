var Scratch = require('scratch-api');
var XMLHttpRequest = require('xhr2');

var USERNAME = '';
var PASSWORD = '';
var PROJECT_ID = -1;
var API = 'http://api.openweathermap.org/data/2.5/weather?zip=02138,us&units=imperial&APPID={appid}';
var cloud;

Scratch.createUserSession(USERNAME,PASSWORD, function(e,user){
  if (e) return console.error(e);
  user.cloud(PROJECT_ID, function(e, cloud_){
    if (e) return console.error(e);
    cloud = cloud_;
    cloud.connect(function(){
      weatherserver();
    });
  });
});

function weatherserver(){
  setTimeout(weatherserver,60000);
  var req = new XMLHttpRequest();
  req.addEventListener("load",function(){
    var obj = JSON.parse(this.responseText);
    console.log(new Date())
    cloud.set('☁ tempeture', obj.main.temp);
    cloud.set('☁ windspeed', obj.wind.speed);
    cloud.set('☁ winddirection', obj.wind.deg);
    cloud.set('☁ humidity', obj.main.humidity);
    cloud.set('☁ weather id', obj.weather[0].id);
    cloud.set('☁ pressure', obj.main.pressure);
    cloud.set('☁ clouds', obj.clouds.all);
    cloud.set('☁ sunrise',obj.sys.sunrise);
    cloud.set('☁ sunset',obj.sys.sunset);
  });
  req.open('GET',API);
  req.send();
}