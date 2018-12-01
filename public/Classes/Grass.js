class Grass extends LivingCreature {

    multiply() {
        this.mul++;
        var newCell = random(this.chooseCell(0));

        if (newCell && this.mul >= Math.round(random(5, 10))) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.mul = 0;
        }
    }
}