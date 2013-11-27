/*                  GET THESE INTO A 2D ARRAY SOME TIME                   */

var globalMonsters = [
    "SNAKE",
    "TROLL",
    "BAT",
    "DOG",
    "TIGER",
    "GHOST",
    "DINGLE BERRY"
];

var globalMonsterStrength = [
    28, // SNAKE strength between 28 - 38
    35, // TROLL strength between 35 - 45
    25, // BAT strength between 25 - 35
    38, // DOG strength between 38 - 48
    40, // TIGER strength between 40 - 50
    45,  // GHOST strength between 45 - 55
    45
];

var monsterFightChance = 0;
var monster; // Array with monsters
var monsterStrength; // Array with monster strengths
var monsterDice = 0; // Monster seed heh heh
var monsterAdjectiveDice = 0; // Randomly takes an adjective from the pool
var fightDice = 0;  // Fight seed
var fleeDice = 0;   // Flee seed
var fleeToDice = 0; // Flee to which room seed
var fleeDamageDice = 0; // What damage when fleeing seed
var winChance; // Your winning chance against the monster
var fighting = 0; // No fight initiated
var tries; // Amount of times it took to beat the enemy
var fleeTrigger = 0;
var defunctTrigger = 0;
var clearTrigger = 0;

// Monster fighting engine
function fightMonster(whichMonster, allowFlee, defunctRoom, clearBox){
    monster = whichMonster;
    fleeTrigger = allowFlee;
    defunctTrigger = defunctRoom;
    clearTrigger = clearBox;

    // FIGHT STARTS
    tries = 0; //Set amount of tries to 0

    // Since the monster is predefined, the strength is calculated by whatever value of array cel comes in via whichMonster
    monsterStrength = Math.floor(Math.random() * monStrengthRange + globalMonsterStrength[monster] + 1 + monsterFightChance + (gameDifficulty * 3));
    winChance = Math.floor((fightChance / 100) * monsterStrength + curArmor + (curWeapon * 1.5));
    if(playerInventory[7] == 1){ winChance += 5; console.log(winChance); }          // If purple horn is in play, add 5 winchance points

    monsterAdjectiveDice = Math.floor(Math.random() * monsterAdjective.length);

    //Turn controls off temporarily
    buttonsOff();
    isGamePlaying = 0;
    fighting = 0; // Just to be sure..

    //Give fighting options
    playerFights += 1;

    if(clearTrigger == 1){
        $('#textBox').empty();
    }

    $('#textBox').append("A " + monsterAdjective[monsterAdjectiveDice] + " " + globalMonsters[monster] + " attacks you!" + "<br>");
    $('#textBox').append("<br>" + "<button id='fight'>FIGHT!</button>");
    if(fleeTrigger == 1){
        $('#textBox').append(" " + "<button id='flee'>FLEE!</button>");
    }
    $('#chance').append(winChance + " vs " + monsterStrength + " ");        // Only for bug monitoring

    $('#fight').click(fightStart);
    $('#flee').click(fleeStart);

    function fightStart(flee){
        $('#chance').empty();
        if(flee == 1){
            $('#textBox').empty();
            $('#textBox').append("You get into a fight anyway!" + "<br>");
        }
        else{
            $('#textBox').empty();
        }
        fighting = 1;

        while(fighting == 1){
            fightDice = Math.floor(Math.random() * monsterStrength);

            if(fightDice <= winChance){
                $('#chance').append(fightDice + "<br>");
                //WIN THE FIGHT
                fighting = 0;
                tries += 1;
                if(curArmor > 0){
                    if(gameDifficulty == 0){
                        curArmor -= Math.floor(Math.random() * 2 + 1); //AR subtracted between 1 - 2
                    }
                    else if(gameDifficulty == 1){
                        curHealth -= Math.floor(Math.random() * 2); //HP subtracted between 0 - 1
                        curArmor -= Math.floor(Math.random() * 3 + 1); //AR subtracted between 1 - 3
                    }
                    else if(gameDifficulty == 2){
                        curHealth -= Math.floor(Math.random() * 3); //HP subtracted between 0 - 2
                        curArmor -= Math.floor(Math.random() * 4 + 1); //AR subtracted between 1 - 4
                    }
                    checkStats(); // Re-check armor and health
                }
                else{
                    if(gameDifficulty == 0){
                        curHealth -= Math.floor(Math.random() * 2); //HP subtracted between 0 - 1
                    }
                    else if(gameDifficulty == 1){
                        curHealth -= Math.floor(Math.random() * 2 + 1); //HP subtracted between 1 - 2
                    }
                    else if(gameDifficulty == 2){
                        curHealth -= Math.floor(Math.random() * 3 + 1); //HP subtracted between 1 - 3
                    }
                }

                if (curHealth <= 0){        // Check if death has been reached
                    $('#textBox').empty();
                    $('#textBox').append("You bleed out." + "<br>"); //THIS COULD BE RANDOMIZED
                    checkStats(); // Re-check armor and health
                    death('bled out.');
                    fighting = 0;
                    break;
                }
                else{                       // No death? Continue..
                    var willHornHurt = Math.floor(Math.random() * 50 + 1);  // Chance of 1 - 50
                    $('#textBox').empty();
                    $('#textBox').append("The monster yelps in agony.." + "<br>"); //THIS COULD BE RANDOMIZED
                    if(tries == 1){
                        if(playerInventory[7] == 1 && willHornHurt >= 25){            // If dildo active
                            $('#textBox').append("The purple \"horn\" smacks you in the face during the fight." + "<br>");
                            curHealth -= 1;         // Take damage from dildo
                            if (curHealth <= 0){
                                $('#textBox').append("<br>" + "The \"horn\" dealt the final blow." + "<br>");
                                checkStats(); // Re-check armor and health
                                death('died by purple horn.');
                                fighting = 0;
                                break;
                            }
                            else{
                                $('#textBox').append("You were victorious!" + "<br>");
                                checkStats(); // Re-check armor and health
                                curWeaponStrength -= 1; // Break weapon a bit
                                pause();        // Put game on short pause
                            }
                        }
                        else{
                            $('#textBox').append("You were victorious!" + "<br>");
                            checkStats(); // Re-check armor and health
                            curWeaponStrength -= 1; // Break weapon a bit
                            pause();        // Put game on short pause
                        }
                    }
                    else if(tries == 2){
                        if(playerInventory[7] == 1 && willHornHurt >= 25){            // If dildo active
                            $('#textBox').append("The purple \"horn\" smacks you in the face during the fight." + "<br>");
                            curHealth -= 1;         // Take damage from dildo
                            if (curHealth <= 0){
                                $('#textBox').append("<br>" + "The \"horn\" dealt the final blow." + "<br>");
                                checkStats(); // Re-check armor and health
                                death('died by purple horn.');
                                fighting = 0;
                                break;
                            }
                            else{
                                $('#textBox').append("You were victorious but with a scratch." + "<br>");
                                checkStats(); // Re-check armor and health
                                curWeaponStrength -= 1; // Break weapon a bit
                                pause();        // Put game on short pause
                            }
                        }
                        else{
                            $('#textBox').append("You were victorious but with a scratch." + "<br>");
                            checkStats(); // Re-check armor and health
                            curWeaponStrength -= 1; // Break weapon a bit
                            pause();        // Put game on short pause
                        }
                    }
                    else if(tries >= 3){
                        if(playerInventory[7] == 1 && willHornHurt >= 25){            // If dildo active
                            $('#textBox').append("The purple \"horn\" smacks you in the face during the fight." + "<br>");
                            curHealth -= 1;         // Take damage from dildo
                            if (curHealth <= 0){
                                $('#textBox').append("<br>" + "The \"horn\" dealt the final blow." + "<br>");
                                checkStats(); // Re-check armor and health
                                death('died by purple horn.');
                                fighting = 0;
                                break;
                            }
                            else{
                                $('#textBox').append("You were victorious but are injured rather badly." + "<br>");
                                checkStats(); // Re-check armor and health
                                curWeaponStrength -= 1; // Break weapon a bit
                                pause();        // Put game on short pause
                            }
                        }
                        else{
                            $('#textBox').append("You were victorious but are injured rather badly." + "<br>");
                            checkStats(); // Re-check armor and health
                            curWeaponStrength -= 1; // Break weapon a bit
                            pause();        // Put game on short pause
                        }
                    }

                    if(defunctTrigger == 1){
                        roomPlan[currentRoom] = 'DM'; //Kill monster in the field array
                    }
                    break;
                }
            }
            else{
                //NO WIN, REDO CYCLE UNTIL fightDice BELOW winChance
                $('#chance').append(fightDice + " ");
                if(curArmor > 0){
                    if(gameDifficulty == 0){
                        curHealth -= Math.floor(Math.random() * 2); //HP subtracted between 1 - 2
                        curArmor -= Math.floor(Math.random() * 2); //AR subtracted between 1 - 2
                    }
                    else if(gameDifficulty == 1){
                        curHealth -= Math.floor(Math.random() * 2 + 1); //HP subtracted between 1 - 3
                        curArmor -= Math.floor(Math.random() * 3); //AR subtracted between 0 - 2
                    }
                    else if(gameDifficulty == 2){
                        curHealth -= Math.floor(Math.random() * 4 + 1); //HP subtracted between 1 - 4
                        curArmor -= Math.floor(Math.random() * 3 + 1); //AR subtracted between 1 - 3
                    }
                    checkStats(); // Re-check armor and health
                }
                else{
                    if(gameDifficulty == 0){
                        curHealth -= Math.floor(Math.random() * 2 + 1); //HP subtracted between 1 - 2
                    }
                    else if(gameDifficulty == 1){
                        curHealth -= Math.floor(Math.random() * 3 + 1); //HP subtracted between 1 - 3
                    }
                    else if(gameDifficulty == 2){
                        curHealth -= Math.floor(Math.random() * 4 + 1); //HP subtracted between 1 - 4
                    }
                    checkStats(); // Re-check armor and health
                }

                if(monsterStrength > 0){
                    monsterStrength -= 3;
                    winChance += 1;
                }
                if(tries > 3){
                    winChance = monsterStrength;
                }
                if (curHealth <= 0){
                    $('#textBox').append("You've died in battle." + "<br>"); //THIS COULD BE RANDOMIZED
                    death('died in battle.');
                    fighting = 0;
                    break;
                }
                tries += 1;
            }
        }
        numptyStep = 0; // Set numpty safe to 0

        if(curWeaponStrength == 0 && curWeapon != 0){                // If it reaches 0, your weapon breaks and you're back to fists
            playerWeaponBreaks += 1;
            setWeapon(0);
            $('#textBox').append("<br><br>" + "Your weapon breaks!");
        }
    }

    function fleeStart(){
        playerFlees += 1;
        fleeDice = Math.floor(Math.random() * 100);
        if(fleeDice < fleeChance){
            randomRoom();
            $('#textBox').empty();
            $('#textBox').append("You fled. Wimp.." + "<br>");
            pause();
        }
        else{
            playerFightFlees += 1;
            fightStart(1);
        }
    }
}

function checkStats(){
    checkArmor();
    checkHealth();
}