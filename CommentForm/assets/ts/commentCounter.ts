export class CommentCounter {
   private counterElement: HTMLSpanElement;
   private count: number;

   constructor() {
      this.counterElement = document.getElementById('comment-counter') as HTMLSpanElement;
      this.count = 0;
      this.loadCount();
   }

   loadCount() {
      const comments = JSON.parse(localStorage.getItem('comments') || '[]');
      this.count = comments.length;
      this.updateCounter();
   }

   public increment() {
      this.count++;
      this.updateCounter();
   }

   private updateCounter() {
      this.counterElement.textContent = `${this.count}`;
   }
}
