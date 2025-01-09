import { Food } from "./Food.js"

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
        this.food = new Food(this.gridContainer, this.inputGridSize)
        this.food.generation(this.snake)
        this.interval = null
        this.score = 0
        this.bestScore = localStorage.getItem("bestScore") || 0
        this.updateScoreDisplay()
        document.addEventListener("keydown", (e) => this.changeDirection(e))
        this.food.generation(this.snake)
        this.start()
        document
            .getElementById("restart")
            .addEventListener("click", () => this.restartGame())
    }

    start() {
        this.interval = setInterval(() => this.move(), 500)
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
            this.food.position &&
            newHead.row === this.food.position.row &&
            newHead.col === this.food.position.col
        ) {
            this.score++
            if (this.score > this.bestScore) {
                this.bestScore = this.score
                localStorage.setItem("bestScore", this.bestScore)
            }
            this.food.generation(this.snake)
        } else {
            this.snake.pop()
        }
        this.updateScoreDisplay()
        this.render()
    }

    render() {
        Array.from(
            this.gridContainer.querySelectorAll(".cell.snake, .cell.snake-head")
        ).forEach((cell) => {
            cell.classList.remove("snake", "snake-head")
        })
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
        this.food.render()
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

    stop() {
        clearInterval(this.interval)
    }

    restartGame() {
        let restartBtn = document.getElementById("restart")
        restartBtn.style.display = "none"
        this.snake = [
            { row: 5, col: 5 },
            { row: 5, col: 4 },
        ]
        this.direction = { row: 0, col: 1 }
        this.score = 0
        this.updateScoreDisplay()
        this.food.generation(this.snake)
        this.start()
    }

    updateScoreDisplay() {
        let scoreElement = document.getElementById("current-score")
        let bestScoreElement = document.getElementById("best-score")
        if (scoreElement) scoreElement.textContent = `${this.score}`
        if (bestScoreElement) bestScoreElement.textContent = `${this.bestScore}`
    }
}
