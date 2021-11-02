# OBS-live-translation

This is a method to add a live translation into your live stream in OBS.
It uses the *webkitSpeechRecognition* provided by Chrome Browser to transform the input speech audio to text, then sending it to an API in Google Scripts to translate it and show the translation in your screen.
As the Chrome's speech recognition detects when you finish your sentence, you will get a very good translation of the entire sentence, instead of chunks of non sense text.

## Demo: https://www.twitch.tv/videos/1046684749

## Pre-requisites
- Google Chrome version 25 and later (https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API)
- Google account to use https://script.google.com/ (free account)
- Pinata Cloud account(https://pinata.cloud/) (free account)
- OBS
- (optional) To auto-translate live web-conferences on a Mac, it is necessary an additional driver and capture your desktop audio as an input source. I'm using https://github.com/ExistentialAudio/BlackHole
- (optional) Fonts can be found in https://google-webfonts-helper.herokuapp.com/fonts/cousine?subsets=latin if you want to customise them.

## Phase 1: Preparing Google Scripts to communicate with Google Translator through API

1) Open https://script.google.com/ and create a new project
2) Delete all text and paste the code of gtranslator.gs into the new script
3) Save the project
4) Deploy, select Webapp and enable the option to make it accessible to everyone
5) Save the 'deployment id', it will be used later

## Phase 2: Publish translate.html to a web server

We will use IPFS to have a decentralised webpage.

1) Upload this entire folder in https://pinata.cloud/
2) Update the URL below with the ipfs address supplied by pinata.cloud (**YOUR_IPFS_ADDRESS**), and update **YOUR_DEPLOYMENT_ID** with the key you saved before
- https://gateway.pinata.cloud/ipfs/YOUR_IPFS_ADDRESS/translate.html?recog=en&trans=pt-BR&bgcolor=lightgreen&size=25&weight=900&color=white&st_color=block&st_width=2&v_align=bottom&gs_key=YOUR_DEPLOYMENT_ID
3) Open the address above on Chrome 
4) Enable your input source (microphone or other)
- on a Mac I'm redirecting the desktop audio as an input through BlockHole Audio Driver to be able to auto-translate online web-conferences in my stream.

You can change the source and destination languages, changing the *recog* and *trans* parameters of the URL above. In the example I used *recog=en&trans=pt-BR* for translating from English (en) to Brazilian Portuguese (pt-BR).

You can find a list of some useful ISO language codes (locale) here: https://gist.github.com/eddieoz/63d839c8a20ef508cfa4fa9562632a21

## Phase 3: Create an overlay on OBS

Now you have the API for translation working on Google Scripts and your translation window working on Chrome

1) Add a new window source in OBS and point it to the window where the translation is showing
2) Crop it through 'transform'
3) Add a chromakey filter to remove the green background and make it transparent.

## Known issues

- On Mac, maybe it is needed to have your Chrome window in the same space (desktop) of OBS otherwise the window goes to a standby mode and stops translating.
- Chrome's speech recognition needs a small pause between the sentences to detect and send the text to be translated. If the speaker don't do a pause, it will generate a big chunk of text delayed by some seconds.
- It does not work on localhost, because Chrome needs https to work properly. That's why hosting the html on a https server is mandatory.

This is a reconstruction of the method found on https://www.reddit.com/r/Twitch/comments/l9ako5/adding_live_subtitles_with_translation_to_your/. The original links were broken and the page was not available anymore.
