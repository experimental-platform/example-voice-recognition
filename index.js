var express = require('express');
var app = express();
var childProcess = require("child_process");
var spawn = childProcess.spawn;
var exec = childProcess.exec;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var speechRecognition = spawn("pocketsphinx_continuous", ["-inmic", "yes", "-vad_threshold", "4", "-dict", "./config/dictionary.dic"]);
speechRecognition.stdout.on("data", function(data) {
  if (data.toString().indexOf("time") !== -1) {
    sayTime();
  }
});

function sayTime() {
  var localeTime = new Date().toLocaleTimeString().split(":");
  localeTime = localeTime[0] + " hours and " + localeTime[1] + " seconds";
  console.log("Say time:" , localeTime);
  exec('echo "' + localeTime + '" | festival --tts');
}


app.get('/', function(request, response) {
  response.send('Connect microphone and speakers. Then say the word "Time".');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
