var express = require('express');
var app = express();
var childProcess = require("child_process");
var spawn = childProcess.spawn;
var exec = childProcess.exec;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var speechRecognition = spawn("pocketsphinx_continuous", ["-inmic", "yes", "-vad_threshold", "3", "-hmm", "/usr/share/pocketsphinx/model/hmm/en_US/hub4wsj_sc_8k/"]);

speechRecognition.stdout.on("data", function(data) {
  console.log(data.toString());
  if (data.toString().indexOf("time") !== -1) {
    sayTime();
  }
});

speechRecognition.stderr.on("data", function(data) {
});

function sayTime() {
  var date = new Date();
  var localeTime = date.getHours() + " hours and " + date.getMinutes() + " minutes";
  console.log("Say time:" , localeTime);
  exec('spd-say "' + localeTime + '"');
}

app.get('/', function(request, response) {
  response.send('Connect microphone and speakers. Then say the word "Time".');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
