// This script receives the text to be translated, the original language and the destination language
// It calls google translator and returns the translated text.
// As found on https://github.com/tanabee/google-translation-api/blob/master/code.js

function doGet(e) {
  var p = e.parameter;
  var translatedText = LanguageApp.translate(p.text, p.source, p.target);
  return ContentService.createTextOutput(translatedText);
}