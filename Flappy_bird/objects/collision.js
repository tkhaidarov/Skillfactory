export class Collision {
   constructor(bird, pipe, canvas) {
      this.bird = bird;
      this.pipe = pipe;
      this.canvas = canvas;
      this.groundLevel = canvas.height * 0.9;
   }

   _isColliding(rect1, rect2) {
      return (
         rect1.x < rect2.x + rect2.w &&
         rect1.x + rect1.w > rect2.x &&
         rect1.y < rect2.y + rect2.h &&
         rect1.y + rect1.h > rect2.y
      );
   }

   checkCollision() {
      const birdBox = {
         x: this.bird.positionX,
         y: this.bird.positionY,
         w: this.bird.width,
         h: this.bird.height,
      };
      for (let pipe of this.pipe._pipes) {
         const topPipeBox = {
            x: pipe.x,
            y: pipe.y - this.pipe.pipeBottom.h,
            w: this.pipe.pipeBottom.w,
            h: this.pipe.pipeBottom.h,
         };
         const bottomPipeBox = {
            x: pipe.x,
            y: pipe.y + this.pipe._gap,
            w: this.pipe.pipeUp.w,
            h: this.pipe.pipeUp.h,
         };
         if (
            this._isColliding(birdBox, topPipeBox) ||
            this._isColliding(birdBox, bottomPipeBox)
         ) {
            return true;
         }
      }
      if (birdBox.y + birdBox.h >= this.groundLevel) {
         return true;
      }
      return false;
   }
}
