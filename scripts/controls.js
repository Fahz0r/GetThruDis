var keyToggle = 0;
var isGamePlaying = 1; //0 = no, 1 = yes

function keysOn(){
    keyToggle = 0;
}

function keysOff(){
    keyToggle = 1;
}

if(isGamePlaying == 1){
    $(document).keydown(function(e){
        switch(e.which) {
            case 37: // left
                if(keyToggle == 0 && isGamePlaying == 1){
                    cMoveLeft(0);
                    keyToggle = 1;
                }
                break;
            case 38: // up
                if(keyToggle == 0 && isGamePlaying == 1){
                    cMoveUp(0);
                    keyToggle = 1;
                }
                break;
            case 39: // right
                if(keyToggle == 0 && isGamePlaying == 1){
                    cMoveRight(0);
                    keyToggle = 1;
                }
                break;
            case 40: // down
                if(keyToggle == 0 && isGamePlaying == 1){
                    cMoveDown(0);
                    keyToggle = 1;
                }
                break;
            case 87:    // W
                if(keyToggle == 0 && isGamePlaying == 1){
                    cMoveUp(0);
                    keyToggle = 1;
                }
                break;
            case 65:    // A
                if(keyToggle == 0 && isGamePlaying == 1){
                    cMoveLeft(0);
                    keyToggle = 1;
                }
                break;
            case 83:    // S
                if(keyToggle == 0 && isGamePlaying == 1){
                    cMoveDown(0);
                    keyToggle = 1;
                }
                break;
            case 68:    // D
                if(keyToggle == 0 && isGamePlaying == 1){
                    cMoveRight(0);
                    keyToggle = 1;
                }
                break;
            default: return; // exit this handler for other keys
        }
        e.preventDefault();
    });

    $(document).keyup(function(f){
        if (f.keyCode == 37 || f.keyCode == 38 || f.keyCode == 39 || f.keyCode == 40
            || f.keyCode == 87 || f.keyCode == 65 || f.keyCode == 83 || f.keyCode == 68) {
            keyToggle = 0;
            return false;
        }
    });
}

function buttonsOn(){
    $('#moveUp').removeAttr("disabled");
    $('#moveDown').removeAttr("disabled");
    $('#moveLeft').removeAttr("disabled");
    $('#moveRight').removeAttr("disabled");
}

function buttonsOff(){
    $('#moveUp').attr("disabled", "disabled");
    $('#moveDown').attr("disabled", "disabled");
    $('#moveLeft').attr("disabled", "disabled");
    $('#moveRight').attr("disabled", "disabled");
}

function cMoveUp(c){
    if(currentY > 0){
        playerSteps += 1;
        currentY -= fieldSize;
        $('#tempXY').empty();
        $('#tempXY').append(currentX + " , " + currentY);
        $('#tempRoom').empty();
        $('#tempRoom').append(currentX + currentY);
        checkRoom(c);
    }
}

function cMoveDown(c){
    if(currentY < maxY){
        playerSteps += 1;
        currentY += fieldSize;
        $('#tempXY').empty();
        $('#tempXY').append(currentX + " , " + currentY);
        $('#tempRoom').empty();
        $('#tempRoom').append(currentX + currentY);
        checkRoom(c);
    }
}

function cMoveLeft(c){
    if(currentX > 1){
        playerSteps += 1;
        currentX -= 1;
        $('#tempXY').empty();
        $('#tempXY').append(currentX + " , " + currentY);
        $('#tempRoom').empty();
        $('#tempRoom').append(currentX + currentY);
        checkRoom(c);
    }
}

function cMoveRight(c){
    if(currentX < maxX){
        playerSteps += 1;
        currentX += 1;
        $('#tempXY').empty();
        $('#tempXY').append(currentX + " , " + currentY);
        $('#tempRoom').empty();
        $('#tempRoom').append(currentX + currentY);
        checkRoom(c);
    }
}