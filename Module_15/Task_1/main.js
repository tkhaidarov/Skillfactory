let svg = [
    {
        url: "svg/arrow-down-left-circle.svg",
    },
    {
        url: "svg/arrow-down-left-circle-fill.svg",
    },
]

class IconChanging {
    constructor() {
        this.changeBtn = document.getElementById("btn")
        this.divContent = document.getElementById("divContent")
        this.currentIndex = 0
        this.changeBtn.addEventListener("click", () => this.changeOnClick())
    }

    changeOnClick() {
        this.currentIndex = this.currentIndex === 0 ? 1 : 0
        this.divContent.innerHTML = ""
        let img = document.createElement("img")
        img.src = svg[this.currentIndex].url
        img.alt = `Icon ${this.currentIndex}`
        this.divContent.appendChild(img)
    }
}

new IconChanging()
