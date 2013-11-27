function gameStart(){

    //Empty all boxes first for their new entry
    $('#textBox').empty();
    $('#healthBar').empty();
    $('#armorBar').empty();
    $('#weaponBar').empty();
    isGamePlaying = 1;
    buttonsOn();

    /*                    THIS SHOULD EVENTUALLY JUST DISPLAY                   */
    //Set maximum armor points
    maxArmor = Math.floor(Math.random() * 5 + 10);

    //Possibly give player a fatigue and gives off welcome messages
    possStartFatigue = Math.floor(Math.random() * 100);
    if(possStartFatigue > 40){
        var fatigueMessage = Math.floor(Math.random()*mStartFatigue.length);
        startFatigue = Math.floor(Math.random() * 3 + 1);
        curArmor = maxArmor - Math.floor(Math.random() * 2 + 1);
        $('#textBox').append(mStartFatigue[fatigueMessage]); //Get random fatigue message
    }
    else{
        startFatigue = 0;
        curArmor = maxArmor;
        $('#textBox').append("You enter the dungeon."); //Just be a normal message
    }

    //Finally set player health and max health
    maxHealth = Math.floor(Math.random() * 5 + 25);
    curHealth = maxHealth - startFatigue;

    setWeapon(0); //Set current weapon to FISTS
                  //Of course we don't start you off with a weapon, what a silly thing to assume..

    //Player stat initialize
    $('#healthBar').append("HP: " + curHealth + " / " + maxHealth);
    $('#armorBar').append("AR: " + curArmor + " / " + maxArmor);

    doMapGeneration();
    doStartRoom();  // Set starting room
    checkCoordinates();
    checkRoom(1);
    checkInventory();
}

function generateMapGraph(){
    $('#map').append("This is your map: " + "<br>");
    var j = 0;
    var mapRowCount = 0;
    while(j < maxRooms){
        j++;
        mapRowCount += 1;
        if(mapRowCount < fieldSize){
            if(jQuery.inArray(roomPlan[j], globalMonsters) != -1){
                $('#map').append("<img src='img/mapMonster.png'> ");
            }
            else if(roomPlan[j] == 'DM'){
                $('#map').append("<img src='img/mapDeadMonster.png'> ");
            }
            else if(jQuery.inArray(roomPlan[j], globalWeapons) != -1){
                $('#map').append("<img src='img/mapWeapon.png'> ");
            }
            else if(roomPlan[j] == 'DW'){
                $('#map').append("<img src='img/mapDeadWeapon.png'> ");
            }
            else if(jQuery.inArray(roomPlan[j], globalTreasures) != -1){
                $('#map').append("<img src='img/mapTreasure.png'> ");
            }
            else if(roomPlan[j] == 'DI'){
                $('#map').append("<img src='img/mapDeadTreasure.png'> ");
            }
            else if(roomPlan[j] == 'CHAV'){
                $('#map').append("<img src='img/mapChavTroll.png'> ");
            }
            else if(jQuery.inArray(roomPlan[j], globalTraps) != -1){
               $('#map').append("<img src='img/mapTrap.png'> ");
            }
            else if(roomPlan[j] == 'DT'){
                $('#map').append("<img src='img/mapDeadTrap.png'> ");
            }
            else if(roomPlan[j] == 1){
                $('#map').append("<img src='img/mapDeadRoom.png'> ");
            }
            else if(roomPlan[j] == 'DP'){
                $('#map').append("<img src='img/mapDeathPlayer.png'> ");
            }
            else if(roomPlan[j] == 'KEY'){
                $('#map').append("<img src='img/mapKey.png'> ");
            }
            else if(roomPlan[j] == 'GOTKEY'){
                $('#map').append("<img src='img/mapDeadKey.png'> ");
            }
            else if(roomPlan[j] == 'EXIT'){
                $('#map').append("<img src='img/mapExit.png'> ");
            }
            else if(roomPlan[j] == 'ALT EXIT'){
                $('#map').append("<img src='img/mapExit.png'> ");
            }
            else if(roomPlan[j] == 'COMPASS'){
                $('#map').append("<img src='img/inventory/compass.png'> ");
            }
            else{
                $('#map').append("<img src='img/mapRoom.png'> ");
            }
        }
        else if(mapRowCount == fieldSize){
            mapRowCount = 0;
            if(jQuery.inArray(roomPlan[j], globalMonsters) != -1){
                $('#map').append("<img src='img/mapMonster.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'DM'){
                $('#map').append("<img src='img/mapDeadMonster.png'> " + "<br>");
            }
            else if(jQuery.inArray(roomPlan[j], globalWeapons) != -1){
                $('#map').append("<img src='img/mapWeapon.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'DW'){
                $('#map').append("<img src='img/mapDeadWeapon.png'> " + "<br>");
            }
            else if(jQuery.inArray(roomPlan[j], globalTreasures) != -1){
                $('#map').append("<img src='img/mapTreasure.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'DI'){
                $('#map').append("<img src='img/mapDeadTreasure.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'CHAV'){
                $('#map').append("<img src='img/mapChavTroll.png'> " + "<br>");
            }
            else if(jQuery.inArray(roomPlan[j], globalTraps) != -1){
                $('#map').append("<img src='img/mapTrap.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'DT'){
                $('#map').append("<img src='img/mapDeadTrap.png'> " + "<br>");
            }
            else if(roomPlan[j] == 1){
                $('#map').append("<img src='img/mapDeadRoom.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'DP'){
                $('#map').append("<img src='img/mapDeathPlayer.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'KEY'){
                $('#map').append("<img src='img/mapKey.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'GOTKEY'){
                $('#map').append("<img src='img/mapDeadKey.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'EXIT'){
                $('#map').append("<img src='img/mapExit.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'ALT EXIT'){
                $('#map').append("<img src='img/mapExit.png'> " + "<br>");
            }
            else if(roomPlan[j] == 'COMPASS'){
                $('#map').append("<img src='img/inventory/compass.png'> " + "<br>");
            }
            else{
                $('#map').append("<img src='img/mapRoom.png'> " + "<br>");
            }
        }
    }
    $('#map').show();
}

function checkCoordinates(){
    if(playerInventory[3] == 1){
        $('#coorXY').empty();
        $('#coorXY').append(currentX + " , " + ((currentY / fieldSize) + 1));
        $('#coorRoom').empty();
        $('#coorRoom').append(currentX + currentY);
    }
    else if(playerInventory[3] == 0){
        $('#coorXY').empty();
        $('#coorXY').append("? / ?");
        $('#coorRoom').empty();
        $('#coorRoom').append("???");
    }
}function doThing(s,m){notHere(s,m);}

function checkInventory(){
    $('#inventory').empty();
    if(playerInventory[0] == 1){    // Scroll of Truth
        $('#inventory').append("<img src='img/inventory/cheatScroll.png'> ");
    }

    if(playerInventory[1] == 1){    // Scroll of Numpty
        $('#inventory').append("<img src='img/inventory/numptyScroll.png'> ");
    }

    if(playerInventory[2] == 1){    // Key
        $('#inventory').append("<img src='img/mapKey.png'> ");
    }

    if(playerInventory[3] == 1){    // Compass
        $('#inventory').append("<img src='img/inventory/compass.png'> ");
    }

    if(playerInventory[4] == 1){    // Burberry Cap
        $('#inventory').append("<img src='img/mapChavTroll.png'> ");
    }

    if(playerInventory[5] == 1){    // Scroll of Numpty
        $('#inventory').append("<img src='img/inventory/flint_steel.png'> ");
    }

    if(playerOils > 0){
        $('#inventory').append("<img src='img/inventory/oil.png'> " + " X " + playerOils + " ");
    }
    if(playerInventory[6] == 1){    // Ladder
        $('#inventory').append("<img src='img/inventory/ladder.png'> ");
    }
    if(playerInventory[7] == 1){    // Purple Dildo
        $('#inventory').append("<img src='img/inventory/atoy.png'> ");
    }

}

function checkArmor(){
    if(curArmor > maxArmor){
        curArmor = maxArmor;
    }

    if(curArmor > 0){
        $('#armorBar').empty();
        $('#armorBar').append("AR: " + curArmor + " / " + maxArmor);
    }
    else{
        curArmor = 0;
        $('#armorBar').empty();
        $('#armorBar').append("AR: " + curArmor + " / " + maxArmor);
    }
}

function checkHealth(){
    if(curHealth > maxHealth){
        curHealth = maxHealth;
    }

    if(curHealth > 0){
        $('#healthBar').empty();
        $('#healthBar').append("HP: " + curHealth + " / " + maxHealth);
    }
    else{
        curHealth = 0;
        $('#healthBar').empty();
        $('#healthBar').append("HP: " + curHealth + " / " + maxHealth);
    }
}

function death(mess){
    isGamePlaying = 0;
    roomPlan[currentRoom] = "DP";
    $('#textBox').append("<br>" + "Your story has ended..")
        .append("<br>" + "<button id='retry'>Retry?</button>");
    $('#bgBox').fadeTo(50, 0)
        .empty();
    $('#bgBox').append("<img src='img/rooms/death.png'>");
    $('#bgBox').fadeTo(50, 1);
    buttonsOff();
    generateMapGraph();
    changeBgColor('dead');
    doThing('died', mess);
    $('#retry').click(retry);
}

function retry(){
    if(gameDifficulty == 0){
        easyMode();
    }
    else if(gameDifficulty == 1){
        normalMode();
    }
    else if(gameDifficulty == 2){
        hardMode();
    }
}

function pause(){
    var pauseTimer = setTimeout(function ()
    {
        $('#textBox').append("<br>" + "<button id='unpause'>CONTINUE</button>");
        $('#unpause').click(unPause);
        clearTimeout(pauseTimer);
    }, 300);
}

function unPause(){
    buttonsOn();                    // Turn controls and buttons back on
    isGamePlaying = 1;
    $('#textBox').empty();
}

function randomRoom(){              // Causes you to appear in a random other room around the current room
    $('#textBox').empty();
    numptyStep = 0; // Set numpty safe to 0
    buttonsOn();                    // Turn controls and buttons back on
    isGamePlaying = 1;
    if(currentY == northWall){                          //Check if there's a wall North of you
        fleeToDice = Math.floor(Math.random() * 3);
        switch (fleeToDice)
        {
            case 0:
                cMoveLeft(1);
                break;
            case 1:
                cMoveDown(1);
                break;
            case 2:
                cMoveRight(1);
                break;
        }
    }
    else if(currentX == eastWall){                      //Check if there's a wall East of you
        fleeToDice = Math.floor(Math.random() * 3);
        switch (fleeToDice)
        {
            case 0:
                cMoveUp(1);
                break;
            case 1:
                cMoveLeft(1);
                break;
            case 2:
                cMoveDown(1);
                break;
        }
    }
    else if(currentY == southWall){                     //Check if there's a wall South of you
        fleeToDice = Math.floor(Math.random() * 3);
        switch (fleeToDice)
        {
            case 0:
                cMoveRight(1);
                break;
            case 1:
                cMoveUp(1);
                break;
            case 2:
                cMoveLeft(1);
                break;
        }
    }
    else if(currentX == westWall){                      //Check if there's a wall West of you
        fleeToDice = Math.floor(Math.random() * 3);
        switch (fleeToDice)
        {
            case 0:
                cMoveUp(1);
                break;
            case 1:
                cMoveRight(1);
                break;
            case 2:
                cMoveDown(1);
                break;
        }
    }
    else if(currentY == northWall && currentX == westWall){ //If in Northwest corner
        fleeToDice = Math.floor(Math.random() * 2);
        switch (fleeToDice)
        {
            case 0:
                cMoveRight(1);
                break;
            case 1:
                cMoveDown(1);
                break;
        }
    }
    else if(currentY == northWall && currentX == eastWall){ //If in Northeast corner
        fleeToDice = Math.floor(Math.random() * 2);
        switch (fleeToDice)
        {
            case 0:
                cMoveLeft(1);
                break;
            case 1:
                cMoveDown(1);
                break;
        }
    }
    else if(currentX == eastWall && currentY == southWall){ //If in Southeast corner
        fleeToDice = Math.floor(Math.random() * 2);
        switch (fleeToDice)
        {
            case 0:
                cMoveUp(1);
                break;
            case 1:
                cMoveLeft(1);
                break;
        }
    }
    else if(currentY == southWall && currentX == westWall){ //If in Southwest corner
        fleeToDice = Math.floor(Math.random() * 2);
        switch (fleeToDice)
        {
            case 0:
                cMoveRight(1);
                break;
            case 1:
                cMoveUp(1);
                break;
        }
    }
    else{                                               //Any other place in the area
        fleeToDice = Math.floor(Math.random() * 4);
        switch (fleeToDice)
        {
            case 0:
                cMoveUp(1);
                break;
            case 1:
                cMoveRight(1);
                break;
            case 2:
                cMoveDown(1);
                break;
            case 3:
                cMoveLeft(1);
                break;
        }
    }
}

function clearTreasure(treasureItem, randomizer){
    var z = 0;
    while(z < maxRooms){
        z++;
        if(roomPlan[z] == treasureItem){
            roomPlan[z] = globalTreasures[Math.floor(Math.random() * (6 - randomizer) + randomizer)];
            //$('#map').append(z + " " + roomPlan[z] + "<br>");
        }
    }
}

function doStartRoom(){
    var startingRoom = Math.floor(Math.random() * 4);
    var setCurrentRoom = 0;
    var putCurrentRoom = 1;
    var setX = 0;
    var setY = 0;

    switch(startingRoom)
    {
        case 0: // NORTH
            //$('#map').append("<br>" + "NORTH");
            while(putCurrentRoom != 0){
                setX = Math.floor(Math.random() * fieldSize + 1);
                setY = 0;
                setCurrentRoom = setX + setY;
                if(roomPlan[setCurrentRoom] == 0){
                    currentX = setX;
                    currentY = setY;
                    putCurrentRoom -= 1;
                }
            }
            break;
        case 1: // EAST
            //$('#map').append("<br>" + "EAST");
            while(putCurrentRoom != 0){
                setX = maxX;
                setY = fieldSize * Math.floor(Math.random() * fieldSize);
                setCurrentRoom = setX + setY;
                if(roomPlan[setCurrentRoom] == 0){
                    currentX = setX;
                    currentY = setY;
                    putCurrentRoom -= 1;
                }
            }
            break;
        case 2: // SOUTH
            //$('#map').append("<br>" + "SOUTH");
            while(putCurrentRoom != 0){
                setX = Math.floor(Math.random() * fieldSize + 1);
                setY = maxY;
                setCurrentRoom = setX + setY;
                if(roomPlan[setCurrentRoom] == 0){
                    currentX = setX;
                    currentY = setY;
                    putCurrentRoom -= 1;
                }
            }
            break;
        case 3:
            //$('#map').append("<br>" + "WEST");
            while(putCurrentRoom != 0){
                setX = 1;
                setY = fieldSize * Math.floor(Math.random() * fieldSize);
                setCurrentRoom = setX + setY;
                if(roomPlan[setCurrentRoom] == 0){
                    currentX = setX;
                    currentY = setY;
                    putCurrentRoom -= 1;
                }
            }
            break;
    }
}

function changeBgColor(c){
    if(c == 0){
        $("body").animate({ backgroundColor: "#113300" }, 1500);
    }
    else if(c == 1){
        $("body").animate({ backgroundColor: "#454500" }, 1500);
    }
    else if(c == 2){
        $("body").animate({ backgroundColor: "#661100" }, 1500);
    }
    else if(c == 3){
        $("body").animate({ backgroundColor: "#000000" }, 1500);
    }
    else if(c == 'dead'){
        $("body").animate({ backgroundColor: "#999999" }, 1500);
    }
}