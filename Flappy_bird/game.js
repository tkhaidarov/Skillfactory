export class Game {
   constructor(canvas, config) {
      this._canvas = canvas;
      this._baseGravity = config.bird.property.gravity;
      this._gravityIncrement = config.bird.property.gravityIncrement;
      this._flapSpeed = config.bird.property.flapSpeed;
      this._gravity = this._baseGravity;
      this._speedY = 0;

      this._positionY = config.bird.startPosition.y || this._canvas.height / 3;
      this._maxHeight = 0;
   }

   update() {
      this._gravity += this._gravityIncrement;
      this._speedY += this._gravity;
      this._positionY += this._speedY;

      if (this._positionY < this._maxHeight) {
         this._positionY = this._maxHeight;
         this._speedY = 0;
      }
   }

   checkPass(bird, pipes) {
      return pipes._pipes.some((pipe) => {
         if (bird.positionX > pipe.x + pipes.pipeBottom.w && !pipe.passed) {
            pipe.passed = true;
            console.log('Птица прошла трубу!');
            return true;
         }
         return false;
      });
   }

   flap() {
      this._speedY = -this._flapSpeed;
      this._gravity = this._baseGravity;
   }

   get positionY() {
      return this._positionY;
   }

   get speedY() {
      return this._speedY;
   }

   reset() {
      this._speedY = 0;
      this._gravity = this._baseGravity;
      this._positionY = this._canvas.height / 3;
   }
}
