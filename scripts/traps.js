var trap;
var spikeDanger = 0;
var spikeTimer;
var spikeDelay = 1800;
var spikeSecondaryDelay = 1400;
var snakeDanger = 0;
var snakeTimer;
var snakeDelay = 1200;
var warpRoomDice;
var bombTrapDice;
var trollTrapDice;
var spikeTrapDice;
var snakeTrapDice;
var trollOutcomeDice;
var trollBanterDice;
var globalTraps = [
    "BOMB",         // Three choice trap
    "SPIKE",        // Regular spike trap
    "FLING",        // Fling trap
    "SNAKEPIT",     // Snake pit trap
    "CHAV"
];

function enterTrap(trapType){
    numptyStep = 0; // Set numpty safe to 0
    buttonsOff();           // Turn controls and buttons off
    isGamePlaying = 0;
    $('#textBox').empty();
    trap = globalTraps[trapType];
    switch (trap){
        case "CHAV":
            if(playerInventory[4] == 0){
                $('#textBox').append("A chav troll quickly approaches and bumps into you.." + "<br>");
                trollTrapDice = Math.floor(Math.random() * 4);
                switch (trollTrapDice){
                    case 0:                     // DO NOTHING
                        $('#textBox').append("He didn't steal anything. Lucky you!" + "<br>");
                        checkStats();
                        pause();
                        break;
                    case 1:                     // WEAPON
                        if(curWeapon > 0){      // You have an actual weapon on you
                            $('#textBox').append("He nicked your weapon! What a prick!" + "<br>");
                            setWeapon(0);
                            checkStats();
                            pause();
                        }
                        else{                   // You have no weapon on you
                            trollOutcomeDice = Math.floor(Math.random() * 100);
                            if(trollOutcomeDice < 50){      // Lucky you, nothing happens!
                                $('#textBox').append("He didn't steal anything. Lucky you!" + "<br>");
                                checkStats();
                                pause();
                            }
                            else{                           // Uh oh, more happens..
                                curHealth -= Math.floor(Math.random() * 3 + 1);
                                if(curHealth > 0){
                                    $('#textBox').append("You have no weapons to steal, so he punches you in the face." + "<br>");
                                    checkStats();
                                    pause();
                                }
                                else{                       // And it might make you die
                                    $('#textBox').append("You have nothing to steal. He punches you in the face and your body falls to the floor." + "<br>");
                                    checkStats();
                                    death('death by chav troll');
                                }
                            }
                        }
                        break;
                    case 2:                     // ARMOR
                        if(curArmor > 0){      // You have armor on you
                            $('#textBox').append("He nicked part of your armor! What a prick!" + "<br>");
                            curArmor -= Math.floor(Math.random() * 8 + 4);
                            checkStats();
                            pause();
                        }
                        else{                   // You have no armor on you
                            trollOutcomeDice = Math.floor(Math.random() * 100);
                            if(trollOutcomeDice < 50){      // Lucky you, nothing happens!
                                $('#textBox').append("He didn't steal anything. Lucky you!" + "<br>");
                                checkStats();
                                pause();
                            }
                            else{                           // Uh oh, more happens..
                                curHealth -= Math.floor(Math.random() * 3 + 1);
                                if(curHealth > 0){
                                    $('#textBox').append("You have no armor to steal, so he punches you in the face." + "<br>");
                                    checkStats();
                                    pause();
                                }
                                else{                       // And it might make you die
                                    $('#textBox').append("You have nothing to steal. He punches you in the face and your body falls to the floor." + "<br>");
                                    checkStats();
                                    death('death by chav troll');
                                }
                            }
                        }
                        break;
                    case 3:                     // COMPASS
                        if(playerInventory[3] == 1){      // You have an actual compass on you
                            $('#textBox').append("He nicked your compass! What a prick!" + "<br>");
                            playerInventory[3] = 0;         // Your compass be gone!
                            checkCoordinates();             // Updates the coordinates in this case to nothing
                            checkInventory();
                            checkStats();
                            pause();
                        }
                        else{                   // You have no compass on you
                            trollOutcomeDice = Math.floor(Math.random() * 100);
                            if(trollOutcomeDice < 50){      // Lucky you, nothing happens!
                                $('#textBox').append("He didn't steal anything. Lucky you!" + "<br>");
                                checkStats();
                                pause();
                            }
                            else{                           // Uh oh, more happens..
                                curHealth -= Math.floor(Math.random() * 3 + 1);
                                if(curHealth > 0){
                                    $('#textBox').append("You have no compass to steal, so he punches you in the face." + "<br>");
                                    checkStats();
                                    pause();
                                }
                                else{                       // And it might make you die
                                    $('#textBox').append("You have nothing to steal. He punches you in the face and your body falls to the floor." + "<br>");
                                    checkStats();
                                    death('death by chav troll');
                                }
                            }
                        }
                        break;
                }
                roomPlan[currentRoom] = 'DT';       // Set trap room defunct
            }
            else{
                trollBanterDice = Math.floor(Math.random() * chavBanter.length);
                $('#textBox').append("You run into a chav troll. He says: " + "<br><br>");
                $('#textBox').append("\"" + chavBanter[trollBanterDice] + "\"");
                checkStats();
                pause();
            }
            break;
        case "BOMB":
            bombTrapDice = Math.floor(Math.random() * 3);
            $('#textBox').append("You're trapped in a room with a bomb." + "<br>");
            $('#textBox').append("Cut the correct wire!" + "<br><br>");
            $('#textBox').append("<button id='bombRed'>RED!</button>" + " " + "<button id='bombGreen'>GREEN!</button>" + " " + "<button id='bombBlue'>BLUE!</button>");

            $('#bombRed').click(redWire);
            $('#bombGreen').click(greenWire);
            $('#bombBlue').click(blueWire);

            break;
        case "SPIKE":
            $('#textBox').append("The floor opens into a spike trap." + "<br>");
            spikeTrapDice = Math.floor(Math.random() * 3);
            spikeTrapWordDice = Math.floor(Math.random() * spikeTrapWords.length);
            spikeTrapWhichWord = spikeTrapWords[spikeTrapWordDice];
            switch (spikeTrapDice){
                case 0:
                    $('#textBox').append("<br><br>" + "<button id='jump'>JUMP!</button>");
                    $('#textBox').append(" " + "<button id='donothing1'>Ignore.</button>");
                    $('#textBox').append(" " + "<button id='donothing2'>" + spikeTrapWhichWord + "</button>");
                    break;
                case 1:
                    $('#textBox').append("<br><br>" + "<button id='donothing1'>Ignore.</button>");
                    $('#textBox').append(" " + "<button id='jump'>JUMP!</button>");
                    $('#textBox').append(" " + "<button id='donothing2'>" + spikeTrapWhichWord + "</button>");
                    break;
                case 2:
                    $('#textBox').append("<br><br>" + "<button id='donothing1'>Ignore.</button>");
                    $('#textBox').append(" " + "<button id='donothing2'>" + spikeTrapWhichWord + "</button>");
                    $('#textBox').append(" " + "<button id='jump'>JUMP!</button>");
                    break;
            }
            spikeDanger = 1;
            $('#jump').click(jumpSpikeTrap);
            $('#donothing1').click(doNothing);
            $('#donothing2').click(doNothing);
            spikeTimer = setTimeout(function () { doNothing(); }, spikeDelay);
            break;
        case "FLING":
            $('#textBox').append("A fling trap! You get flung into another room.." + "<br>");
            flingPause();
            break;
        case "SNAKEPIT":
            $('#textBox').append("The floor opens into a snake trap." + "<br>");
            snakeTrapDice = Math.floor(Math.random() * 3);
            snakeTrapWordDice = Math.floor(Math.random() * spikeTrapWords.length);
            snakeTrapWhichWord = spikeTrapWords[snakeTrapWordDice];
            switch (snakeTrapDice){
                case 0:
                    $('#textBox').append("<br><br>" + "<button id='snakeJump'>JUMP!</button>");
                    $('#textBox').append(" " + "<button id='snakeNothing1'>Idle.</button>");
                    $('#textBox').append(" " + "<button id='snakeNothing2'>" + snakeTrapWhichWord + "</button>");
                    if(playerInventory[5] == 1 && playerOils != 0){
                        $('#textBox').append(" " + "<button id='fireSnakePit'>FIRE !!</button>");
                    }
                    break;
                case 1:
                    $('#textBox').append("<br><br>" + "<button id='snakeNothing1'>Idle.</button>");
                    if(playerInventory[5] == 1 && playerOils != 0){
                        $('#textBox').append(" " + "<button id='fireSnakePit'>FIRE !!</button>");
                    }
                    $('#textBox').append(" " + "<button id='snakeJump'>JUMP!</button>");
                    $('#textBox').append(" " + "<button id='snakeNothing2'>" + snakeTrapWhichWord + "</button>");
                    break;
                case 2:
                    $('#textBox').append("<br><br>" + "<button id='snakeNothing1'>Idle.</button>");
                    $('#textBox').append(" " + "<button id='snakeNothing2'>" + snakeTrapWhichWord + "</button>");
                    if(playerInventory[5] == 1 && playerOils != 0){
                        $('#textBox').append(" " + "<button id='fireSnakePit'>FIRE !!</button>");
                    }
                    $('#textBox').append(" " + "<button id='snakeJump'>JUMP!</button>");
                    break;
            }
            snakeDanger = 1;
            $('#snakeJump').click(jumpSnakeTrap);
            $('#fireSnakePit').click(fireSnakeTrap);
            $('#snakeNothing1').click(fightSnakes);
            $('#snakeNothing2').click(fightSnakes);
            snakeTimer = setTimeout(function () { fightSnakes(); }, snakeDelay);
            break;
    }
}

function redWire(){
    if(bombTrapDice == 0){
        correctWire();
    }
    else{
        wrongWire();
    }
}

function greenWire(){
    if(bombTrapDice == 1){
        correctWire();
    }
    else{
        wrongWire();
    }
}

function blueWire(){
    if(bombTrapDice == 2){
        correctWire();
    }
    else{
        wrongWire();
    }
}

function correctWire(){
    $('#textBox').empty();
    $('#textBox').append("Phew! Successfully disarmed the bomb trap!" + "<br><br>");
    roomPlan[currentRoom] = 'DT';       // Set trap room defunct
    checkStats();
    pause();
}
function wrongWire(){
    curHealth -= Math.floor(Math.random() * 5 + 3);
    curArmor -= Math.floor(Math.random() * 3 + 1);
    if(curHealth > 0){
        $('#textBox').empty();
        $('#textBox').append("KABOOOOOOOOOOOOOM !!!!!" + "<br>" + "It totally blew your socks off!" + "<br>");
        checkStats();
        pause();
    }
    else{
        $('#textBox').empty();
        $('#textBox').append("KABOOOOOOOOOOOOOM !!!!!" + "<br>" + "You are very very dead." + "<br>");
        checkStats();
        death('cut the wrong wire');
    }

    roomPlan[currentRoom] = 'DT';       // Set trap room defunct
}

function flingPause(){
    var pauseTimer = setTimeout(function ()
    {
        numptyStep = 0; // Set numpty safe to 0
        $('#textBox').append("<br>" + "<button id='dofling'>CONTINUE</button>");
        $('#dofling').click(randomRoom);
        clearTimeout(pauseTimer);
    }, 700);
}

function jumpSpikeTrap(){
    clearTimeout(spikeTimer);
    spikeDelay = 1200;
    spikeDanger = 0;
    $('#textBox').empty();
    $('#textBox').append("You've jumped the spike trap. Nice one!" + "<br>");
    checkStats();
    pause();
}

function doNothing(){
    clearTimeout(spikeTimer);
    spikeDelay = spikeSecondaryDelay;
    if(spikeDanger == 1){
        curHealth -= Math.floor(Math.random() * 7 + 2);
        if(curHealth > 0){
            spikeDanger = 0;
            $('#textBox').empty();
            $('#textBox').append("You did absolutely nothing and fell in..." + "<br>");
            checkStats();
            pause();
        }
        else{
            spikeDanger = spikeSecondaryDelay;
            $('#textBox').empty();
            $('#textBox').append("You did absolutely nothing, fell in and died." + "<br>");
            checkStats();
            death('died in spike trap');
        }
    }
}

function jumpSnakeTrap(){
    clearTimeout(snakeTimer);
    $('#textBox').empty();
    $('#textBox').append("You've jumped the snake trap. Right on!" + "<br>");
    checkStats();
    pause();
}

function fireSnakeTrap(){
    clearTimeout(snakeTimer);
    $('#textBox').empty();
    $('#textBox').append("With a mighty WHOOOOSH... all the snakes in the pit turn to ash!" + "<br>");
    roomPlan[currentRoom] = 'DT';       // Set trap room defunct
    playerOils -= 1;
    checkInventory();
    checkStats();
    pause();
}

function fightSnakes(){
    clearTimeout(snakeTimer);
    $('#textBox').empty();
    $('#textBox').append("You fall into the snake pit!" + "<br>");
    fightMonster(0, 0, 0, 0);     // Fight a snake, without the possibility of fleeing and no room reset.
}