//TODO: clean this code up when you've finished
function startTest () {
    document.getElementById("container").innerHTML = `
        <span id = "case">
            <span id = "case-hitter">Presenting Complaint + signs: Thinking of putting history here. Would that work? Maybe I could generate one randomly. Hm. Can put in signs chosen at random, based on the probability they'd be in an actual patient. e.g. 30% chance bronchiectasis will have clubbing</span>
        </span>
        <span id = "question">
            <button class = ".soundButton" id = "percussion" onclick = "changeAnswers(this)">Percussion</button>
            <button class = ".soundButton" id = "auscultation" onclick = "changeAnswers(this)">Auscultation</button>
            <button class = ".soundButton" id = "resonance" onclick = "changeAnswers(this)">Vocal Resonance</button>
        </span>
        <span id = "answer">
            <span id = "examDescription">Your options will go here. Listen carefully.</span>
        </span>
        <span id = "yourAnswersContainer">
            <span id = "yourAnswers">
                Your answers will go here
            </span>
            <span id = "buttonContainer">
                <button onclick = "submitAnswers()" id = "submitButton">Submit Answers</button>
            </span>
        </span>
    `;
    answerBox = document.getElementById("answer");
};


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
                            <li id = "vesicular breath sounds" class = "multiChoice">Vesicular breath sounds</li>
                            <li id = "diminished vesicular breath sounds" class = "multiChoice">Diminished vesicular breath sounds</li>
                            <li id = "bronchial breathing" class = "multiChoice">Bronchial breath sounds</li>
                         </ol>
                     </span>
                     <span id = "answers2sub2">
                         <ol>
                         <h4>Adventitious sounds</h4>
                            <li id = "no adventitious sounds" class = "multiChoice">No adventitious sounds</li>
                            <li id = "wheeze" class = "multiChoice">Wheeze</li>
                            <li id = "stridor" class = "multiChoice">Stridor</li>
                            <li id = "fine crackles" class = "multiChoice">Fine crackles</li>
                            <li id = "coarse crackles" class = "multiChoice">Course crackles</li>
                            <li id = "pleural friction rub" class = "multiChoice">Pleural friction rub</li>
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
                    <li id = "whispered pectoriloquy" class = "multiChoice">Whispered pectoriloquy</li>
                    <li id = "increased vocal resonance" class = "multiChoice">Increased vocal resonance (egophony)</li>
                    <li id = "normal vocal resonance" class = "multiChoice">Normal vocal resonance</li>
                    <li id = "reduced vocal resonance" class = "multiChoice">Reduced vocal resonance</li>
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
        if (this.id == "vesicular breath sounds" || this.id == "bronchial breathing" || this.id == "diminished vesicular breath sounds") {
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



// make an object constructor function that creates the "answer object"? or separate objects for every case? or... both?


let possibleConditions;
possibleConditions = ["COPD", "pulmonaryFibrosis", "bronchiectasis"];

let answers = {
    COPD : {
        history: ["progressively worsening dyspnoea", "wheeze on forced expiration", "muffled, wheezy, ineffective cough", "recurrent respiratory tract infections"],
        signs: ["Increased work of breathing: tracheal tug, costal indrawing, use of accessory muscles", "nicotine staining of the fingers", "asterixis", "barrel shaped chest", "Bilateral reduced air entry on chest expansion", "Hoover's sign", "signs of cor pulmonale..."],
        percussion: "hyperresonant",
        percussionOptions: ["resonant2"],
        auscultation: ["diminished vesicular breath sounds", "no adventitious sounds"],
        auscultationOptions: ["diminishedvesicularbreathing1", "expiratorywheeze1"],
        resonance: "normal vocal resonance",
        resonanceOptions: ["normalvocalresonance1"],
        investigations: ["spirometry/PFTs", "genetic screen for alpha-1 antitrypsin deficiency", "FBC - anaemia can contribute to dyspnoea", "BNP for heart failure", "ABGs/VBGs for severity", "CXR"],
        caseWriteUp: `
                <!-- Go nuts for these, these need to be really good notes -->
            <div id = "caseWriteUp">
                <header id = "caseWriteUpHeader">Chronic Obstructive Pulmonary Disease</header>
                <div id = "definition">A common, preventable treatable disease, characterised by an abnormal inflammatory response in the lungs caused by significant exposure to noxious particles or gases, most commonly tobacco smoke. Variable combination of small airways disease (chronic bronchitis) and alveolar destruction (emphysema)</div>
                <div id = "signs">
                    <div class = "sign">
                        Signs of airway obstruction:
                        <ul>
                            <li>wheeze</li>
                            <li>tracheal tug + costal indrawing (large negative pleural pressures)</li>
                            <li>Use of accessory muscles</li>
                        </ul>
                        <img src= "Pictures/COPDpatient.jpg">
                    </div>
                    <div class = "sign">
                        Nicotine/tar staining on the fingers 
                        <img src = "Pictures/nicotine.jpg">
                    </div>
                    <div class = "sign">
                        <span>Asterixis - flapping tremor with 2-3 second cycle (CO<sub>2</sub> retention, TYPE 2 RESPIRATORY FAILURE)</span>
                        <img src = "Pictures/asterixis.gif">
                    </div>
                    <div class = "sign">
                        Barrel shaped chest 
                        <img src = "Pictures/barrelchest.jpg">
                    </div>
                    <div class = "sign">
                        Reduced air entry + Hoover's sign (inward movement of the lower chest during inspiration)
                        <img src = "Pictures/hooverssign.gif">
                    </div>
                    <div class = "sign">
                        COPD is the most common cause of cor pulmonale (right ventricular enlargement and failure secondary to pulmonary hypertension due to lung disease). COPD causes destruction of pulmonary vascular beds + hypoxia drives vasoconstriction. Reduced total cross-sectional area leads to increased resistance, pulmonary hypertension.
                        Raised JVP, parasternal heave, palpable P2, signs of right sided heart failure.  
                    </div>
                    <div class = "sign">
                        Hyper-resonance on percussion (due to alveolar destruction, gas-trapping, hyper-inflation of the lungs)
                    </div>
                    <div class = "sign">
                        Diminished vesicular breathing. 
                    </div>
                    <div id = "your-answers"></div>
                </div>
            </div>
        `,
    },
    pulmonaryFibrosis : {
        history: ["exertional dyspnoea", "dry cough", "fatigue", "weight loss", "leg oedema"],
        signs: ["central cyanosis", "clubbing", "tracheal deviation towards affected side", "reduced chest expansion", "pedal oedema"],
        percussion: "dull",
        percussionOptions: ["dull1"],
        auscultation: ["bronchial breathing", "fine crackles"],
        auscultationOptions: ["bronchialbreathing1", "finecrackles1"],
        resonance: "increased vocal resonance",
        resonanceOptions: ["egophony1", "egophony2"],
        investigations: [],
        caseWriteUp: `
            <div id = "caseWriteUp">
                <header id = "caseWriteUpHeader">(Idiopathic) Pulmonary Fibrosis (a.k.a cryptogenic fibrosing alveolitis)</header>
                <div id = "definition">The most common interstitial lung disease - characterised by inflammation and fibrosis of the lung interstitium. Worsening hypoxia and respiratory failure. Poor prognosis.</div>
                <div id = "signs">
                    <div class = "sign">
                        cyanosis 
                        <img src= "Pictures/cyanosis.jpg">
                    </div>
                    <div class = "sign">
                        clubbing
                        <img src = "Pictures/clubbing.jpg">
                    </div>
                    <div class = "sign">
                        tracheal deviation towards the affected side 
                        <img src = "Pictures/trachealshift.jpg">
                    </div>
                    <div class = "sign">
                        Reduced chest expansion on the affected side 
                        <img src = "Pictures/chestexpansion.png">
                    </div>
                    <div class = "sign">
                        In late stages - peripheral oedema
                    </div>
                    <div class = "sign">
                        Dull to percussion 
                    </div>
                    <div class = "sign">
                        Bronchial breathing + fine end-inspiratory crackles 
                    </div>
                    <div class = "sign">
                        Increased vocal resonance 
                    </div>
                    <div id = "investigations">
                    Investigations:
                        <ul>
                            <li>CXR</li>
                            <li>Lung Function Tests i.e. spirometry - shows a restrictive pattern of lung disease (FER normal or high)</li>
                            <li>Lung biopsy</li>
                        </ul>
                    </div>
                    <div id = "your-answers"></div>
                </div>
            </div>
        `,
    },
    bronchiectasis : {
        history: ["severe, persistent very loose and productive cough", "expectoration of copious amounts of mucopurulent, sometimes fetid sputum", "dyspnoea", "haemoptysis", "pleurisy"],
        signs : ["clubbing"],
        percussion: "",
        percussionOptions: [],
        auscultation: ["coarse crackles"],
        auscultationOptions: ["coursecrackles1", "coursecrackles2"],
        resonance: "",
        resonanceOptions: [],
        caseWriteUp: `
            <div id = "caseWriteUp">
                <header id = "caseWriteUpHeader">Bronchiectasis</header>
                <div id = "definition">Permanent dilation of the airways caused by destruction of smooth muscle and the supporting elastic tissue due to a combination of obstruction and chronic infection (two intertwined processes that both contribute to bronchiectasis and both may be initiator)</div>
                <div id = "signs">
                    <div class = "sign">
                        Severe, very persistent loose and productive cough with expectoration of large amounts of mucopurulent, sometimes fetid sputum. 
                        <ul>
                            <li>Dyspnoea and wheezing - 75% of cases</li>
                            <li>Rhinosinusitis</li>
                            <li>Haemoptysis - 56% of cases</li>
                            <li>Pluerisy (a.k.a pleuritis) in 50% of cases! Inflammed pleural membranes sliding over each other, producing a sound like the creaking of a wooden ship!</li>
                        </ul>
                    </div>
                    <div class = "sign">
                       Course crackles (pools of retained secretions, unpleasant gurgling quality) and rhonchi, wheezing. 
                    </div>
                    <div class = "sign">
                        Clubbing in 3% of cases
                        <img src = "Pictures/clubbing.jpg">
                    </div>
                    <div id = "your-answers"></div>
                </div>
            </div>
        `,
    }
};


function quiet(){
    Array.from(document.getElementsByTagName("audio")).forEach(function(elem){
        elem.pause();
    });
}

//currently, every time you click it it picks one of the options at random - happy accident? should change this to = variable so it stays the same every click?
let testCase;
function selectCase () {
    testCase = possibleConditions[Math.floor(Math.random()*possibleConditions.length)];
    console.log(testCase);
    console.log(answers[testCase]);
    document.getElementById("case-hitter").innerHTML = "history: " + answers[testCase]["history"].join(", ") + "<br/><br/>" + "signs: " + answers[testCase]["signs"].join(", ");

    document.getElementById("percussion").addEventListener("click", function() {
        //console.log(answers[testCase]["percussionOptions"][Math.floor(Math.random()*answers[testCase]["percussionOptions"].length)]);
        quiet();
        document.getElementById(answers[testCase]["percussionOptions"][Math.floor(Math.random()*answers[testCase]["percussionOptions"].length)]).play();
    });

    document.getElementById("auscultation").addEventListener("click", function() {
        //console.log(answers[testCase]["auscultationOptions"]);
        quiet();
        document.getElementById(answers[testCase]["auscultationOptions"][Math.floor(Math.random()*answers[testCase]["auscultationOptions"].length)]).play();
    });

    document.getElementById("resonance").addEventListener("click", function() {
        quiet();
        document.getElementById(answers[testCase]["resonanceOptions"][Math.floor(Math.random()*answers[testCase]["resonanceOptions"].length)]).play();
    });

}

let score;
function submitAnswers() {
    document.body.innerHTML = `
        <div id = "correct-answers">
            
        </div>
    `;

    document.getElementById("correct-answers").innerHTML = answers[testCase]['caseWriteUp'];

    document.getElementById("your-answers").innerHTML = `
        <header id = "yourAnswersHeader">Your answers: </header> 
        <div id = "yourAnswersSubmitPage">
            <span class = "submitPage">You thought the patient's lung fields were <span id = "percussionAnswer">${yourAnswers['percussion']}</span> to percussion</span>
            <span class = "submitPage" id = "auscultationAnswer">On auscultation:<span id = "ausc1">${yourAnswers['auscultation']['breathSounds'][0]}</span>, <span id = "ausc2">${yourAnswers['auscultation']['adventitiousSounds'][0]}</span></span>
            <span class = "submitPage"> You heard <span id = "resonanceAnswer" ${yourAnswers['resonance']}</span> </span> <br/>
            <span id = "finalScore">asdfasdf</span>
        </div>
        <button onclick = "window.location = ''" style = "cursor: pointer">Play Again</button>
    `;



    score = 0;
    if (yourAnswers['percussion'] == answers[testCase]['percussion']) {
        document.getElementById("percussionAnswer").style.backgroundColor = "green";
        document.getElementById("percussionAnswer").style.color = "white";
        score++;
    } else {
        document.getElementById("percussionAnswer").style.backgroundColor = "red";
        document.getElementById("percussionAnswer").style.color = "white";
    }

    if (yourAnswers['auscultation']['breathSounds'][0] == answers[testCase]['auscultation'][0]) {
        document.getElementById("ausc1").style.backgroundColor = "green";
        document.getElementById("ausc1").style.color = "white";
        score++;
    } else {
        document.getElementById("ausc1").style.backgroundColor = "red";
        document.getElementById("ausc1").style.color = "white";
    }

    if (yourAnswers['auscultation']['adventitiousSounds'][0] == answers[testCase]['auscultation'][1]) {
        document.getElementById("ausc2").style.backgroundColor = "green";
        document.getElementById("ausc2").style.color = "white";
        score++;
    } else {
        document.getElementById("ausc2").style.backgroundColor = "red";
        document.getElementById("ausc2").style.color = "white";
    }

    if (yourAnswers['resonance'] == answers[testCase]['resonance']) {
        document.getElementById("resonanceAnswer").style.backgroundColor = "green";
        document.getElementById("resonanceAnswer").style.color = "white";
        score++;
    } else {
        document.getElementById("resonanceAnswer").style.backgroundColor = "red";
        document.getElementById("resonanceAnswer").style.color = "white";
    }

    document.getElementById("finalScore").innerHTML = "Score: " + score;
}
