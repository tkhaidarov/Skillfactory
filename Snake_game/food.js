export class Food {
    constructor(gridContainer, gridSize) {
        this.gridContainer = gridContainer
        this.gridSize = gridSize
        this.position = null
    }

    generation(snake) {
        const allCells = Array.from(
            this.gridContainer.querySelectorAll(".cell")
        )
        const emptyCells = allCells.filter((cell) => {
            let row = parseInt(cell.dataset.row)
            let col = parseInt(cell.dataset.col)
            return !snake.some(
                (segment) => segment.row === row && segment.col === col
            )
        })
        let randomCell =
            emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (randomCell) {
            this.position = {
                row: parseInt(randomCell.dataset.row),
                col: parseInt(randomCell.dataset.col),
            }
        }
        this.render()
    }

    render() {
        if (this.position) {
            const currentFoodCell = this.gridContainer.querySelector(".food")
            if (currentFoodCell) {
                currentFoodCell.classList.remove("food")
            }
            if (this.position) {
                let foodCell = this.gridContainer.querySelector(
                    `.cell[data-row="${this.position.row}"][data-col="${this.position.col}"]`
                )
                if (foodCell) foodCell.classList.add("food")
            }
        }
    }
}
