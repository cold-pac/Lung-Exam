let answerBox = document.getElementById('answer');
function changeAnswers (element) {
    console.log(element.id);
    switch (element.id) {
        case "percussion":
            answerBox.innerHTML =
                `
                 <span id = "examDescription"><i>You start tapping the patient.</i> You find:</span>
                 <ol id = "answers1">
                    <li class = "multiChoice">Hyper-resonance to percussion</li>
                    <li class = "multiChoice">Resonant to percussion</li>
                    <li class = "multiChoice">Dull to percussion</li>
                    <li class = "multiChoice">Stony dullness</li>
                 </ol>
                 `;
            break;
        case "auscultation":
            answerBox.innerHTML =
                `
                 <span id = "examDescription"><i>You listen to the patient's lung fields with your stethoscope.</i> You hear:</span>
                 <span id = "answers2"> 
                     <span id = "answers2sub">
                         <ol>
                         <h4>Breath sounds</h4>
                            <li class = "multiChoice">Vesicular breath sounds</li>
                            <li class = "multiChoice">Bronchial breath sounds</li>
                         </ol>
                     </span>
                     <span id = "answers2sub2">
                         <ol>
                         <h4>Adventitious sounds</h4>
                            <li class = "multiChoice">No adventitious sounds</li>
                            <li class = "multiChoice">Wheeze</li>
                            <li class = "multiChoice">Stridor</li>
                            <li class = "multiChoice">Crackles</li>
                         </ol>
                     </span>
                 </span>
                `;
            break;
        case "resonance":
            answerBox.innerHTML =
                `
                <span id = "examDescription"><i>You ask the patient to say <b id = "what">'toy boat'</b> while you listen to their chest.</i> You hear: </span>
                 <ol id = "answers1">
                    <li class = "multiChoice">Increased vocal resonance</li>
                    <li class = "multiChoice">Normal vocal resonance</li>
                    <li class = "multiChoice">Reduced vocal resonance</li>
                 </ol>
                `;
            changeWhat();
            break;
    }
}

let whatOptions = ['toy boat', 'blue balloon', 'Scooby Doo'], randomWhat;
function changeWhat() {
    randomWhat = Math.floor(Math.random() * whatOptions.length);
    document.getElementById("what").innerHTML = "'" + whatOptions[randomWhat] + "'";
}

// make an object constructor function that creates the "answer object"? or separate objects for every case? or... both?
