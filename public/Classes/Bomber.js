class Bomber extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.speed = Math.round(random(1, 4));
        this.steps = 0;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x, this.y + 1]
        ];
    }

    explosionRange() {
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

    chooseCell(ch, ch1, ch2) {
        this.getNewCoordinates();
        return super.chooseCell(ch, ch1, ch2)
    }

    getCharacters(ch, ch1, ch2, ch3, ch4, ch5, ch6) {
        this.explosionRange();
        return super.chooseCell(ch, ch1, ch2, ch3, ch4, ch5, ch6);

    }

    walk() {
        var newCell = random(this.chooseCell(0));
        if (newCell) { 
            matrix[newCell[1]][newCell[0]] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];  
            this.mul = 0;
            this.steps++;
        } 
        else{
            this.explose();
        }
    }

    explose() {
        var range = this.getCharacters(1, 2, 20, 3, 30, 4, 40);
        for (var i in range) {
            var x = range[i][0];
            var y = range[i][1];

            if (matrix[y][x] == 1) {
                for (var i in grassArr) {
                    if (grassArr[i].x == x && grassArr[i].y == y) {
                        grassArr.splice(i, 1);
                        matrix[y][x] = 0;
                        break;
                    }
                }
            }
            else if (matrix[y][x] == 2 || matrix[y][x] == 20) {
                for (var i in sheepArr) {
                    if (sheepArr[i].x == x && sheepArr[i].y == y) {
                        sheepArr[i].die;
                        matrix[y][x] = 0;
                        break;
                    }
                }
            }
            else if (matrix[y][x] == 3 || matrix[y][x] == 30) {
                for (var i in wolfArr) {
                    if (wolfArr[i].x == x && wolfArr[i].y == y) {
                        wolfArr.splice(i, 1);
                        matrix[y][x] = 0;
                        break;
                    }
                }
            }
            else if (matrix[y][x] == 4 || matrix[y][x] == 40) {
                for (var i in hntrArr) {
                    if (hntrArr[i].x == x && hntrArr[i].y == y) {
                        hntrArr.splice(i, 1);
                        matrix[y][x] = 0;
                        break;
                    }
                }
            }
        }
        for (var i in bomberArr) {
            if (this.x == bomberArr[i].x && this.y == bomberArr[i].y) {
                bomberArr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }           
    }
}