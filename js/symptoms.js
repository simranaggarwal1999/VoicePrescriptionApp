try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var symptomsrecognition = new SpeechRecognition();
    // console.log(recognition)
    // console.log("symptom recognition is called")
}
catch (e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}
const symptomstextarea = document.querySelector("#symptoms-textarea")
const symptomsstart = document.querySelector("#start-record-btn-symptoms")
const symptomspause = document.querySelector("#pause-record-btn-symptoms")
const symptomssave = document.querySelector("#save-note-btn-symptoms");
const symptomsinstructions = document.querySelector("#recording-instructions-symptoms")
const symptomsnotes = document.querySelector("#notes-symptoms")
let symptomscontent="kfdlklzklkl";
symptomsrecognition.continuous = true;
symptomsrecognition.onstart = function () {
    // if(symptomscontent.length)
    // {
    //     symptomscontent+="";
    // }
    console.log("symptoms recognition start")
    symptomsinstructions.text('Voice recognition activated. Try speaking into the microphone.');
}
symptomsstart.addEventListener("click", function () {
    symptomsrecognition.start()
})
symptomssave.addEventListener("click", function () {
    symptomsrecognition.stop();
    // console.log(symptomscontent)
    if (symptomscontent.length) {
    }
})