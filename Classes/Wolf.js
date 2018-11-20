class Wolf extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 5;
        this.speed = Math.round(random(0, 2));
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

    multiply() {
        if (this.index == 30){
            var newCell = random(this.chooseCell(0));
            var newPartner = random(this.chooseCell(3));
            var newIndex = 3 * randomGender();
            if (newCell && newPartner) {
                if(matrix[newCell[1]][newCell[0]] == 1){
                    for (var i in wolfArr) {
                        if (wolfArr[i].x == newCell[0] && wolfArr[i].y == newCell[1]) {
                            wolfArr.splice(i, 1);
                            break;
                        }
                    }
                }
                var newWolf = new Wolf(newCell[0], newCell[1], newIndex);
                wolfArr.push(newWolf);
                matrix[newCell[1]][newCell[0]] = newIndex;
                this.energy -= 3;
            } 
        }
    }

    utel() {
        var findPrey = random(this.chooseCell(2, 20));
        var chooseCell = random(this.chooseCell(0, 1));
        if (findPrey) {
            matrix[findPrey[1]][findPrey[0]] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = findPrey[0];
            this.y = findPrey[1];
            this.energy++;
            this.mul = 0;
            for (var i in sheepArr) {
                if (findPrey[0] == sheepArr[i].x && findPrey[1] == sheepArr[i].y) {
                    sheepArr.splice(i, 1);
                    break;
                }
            }
        } else if (chooseCell) {            
            if (matrix[chooseCell[1]][chooseCell[0]] == 1){
                matrix[this.y][this.x] = 1;
            }
            else{
                matrix[this.y][this.x] = 0;
            }
            matrix[chooseCell[1]][chooseCell[0]] = this.index;
            this.x = chooseCell[0];
            this.y = chooseCell[1];       
            this.mul = 0;
            this.energy--;
        }
    }

    die() {
        super.die(wolfArr);
    }

}