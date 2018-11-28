class Mahaha extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 20;
        this.speed = Math.round(random(2, 3));
    }

    getNewCoordinates() {
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

    chooseCell(ch, ch1, ch2, ch3, ch4, ch5) {
        this.getNewCoordinates();
        return super.chooseCell(ch, ch1, ch2, ch3, ch4, ch5);

    }

    walk() {
        var findPrey = random(this.chooseCell(2, 20, 4, 40));
        var chooseCell = random(this.chooseCell(0, 1));
        this.mul++;
        if (findPrey) {
            if (matrix[findPrey[1]][findPrey[0]] == 2 || matrix[findPrey[1]][findPrey[0]] == 20) {
                for (var i in sheepArr) {
                    if (findPrey[0] == sheepArr[i].x && findPrey[1] == sheepArr[i].y) {
                        sheepArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (matrix[findPrey[1]][findPrey[0]] == 4 || matrix[findPrey[1]][findPrey[0]] == 40) {
                for (var i in hntrArr) {
                    if (findPrey[0] == hntrArr[i].x && findPrey[1] == hntrArr[i].y) {
                        hntrArr.splice(i, 1);
                        break;
                    }
                }
            }

            matrix[findPrey[1]][findPrey[0]] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = findPrey[0];
            this.y = findPrey[1];
            this.energy++;
            this.mul = 0;

        }
        else if (chooseCell) {
            if (matrix[chooseCell[1]][chooseCell[0]] == 1) matrix[this.y][this.x] = 1;
            else matrix[this.y][this.x] = 0;
            this.energy--;
            matrix[chooseCell[1]][chooseCell[0]] = this.index;
            this.x = chooseCell[0];
            this.y = chooseCell[1];
            this.mul = 0;

        }
    }

    multiply() {
        var newCell = random(this.chooseCell(0, 1));
        if (newCell) {
            if(matrix[newCell[1]][newCell[0]] == 1){
                for (var i in grassArr) {
                    if (grassArr[i].x == newCell[0] && grassArr[i].y == newCell[1]) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            var newMahaha = new Mahaha(newCell[0], newCell[1], this.index);
            mahahaArr.push(newMahaha);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy -= 5;
        }
    }

    die() {
        super.die(mahahaArr);
    }

}