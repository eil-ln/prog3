class Sheep extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 5;
        this.speed = Math.round(random(1, 4));
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

    utel() {
        var newGrass = random(this.chooseCell(1));
        var newCell = random(this.chooseCell(0));
        if (newGrass) { 
            matrix[this.y][this.x] = 0;
            this.x = newGrass[0];
            this.y = newGrass[1];
            matrix[newGrass[1]][newGrass[0]] = this.index;
            this.energy++;
            this.mul = 0;

            for (var i in grassArr) {
                if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                    grassArr.splice(i, 1);
                    break;

                }
            }
        } else if (newCell) {
            matrix[newCell[1]][newCell[0]] = this.index;
            matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            this.energy--;

        }
    }

    multiply() {
        if (this.index == 20){
            var newCell = random(this.chooseCell(0, 1));
            var newPartner = random(this.chooseCell(2));
            var newIndex = 2 * randomGender();
            if (newCell && newPartner) {
                if(matrix[newCell[1]][newCell[0]] == 1){
                    for (var i in grassArr) {
                        if (grassArr[i].x == newCell[0] && grassArr[i].y == newCell[1]) {
                            grassArr.splice(i, 1);
                            break;
                        }
                    }
                }
                var newSheep = new Sheep(newCell[0], newCell[1], newIndex);
                sheepArr.push(newSheep);
                matrix[newCell[1]][newCell[0]] = newIndex;
                this.energy -= 5;
                
            } 
        }
    }

    die() {   
        super.die(sheepArr);  
    }
}