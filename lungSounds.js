//TODO: clean this code up when you've finished

let answerBox = document.getElementById('answer'), answerTag;
function changeAnswers (element) {
    //console.log(element.id);
    answerTag = element.id;
    switch (element.id) {
        case "percussion":
            answerBox.innerHTML =
                `
                 <span id = "examDescription"><i>You start tapping the patient.</i> You find:</span>
                 <ol id = "answers1">
                    <li id = "hyperresonant" class = "multiChoice">Hyper-resonant to percussion</li>
                    <li id = "resonant" class = "multiChoice">Resonant to percussion</li>
                    <li id = "dull" class = "multiChoice">Dull to percussion</li>
                    <li id = "stony" class = "multiChoice">Stony dullness</li>
                 </ol>
                 `;
            addClickChange();
            if (yourAnswers.hasOwnProperty(element.id)) {
                document.getElementById(yourAnswers[element.id]).style.backgroundColor = "yellow"; //TODO: make a unified CSS function that just takes the HTML DOM object's id and applies the 'answer' style to it. Hopefully more complicated that just "bgColor = yellow"
            }
            break;
        case "auscultation":
            answerBox.innerHTML =
                `
                 <span id = "examDescription"><i>You listen to the patient's lung fields with your stethoscope.</i> You hear:</span>
                 <span id = "answers2"> 
                     <span id = "answers2sub">
                         <ol>
                         <h4>Breath sounds</h4>
                            <li id = "vesicular" class = "multiChoice">Vesicular breath sounds</li>
                            <li id = "bronchial" class = "multiChoice">Bronchial breath sounds</li>
                         </ol>
                     </span>
                     <span id = "answers2sub2">
                         <ol>
                         <h4>Adventitious sounds</h4>
                            <li id = "noAdded" class = "multiChoice">No adventitious sounds</li>
                            <li id = "wheeze" class = "multiChoice">Wheeze</li>
                            <li id = "stridor" class = "multiChoice">Stridor</li>
                            <li id = "crackles" class = "multiChoice">Crackles</li>
                         </ol>
                     </span>
                 </span>
                `;
            addClickChange();
            yourAnswers.auscultation.breathSounds.forEach(function(elem) {
               document.getElementById(elem).style.backgroundColor = "yellow";
            });
            yourAnswers.auscultation.adventitiousSounds.forEach(function(elem) {
                document.getElementById(elem).style.backgroundColor = "yellow";
            });
            break;
        case "resonance":
            answerBox.innerHTML =
                `
                <span id = "examDescription"><i>You ask the patient to say <b id = "what">'toy boat'</b> while you listen to their chest.</i> You hear: </span>
                 <ol id = "answers1">
                    <li id = "increasedVR" class = "multiChoice">Increased vocal resonance</li>
                    <li id = "normalVR" class = "multiChoice">Normal vocal resonance</li>
                    <li id = "reducedVR" class = "multiChoice">Reduced vocal resonance</li>
                 </ol>
                `;
            addClickChange();
            changeWhat();
            if (yourAnswers.hasOwnProperty(element.id)) {
                document.getElementById(yourAnswers[element.id]).style.backgroundColor = "yellow"; //TODO: make a unified CSS function that just takes the HTML DOM object's id and applies the 'answer' style to it. Hopefully more complicated that just "bgColor = yellow"
            }
            break;
    }
}

let whatOptions = ['toy boat', 'blue balloon', 'Scooby Doo'], randomWhat;
function changeWhat() {
    randomWhat = Math.floor(Math.random() * whatOptions.length);
    document.getElementById("what").innerHTML = "'" + whatOptions[randomWhat] + "'";
}

//refreshes the "your answers" bar - executed every time you click a multiple choice answer
let yourAnswers = {}, yourAnswersText, yourAnswersKeys;
yourAnswers["auscultation"] = {breathSounds: [], adventitiousSounds: []};
let desiredOrder = ["percussion", "auscultation", "resonance"];
function refreshYourAnswers() {
    yourAnswersText = document.getElementById("yourAnswers");
    yourAnswersText.innerHTML = "";
    yourAnswersKeys = Object.keys(yourAnswers);
    yourAnswersKeys = yourAnswersKeys.sort((a,b) => desiredOrder.indexOf(a) > desiredOrder.indexOf(b) ? 1 : desiredOrder.indexOf(a) < desiredOrder.indexOf(b) ? -1 : 0);
    console.log(yourAnswersKeys);
    yourAnswersKeys.forEach(function(elem) {
        if (elem == "auscultation") {
            if (yourAnswers[elem]["breathSounds"].length == 0 && yourAnswers[elem]["adventitiousSounds"].length == 0) {

            } else if (yourAnswers[elem]["breathSounds"].length != 0 && yourAnswers[elem]["adventitiousSounds"].length != 0) {
                yourAnswersText.innerHTML += elem + ": " + yourAnswers[elem]["breathSounds"] + ", " + yourAnswers[elem]["adventitiousSounds"] + "<br/>";
            } else if (yourAnswers[elem]["breathSounds"].length != 0 && yourAnswers[elem]["adventitiousSounds"].length == 0) {
                yourAnswersText.innerHTML += elem + ": " + yourAnswers[elem]["breathSounds"] + "<br/>";
            } else if (yourAnswers[elem]["breathSounds"].length == 0 && yourAnswers[elem]["adventitiousSounds"].length != 0) {
                yourAnswersText.innerHTML += elem + ": " + yourAnswers[elem]["adventitiousSounds"] + "<br/>";
            }
        } else {
            yourAnswersText.innerHTML += elem + ": " + yourAnswers[elem] + "<br/>";
        }
    });
}

//executed when multiChoice is clicked
function highlightThis () {
    //alert(this.id);
    multiChoiceAnswers = document.getElementsByClassName("multiChoice");
    if (answerTag != "auscultation") {
        for (var i = 0; i < multiChoiceAnswers.length; i++) {
            multiChoiceAnswers[i].style.backgroundColor = "beige";
        }
    }


    if (answerTag == "auscultation") { //this part is not very elegant
        if (this.id == "vesicular" || this.id == "bronchial") {
            yourAnswers.auscultation.breathSounds = [];
            yourAnswers.auscultation.breathSounds.push(this.id);
        } else {
            yourAnswers.auscultation.adventitiousSounds = [];
            yourAnswers.auscultation.adventitiousSounds.push(this.id);
        }
    } else {
        yourAnswers[answerTag] = this.id;
    }

    console.log(answerTag);
    if (answerTag == "auscultation") {
        for (var i = 0; i < multiChoiceAnswers.length; i++) {
            if (yourAnswers.auscultation.breathSounds.indexOf(multiChoiceAnswers[i].id) == -1 && yourAnswers.auscultation.adventitiousSounds.indexOf(multiChoiceAnswers[i].id) == -1) {
                multiChoiceAnswers[i].style.backgroundColor = "beige";
            }

        }
    }

    this.style.backgroundColor = "yellow";
    //console.log(yourAnswers); //object containing your "answers"
    refreshYourAnswers();
}


//Adds 'click' event listener to all multiple choice answers. Called every time you click "percussion", "auscultation", "resonance"
let multiChoiceAnswers;
function addClickChange () {
    multiChoiceAnswers = document.getElementsByClassName("multiChoice");
    for (var i = 0; i < multiChoiceAnswers.length; i++) {
        multiChoiceAnswers[i].addEventListener("click", highlightThis);
    }
}
