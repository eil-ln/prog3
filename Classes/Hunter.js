class Hunter extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 10;
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

    getNewPreyCoordinates() {
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
        return super.chooseCell(ch, ch1, ch2);
    }

    choosePrey(ch, ch1, ch2){
        this.getNewPreyCoordinates();
        return super.chooseCell(ch, ch1, ch2);       
    }

    utel() {
        var findPrey = random(this.choosePrey(3, 30));
        var chooseCell = random(this.chooseCell(0, 1));
        if (findPrey) {
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
        else if (chooseCell) {
            if (matrix[chooseCell[1]][chooseCell[0]] == 1){
                matrix[this.y][this.x] = 1;
            }
            else{
                matrix[this.y][this.x] = 0;
            }
            this.energy--;
            matrix[chooseCell[1]][chooseCell[0]] = this.index;
            this.x = chooseCell[0];
            this.y = chooseCell[1];
            this.mul = 0;
        }
    }

    multiply() {
        if (this.index == 30){
            var newCell = random(this.chooseCell(0, 1));
            var newPartner = random(this.chooseCell(3, 30));
            var newIndex = 4 * randomGender();
            if (newCell && newPartner) {
                if(matrix[newCell[1]][newCell[0]] == 1){
                    for (var i in hntrArr) {
                        if (hntrArr[i].x == newCell[0] && hntrArr[i].y == newCell[1]) {
                            hntrArr.splice(i, 1);
                            break;
                        }
                    }
                }
                var newHunter = new Hunter(newCell[0], newCell[1], newIndex);
                hntrArr.push(newHunter);
                matrix[newCell[1]][newCell[0]] = newIndex;
                this.energy -= 3;
            }
        }    


            
        
    }

    die() {
        super.die(hntrArr);
    }

}