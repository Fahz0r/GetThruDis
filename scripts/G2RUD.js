$(document).ready(

    function(){
        console.log("You should focus on the game, not the console..");
        //Initialize player drop into the game
        showIntro();

        debug(0);

        $('#moveUp').click(cMoveUp); //Move up
        $('#moveDown').click(cMoveDown); //Move down
        $('#moveLeft').click(cMoveLeft); //You get it
        $('#moveRight').click(cMoveRight); //Uh huh

        buttonsOff();
        checkCoordinates();
    }
);

function easyMode(){ startGame(0) }
function normalMode(){ startGame(1) }
function hardMode(){ startGame(2) }

function startGame(d){
    var i = 0;
    while(i < playerInventory.length){
        playerInventory[i] = 0;     // Erase all from inventory (will be added straight after anyway)
        i++;
    }
    playerSteps = 0;        // Set playersteps to 0
    numptyChance = 85;      // Set numptychance to default
    playerNumpties = 0;     // Set playerNumpties to default
    fightChance = 40;       // Set fightChance to default
    monStrengthRange = 10;  // Set monStrengthRange to default
    fleeChance = 50;        // fleeChance to default
    playerOils = 0;         // Set playerOils to default
    playerFights = 0;       // PlayerFights to default
    playerFlees = 0;        // PlayerFlees to default
    playerFightFlees = 0;   // PlayerFightFlees to default

    if(d == 0){
        gameDifficulty = 0;
        fieldSize = 22;
        playerInventory[3] = 1;
        changeBgColor(0);
    }
    else if(d == 1){
        gameDifficulty = 1;
        fieldSize = 24;
        changeBgColor(1);
    }
    else if(d == 2){
        gameDifficulty = 2;
        fieldSize = 26;
        changeBgColor(2);
    }
    else if(d == 3){
        gameDifficulty = 3;
        fieldSize = 28;
        changeBgColor(3);
    }
    $('#map').empty();      // Map needs to be cleared
    setMapGenVariables();
    gameStart();
}

function setMapGenVariables(){
    maxRooms = fieldSize * fieldSize;
    maxY = (fieldSize * fieldSize) - fieldSize;
    maxX = fieldSize;
    fieldMtpl1 = 4;
    fieldMtpl2 = 4;
    northWall = 0;
    eastWall = fieldSize;
    southWall = maxRooms - fieldSize;
    westWall = 1;

    maxMonsters = fieldSize * fieldMtpl1;
    maxWeapons = fieldSize;
    maxTreasures = fieldSize * 2;
    maxTraps = fieldSize * fieldMtpl2;
}

function debug(b){
    if(b == 0){
        $('#chance').hide();
    }
}

function showIntro(){
    $('#textBox').empty();
    $('#healthBar').empty();
    $('#armorBar').empty();
    $('#weaponBar').empty();
    $('#inventory').empty();
    $('#coorXY').empty();
    $('#coorRoom').empty();

    $('#textBox').append("Studio Anjin presents: " + "<br>" + "<img src='img/logo2.png'>");
    $('#textBox').append("<h1>A solo game by Fahz0r</h1>");
    $('#textBox').append("<button id='howTo'>HOW TO PLAY</button>" + "<br>");
    $('#textBox').append("<button id='easyMode'>EASY</button>" + " - ");
    $('#textBox').append("<button id='normalMode'>NORMAL</button>" + " - ");
    $('#textBox').append("<button id='hardMode'>HARD</button>");
    $('#healthBar').append("HP: " + "0 / 0");
    $('#armorBar').append("AR: " + "0 / 0");
    $('#weaponBar').append("You are carrying no weapons..");
    checkCoordinates();


    //Buttons in the game
    $('#easyMode').click(easyMode);
    $('#normalMode').click(normalMode);
    $('#hardMode').click(hardMode);
    $('#howTo').click(howTo);
}

function howTo(){
    $('#textBox').empty();
    $('#healthBar').empty();
    $('#armorBar').empty();
    $('#weaponBar').empty();
    $('#inventory').empty();
    $('#coorXY').empty();
    $('#coorRoom').empty();

    $('#textBox').append("<b>How to play!</b>" + "<br>")
        .append("Your goal is to grab the key and find the door to exit the dungeon. The higher the level, the larger ")
        .append("the dungeon becomes, and the more difficult it is to exit the dungeon. Good luck surviving!" + "<br>")
        .append("(WASD and Arrow Keys work too!)" + "<br>" + "<button id='return'>Return</button>");
    $('#healthBar').append("Your health");
    $('#armorBar').append("Your armor");
    $('#weaponBar').append("Your weapons");
    $('#inventory').append("This is your inventory bar");
    $('#coorXY').append("X / Y coordinates");
    $('#coorRoom').append("Room number");

    $('#return').click(showIntro);
}