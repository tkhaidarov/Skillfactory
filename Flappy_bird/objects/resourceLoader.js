export class ResourceLoader {
    constructor() {
        this.loadedResources = new Map() //хранение загруженнего спрайтшита
    }

    async loadSpriteSheet(src) {
        if (this.loadedResources.has(src)) {
            console.log(`Спрайтшит уже загружен: ${src}`)
            return this.loadedResources.get(src) //возвращаем ранее загруженный спрайтшит
        }
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = () => {
                this.loadedResources.set(src, img) //сохраняем загруженный ресурс
                resolve(img)
            }
            img.onerror = () =>
                reject(new Error(`Ошибка загрузки спрайтшита: ${src}`))
            img.src = src
        })
    }
}
