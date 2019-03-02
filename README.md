# unit-4-game
RPG (Role Playing Game)

### Overview

In this project, I have created another fun and interactive game for web browsers. This app dynamically updates HTML pages with the jQuery library.

1. Here's how the app works:

* When the page first loads, an intro music will autoplay, instructions will be visible and a start button to start the game.

* When the game starts, the player will choose a character by clicking on the fighter's picture. That character's distinct sound will play once chosen. The player will fight as that character for the rest of the game. A flag is set up so when you click on the chosen player after it has been initially clicked, no action will performed.

* The ones not chosen will automatically become the enemies which will be collectively in a separate section of the screen. The player must try to defeat all of the remaining fighters. 

* The player chooses an opponent by clicking on an enemy's picture. That character's distinct sound will play once chosen.

* Once the player selects an opponent, that enemy is moved to a `defender area`. A flag is set up so only one opponent can be clicked at a time.

* The player will now be able to click the `attack` button. Another flag is set up so that the attack button will only work once an opponent has been chosen.

* Whenever the player clicks `attack`, their character damages the defender. The character's distinct attack sound will play. The opponent will lose `HP` (health points). These points are displayed at the bottom of the defender's picture. 

* The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their `HP`. These points are shown at the bottom of the player character's picture.

2. The player will keep hitting the attack button in an effort to defeat their opponent.

* When the defender's `HP` is reduced to zero or below, the enemy is removed from the `defender area`. The player character can now choose a new opponent.

4. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's `HP` falls to zero or below.

##### Game Design Notes

* Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`. The stats are stored as an object along with the chracter's names.

* Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
  For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).

* The enemy character only has `Counter Attack Power`. 

* Unlike the player's `Attack Points`, `Counter Attack Power` never changes.

* The `Health Points`, `Attack Power` and `Counter Attack Power` of each character differ.

* No characters in the game can heal or recover Health Points. 

* A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to grind `Attack Power` and to take on enemies before they lose all of their `Health Points`. 

* Players may win or lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.

* The concept of the game was inspired by the popularity of Pokemon. The pokemon characters appear in trading cards (and video games) and each have their respective stats which are used to help determine wins/loss when battling opponents.

* Because of the "card" concept, I was able to use the card format in bootstrap to display the characters in my layout. Found this sample layout and used some of the coding for the game's layout.  (https://getbootstrap.com/docs/4.0/examples/album/#)


