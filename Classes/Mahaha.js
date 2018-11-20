class Mahaha extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 3;
        this.speed = Math.round(random(0, 2));
        this.speed2 = this.speed += 1;
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

    chooseCell(ch, ch1, ch2) {
        this.getNewCoordinates();
        return super.chooseCell(ch, ch1, ch2)

    }

    walk() {
        var findPrey = random(this.chooseCell(2, 3, 4));
        var chooseCell = random(this.chooseCell(0, 1));
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
        var newCell = random(this.chooseCell(0, 1));
        this.energy = 10;
        if (newCell) {
            var newMahaha = new Mahaha(newCell[0], newCell[1]);
            mahahaArr.push(newMahaha);
            matrix[newCell[1]][newCell[0]] = this.index;
        }
    }

    die() {
        super.die(mahahaArr);
    }

}