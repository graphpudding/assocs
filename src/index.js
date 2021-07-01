import './styles/index.scss';
import './assets/fonts/Roboto-Regular.ttf';
import './component.js';

// Speech recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;




const recognition = new SpeechRecognition();
recognition.lang = 'ru-RU';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const microphoneIcon = document.querySelector('.microphone__image');
const microphoneWrapper = document.querySelector('.microphone-wrapper');
const audioRecordAnimation = document.querySelector('.audio-record-animation');
const speechRecognitionSection = document.querySelector(
  '.speech-recognition-section'
);

recognition.onresult = function(event) {
  console.log("onresult ",event.results[event.results.length - 1][0].transcript);
  getAssocs(event.results[event.results.length - 1][0].transcript)
  console.log(event);
  window.last = event.results[event.results.length - 1][0].transcript
  document.querySelector(".js-voice").innerHTML= window.last
};

recognition.onspeechend = function() {

setTimeout(()=>{recognition.start();},400)
};

// end of speech recognition

setTimeout(()=>{recognition.start();},1000)

function getAssocs(Atext){
	fetch(
	"https://api.wordassociations.net/associations/v1.0/json/search?apikey=5337e0ca-1df7-4ef6-afdb-de382ebe2864",
	{
		"Accept": '*/*',
		"Content-Length": 28,
		"Content-Type": "application/x-www-form-urlencoded",
		mode: "no-cors",
		method: 'POST',
body: JSON.stringify({"text":Atext,"lang":"ru","limit":6}) }
	).then((response) => {
    return response.json();
	console.log(response)
  })
  .then((data) => {
    console.log(data);
  });

}
