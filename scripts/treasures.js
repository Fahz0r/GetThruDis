var treasure;
var globalTreasures = [
    "HEALTH1",              // Small health potion
    "HEALTH2",              // Medium health potion
    "HEALTH3",              // Large health potion
    "EXPLOSION",            // This chest just explodes and damages you
    "SCROLL FLEE",          // Scroll of flee chance (enhances flee chance)
    "SCROLL MONSTER",       // Scroll of monster (enhances monster strength)
    "SCROLL NUMPTY",        // Scroll of numpty (makes you trip over yourself a couple times in empty rooms)
    "SCROLL TRUTH",         // Scroll of truth (gives you hints of what's in chests upon encounter)
    "BURBERRY CAP",         // Exactly what it is.
    "FLINT STEEL",          // A flint and steel
    "OIL",                  // Oil
    "COMPASS",              // A compass
    "LADDER",               // A ladder
    "ADULTTOY",             // That horn thing
    "CANDY"                 // Clever candy
];

function openTreasure(treasureType){
    buttonsOff();           // Turn controls and buttons off
    isGamePlaying = 0;
    treasure = globalTreasures[treasureType];
    $('#textBox').empty();
    $('#textBox').append("You've found a treasure chest." + "<br>");
    // A condition comes here to hint what is inside the chest, only if scroll of truth is enabled
    if(playerInventory[0] == 1){    // Scroll of truth is in inventory
        switch (treasure){
            case "HEALTH1":                     // Small health up
                $('#textBox').append("It looks nice." + "<br>");
                break;
            case "HEALTH2":                     // Medium health up
                $('#textBox').append("It's slightly glowing." + "<br>");
                break;
            case "HEALTH3":                     // Large health up
                $('#textBox').append("It glows." + "<br>");
                break;
            case "SCROLL FLEE":                 // Scroll of fleeing
                $('#textBox').append("You have a sudden urge to leave the room." + "<br>");
                break;
            case "SCROLL MONSTER":              // Scroll of monster strength
                $('#textBox').append("There's a faint growling coming from the chest." + "<br>");
                break;
            case "SCROLL NUMPTY":               // Scroll of numpty
                $('#textBox').append("You stub your toe on it." + "<br>");
                break;
            case "SCROLL TRUTH":                // Scroll of truth
                $('#textBox').append("This is another scroll of truth. This shouldn't be here!" + "<br>");
                break;
            case "EXPLOSION":                   // BOOOOOOM
                $('#textBox').append("The room smells of gunpowder.." + "<br>");
                break;
            case "BURBERRY CAP":
                $('#textBox').append("You hear the sound of muffled donks coming from the chest.." + "<br>");
                break;
            case "FLINT STEEL":
                $('#textBox').append("It smells like someone started a fire in here.." + "<br>");
                break;
            case "OIL":
                $('#textBox').append("It smells like someone started a fire in here.." + "<br>");
                break;
            case "COMPASS":
                $('#textBox').append("The chest looks rather small but neat." + "<br>");
                break;
            case "LADDER":
                $('#textBox').append("The chest looks rectangular." + "<br>");
                break;
            case "ADULTTOY":
                $('#textBox').append("The hinges are made of gold." + "<br>");
                break;
            case "CANDY":
                $('#textBox').append("The room smells like a sweets shop." + "<br>");
                break;
        }
    }
    $('#textBox').append("<br><br>" + "<button id='openChest'>OPEN CHEST</button>" + " " + "<button id='leaveChest'>Nah..</button>");

    $('#openChest').click(openChest);
    $('#leaveChest').click(leaveChest);
}

function openChest(){
    playerChests += 1;
    $('#textBox').empty();
    switch (treasure){
        case "HEALTH1":                     // Small health up
            $('#textBox').append("You've found a small health potion." + "<br>");
            curHealth += Math.floor(Math.random() * 4 + 1);
            checkStats();
            pause();
            roomPlan[currentRoom] = 'DI';
            break;
        case "HEALTH2":                     // Medium health up
            $('#textBox').append("You've found a medium health potion." + "<br>");
            curHealth += Math.floor(Math.random() * 4 + 3);
            checkStats();
            pause();
            roomPlan[currentRoom] = 'DI';
            break;
        case "HEALTH3":                     // Large health up
            $('#textBox').append("You've found a large health potion." + "<br>");
            curHealth += Math.floor(Math.random() * 4 + 6);
            checkStats();
            pause();
            roomPlan[currentRoom] = 'DI';
            break;
        case "SCROLL FLEE":                 // Scroll of fleeing
            $('#textBox').append("You've found a scroll of 'Professional Cowardness'." + "<br>");
            $('#textBox').append("Your fleeing chance has increased!" + "<br>");
            fleeChance += 7;
            checkStats();
            pause();
            roomPlan[currentRoom] = 'DI';
            break;
        case "SCROLL MONSTER":              // Scroll of monster strength
            $('#textBox').append("You've found a scroll of 'Oh ffs..'." + "<br>");
            $('#textBox').append("Monsters are now slightly stronger!" + "<br>");
            monsterFightChance += 15;
            checkStats();
            pause();
            roomPlan[currentRoom] = 'DI';
            break;
        case "SCROLL NUMPTY":               // Scroll of numpty
            playerInventory[1] = 1;         // Activate numpty in inventory
            playerNumpties += 1;            // Add up amount of current scrolls in hand
            numptyChance -= 10;
            if(playerNumpties == 1){        // Because there's only one numpty scroll in inventory
                $('#textBox').append("You've found a scroll of 'Numpty'." + "<br><br>");
                $('#textBox').append("You numpty." + "<br>");
            }
            else{
                $('#textBox').append("You've found another scroll of 'Numpty'." + "<br><br>");
                $('#textBox').append(levelsOfNumpty[playerNumpties] + "<br>");
            }
            checkInventory();
            checkStats();
            pause();
            roomPlan[currentRoom] = 'DI';
            break;
        case "SCROLL TRUTH":                // Scroll of truth
            $('#textBox').append("You've found a scroll of 'Slight Cheating'." + "<br>");
            $('#textBox').append("You vaguely know what's inside chests now!" + "<br>");
            playerInventory[0] = 1;         // Activate truth in inventory
            checkInventory();
            clearTreasure('SCROLL TRUTH', 3);
            checkStats();
            pause();
            roomPlan[currentRoom] = 'DI';
            break;
        case "BURBERRY CAP":
            $('#textBox').append("Oi you've found a burberry cap mate." + "<br>");
            $('#textBox').append("Chav trolls now think you're one of them!" + "<br>");
            playerInventory[4] = 1;         // Activate the burberry m8
            checkInventory();
            checkStats();
            pause();
            roomPlan[currentRoom] = 'DI';
            break;
        case "FLINT STEEL":
            $('#textBox').append("You've found a flint and steel!" + "<br>");
            $('#textBox').append("You can set fire to something now." + "<br>");
            playerInventory[5] = 1;         // Activate flint and steel
            checkInventory();
            clearTreasure('FLINT STEEL', 0);
            checkStats();
            pause();
            roomPlan[currentRoom] = 'DI';
            break;
        case "OIL":
            $('#textBox').append("Hey, there's a bottle of oil in here!" + "<br>");
            $('#textBox').append("It's rather flammable.." + "<br>");
            playerOils += 1;                // Add one to oil
            checkInventory();
            checkStats();
            pause();
            roomPlan[currentRoom] = 'DI';
            break;
        case "COMPASS":
            if(playerInventory[3] == 0){
                $('#textBox').append("A compass! How fortunate." + "<br>");
                $('#textBox').append("You can see in which room you are now." + "<br>");
                playerInventory[3] = 1;         // Activate the compass
                roomPlan[currentRoom] = 'DI';
            }
            else{
                $('#textBox').append("Another compass! You already have one, so you put it back.." + "<br>");
                $('#textBox').append("Might come in handy later!" + "<br>");
            }
            if(gameDifficulty == 2){
                clearTreasure('COMPASS', 3);
            }
            checkCoordinates();
            checkInventory();
            checkStats();
            pause();
            break;
        case "LADDER":
            $('#textBox').append("A ladder! How quaint.." + "<br>");
            $('#textBox').append("Now what do I use this for?" + "<br>");
            playerInventory[6] = 1;         // Activate ladder
            roomPlan[currentRoom] = 'DI';
            clearTreasure('LADDER', 3);
            checkCoordinates();
            checkInventory();
            checkStats();
            pause();
            break;
        case "EXPLOSION":                   // BOOOOOOM
            $('#textBox').append("KABOOOOOOOOOOOOOM !!!!!" + "<br>");
            curHealth -= Math.floor(Math.random() * 5 + 3);
            curArmor -= Math.floor(Math.random() * 3 + 1);
            roomPlan[currentRoom] = 'DI';
            if(curHealth >= 1){
                $('#textBox').append("You definitely have no more eyebrows now.." + "<br>");
                checkStats();
                pause();
            }
            else{
                $('#textBox').append("You leave behind nothing but a pair of socks." + "<br>");
                checkStats();
                death('blown up by a chest');
            }
            break;
        case "ADULTTOY":
            $('#textBox').append("A purple... unicorn horn?" + "<br>");
            $('#textBox').append("You strap the \"horn\" onto your forehead. It boosts your fighting morale!" + "<br>");
            playerInventory[7] = 1;          // Put purple dildo thing in inventory
            roomPlan[currentRoom] = 'DI';
            clearTreasure('ADULTTOY', 3);    // Replace any others with health stuff
            checkInventory();
            checkStats();
            pause();
            break;
        case "CANDY":
            $('#textBox').append("It's clever candy! Lucky me." + "<br>");
            $('#textBox').append("You suddenly feel a lot smarter." + "<br>");
            playerInventory[1] = 0;         // Deactivate Numpty scroll
            roomPlan[currentRoom] = 'DI';
            playerNumpties = 0;             // Reset numpty counter
            numptyChance = 85;              // Reset numptyChance
            checkInventory();
            checkStats();
            pause();
            break;
    }
    numptyStep = 0; // Set numpty safe to 0
}

function leaveChest(){
    $('#textBox').empty();
    $('#textBox').append("You leave it be.");
    pause();
}

function getKey(){
    if(playerInventory[2] == 0){        // Is key not in inventory?
        buttonsOff();           // Turn controls and buttons off
        isGamePlaying = 0;
        $('#textBox').empty();
        $('#textBox').append("You've found a treasure chest." + "<br>");
        if(playerInventory[0] == 1){
            $('#textBox').append("This looks like just a normal chest.." + "<br>");
        }
        $('#textBox').append("<br><br>" + "<button id='openKeyChest'>OPEN CHEST</button>" + " " + "<button id='leaveChest'>Nah..</button>");
        $('#openKeyChest').click(openKeyChest);
        $('#leaveChest').click(leaveChest);
    }
}

function openKeyChest(){
    playerInventory[2] = 1;
    checkInventory();
    $('#textBox').empty();
    $('#textBox').append("You've found a key!" + "<br>");
    roomPlan[currentRoom] = 'GOTKEY';
    pause();
}