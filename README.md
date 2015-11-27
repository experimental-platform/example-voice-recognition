# Voice Recognition Example for Experimental Platform

[The node.js code](https://github.com/experimental-platform/example-voice-recognition/blob/master/index.js) has only a few lines and is easy to understand. It uses [pocketsphinx](http://cmusphinx.sourceforge.net/) to recognize speech commands and [speech-dispatcher](http://manpages.ubuntu.com/manpages/vivid/man1/spd-say.1.html) to answer.

## Requirements

* A machine that runs [Experimental Platform](https://github.com/experimental-platform/platform-configure-script)
* A microphone, we used [this](http://www.amazon.com/Adjustable-Microphone-Compatible-Chatting-Recording/dp/B00UZY2YQE/)
* A speaker, we used [this](http://www.amazon.com/Logitech-S150-Speakers-Digital-Sound/dp/B000ZH98LU)

## Installation

Make sure the microphone is plugged in before you deploy the code.

    git clone https://github.com/experimental-platform/example-voice-recognition.git
    cd example-voice-recognition
    git remote add platform ssh://dokku@your-box.local:8022/example-voice-recognition
    git push platform master

## Audio settings

If you want to use different audio input and output than the default ones (typically the first ones to be connected to the system, like integrated audio card) then you need to use `pactl` to switch the default sink and/or source.

`pactl list sinks` and `pactl list sources` will list the outputs and inputs respectively.
`pactl set-default-sink <sink name>` and `pactl set-default-source <source name>` will switch the default output and input used by PulseAudio.

You might also need to use `alsamixer` to ramp up the volume of your devices.

## Adding new voice commands

Add your word to the [dictionary file](https://github.com/experimental-platform/example-voice-recognition/blob/master/config/dictionary.dic) and [check if the word is included](https://github.com/experimental-platform/example-voice-recognition/blob/master/index.js#L14) in the stdout of pocketsphinx.
