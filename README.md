# Just My Type
Covalence

## Info
* You are going to build a typing game
* This lab uses an older version of the Bootstrap UI Framework. It is already imported for you.
* You will be using JQuery to complete this lab
    * Make sure you import JQuery into your html file
    * You will also need to import your own JavaScript file that you create

## Objectives
* (ALREADY COMPLETE) Create two keyboards (include space bar):
		* First keyboard, lowercase keys, numbers and special characters accessed without shift
		* Second, keys accessed while holding down the shift key
		* Exclude keys like tab, delete, shift, command, ctl, caps, option/alt & enter
* The lowercase keyboard should be the only one displayed when the page loads. Write code to hide the uppercase keyboard when the page loads.
* Write jQuery code to set up keyboard toggling:
  * While the shift key is held down, hide the lowercase keyboard and show the uppercase one
  * When the shift key is released, show the lowercase keyboard and hide the uppercase one
* When keys are pressed, they should be highlighted in the browser.
		*Hint: the letters should be matched with the corresponding ascii code. The id value of the key in the html corresponds to the ASCII character code that you can access in the keyboard listener. For example, ascii value 65 is A, and 97 is a. Search for ASCII character chart to see a complete list of codes. Ask yourself: How do I determine which key was pressed on the keyboard when using a jQuery event listener?
* The sentences in the provided array should be displayed at the top of the page one sentence at a time. Once the sentence has been completed, the next in line should appear. There is already a div with id="sentence" in your html file. This is where you will display each sentence one at a time.
```
let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
```
* You should highlight the currently expected letter in the on-screen sentence that should be typed next
    * You can use the div with id="yellow-block" and nudge it along a fixed number of pixels if you'd like
        * Remember to reset it back to the beginning of the sentence when you move to the next sentence
    * If you can think of another way of doing this, then go for it!
* Also display the currently expected letter in the center (div id="target-letter" provided for you)
* For each sentence, show a visual "log" of right/wrong per character by inserting one of the following into the div with id="feedback":
    * If the correct key is pressed, indicate with a green check.
    * If the correct key is not pressed, indicate  with a red X.
    * At the end of each sentence, clear out the feedback div
* The user's words per minute should be calculated and displayed on the screen when you reach the end of the last sentence.
    * Can be calculated by: `numberOfWords / minutes - 2 * numberOfMistakes`
        * For number of words, you can just count how many words make up the sentences you were given and hard code that value.
* There should be a delay so the user can see the score. Then ask the user whether they would like to play again.
    * If confirmed yes, reset the game back to the start.
    * If no, leave as is.

## Hints
* To succeed in this exercise, you need to keep track of:
    * Which sentence the user is on
    * Which letter of that sentence the user is on
* You will examine each keystroke and compare it against the expected letter of the sentence. When you reach the end of a sentence, move on to the next one if available.
* For the feedback green checks and red X, you may use Bootstrap glyphicons for 'ok' and 'remove'.
* While this exercise definitely seems like it should use loops (and perhaps even a nested loop), you should not use a loop at all.
    * Loops are automatic and very fast
    * Think logically about how to move through the sentence array, and through each sentence character-by-character.
        * Let user input/action be the "driving force" of your program.