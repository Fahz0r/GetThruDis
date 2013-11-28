var godDice;                // Category seeder
var monsterDice;            // Monster seeder
var monsterTypeDice;        // Monster type seeder
var weaponDice;             // Weapon seeder
var weaponTypeDice;         // Weapon type seeder
var treasureDice;           // Treasure seeder
var treasureTypeDice;       // Treasure type seeder
var treasureRareDice;
var trapDice;               // Trap seeder
var trapTypeDice;           // Trap type seeder
var roomPlan = [];          // Array that will become the playing field and holds the events
var ctrlDice;               // Control on chance of getting too many empty rooms
var ctrlMax = 8;            // Max of control on chance of getting too many empty rooms
var curMonsters;
var curWeapons;
var curTreasures;
var curTraps;
var maxFleeScrolls;         // Maximum of flee scrolls scattered
var maxMonsterScrolls;      // maximum of monster scrolls scattered
var maxCandy;               // Maximum of clever candy
var putCandy;               // Trigger to help the empty room searcher
var maxNumptyScrolls;       // Maximum of Numpty scrolls
var putNumpty;              // Trigger to help the empty room searcher
var maxTruthScrolls;        // Maximum of Truth scrolls
var putTruth;               // Trigger to help the empty room searcher
var maxBurberryCaps;
var putBurberryCap;
var maxFlintSteel;
var putFlintSteel;
var maxCompasses;
var putCompass;
var maxOils;
var putOils;
var maxKeys;                // Maximum keys
var maxExits;               // Maximum Exits
var maxChavTrolls;          // Maximum chav trolls about
var putChav;
var maxLadders;
var putLadder;
var exitDice;               // Randomiser for the Exit placement
var putExit;                // Trigger to help the empty room searcher
var putExitTry;             /* This is a 'try' counter, for the algorithm to try finding an empty room. If it can't find
                            *      one for too long or the entire side is cluttered, it won't get stuck in a loop forever
                            *      because of it. It can technically happen, so best to be sure. */

var maxToy;                 // Max amount of 'toys'
var putToy;                 // Put the toys down on the map

function doMapGeneration(){
    clearPlayField();
    putValues();
    ctrlDice = 0;
    mapRowCount = 0;
    var i = 0;
    while(i < maxRooms){
        i += 1;
        //godDice = 3;
        if(ctrlDice < ctrlMax){ // As long as 0 outcome has NOT been given x times
            godDice = Math.floor(Math.random() * 7);
        }
        else if(ctrlDice > ctrlMax){ // If x empty rooms been given in a row
            ctrlDice = 0;
            godDice = Math.floor(Math.random() * 2 + 3);
        }

        switch (godDice)
        {
            case 0:
                roomPlan[i] = 0;
                ctrlDice += 1;
                break;
            case 1:
                roomPlan[i] = 0;
                ctrlDice += 1;
                break;
            case 2:
                roomPlan[i] = 0;
                ctrlDice += 1;
                break;
            case 3: // TRAPS
                if(curTraps < maxTraps){
                    trapDice = Math.floor(Math.random() * 999 + 1);
                    if (trapDice < 400){
                        trapTypeDice = Math.floor(Math.random() * (globalTraps.length - 1));
                        //trapTypeDice = 3;
                        roomPlan[i] = globalTraps[trapTypeDice];
                        curTraps += 1;
                    }
                    else{
                        roomPlan[i] = 0;
                        //ctrlDice += 1;
                    }
                }
                else{
                    roomPlan[i] = 0;
                    ctrlDice += 1;
                }
                break;
            case 4: // MONSTERS
                if(curMonsters < maxMonsters){
                    monsterDice = Math.floor(Math.random() * 999 + 1);
                    if (monsterDice < 550){
                        monsterTypeDice = Math.floor(Math.random() * globalMonsters.length);
                        roomPlan[i] = globalMonsters[monsterTypeDice];
                        curMonsters += 1;
                    }
                    else{
                        roomPlan[i] = 0;
                        //ctrlDice += 1;
                    }
                }
                else{
                    roomPlan[i] = 0;
                    ctrlDice += 1;
                }
                break;
            case 5: // WEAPONS
                if(curWeapons < maxWeapons){
                    weaponDice = Math.floor(Math.random() * 999 + 1);
                    if (weaponDice < 400){
                        weaponTypeDice = Math.floor(Math.random() * (globalWeapons.length - 1) + 1);
                        roomPlan[i] = globalWeapons[weaponTypeDice];
                        curWeapons += 1;
                    }
                    else{
                        roomPlan[i] = 0;
                        //ctrlDice += 1;
                    }
                }
                else{
                    roomPlan[i] = 0;
                    ctrlDice += 1;
                }
                break;
            case 6: // TREASURES
                if(curTreasures < maxTreasures){
                    treasureDice = Math.floor(Math.random() * 999 + 1);
                    if (treasureDice < 520){
                        treasureTypeDice = Math.floor(Math.random() * 6);
                        if(treasureTypeDice == 4 && maxFleeScrolls > 0){  // Scroll of Flee
                            maxFleeScrolls -= 1;
                            roomPlan[i] = globalTreasures[4];
                            curTreasures += 1;
                        }
                        else if(treasureTypeDice == 5 && maxMonsterScrolls > 0){ //Scroll of Monster
                            maxMonsterScrolls -= 1;
                            roomPlan[i] = globalTreasures[5];
                            curTreasures += 1;
                        }
                        else{
                            treasureTypeDice = Math.floor(Math.random() * 4);
                            roomPlan[i] = globalTreasures[treasureTypeDice];
                            curTreasures += 1;
                        }
                    }
                    else{
                        roomPlan[i] = 0;
                        //ctrlDice += 1;
                    }
                }
                else{
                    roomPlan[i] = 0;
                    ctrlDice += 1;
                }
                break;
        }
        // Only turn below command on for bug fixing
        //$('#map').append(i + " " + roomPlan[i] + "<br>");
    }
    // Let's put in the specific treasures that only need to exist several times instead of random
    while(maxCandy != 0){
        while(putCandy != 0){
            treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
            if(roomPlan[treasureRareDice] == 0 || roomPlan[treasureRareDice] == 'HEALTH1' || roomPlan[treasureRareDice] == 'HEALTH2' || roomPlan[treasureRareDice] == 'HEALTH3'){
                roomPlan[treasureRareDice] = "CANDY";
                maxCandy -= 1;
                putCandy -= 1;
                //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
            }
        }
    }

    while(maxNumptyScrolls != 0 && maxCandy == 0){
        while(putNumpty != 0){
            treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
            if(roomPlan[treasureRareDice] == 0){
                roomPlan[treasureRareDice] = "SCROLL NUMPTY";
                maxNumptyScrolls -= 1;
                putNumpty -= 1;
                //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
            }
        }
    }

    while(maxTruthScrolls != 0 && maxNumptyScrolls == 0){
        while(putTruth != 0){
            treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
            if(roomPlan[treasureRareDice] == 0){
                roomPlan[treasureRareDice] = "SCROLL TRUTH";
                maxTruthScrolls -= 1;
                putTruth -= 1;
                //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
            }
        }
    }

    while(maxKeys != 0 && maxTruthScrolls == 0){
        treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
        roomPlan[treasureRareDice] = "KEY";
        maxKeys -= 1;
        //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
    }

    while(maxChavTrolls != 0 && maxKeys == 0){
        while(putChav != 0){
            treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
            if(roomPlan[treasureRareDice] == 0){
                roomPlan[treasureRareDice] = "CHAV";
                maxChavTrolls -= 1;
                putChav -= 1;
                //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
            }
        }
    }

    while(maxBurberryCaps != 0 && maxChavTrolls == 0){
        while(putBurberryCap != 0){
            treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
            if(roomPlan[treasureRareDice] == 0){
                roomPlan[treasureRareDice] = "BURBERRY CAP";
                maxBurberryCaps -= 1;
                putBurberryCap -= 1;
                //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
            }
        }
    }

    while(maxFlintSteel != 0 && maxBurberryCaps == 0){
        while(putFlintSteel != 0){
            treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
            if(roomPlan[treasureRareDice] == 0){
                roomPlan[treasureRareDice] = "FLINT STEEL";
                maxFlintSteel -= 1;
                putFlintSteel -= 1;
                //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
            }
        }
    }

    while(maxOils != 0 && maxFlintSteel == 0){
        while(putOils != 0){
            treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
            if(roomPlan[treasureRareDice] == 0 || roomPlan[treasureRareDice] == 'HEALTH1' || roomPlan[treasureRareDice] == 'HEALTH2'){
                roomPlan[treasureRareDice] = "OIL";
                maxOils -= 1;
                putOils -=1;
                //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
            }
        }
    }

    // Do some more complex difficulty level related item placements
    if(gameDifficulty == 0){
        while(maxExits != 0 && maxOils == 0){
            treasureRareDice = Math.floor(Math.random() * 3);
            switch(treasureRareDice){
                case 0:     // On West Wall
                    while(putExit != 0){                                                    // While the trigger is off
                        exitDice = Math.floor(Math.random() * fieldSize) * fieldSize + 1;       // Randomize East wall

                        putExitTry += 1;                                                    // Count tries to see if room is empty
                        if(roomPlan[exitDice] == 0){                                        // If room is empty
                            roomPlan[exitDice] = "EXIT";                                    // Mark it as an EXIT
                            putExit -= 1;                                                    // And turn on the trigger so it stops looking
                        }
                        if(putExitTry > 21){                                                // If it failed finding empty room for 22 tries
                            exitDice = Math.floor(Math.random() * fieldSize) * fieldSize + 1;   // Just randomize it once more
                            exitDice = 1;
                            roomPlan[exitDice] = "EXIT";                                    // And mark as EXIT no matter what
                            putExit -= 1;                                                    // And put trigger on so it stops looking
                        }
                    }
                    break;
                case 1:     // On North Wall
                    while(putExit != 0){                                                    // While the trigger is off
                        exitDice = Math.floor(Math.random() * fieldSize + 1);               // Randomize East wall
                        putExitTry += 1;                                                    // Count tries to see if room is empty
                        if(roomPlan[exitDice] == 0){                                        // If room is empty
                            roomPlan[exitDice] = "EXIT";                                    // Mark it as an EXIT
                            putExit -= 1;                                                    // And turn on the trigger so it stops looking
                        }
                        if(putExitTry > 21){                                                // If it failed finding empty room for 22 tries
                            exitDice = Math.floor(Math.random() * fieldSize + 1);           // Just randomize it once more
                            roomPlan[exitDice] = "EXIT";                                    // And mark as EXIT no matter what
                            putExit -= 1;                                                    // And put trigger on so it stops looking
                        }
                    }
                    break;
                case 2:     // On East Wall
                    while(putExit != 0){                                                    // While the trigger is off
                        exitDice = (fieldSize * Math.floor(Math.random() * fieldSize)) + fieldSize;
                        putExitTry += 1;                                                    // Count tries to see if room is empty
                        if(roomPlan[exitDice] == 0){                                        // If room is empty
                            roomPlan[exitDice] = "EXIT";                                    // Mark it as an EXIT
                            putExit -= 1;                                                    // And turn on the trigger so it stops looking
                        }
                        if(putExitTry > 21){                                                // If it failed finding empty room for 22 tries
                            exitDice = (fieldSize * Math.floor(Math.random() * fieldSize)) + fieldSize;
                            roomPlan[exitDice] = "EXIT";                                    // And mark as EXIT no matter what
                            putExit -= 1;                                                    // And put trigger on so it stops looking
                        }
                    }
                    break;
            }
            maxExits -= 1;
        }

        while(maxCompasses != 0 && maxExits == 0){      // Place the compass (NORMAL MODE ONLY)
            while(putCompass != 0){
                treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
                if(roomPlan[treasureRareDice] == 0 || roomPlan[treasureRareDice] == 'HEALTH3'){
                    roomPlan[treasureRareDice] = "COMPASS";
                    maxCompasses -= 1;
                    putCompass -= 1;
                    //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
                }
            }
        }
    }
    else if(gameDifficulty == 1){
        while(maxExits != 0 && maxOils == 0){       /* THIS EXIT GENERATOR NEEDS TO BE DIFFERENT */
            while(putExit != 0){
                treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
                if(roomPlan[treasureRareDice] == 0){
                    roomPlan[treasureRareDice] = "EXIT";
                    maxExits -= 1;
                    putExit -= 1;
                }
            }
        }

        while(maxCompasses != 0 && maxExits == 0){      // Place the compass (NORMAL MODE ONLY)
            while(putCompass != 0){
                treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
                if(roomPlan[treasureRareDice] == 0 || roomPlan[treasureRareDice] == 'HEALTH3'){
                    roomPlan[treasureRareDice] = "COMPASS";
                    maxCompasses -= 1;
                    putCompass -= 1;
                    //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
                }
            }
        }
    }
    else if(gameDifficulty == 2){
        while(maxExits != 0 && maxOils == 0){       /* THIS EXIT GENERATOR NEEDS TO BE DIFFERENT */
            while(putExit != 0){
                treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
                if(roomPlan[treasureRareDice] == 0){
                    roomPlan[treasureRareDice] = "ALT EXIT";
                    maxExits -= 1;
                    putExit -= 1;
                }
            }
        }

        while(maxCompasses != 0 && maxExits == 0){      // Place the compass (NORMAL MODE ONLY)
            while(putCompass != 0){
                treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
                if(roomPlan[treasureRareDice] == 0 || roomPlan[treasureRareDice] == 'HEALTH3'){
                    roomPlan[treasureRareDice] = "COMPASS";
                    maxCompasses -= 1;
                    putCompass -= 1;
                    //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
                }
            }
        }

        while(maxLadders != 0 && maxCompasses == 0){
            while(putLadder != 0){
                treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
                if(roomPlan[treasureRareDice] == 0){
                    roomPlan[treasureRareDice] = "LADDER";
                    maxLadders -= 1;
                    putLadder -= 1;
                    //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
                }
            }
        }
    }
    else if(gameDifficulty == 3){       // Nightmare Mode !
        while(maxExits != 0 && maxOils == 0){       /* THIS EXIT GENERATOR NEEDS TO BE DIFFERENT */
            while(putExit != 0){
                treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
                if(roomPlan[treasureRareDice] == 0){
                    roomPlan[treasureRareDice] = "ALT EXIT";
                    maxExits -= 1;
                    putExit -= 1;
                }
            }
        }

        while(maxCompasses != 0 && maxExits == 0){      // Place the compass (NORMAL MODE ONLY)
            while(putCompass != 0){
                treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
                if(roomPlan[treasureRareDice] == 0 || roomPlan[treasureRareDice] == 'HEALTH3'){
                    roomPlan[treasureRareDice] = "COMPASS";
                    maxCompasses -= 1;
                    putCompass -= 1;
                    //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
                }
            }
        }

        while(maxLadders != 0 && maxCompasses == 0){
            while(putLadder != 0){
                treasureRareDice = Math.floor(Math.random() * maxRooms + 1);
                if(roomPlan[treasureRareDice] == 0){
                    roomPlan[treasureRareDice] = "LADDER";
                    maxLadders -= 1;
                    putLadder -= 1;
                    //$('#map').append(treasureRareDice + " " + roomPlan[treasureRareDice] + "<br>");
                }
            }
        }
    }
    var rareTreasureDice = Math.floor(Math.random() * 1000);
    //console.log(rareTreasureDice);
    if(rareTreasureDice < 80){
        putRareTreasure(0);
    }
    // Only turn below function on for bug fixing
    //generateMapGraph();
}

function putRareTreasure(which){            // Juggle which rare item to spawn in
    var rareTreasure;
    switch (which){
        case 0:
            while(maxToy != 0){
                while(putToy != 0){
                    rareTreasure = Math.floor(Math.random() * maxRooms + 1);
                    if(roomPlan[rareTreasure] == 'SCROLL NUMPTY'){
                        roomPlan[rareTreasure] = "ADULTTOY";
                        maxToy -= 1;
                        putToy -= 1;
                        //$('#map').append(rareTreasure + " " + roomPlan[rareTreasure] + "<br>");
                    }
                }
            }
            break;
    }
}

function putValues(){
    curMonsters = 0;    // These
    curWeapons = 0;     // resets
    curTreasures = 0;   // are
    curTraps = 0;       // important !
    ctrlDice = 0;
    maxFleeScrolls = 3;
    maxMonsterScrolls = 3;
    maxCandy = 3;
    putCandy = maxCandy;
    maxNumptyScrolls = 5;
    putNumpty = maxNumptyScrolls;
    maxTruthScrolls = 3;
    putTruth = maxTruthScrolls;
    maxBurberryCaps = 1;
    putBurberryCap = maxBurberryCaps;
    maxFlintSteel = 3;
    putFlintSteel = maxFlintSteel;
    maxCompasses = 3;
    putCompass = maxCompasses;
    maxOils = 5;
    putOils = maxOils;
    maxKeys = 1;
    maxExits = 1;
    maxChavTrolls = 6;
    putChav = maxChavTrolls;
    maxLadders = 2;
    putLadder = maxLadders;
    putExit = maxExits;
    putExitTry = 0;
    maxToy = 2;
    putToy = maxToy;
}

function clearPlayField(){
    var i = 0;
    while(i < maxRooms){
        roomPlan[i] = 0;
        i++;
    }
}