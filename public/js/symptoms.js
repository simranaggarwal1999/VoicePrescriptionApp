try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var symptomsrecognition = new SpeechRecognition();
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
let symptomscontent = "";
let symptomscontentstorage = [];

//Voice Recognition
symptomsrecognition.continuous = true;

symptomsrecognition.onresult = function (event) {
    let currentsymptoms = event.resultIndex;
    let transcriptsymptoms = event.results[currentsymptoms][0].transcript;
    // var mobileRepeatBug = (currentsymptoms == 1 && transcriptsymptoms == event.results[0][0].transcript);
    // if (!mobileRepeatBug) {
    symptomscontent += transcriptsymptoms;
    symptomstextarea.textContent = symptomscontent;
    // }
}
symptomsrecognition.onstart = function () {
    symptomsinstructions.innerHTML = "Voice recognition activated. Try speaking into the microphone.";
}

symptomsrecognition.onspeechend = function () {
    symptomsinstructions.innerHTML = "You were quiet for a while so voice recognition turned itself off.";
}

symptomsrecognition.onerror = function (event) {
    if (event.error == 'no-speech') {
        symptomsinstructions.innerHTML = "No speech was detected. Try again.";
    }
}

//App buttons and input
symptomsstart.addEventListener("click", function () {
    if (symptomscontent.length) {
        symptomscontent += " ";
    }
    symptomsrecognition.start()
})
symptomspause.addEventListener("click", function () {
    symptomsrecognition.stop();
    symptomsinstructions.innerHTML = "Voice recognition paused.";
})

symptomstextarea.addEventListener("input", function () {
    symptomscontent = this.value;
})

symptomssave.addEventListener("click", function () {
    symptomsrecognition.stop();
    if (!symptomscontent.length) {
        symptomsinstructions.innerHTML = "Could not save empty note. Please add a message to your note.";
    }
    else {
        savesymptoms(symptomscontent);
        symptomscontent = "";
        //renderNotes
        rendersymptoms(getAllsymptoms());
        symptomstextarea.textContent = "";
        symptomsinstructions.innerHTML = "Note saved successfully.";
    }
})

//notesList.on
symptomsnotes.addEventListener("click", function (event) {
    event.preventDefault();
    let symptomstarget = event.target;
    let symptomscurrenttarget = event.currentTarget
    let arr = symptomstarget.id.split(" ");
    let idx = arr[0]
    let guide = arr[1]
    if (guide == "listen-note") {
        console.log(symptomscurrenttarget.children)
        let symptomsread = symptomscurrenttarget.children[idx].childNodes[3].textContent;
        console.log(symptomsread)
        readOutLoudsymptoms(symptomsread)
        console.log(2)
    }
    else if (guide == "delete-note") {
        let symptomsdelete = symptomscurrenttarget.children[idx].childNodes[3].textContent;
        deletesymptoms(symptomsdelete);


    }

})

//Speech Synthesis
function readOutLoudsymptoms(message) {
    console.log("symptoms read out called")
    var speech = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
    console.log(voices)
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.voice = voices[0];
    console.log(speech)
    window.speechSynthesis.speak(speech);
}

//Helper Functions
function rendersymptoms(symptomsnotestemp) {
    var htmlsymptoms = "";
    if (symptomsnotestemp.length) {
        symptomsnotestemp.map(function (notesymptoms) {
            htmlsymptoms += `<li class="note">
            <p class="header">
            <span class="data">${notesymptoms.content}</span>
            <a href="#" id="${notesymptoms.listnum} listen-note" title="Listen to Note">Listen to Note</a>
            <a href="#" id="${notesymptoms.listnum} delete-note" title="Delete">Delete</a>
            </p>
            <p class="content">${notesymptoms.content}</p>
        </li>`;
        })
    }
    else {
        htmlsymptoms = '<li><p class="content">You don\'t have any symptoms notes yet.</p></li>';
    }
    symptomsnotes.innerHTML = htmlsymptoms;
}

function savesymptoms(symptomscontent) {
    symptomscontentstorage.push("symptoms-" + symptomscontent);
}

function getAllsymptoms() {
    let symptomsnotestemp = [];
    let symptomsnoteskey;
    for (var i = 0; i < symptomscontentstorage.length; i++) {
        symptomsnoteskey = symptomscontentstorage[i];
        if (symptomsnoteskey.substring(0, 9) == "symptoms-") {
            symptomsnotestemp.push({
                listnum: i,
                content: symptomscontentstorage[i].replace("symptoms-", "")
            });
        }
    }
    return symptomsnotestemp;
}

function deletesymptoms(data) {
    symptomscontentstorage = symptomscontentstorage.filter(function (symptomsdata) {
        return symptomsdata != "symptoms-" + data
    })
}