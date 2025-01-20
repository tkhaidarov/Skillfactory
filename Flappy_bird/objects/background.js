import { Config } from '../config.js';

export class Background {
   constructor(canvas, drawEngine) {
      this._config = new Config();

      this._canvas = canvas;
      this._drawEngine = drawEngine;
      this._speed = this._config.backgroundParams.speed;
      this._index = 0;
      this._bgndUp = this._config.background[0];
      this._bgndDown = this._config.background[1];
   }

   drawPart(sprite, yOffset, heightCoefficient) {
      this._index += this._config.backgroundParams.index;
      this.backgroundX = -((this._index * this._speed) % this._canvas.width);

      const results = [
         {
            x: this.backgroundX + this._canvas.width,
            y: yOffset,
            w: this._canvas.width,
            h: this._canvas.height * heightCoefficient,
         },
         {
            x: this.backgroundX,
            y: yOffset,
            w: this._canvas.width,
            h: this._canvas.height * heightCoefficient,
         },
      ];

      results.forEach((result) => {
         this._drawEngine.drawElement(sprite, result);
      });
   }

   drawUp() {
      this.drawPart(this._bgndUp, 0, 0.9);
   }

   drawBottom() {
      this.drawPart(this._bgndDown, this._canvas.height * 0.9, 0.1);
   }
}
