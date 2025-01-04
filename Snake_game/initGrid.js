export class InitGrid {
    constructor(gridContainer, inputSize) {
        this.gridContainer = document.getElementById(gridContainer)
        this.inputSize = document.getElementById(inputSize)
        this.scoreContainer = document.getElementById("score-container")
        this.gridInputCont = document.querySelector(".container__input-form")
        this.containerSize = 600
        this.createGrid()
    }

    createGrid() {
        let gridSize = parseInt(this.inputSize.value)
        this.scoreContainer.style.display = "flex"
        this.gridInputCont.style.display = "none"
        let isValid = isNaN(gridSize) || gridSize < 10 || gridSize > 20
        if (isValid) {
            alert("Введите корректное значение (от 10 до 20)")
            return
        }
        this.gridContainer.innerHTML = ""

        let cellSize = Math.floor(this.containerSize / gridSize)
        //Устанавка стилей для сетки
        this.gridContainer.style.gridTemplateColumns = `repeat(${gridSize},${cellSize}px)`
        this.gridContainer.style.gridTemplateRows = `repeat(${gridSize},${cellSize}px)`
        //Создание ячейки
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                let cell = document.createElement("div")
                cell.classList.add("cell")
                cell.classList.add((row + col) % 2 === 0 ? "light" : "dark")
                cell.style.width = `${cellSize}px`
                cell.style.height = `${cellSize}px`
                //Установка координат
                cell.dataset.row = row
                cell.dataset.col = col
                this.gridContainer.appendChild(cell)
            }
        }
    }
}
