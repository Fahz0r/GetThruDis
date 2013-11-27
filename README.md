GetThruDis
==========

Getrudis the game files
Added: Wed 27th of November

These are the exact game files used in the Getrudis game (www.getrudis.com). Here's what directories there are:

[ Directories important to the game marked with * ]

-> *CSS - Stylesheets for both the game (and Smartphone versions) and the frontpage

-> *IMG - All image files

-> *jQ - jQuery API files (they run locally at all time)

-> LIBS - Contains SMARTY classes (only used for PHP implementation on the frontpage and score board)

-> SCORES - The score board and it's code, this is actually hidden from players

-> *SCRIPTS - All the lovely code stuffs

-> SFX - Sound effects, these have no use until I implement actual audio

-> TEMPLATES_C - Temp dump directory for SMARTY


SCRIPTS is the most important directory 
in this, let's dive into the files:

~ controls.js - Contains key listeners, GUI button functions and movement mechanism

~ functions.js - All important functions that don't fit to any specific mechanic of the game go in here (this includes
the game initialization function)

~ G2RUD.js - The "launcher" script, this is where the magic starts from

~ game.js - This script contains how the game works and how it tracks down what tile does what in the game and what
exactly to do with the movement

~ globalVars - As it says on the tin, some global variables that don't belong to specific game mechanics (stuff like
inventory is in here)

~ mapGen.js - The map generator script, this puts all the content into the dungeon (treasures, traps, monsters, items,
key, the exit door, rare items, extremely rare items, etc)

~ monsters.js - This contains the fighting mechanism (Strength calculation, death handling, weaponry and armor 
calculation, ...)

~ msgs.js - Contains the in-game messages that need to be randomized

~ page.js - This file is only used for the frontpage

~ putscore.php - Launches data from jQuery into a database on the server (works from function death() in functions.js)

~ to-do - This is a text file with a to-do list handy for myself, not really that useful for anyone else

~ traps.js - The traps mechanism (How traps show on the screen, what traps do what, ...)

~ treasures.js - The treasures mechanism (How treasure pickups show on the screen, what treasure does what, ...)

~ weapons.js - The weapons mechanism (How weapon pickups show on the screen). For actual weapon handling refer to
monsters.js.

~ widgets.js - Twitter widget code



Hope this helps!

- Robin de Bekker
