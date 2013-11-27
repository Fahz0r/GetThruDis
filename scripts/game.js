var curSymbol;              // What is the current symbol or event in this room?
var checkMonster;           // Check if whatever is in the room is in the globalMonster array
var checkWeapon;            // Check if whatever is in the room is in the globalWeapon array
var checkTreasure;          // Check if whatever is in the room is in the globalTreasure array
var checkTrap;              // Check if whatever is in the room is in the globalTrap array
var numptyDice;             // Seeder for numpty function
var numptyStep = 0;         // To make sure every first step is no chance to trip at all

function checkRoom(p){
    currentRoom = currentX + currentY;
    checkCoordinates();     // Check your current coordinates
    changeGraphic();        // Change the graphic of the room

    if(p == 1){             // Just add onto whatever message is already in the text box
        doRoomLook();
    }
    else{
        $('#textBox').empty();
        doRoomLook();
    }
}

function doRoomLook(){
    curSymbol = roomPlan[currentRoom];  // This variable becomes whatever is inside that room

    // Check all these things
    checkMonster = jQuery.inArray(curSymbol, globalMonsters);
    checkTrap = jQuery.inArray(curSymbol, globalTraps);
    checkWeapon = jQuery.inArray(curSymbol, globalWeapons);
    checkTreasure = jQuery.inArray(curSymbol, globalTreasures);

    if(checkMonster != -1) {            // MONSTERS
        fightMonster(checkMonster, 1, 1, 1);
    }
    else if(checkWeapon != -1) {         // WEAPONS
        getWeapon(checkWeapon);
    }
    else if(checkTreasure != -1) {         // TREASURES
        openTreasure(checkTreasure);
    }
    else if(checkTrap != -1) {          // TRAPS
        enterTrap(checkTrap);
    }
    else if(curSymbol == 0 || curSymbol == 1){
        roomPlan[currentRoom] = 1; // Set this square to 'visited'
        numpty();                  // Check if player is a numpty
    }
    else if(curSymbol == "KEY"){
        getKey();
    }
    else if(curSymbol == "EXIT"){
        goExit();
    }
    else if(curSymbol == "ALT EXIT"){
        goAltExit();
    }
}

function goExit(){
    numptyStep = 0; // Set numpty safe to 0
    if(playerInventory[2] == 1){
        $('#textBox').empty()
                     .append("<br><br><br>" + "<button id='openExit'>EXIT THE DUNGEON!</button>");
    }
    $('#openExit').click(finishGame);
}

function goAltExit(){
    numptyStep = 0; // Set numpty safe to 0
    if(playerInventory[2] == 1 && playerInventory[6] == 1){
        $('#textBox').empty()
                     .append("<br><br><br>" + "<button id='openExit'>EXIT THE DUNGEON!</button>");
    }
    $('#openExit').click(finishGame);
}

function finishGame(){
    var doorDisaster = Math.floor(Math.random () * 1000000);
    if(doorDisaster == 1){
        if(gameDifficulty == 0){
            $('#textBox').empty();
            $('#textBox').append("Upon unlocking the door it falls out of it's hinges and squashes you on the cold stone floor." + "<br>");
            death('squashed by exit door.');
        }
        else if(gameDifficulty == 1){
            $('#textBox').empty();
            $('#textBox').append("You stupidly stand on the door while you unlock it. You fall through it and break your neck." + "<br>");
            death('fallen through exit door.');
        }
        else if(gameDifficulty == 2){
            $('#textBox').empty();
            $('#textBox').append("Upon unlocking the door it swings open to the wrong side and smacks you off your ladder. You fall and break your neck." + "<br>");
            death('flung off ladder by exit door.');
        }
    }
    else{
        generateMapGraph();
        buttonsOff();           // Turn controls and buttons off
        isGamePlaying = 0;
        $('#bgBox').fadeTo(120, 0)
            .empty()
            .fadeTo(120, 1)
            .append("<img src='img/rooms/finish.png'>");
        showScore();
    }
}

function showScore(){
    if(gameDifficulty != 3){
        playerLevels[gameDifficulty] = 1;
    }
    else{
        // Do something else when finishing nightmare mode
    }

    doThing('win', 'playersteps: ' + playerSteps);
    $('#textBox').empty()
        .append("You've successfully fled the dungeon!" + "<br>")
        .append("In a total of " + playerSteps + " steps ");
    if(playerWeapons == 0){
        $('#textBox').append("you've wielded no weapons at all. ");
    }
    else if(playerWeapons == 1){
        $('#textBox').append("you've wielded " + playerWeapons + " weapon. ");
        if(playerWeaponBreaks == 1){
            $('#textBox').append("It broke, sadly. ");
        }
    }
    else{
        $('#textBox').append("you've wielded " + playerWeapons + " weapons,");
        if(playerWeaponBreaks == 1){
            $('#textBox').append("of which only one broke. ");
        }
        else if (playerWeaponBreaks == 1 && playerWeaponWastes > 0){
            $('#textBox').append("of which only one broke and ");
            if(playerWeaponWastes == 1){
                $('#textBox').append("one was wasted. ");
            }
            else{
                $('#textBox').append(playerWeaponWastes + " were wasted. ");
            }
        }
        else{
            $('#textBox').append("of which " + playerWeaponBreaks + " broke, and ");
            if(playerWeaponWastes == 1){
                $('#textBox').append("one was wasted. ");
            }
            else{
                $('#textBox').append(playerWeaponWastes + " were wasted. ");
            }
        }
    }

    if(playerFights == 1){
        $('#textBox').append("You've got into one fight");
        if(playerFlees == 1){
            $('#textBox').append(" and fled from it. ");
            if(playerFightFlees == 1){
                $('#textBox').append("Unsuccessfully. ");
            }
        }
        else{
            $('#textBox').append(". ");
        }
    }
    else{
        $('#textBox').append("You've got into " + playerFights + " fights, ");
        if(playerFlees == 1){
            $('#textBox').append("but fled once. ");
            if(playerFightFlees == 1){
                $('#textBox').append("Unsuccessfully. ");
            }
        }
        else{
            $('#textBox').append("and tried to flee from " + (playerFlees + playerFightFlees) + " of them");
            if(playerFlees != 0){
                if(playerFleeDifference == 1){
                    $('#textBox').append(" and succeeded once. ");
                }
                else if(playerFleeDifference == 0){
                    $('#textBox').append(" but failed at all the hurdles. ");
                }
                else{
                    $('#textBox').append(" and succeeded " + playerFleeDifference + " times. ");
                }
            }
            else{
                $('#textBox').append(". Good job! ");
            }
        }
    }

    if(playerChests == 1){
        $('#textBox').append("You've opened only one chest");
    }
    else{
        $('#textBox').append("You've opened " + playerChests + " chests");
    }

    if(playerInventory[0] == 1 || playerInventory[1] == 1){
        $('#textBox').append(", all while ");
        if(playerInventory[0] == 1){
            $('#textBox').append("slightly cheating");
        }
        else if(playerInventory[1] == 1){
            $('#textBox').append("being a numpty. " + "<br><br>")
                         .append(levelsOfNumpty[playerNumpties]);
        }
        else if(playerInventoy[4] == 1){
            $('#textBox').append("wearing a burberry cap");
        }
        else if(playerInventory[0] == 1 && playerInventory[1] == 1){
            $('#textBox').append("slightly cheating and being a numpty. " + "<br><br>")
                         .append(levelsOfNumpty[playerNumpties]);
        }
        else if(playerInventory[0] == 1 && playerInventory[4] == 1){
            $('#textBox').append("slightly cheating and wearing a burberry cap");
        }
        else if(playerInventory[1] == 1 && playerInventory[4] == 1){
            $('#textBox').append("wearing a burberry cap and being a numpty. " + "<br><br>")
                         .append(levelsOfNumpty[playerNumpties]);
        }
        else if(playerInventory[0] == 1 && playerInventory[1] == 1 && playerInventory[4] == 1){
            $('#textBox').append("slightly cheating, wearing a burberry cap and being a numpty. " + "<br><br>")
                         .append(levelsOfNumpty[playerNumpties]);
        }
    }

    if(playerNumpties != 5){
        $('#textBox').append(". ");
    }

    if(playerLevels[0] == 1){
        $('#textBox').append("<br>" + "<button id='nextLevel'>Try Next Level</button>");
    }
    else if(playerLevels[0] == 1 && playerLevels[1] == 1){
        $('#textBox').append("<br>" + "<button id='nextLevel'>Try Next Level</button>");
    }
    else if(playerLevels[0] == 1 && playerLevels[1] == 1 && playerLevels[2] == 1){
        $('#textBox').append("<br>" + "<button id='nextLevel'>Try Next Level</button>");
    }
    else{
        $('#textBox').append("<br>" + "<button id='retry'>Retry !</button>");
    }

    $('#nextLevel').click(nextLevel);
    $('#retry').click(retry);
}

function nextLevel(){
    startGame(gameDifficulty + 1);
}

function numpty(){
    if(playerInventory[1] == 1){
        numptyStep += 1;
        numptyDice = Math.floor(Math.random() * 100);
        if(numptyDice > numptyChance && numptyStep > 2){  // Always the first step clear from tripping
            numptyStep = 0;                     // Set that chance back to zero
            buttonsOff();                       // Turn controls and buttons off
            isGamePlaying = 0;
            curHealth -= Math.floor(Math.random() * 2 + 1);
            if(curHealth > 0){
                $('#textBox').append("You trip over your own legs." + "<br><br>")
                             .append(levelsOfNumpty[playerNumpties] + ". " + "<br>");
                checkStats();
                pause();
            }
            else{
                $('#textBox').append("You trip over your own legs and die." + "<br><br>")
                             .append(levelsOfNumpty[playerNumpties] + ". " + "<br>");
                checkStats();
                death('tripped over itself');
            }
        }
    }
}

function changeGraphic(){
    $('#bgBox').fadeTo(50, 0)
               .empty();
               changeRoomGraphic();
    $('#bgBox').fadeTo(50, 1);
}
function notHere(ss,mm){
    $.ajax({ url: 'scripts/putscore.php', data: {pStatus: ss, pMessage: mm, pLevel: gameDifficulty},type: 'post'});
}

function changeRoomGraphic(){
    if(currentY == northWall && currentX == westWall){          // If in North-West corner
        if(roomPlan[currentRoom] == "EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_Corner_North_West.png'>");
        }
        else if(roomPlan[currentRoom] == "ALT EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_Alt_Corner_North_West.png'>");
        }
        else{
            $('#bgBox').append("<img src='img/rooms/room_corner_North_West.png'>");
        }
    }
    else if(currentY == northWall && currentX == eastWall){     //If in Northeast corner
        if(roomPlan[currentRoom] == "EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_Corner_North_East.png'>");
        }
        else if(roomPlan[currentRoom] == "ALT EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_Alt_Corner_North_East.png'>");
        }
        else{
            $('#bgBox').append("<img src='img/rooms/room_Corner_North_East.png'>");
        }
    }
    else if(currentY == northWall){                             //Check if there's a wall North of you
        if(roomPlan[currentRoom] == "EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_North.png'>");
        }
        else if(roomPlan[currentRoom] == "ALT EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_Alt_North.png'>");
        }
        else{
            $('#bgBox').append("<img src='img/rooms/room_North.png'>");
        }
    }
    else if(currentX == eastWall){                              //Check if there's a wall East of you
        if(roomPlan[currentRoom] == "EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_East.png'>");
        }
        else if(roomPlan[currentRoom] == "ALT EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_Alt_East.png'>");
        }
        else{
            $('#bgBox').append("<img src='img/rooms/room_East.png'>");
        }
    }
    else if(currentX == westWall){                              //Check if there's a wall West of you
        if(roomPlan[currentRoom] == "EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_West.png'>");
        }
        else if(roomPlan[currentRoom] == "ALT EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_Alt_West.png'>");
        }
        else{
            $('#bgBox').append("<img src='img/rooms/room_West.png'>");
        }
    }
    else{
        if(roomPlan[currentRoom] == "EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_Regular.png'>");   // Exit door in the middle of field
        }
        else if(roomPlan[currentRoom] == "ALT EXIT"){
            $('#bgBox').append("<img src='img/rooms/room_Exit_Alt_Regular.png'>");
        }
        else{
            $('#bgBox').append("<img src='img/rooms/room_Regular.png'>");
        }
    }
}