export class InitGridDefault {
    constructor(gridContainer, gridSize) {
        this.gridContainer = document.getElementById(gridContainer)
        this.gridSize = gridSize
        this.containerSize = 600
        this.scoreContainer = document.getElementById("score-container")
        this.gridInputCont = document.querySelector(".container__input-form")
        this.createGrid()
    }

    createGrid() {
        this.gridContainer.innerHTML = ""
        this.scoreContainer.style.display = "flex"
        this.gridInputCont.style.display = "none"
        let cellSize = this.containerSize / this.gridSize
        this.gridContainer.style.gridTemplateColumns = `repeat(${this.gridSize},${cellSize}px)`
        this.gridContainer.style.gridTemplateRows = `repeat(${this.gridSize},${cellSize}px)`
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                let cell = document.createElement("div")
                cell.classList.add("cell")
                if ((row + col) % 2 === 0) {
                    cell.classList.add("light")
                } else {
                    cell.classList.add("dark")
                }
                cell.style.width = `${cellSize}px`
                cell.style.height = `${cellSize}px`
                cell.dataset.row = row
                cell.dataset.col = col
                this.gridContainer.appendChild(cell)
            }
        }
    }
}
