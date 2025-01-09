import { InitGrid } from "./initGrid.js"
import { InitGridDefault } from "./initGridDefault.js"
import { Snake } from "./snake.js"

let options = {
    size: true,
}

class StartGame {
    constructor(options) {
        this.options = options || {
            size: true,
        }
        this.launchGame()
    }

    launchGame() {
        if (this.options.size) {
            document
                .getElementById("btn-grid")
                .addEventListener("click", () => {
                    const grid = new InitGrid("container__grid", "grid-size")
                    grid.createGrid()
                    this.initSnake()
                    document.getElementById("score-container").style.display =
                        "flex"
                    console.log("ok")
                })
        } else {
            const grid = new InitGridDefault("container__grid", 10)
            grid.createGrid()
            this.initSnake()
            console.log("ok")
        }
    }

    initSnake() {
        setTimeout(() => new Snake("container__grid", "grid-size", 10), 100)
    }
}

const game = new StartGame(options)
game.launchGame()
