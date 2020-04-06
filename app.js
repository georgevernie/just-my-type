//Global Variables
let notFirstGame = false;
let finalSentencesCharCount = 0;
let numMistakes = 0;
let sentenceCharCount = 0;     // Used for tracking which char is the excepted character within the current string.
let sentenceCount = 0;         // Used for tracking which string the program is on in sentences.
let intialize = false;         // Used for intial sentence appending.
let wordCount = 0;             // Used for tracking number of words throughout program.
const sentences = ["ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate"]; // Expected Sentences. 

//Game timing
let timePassedInSec = 0;
setInterval(
    () => timePassedInSec++,
    1000
);

//DOM Selectors
const upperCaseKeyBoard = $("#keyboard-upper-container");
const lowerCaseKeyBoard = $("#keyboard-lower-container");
const currentSentence = $("#sentence");
const sentenceScoreBoard = $("#feedback");
const expectedLetter = $("#target-letter");
let expectedLetterHighlighter = $("#targetChar");   //re-assigned later in code.

//Function Calls:
hideUpperCaseKeyBoardWhenPgLoaded();
changeKeyBoardToUpperOrLowerCaseOnShift();
sentenceStagingAndExpectedLetter();      //Stages sentence one on first call.
keyBoardInputandKeyboardHighlighting();

//Function Declarations:
function hideUpperCaseKeyBoardWhenPgLoaded() {
    upperCaseKeyBoard.hide();
}

//Changes the Keyboard to UpperCase when shift is pressed, puts it back to lower case when shift is released.
function changeKeyBoardToUpperOrLowerCaseOnShift() {
    $(document).keydown(function (event) {
        let keyChar = event.key;
        if (keyChar == "Shift") {
            lowerCaseKeyBoard.hide();
            upperCaseKeyBoard.show();
        }
    });
    $(document).keyup(function (event) {
        let keyChar = event.key;
        if (keyChar == "Shift") {
            lowerCaseKeyBoard.show();
            upperCaseKeyBoard.hide();
        }
    });
}

//
function keyBoardInputandKeyboardHighlighting() {
    let keyBoardKeyID = 0;
    $("body").keydown(function (event) {
        let keyChar = event.key;
        if (keyChar === "Shift") { return 0; } //Prevents a Shift from being counted.
        //Highlights the key by id.
        let keyCharKeyCode = keyChar.charCodeAt(0);
        keyBoardKeyID = $("#" + keyCharKeyCode);
        keyBoardKeyID.css({ background: "aqua", transition: "0.1s" });
        //When the right key is pressed add a green O:
        if (keyBoardKeyID.text() === getCurrentExpectedKey() || keyCharKeyCode === 32 && getCurrentExpectedKey() === " ") {
            sentenceScoreBoard.append("<span class=\"green\">O</span>");
            $(".green").css({ textAlign: "center", background: "lime" });
        }
        //If the typist does not press the right key add mistake add red X:
        else {
            sentenceScoreBoard.append("<span class=\"red\">X</span>");
            $(".red").css({ textAlign: "center", background: "red" });
            numMistakes++;
        }
        sentenceStagingAndExpectedLetter(); // Gets the Currently Expected Key and Does Some Animation of expectedHighlighter.
        return 0;
    });
    //Clears the highlighted key.
    $("body").keyup(function (event) {
        let keyChar = event.key;
        let keyCharKeyCode = keyChar.charCodeAt(0);
        let keyBoardKeyID = $("#" + keyCharKeyCode);
        keyBoardKeyID.css({ background: "#f5f5f5", transition: "0.2s" });
    });
}
// Gets the Currently Expected Key and Does Some Animation of expectedHighlighter.
function getCurrentExpectedKey() {
    let aSentence = sentences[sentenceCount];                    //Gets the first sentence from the required list.
    let currentExpectedLetter = aSentence[sentenceCharCount];    //Gets the current expected character from the string.
    expectedLetterHighlighter.css({ left: "+=17.40px", transition: "0.1s" }); //Moves targetChar 
    if (aSentence[sentenceCharCount] === undefined) {
        cleanOutSentence(); //Time for next sentence clean out old sentence and set values for the next one.
    }
    else {
        return currentExpectedLetter;
    }
}
//Checks to see if game is over.
function isGameOver() {
    if (sentences.length === sentenceCount) {
        //When the game restarts it receives an extra mistake input this removes that bug. 
        if (notFirstGame === true) {
            numMistakes = numMistakes - 1;
        }
        numMistakes = numMistakes - (sentences.length - 1);
        let numRight = finalSentencesCharCount - numMistakes;
        let accuracy = (numRight / finalSentencesCharCount) * 100;
        alert("Your Words Per Minute: " + wordCount / (timePassedInSec * 1 / 60));
        alert("Your Accuracy: " + accuracy + "%");
        alert("Your Total Game Score: " + wordCount / (timePassedInSec * 1 / 60) / 2 * numRight);
        let playAgain = confirm("Would like to play again?");
        if (playAgain === true) {
            reStartGame();
        }
        else {
            console.log("Program Finished");
        }
    }
}
//Resets the global variables for the game.
function reStartGame() {
    console.log("Restarting");
    sentenceCount = 0;
    sentenceCharCount = 0;
    wordCount = 0;
    numMistakes = 0;
    finalSentencesCharCount = 0;
    notFirstGame = true;
    timePassedInSec = 0;
}

//Sets values for next sentence, and cleans out the old one.
function cleanOutSentence() {
    finalSentencesCharCount = finalSentencesCharCount + sentenceCharCount;
    sentenceCount++;
    wordCount++;
    sentenceCharCount = 0;
    intialize = false;
    isGameOver();                                          // Check to see if game is done.
    aSentence = sentences[sentenceCount];
    currentSentence.empty();
    currentSentence.append(aSentence);
    currentExpectedLetter = aSentence[sentenceCharCount]; // Gets the first character of the first sentence
    if (sentences.length === sentenceCount) {
        return 0;
    }
    return currentExpectedLetter;
}

//This function appends the sentences to the screen.
function sentenceStagingAndExpectedLetter() {
    let aSentence = sentences[sentenceCount]; //Gets aSentence from Sentences.
    let currentExpectedLetter = aSentence[sentenceCharCount];
    //The intializes the first sentence of the program.
    if (intialize === false && sentenceCount === 0) {
        sentenceScoreBoard.empty();
        expectedLetterHighlighter.remove();
        currentSentence.before($("<div class=\"row\" id=\"targetChar\"></div>"))
        expectedLetterHighlighter = $("#targetChar");
        currentExpectedLetter = aSentence[sentenceCharCount];
        currentSentence.empty();
        currentSentence.append(aSentence);
        intialize = true;
        expectedLetter.append(currentExpectedLetter);
    }
    // Intializes any other Sentence in the program.
    else if (intialize === false && sentenceCount !== 0) {
        sentenceScoreBoard.empty();
        expectedLetterHighlighter.remove();
        currentSentence.before($("<div class=\"row\" id=\"targetChar\"></div>"))
        expectedLetterHighlighter = $("#targetChar");
        currentExpectedLetter = aSentence[sentenceCharCount];
        intialize = true;
        expectedLetter.append(currentExpectedLetter);
    }
    // Expected letter and word count.
    else {
        sentenceCharCount++;
        currentExpectedLetter = aSentence[sentenceCharCount];
        //I can keep track of word count by using Spaces.
        if (currentExpectedLetter === " ") {
            wordCount++;
            expectedLetter.empty();
            expectedLetter.append("SPACE");
            return 0;
        }
        expectedLetter.empty();
        expectedLetter.append(currentExpectedLetter);
    }
}