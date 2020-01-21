try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var namerecognition = new SpeechRecognition();
    // console.log(recognition)
    // console.log("name recognition is called")
}
catch (e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
}
const nametextarea = document.querySelector("#name-textarea")
const namestart = document.querySelector("#start-record-btn-name")
const namepause = document.querySelector("#pause-record-btn-name")
const namesave = document.querySelector("#save-note-btn-name");
const nameinstructions = document.querySelector("#recording-instructions-name")
const namenotes = document.querySelector("#notes-name")
let namecontent='';
namerecognition.continuous = true;
namerecognition.onresult=function(event){
    let currentname=event.resultIndex;
    let transcriptname = event.results[currentname][0].transcript;
    console.log(transcriptname)
    // var mobileRepeatBug = (currentname == 1 && transcriptname == event.results[0][0].transcript);
    // if (!mobileRepeatBug) {
        namecontent += transcriptname;
        console.log(namecontent)
        nametextarea.val(namecontent);
        // nametextarea.textContent(namecontent)
        console.log(nametextarea)
    // }
}
nametextarea.addEventListener('input',function() {
    console.log(this);
    namecontent=this.val();

})
// console.log(namestart)
// console.log(namepause)
// console.log(namesave)
// console.log(nametextarea)
namerecognition.onstart = function () {
    // if(namecontent.length)
    // {
    //     namecontent+="";
    // }
    console.log("name recognition start")
    nameinstructions.text('Voice recognition activated. Try speaking into the microphone.');
}
namestart.addEventListener("click",function(){
    namerecognition.start()
})
namesave.addEventListener("click",function(){
    namerecognition.stop();
    // console.log(namecontent)
    if(namecontent.length)
    {
    }
})