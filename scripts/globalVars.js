/* These are all game's global vars concerning the game */

var gameDifficulty = 0;

//Scoring counters
var playerSteps = 0;            // Step tracker
var playerWeapons = 0;          // Weapon pickup tracker
var playerWeaponBreaks = 0;     // Weapon break tracker
var playerWeaponWastes = 0;     // Weapon waste tracker
var playerChests = 0;           // Chest opening tracker
var playerFights = 0;
var playerFlees = 0;
var playerFightFlees = 0;
var playerFleeDifference = playerFlees - playerFightFlees;
var playerNumpties = 0;
var playerLevels = [0,0,0];      // This is to keep track of which levels the player has finished

//Playing field variables
var fieldSize;
var maxRooms;
var maxY;
var maxX;
var fieldMtpl1;
var fieldMtpl2;
var northWall;
var eastWall;
var southWall;
var westWall;

//Randomizer seeds
var possStartFatigue;
var startFatigue;

//Global variables
var maxHealth;
var curHealth;
var maxArmor;
var curArmor;
var maxMonsters;
//var curMonsters = 0;
var maxWeapons;
//var curWeapons = 0;
var curWeapon = 0; //0 = fist, 1 = stick, 2 = dagger, 3 = wooden sword, 4 = iron sword
var maxTreasures;
//var curTreasures = 0;
var maxTraps;
//var curTraps = 0;
var currentX;
var currentY;
var currentRoom;
var fightChance = 40; // In percentage
var monStrengthRange = 10;
var fleeChance = 50;
var numptyChance = 85;

// Global Cue Points
var globalCues = [
    "CUE1",
    "CUE2",
    "CUE3",
    "CUE4",
    "CUE5",
    "VULG"
];

// Player "inventory" array
var playerOils = 0;
var playerInventory = [
    0,              // Scroll of truth
    0,              // Scroll of numpty
    0,              // Key
    0,              // Compass
    0,              // Burberry cap
    0,              // Flint and Steel
    0,              // Ladder
    0               // Toy .. thing
];