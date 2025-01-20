import { Config } from '../config.js';

export class Pipe {
   constructor(canvas, drawEngine) {
      this._config = new Config();

      this._canvas = canvas;
      this._drawEngine = drawEngine;
      this.pipeBottom = this._config.pipeFrames[0];
      this.pipeUp = this._config.pipeFrames[1];
      this._gap = this._config.pipe.gap;
      this._speed = this._config.pipe.speed;
      this._space = this._config.pipe.space;
      this._pipeCount = this._config.pipe.count;
      this._minTopHeight = this._config.pipe.minTopHeight;
      this._pipes = [];
      this._initPipes();
   }

   _initPipes() {
      for (let i = 0; i < this._pipeCount; i++) {
         this._pipes.push({
            x: i * this._space + this._canvas.width,
            y: this._getRandomY(),
            passed: false,
         });
      }
   }

   _getRandomY() {
      const maxTopHeight =
         this._canvas.height * 0.75 - this._gap - this._minTopHeight;
      return (
         Math.random() * (maxTopHeight - this._minTopHeight) +
         this._minTopHeight
      );
   }

   update() {
      for (let i = 0; i < this._pipes.length; i++) {
         const pipe = this._pipes[i];
         pipe.x -= this._speed;

         if (pipe.x + this.pipeBottom.w < 0) {
            // Определяем индекс последней трубы
            const lastPipeIndex =
               (i - 1 + this._pipes.length) % this._pipes.length;
            const lastPipe = this._pipes[lastPipeIndex];

            // Устанавливаем новую позицию
            pipe.x = lastPipe.x + this._space;
            pipe.y = this._getRandomY();
            pipe.passed = false;
         }
      }
   }

   draw() {
      for (let pipe of this._pipes) {
         //Рисуем вверхнюю трубу
         this._drawEngine.drawElement(this.pipeBottom, {
            x: pipe.x,
            y: pipe.y - this.pipeBottom.h,
            w: this.pipeBottom.w,
            h: this.pipeBottom.h,
         });
         //Рисуем нижнюю трубу
         this._drawEngine.drawElement(this.pipeUp, {
            x: pipe.x,
            y: pipe.y + this._gap,
            w: this.pipeUp.w,
            h: this.pipeUp.h,
         });
      }
   }

   reset() {
      this._pipes = [];
      this._initPipes();
   }
}
