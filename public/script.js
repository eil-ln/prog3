var socket = io.connect('http://localhost:3000');
var matrix = [];
var h = 50;
var w = 50;
var side = 10;
var grassArr = [], sheepArr = [], wolfArr = [], hntrArr = [], mahahaArr = [], destroyerArr = [];
var season = "Summer";
var seasonCount = 0;
var killedByPlayer = 0;
var explosionCount = 0;
var stats = {};


function setup() {
    frameRate(5);    
    for (let y = 0; y < h; y++) {
        matrix[y] = [];
        for (let x = 0; x < w; x++) {
            let rand = random(100);
            let index = 0;
            if (rand < 30) index = 0;
            else if (rand < 55) index = 1;
            else if (rand < 75) index = 2 * randomGender();
            else if (rand < 95) index = 3 * randomGender();
            else if (rand < 99) index = 4 * randomGender();
            else if (rand < 99.9) index = 5;
            else if (rand <= 100) index = 6;
            matrix[y][x] = index;               
            }
    }

    createCanvas(matrix[0].length * side, matrix.length * side);
    
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1));
            }
            else if (matrix[y][x] == 2) {
                sheepArr.push(new Sheep(x, y, 2));
            }
            else if (matrix[y][x] == 20) {
                sheepArr.push(new Sheep(x, y, 20));
            }
            else if (matrix[y][x] == 3) {
                wolfArr.push(new Wolf(x, y, 3));
            }
            else if (matrix[y][x] == 30) {
                wolfArr.push(new Wolf(x, y, 30));
            }
            else if (matrix[y][x] == 4) {
                hntrArr.push(new Hunter(x, y, 4));
            }
            else if (matrix[y][x] == 40) {
                hntrArr.push(new Hunter(x, y, 40));
            }
            else if (matrix[y][x] == 5) {
                mahahaArr.push(new Mahaha(x, y, 5));
            }
            else if (matrix[y][x] == 6) {
                destroyerArr.push(new Destroyer(x, y, 6));
            }
        }
    }

}

function draw() {
    if (frameCount % 60 == 0) {
        stats = {
            "frameCount": frameCount,
            "seasons": seasonCount,
            "grassC": grassArr.length,
            "sheepsC": sheepArr.length,
            "wolfsC": wolfArr.length,
            "huntersC": hntrArr.length,
            "MahahasC": mahahaArr.length,
            "explosionC": explosionCount,
            "killedByPlayer": killedByPlayer
        }
        socket.emit("send stats", stats);
    }

    if (frameCount % 25 == 0) {
        if (season == "Summer") {
            season = "Winter";
        }
        else {
            season = "Summer"; 
        } 
        seasonCount++;   

    }

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (season == "Summer"){
                    fill("green");
                }          
                else{
                    fill("white");
                }                    
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill(255, 255, 0);
                rect(x * side, y * side, side, side);
            } 
            else if (matrix[y][x] == 20) {
                fill(255, 255, 113);
                rect(x * side, y * side, side, side);

            }            
            else if (matrix[y][x] == 3) {
                fill(255, 0, 0);
                rect(x * side, y * side, side, side);
            } 
            else if (matrix[y][x] == 30) {
                fill(255, 87, 87);
                rect(x * side, y * side, side, side);
            } 
            else if (matrix[y][x] == 4) {
                fill(95, 61, 1);
                rect(x * side, y * side, side, side);
            } 
            else if (matrix[y][x] == 40) {
                fill(162, 103, 0);
                rect(x * side, y * side, side, side);
            } 
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            } 
            else if (matrix[y][x] == 6) {
                fill("black");
                rect(x * side, y * side, side, side);
            } 
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        if (season != "Winter") {
            grassArr[i].multiply();
        }  
    }

    for (var i in sheepArr) {
        sheepArr[i].mul++;
        if (season == "Winter") {
            if (sheepArr[i].mul >= sheepArr[i].speed + 3) {
                sheepArr[i].utel();
            }
            if (sheepArr[i].energy >= 13) {
                sheepArr[i].multiply();
            }
        }
        else if (season == "Summer") {
            if (sheepArr[i].mul >= sheepArr[i].speed) {
                sheepArr[i].utel();
            }
            if (sheepArr[i].energy >= 9) {
                sheepArr[i].multiply();
            }
        }
        
        if (sheepArr[i].energy <= 0) {
            sheepArr[i].die();
        }
    }

    for (var i in wolfArr) {
        wolfArr[i].mul++;
        if (season == "Winter") {
            if (wolfArr[i].mul >= wolfArr[i].speed + 2) {
                wolfArr[i].utel();
            }
            if (wolfArr[i].energy >= 7) {
                wolfArr[i].multiply();
            }
        }
        else if (season == "Summer") {
            if (wolfArr[i].mul >= wolfArr[i].speed) {
                wolfArr[i].utel();
            }
            if (wolfArr[i].energy >= 5) {
                wolfArr[i].multiply();
            }
        }

        if (wolfArr[i].energy <= 0) {
            wolfArr[i].die();
        }
    }

    for (var i in hntrArr) {
        hntrArr[i].mul++;
        if (season == "Summer" && hntrArr[i].mul >= hntrArr[i].speed) {
            hntrArr[i].utel();
        }
        else if (season == "Winter" && hntrArr[i].mul >= hntrArr[i].speed + 2) {
            hntrArr[i].utel();
        }
        if (hntrArr[i].energy >= 7) {
            hntrArr[i].multiply();
        }
        else if (hntrArr[i].energy <= 0) {
            hntrArr[i].die();
        }
    }

    for (var i in mahahaArr) {
        mahahaArr[i].mul++;
        if (season != "Summer"){
            if (mahahaArr[i].mul >= mahahaArr[i].speed){
                mahahaArr[i].walk();   
            }    
            if (mahahaArr[i].energy >= 25) {
                mahahaArr[i].multiply();
            }
            else if (mahahaArr[i].energy <= 0) {
                mahahaArr[i].die();
            }
        }
    }

    for (var i in destroyerArr) {
        destroyerArr[i].mul++;
        if (destroyerArr[i].mul >= destroyerArr[i].speed) {
            destroyerArr[i].walk();
        }
        if (destroyerArr[i].steps >= 4){
            destroyerArr[i].explose(); 
            explosionCount++;
            
        }       
    }
}

function mouseClicked() {
    let directions = [
        [Math.floor(mouseX / side) - 1, Math.floor(mouseY / side) - 1],
        [Math.floor(mouseX / side), Math.floor(mouseY / side) - 1],
        [Math.floor(mouseX / side) + 1, Math.floor(mouseY / side) - 1],
        [Math.floor(mouseX / side) - 1, Math.floor(mouseY / side)],
        [Math.floor(mouseX / side) + 1, Math.floor(mouseY / side)],
        [Math.floor(mouseX / side) - 1, Math.floor(mouseY / side) + 1],
        [Math.floor(mouseX / side), Math.floor(mouseY / side) + 1],
        [Math.floor(mouseX / side) + 1, Math.floor(mouseY / side) + 1],
        [Math.floor(mouseX / side), Math.floor(mouseY / side)]
    ];
    let found = [];
    for (var i in directions) {
        var x = directions[i][0];
        var y = directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            killCreature(x, y);
        }
    }
}

function randomGender() {
    var gender;
    if (random() >= 0.5) gender = 10;
    else gender = 1;
    return gender;
}

function killCreature(x, y) {
    if (matrix[y][x] == 1) {
        for (var i in grassArr) {
            if (grassArr[i].x == x && grassArr[i].y == y) {
                grassArr.splice(i, 1);
                killedByPlayer++;
                matrix[y][x] = 0;
                break;
            }
        }
    }
    else if (matrix[y][x] == 2 || matrix[y][x] == 20) {
        for (var i in sheepArr) {
            if (sheepArr[i].x == x && sheepArr[i].y == y) {
                sheepArr.splice(i, 1);
                matrix[y][x] = 0;
                killedByPlayer++;
                break;
            }
        }
    }
    else if (matrix[y][x] == 3 || matrix[y][x] == 30) {
        for (var i in wolfArr) {
            if (wolfArr[i].x == x && wolfArr[i].y == y) {
                wolfArr.splice(i, 1);
                killedByPlayer++;
                matrix[y][x] = 0;
                break;
            }
        }
    }
    else if (matrix[y][x] == 4 || matrix[y][x] == 40) {
        for (var i in hntrArr) {
            if (hntrArr[i].x == x && hntrArr[i].y == y) {
                hntrArr.splice(i, 1);
                killedByPlayer++;
                matrix[y][x] = 0;
                break;
            }
        }
    }

}
