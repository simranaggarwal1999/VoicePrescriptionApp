const finalbutton = document.querySelector("#final-report")
const {finalname}=require("../js/name")

function finalreport() {
    console.log("final report is called")
    var func=finalname()
}

finalbutton.addEventListener("click", function () {
    finalreport();
})

