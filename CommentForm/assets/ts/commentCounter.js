export class CommentCounter {
    constructor() {
        this.counterElement = document.getElementById('comment-counter');
        this.count = 0;
        this.loadCount();
    }
    loadCount() {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        this.count = comments.length;
        this.updateCounter();
    }
    increment() {
        this.count++;
        this.updateCounter();
    }
    updateCounter() {
        this.counterElement.textContent = `${this.count}`;
    }
}
