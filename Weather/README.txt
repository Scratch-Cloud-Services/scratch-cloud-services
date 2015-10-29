HOW TO RUN THE SERVER:
======================
First, you have to have the npm packages scratch-api and xhr2 installed. You can install them with the following to command line:
npm install -g scratch-api
npm install -g xhr2

Then you have to change weatherserver.js so that the variables USERNAME and PASSWORD refer to your username and password, and PROJECT_ID is the the id of the project that you want to change the cloud variables.
You also have to replace the {appid} in the API string with your openweathermap api key.
You can then run the server with
node PATH/TO/weatherserver.js