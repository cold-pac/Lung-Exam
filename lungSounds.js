let answerBox = document.getElementById('answer');
function changeAnswers (element) {
    console.log(element.id);
    switch (element.id) {
        case "percussion":
            answerBox.innerHTML =
                `
                 <span id = "examDescription"><i>You start tapping the patient.</i> You find:</span>
                 <ol id = "answers1">
                    <li id = "hyperresonant" class = "multiChoice">Hyper-resonance to percussion</li>
                    <li id = "resonant" class = "multiChoice">Resonant to percussion</li>
                    <li id = "dull" class = "multiChoice">Dull to percussion</li>
                    <li id = "stony" class = "multiChoice">Stony dullness</li>
                 </ol>
                 `;
            addClickChange();
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
            break;
    }
}

let whatOptions = ['toy boat', 'blue balloon', 'Scooby Doo'], randomWhat;
function changeWhat() {
    randomWhat = Math.floor(Math.random() * whatOptions.length);
    document.getElementById("what").innerHTML = "'" + whatOptions[randomWhat] + "'";
}

//executed every time you click a multiple choice answer
function highlightThis () {
    //alert(this.id);
    multiChoiceAnswers = document.getElementsByClassName("multiChoice");
    for (var i = 0; i < multiChoiceAnswers.length; i++) {
        multiChoiceAnswers[i].style.backgroundColor = "beige";
    }
    this.style.backgroundColor = "yellow";
}

let multiChoiceAnswers;
function addClickChange () {
    multiChoiceAnswers = document.getElementsByClassName("multiChoice");
    for (var i = 0; i < multiChoiceAnswers.length; i++) {
        multiChoiceAnswers[i].addEventListener("click", highlightThis);
    }
}



// make an object constructor function that creates the "answer object"? or separate objects for every case? or... both?
