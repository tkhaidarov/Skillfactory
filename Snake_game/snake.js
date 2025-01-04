export class Snake {
    constructor(gridContainer, inputSize, gridSize) {
        this.gridContainer = document.getElementById(gridContainer)
        this.inputSize = document.getElementById(inputSize)
        this.inputGridSize = parseInt(this.inputSize.value) || gridSize
        this.snake = [
            { row: 5, col: 5 },
            { row: 5, col: 4 },
        ]
        this.direction = { row: 0, col: 1 }
        this.food = null
        this.interval = null
        this.score = 0
        this.bestScore = localStorage.getItem("bestScore") || 0
        this.updateScoreDisplay()
        document.addEventListener("keydown", (e) => this.changeDirection(e))
        this.spawnFood()
        this.start()
        document
            .getElementById("restart")
            .addEventListener("click", () => this.restartGame())
    }

    start() {
        this.interval = setInterval(() => this.move(), 500)
    }

    stop() {
        clearInterval(this.interval)
    }

    updateScoreDisplay() {
        let scoreElement = document.getElementById("current-score")
        let bestScoreElement = document.getElementById("best-score")
        if (scoreElement) scoreElement.textContent = `${this.score}`
        if (bestScoreElement) bestScoreElement.textContent = `${this.bestScore}`
    }

    move() {
        let head = this.snake[0]
        let newHead = {
            row:
                (head.row + this.direction.row + this.inputGridSize) %
                this.inputGridSize,
            col:
                (head.col + this.direction.col + this.inputGridSize) %
                this.inputGridSize,
        }
        if (
            this.snake.some(
                (segment) =>
                    segment.row === newHead.row && segment.col === newHead.col
            )
        ) {
            this.score = 0
            alert("Game Over!")
            this.stop()
            this.updateScoreDisplay()
            const restartBtn = document.getElementById("restart")
            restartBtn.style.display = "block"
            return
        }
        this.snake.unshift(newHead)
        if (
            this.food &&
            newHead.row === this.food.row &&
            newHead.col === this.food.col
        ) {
            this.score++
            if (this.score > this.bestScore) {
                this.bestScore = this.score
                localStorage.setItem("bestScore", this.bestScore)
            }
            this.spawnFood()
        } else {
            this.snake.pop()
        }
        this.updateScoreDisplay()
        this.render()
    }

    restartGame() {
        let restartBtn = document.getElementById("restart")
        restartBtn.style.display = "none"
        this.snake = [
            { row: 5, col: 5 },
            { row: 5, col: 4 },
        ]
        this.direction = { row: 0, col: 1 }
        this.food = null
        this.score = 0
        this.updateScoreDisplay()
        this.spawnFood()
        this.start()
    }

    changeDirection(e) {
        const directions = {
            ArrowUp: { row: -1, col: 0 },
            ArrowDown: { row: 1, col: 0 },
            ArrowLeft: { row: 0, col: -1 },
            ArrowRight: { row: 0, col: 1 },
        }
        if (directions[e.key]) {
            let newDirection = directions[e.key]
            if (
                newDirection.row !== -this.direction.row &&
                newDirection.col !== -this.direction.col
            ) {
                this.direction = newDirection
            }
        }
    }

    spawnFood() {
        const allCells = Array.from(document.querySelectorAll(".cell"))
        const emptyCells = allCells.filter((cell) => {
            let row = parseInt(cell.dataset.row)
            let col = parseInt(cell.dataset.col)
            return !this.snake.some(
                (segment) => segment.row === row && segment.col === col
            )
        })
        const randomCell =
            emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (randomCell) {
            this.food = {
                row: parseInt(randomCell.dataset.row),
                col: parseInt(randomCell.dataset.col),
            }
        }
        this.render()
    }

    render() {
        Array.from(this.gridContainer.querySelectorAll(".cell")).forEach(
            (cell) => {
                cell.classList.remove("snake", "food", "snake-head")
            }
        )
        this.snake.forEach((segment, index) => {
            let cell = this.gridContainer.querySelector(
                `.cell[data-row="${segment.row}"][data-col="${segment.col}"]`
            )
            if (cell) {
                if (index === 0) {
                    cell.classList.add("snake-head")
                } else {
                    cell.classList.add("snake")
                }
            }
        })
        if (this.food) {
            let foodCell = this.gridContainer.querySelector(
                `.cell[data-row="${this.food.row}"][data-col="${this.food.col}"]`
            )
            if (foodCell) foodCell.classList.add("food")
        }
    }
}
