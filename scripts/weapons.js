var curWeaponStrength;
var curWeaponStrengthDice;
var curArmorDice;
var weaponItem;                         // Only to have a variable that represents the function input in getWeapon()

var globalWeapons = [
    "FISTS",
    "STICK",
    "DAGGER",
    "WOODEN SWORD",
    "IRON SWORD",
    "SMALL ARMOR",
    "BIG ARMOR"
];

function getWeapon(whatWeapon){
    buttonsOff();           // Turn controls and buttons off
    isGamePlaying = 0;
    weaponItem = globalWeapons[whatWeapon];
    $('#textBox').empty();
    $('#textBox').append("You've found a " + weaponItem + "<br>" + "Pick it up?" + "<br>");
    $('#textBox').append("<br>" + "<button id='pickUp'>PICK UP</button>" + " " + "<button id='noPickUp'>LEAVE</button>");

    $('#pickUp').click(pickUpWeapon);
    $('#noPickUp').click(noPickUpWeapon);
}

function pickUpWeapon(){
    $('#textBox').empty();
    switch (weaponItem)
    {
        case "STICK":
            playerWeapons += 1;
            setWeapon(1);
            curWeaponStrengthDice = Math.floor(Math.random() * 2 + 1);      // Either 1 or 2
            curWeaponStrength = curWeaponStrengthDice;
            roomPlan[currentRoom] = 'DW';
            $('#textBox').append("You've picked up the weapon." + "<br>");
            break;
        case "DAGGER":
            playerWeapons += 1;
            setWeapon(2);
            curWeaponStrengthDice = Math.floor(Math.random() * 3 + 2);      // Between 2 - 4
            curWeaponStrength = curWeaponStrengthDice;
            roomPlan[currentRoom] = 'DW';
            $('#textBox').append("You've picked up the weapon." + "<br>");
            break;
        case "WOODEN SWORD":
            playerWeapons += 1;
            setWeapon(3);
            curWeaponStrengthDice = Math.floor(Math.random() * 2 + 3);      // Either 3 or 4
            curWeaponStrength = curWeaponStrengthDice;
            roomPlan[currentRoom] = 'DW';
            $('#textBox').append("You've picked up the weapon." + "<br>");
            break;
        case "IRON SWORD":
            playerWeapons += 1;
            setWeapon(4);
            curWeaponStrengthDice = Math.floor(Math.random() * 2 + 4);      // Either 4 or 5
            curWeaponStrength = curWeaponStrengthDice;
            roomPlan[currentRoom] = 'DW';
            $('#textBox').append("You've picked up the weapon." + "<br>");
            break;
        case "SMALL ARMOR":
            curArmorDice = Math.floor(Math.random() * 3 + 1);               // Between 1 - 3
            curArmor += curArmorDice;
            roomPlan[currentRoom] = 'DW';
            $('#textBox').append("You've picked up the armor." + "<br>");
            break;
        case "BIG ARMOR":
            curArmorDice = Math.floor(Math.random() * 5 + 5);               // Between 5 - 10
            curArmor += curArmorDice;
            roomPlan[currentRoom] = 'DW';
            $('#textBox').append("You've picked up the armor." + "<br>");
            break;
    }
    numptyStep = 0; // Set numpty safe to 0
    pause();        // Put game on short pause
    checkStats();                   // Update health and armor
}

function noPickUpWeapon(){
    $('#textBox').empty();
    $('#textBox').append("You leave it be." + "<br>");
    pause();        // Put game on short pause
}

function setWeapon(W){
    if(curWeapon > 0){     // If your current weapon is not fists
        playerWeaponWastes += 1;
    }
    curWeapon = W;
    $('#weaponBar').empty();
    $('#weaponBar').append(globalWeapons[W]);
}