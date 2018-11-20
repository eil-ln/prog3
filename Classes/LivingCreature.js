class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
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

    chooseCell(ch, ch1, ch2) {
        var found = [];
        var directions = this.directions;

        for (var i in directions) {
            var x = directions[i][0];
            var y = directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch || matrix[y][x] == ch1 || matrix[y][x] == ch2) {
                    found.push(directions[i]);
                }
            }
        }
        return found;
    }

    // multiply(arr, newCreature) {
    //     var newCell = random(this.chooseCell(0));
    //     if (newCell) {
    //         arr.push(newCreature);
    //         matrix[newCell[1]][newCell[0]] = this.index;
    //         this.energy = 10;
    //     }
    // }

    die(arr) {   
        for (let i in arr) {
            if (this.x == arr[i].x && this.y == arr[i].y) {
                arr.splice(i, 1);
                matrix[this.y][this.x] = 0;
                break;
            }
        }    
    }
}