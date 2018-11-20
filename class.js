class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mul = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    newSquares(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    multiply() {
        this.mul++;
        var randomPosition = random(this.newSquares(0));

        if (randomPosition && this.mul >= Math.round(random(5, 13))) {
            var norXot = new Grass(randomPosition[0], randomPosition[1]);
            grassArr.push(norXot);
            matrix[randomPosition[1]][randomPosition[0]] = 1;
            this.mul = 0;
        }
    }
}

class Sheep {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mul = 0;
        this.energy = 15;
        this.speed = Math.round(random(0, 2));
        this.esp = this.speed++;
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

        return this.directions;
    }


    newSquares(ch, ch1, ch2) {
        var found = [];
        var dire = this.newDirections();

        for (var i in dire) {
            var x = dire[i][0];
            var y = dire[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch || matrix[y][x] == ch1 || matrix[y][x] == ch2) {
                    found.push(dire[i]);
                }
            }
        }
        return found;
    }

    utel() {
        var newGrass = random(this.newSquares(1));
        var newSquare = random(this.newSquares(0));
        this.mul++;
        if (newGrass) {
            if (this.mul >= this.esp) {
                matrix[newGrass[1]][newGrass[0]] = 2;
                matrix[this.y][this.x] = 0;
                this.x = newGrass[0];
                this.y = newGrass[1];
                this.energy++;
                this.mul = 0;

                for (var j in grassArr) {
                    if (newGrass[0] == grassArr[j].x && newGrass[1] == grassArr[j].y) {
                        grassArr.splice(j, 1);
                        break;
                    }
                }
            }
        } else if (newSquare && this.mul >= this.speed) {
            matrix[newSquare[1]][newSquare[0]] = 2;
            matrix[this.y][this.x] = 0;
            this.x = newSquare[0];
            this.y = newSquare[1];
            this.energy--;
            this.mul = 0;
        }
    }

    multiply() {
        var newCell = random(this.newSquares(0, 1));
        this.energy = 5;
        if (newCell) {
            var norSheep = new Sheep(newCell[0], newCell[1]);
            sheepArr.push(norSheep);
            matrix[newCell[1]][newCell[0]] = 2;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var j in sheepArr) {
            if (this.x == sheepArr[j].x && this.y == sheepArr[j].y) {
                sheepArr.splice(j, 1);
                break;
            }
        }
    }
}

class Wolf {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mul = 0;
        this.energy = 10;
        this.speed = Math.round(random(0, 3));
        this.esp = this.speed++;
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

        return this.directions;
    }

    yntrelVandak(ch, ch1, ch2) {
        var found = [];
        var dire = this.newDirections();

        for (var i in dire) {
            var x = dire[i][0];
            var y = dire[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch || matrix[y][x] == ch1 || matrix[y][x] == ch2) {
                    found.push(dire[i]);
                }
            }
        }
        return found;
    }

    utel() {
        var findPrey = random(this.yntrelVandak(2));
        var chooseCell = random(this.yntrelVandak(0, 1));
        this.mul++;
        if (findPrey) {
            if (this.mul >= this.esp) {
                matrix[findPrey[1]][findPrey[0]] = 3;
                matrix[this.y][this.x] = 0;
                this.x = findPrey[0];
                this.y = findPrey[1];
                this.energy++;
                this.mul = 0;
                for (var j in sheepArr) {
                    if (findPrey[0] == sheepArr[j].x && findPrey[1] == sheepArr[j].y) {
                        sheepArr.splice(j, 1);
                        break;
                    }
                }

            }
        } else if (chooseCell && this.mul >= this.speed) {
            matrix[chooseCell[1]][chooseCell[0]] = 3;
            matrix[this.y][this.x] = 0;
            this.x = chooseCell[0];
            this.y = chooseCell[1];
            this.mul = 0;
            this.energy--;
        }
    }
    multiply() {
        var newCell = random(this.yntrelVandak(0, 1));
        if (newCell) {
            var norGishatich = new Wolf(newCell[0], newCell[1]);
            wolfArr.push(norGishatich);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 10;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var j in wolfArr) {
            if (this.x == wolfArr[j].x && this.y == wolfArr[j].y) {
                wolfArr.splice(j, 1);
                break;
            }
        }
    }

}

class Hunter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mul = 0;
        this.energy = 10;
        this.speed = Math.round(random(0, 2));
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];

        return this.directions;
    }

    newPrey() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];

        return this.directions;
    }


    yntrelVandak(ch, ch1, ch2) {
        var found = [];
        var dire = this.newDirections();

        for (var i in dire) {
            var x = dire[i][0];
            var y = dire[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch || matrix[y][x] == ch1 || matrix[y][x] == ch2) {
                    found.push(dire[i]);
                }
            }
        }
        return found;
    }

    yntrelGishatich(ch, ch1, ch2) {
        var found = [];
        var dire = this.newPrey();

        for (var i in dire) {
            var x = dire[i][0];
            var y = dire[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch || matrix[y][x] == ch1 || matrix[y][x] == ch2) {
                    found.push(dire[i]);
                }
            }
        }
        return found;
    }

    utel() {
        var findPrey = random(this.yntrelGishatich(3));
        var chooseCell = random(this.yntrelVandak(0, 1));
        //var rand = Math.round(random(1));
        this.mul++;
        if (findPrey) {
            if (this.mul >= this.speed) {
                matrix[findPrey[1]][findPrey[0]] = 0;
                this.energy++;
                this.mul = 0;
                for (var j in wolfArr) {
                    if (findPrey[0] == wolfArr[j].x && findPrey[1] == wolfArr[j].y) {
                        wolfArr.splice(j, 1);
                        break;
                    }
                }

            }
        } else if (chooseCell && this.mul >= this.speed) {
            this.energy--;
            matrix[chooseCell[1]][chooseCell[0]] = 4;
            matrix[this.y][this.x] = 0;
            this.x = chooseCell[0];
            this.y = chooseCell[1];
            this.mul = 0;
        }
    }

    multiply() {
        var newCell = random(this.yntrelVandak(0, 1));
        this.energy = 10;
        if (newCell) {
            var norHunter = new Hunter(newCell[0], newCell[1]);
            hntrArr.push(norHunter);
            matrix[newCell[1]][newCell[0]] = 4;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var j in hntrArr) {
            if (this.x == hntrArr[j].x && this.y == hntrArr[j].y) {
                hntrArr.splice(j, 1);
                break;
            }
        }
    }

}


class EsimInch {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mul = 0;
        this.energy = 10;
        this.speed = Math.round(random(0, 2));
        this.speed2 = this.speed += 1;
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

        return this.directions;
    }

    yntrelVandak(ch, ch1, ch2) {
        var found = [];
        var dire = this.newDirections();

        for (var i in dire) {
            var x = dire[i][0];
            var y = dire[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch || matrix[y][x] == ch1 || matrix[y][x] == ch2) {
                    found.push(dire[i]);
                }
            }
        }
        return found;
    }


    walk() {
        var findPrey = random(this.yntrelVandak(2, 3, 4));
        var chooseCell = random(this.yntrelVandak(0, 1));
        this.mul++;
        if (findPrey) {
            if (this.mul >= this.speed2) {
                this.energy++;
                if (matrix[findPrey[1]][findPrey[0]] = 2) {
                    for (var i in sheepArr) {
                        if (findPrey[0] == sheepArr[i].x && findPrey[1] == sheepArr[i].y) {
                            sheepArr.splice(i, 1);
                            break;
                        }
                    }
                } else if (matrix[findPrey[1]][findPrey[0]] = 3) {
                    for (var j in wolfArr) {
                        if (findPrey[0] == wolfArr[j].x && findPrey[1] == wolfArr[j].y) {
                            wolfArr.splice(j, 1);
                            break;
                        }
                    }
                } else if (matrix[findPrey[1]][findPrey[0]] = 4) {
                    for (var k in hntrArr) {
                        if (findPrey[0] == hntrArr[k].x && findPrey[1] == hntrArr[k].y) {
                            hntrArr.splice(k, 1);
                            break;
                        }
                    }
                }

                matrix[findPrey[1]][findPrey[0]] = 5;
                matrix[this.y][this.x] = 0;
                this.x = findPrey[0];
                this.y = findPrey[1];
                this.mul = 0;

            }
        } else if (chooseCell && this.mul >= this.speed) {
            this.energy--;
            matrix[chooseCell[1]][chooseCell[0]] = 5;
            matrix[this.y][this.x] = 0;
            this.x = chooseCell[0];
            this.y = chooseCell[1];
            this.mul = 0;

        }
    }

    multiply() {
        var newCell = random(this.yntrelVandak(0, 1));
        this.energy = 10;
        if (newCell) {
            var norEsimInch = new EsimInch(newCell[0], newCell[1]);
            esimInchArr.push(norEsimInch);
            matrix[newCell[1]][newCell[0]] = 4;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var j in esimInchArr) {
            if (this.x == esimInchArr[j].x && this.y == esimInchArr[j].y) {
                esimInchArr.splice(j, 1);
                break;
            }
        }
    }

}