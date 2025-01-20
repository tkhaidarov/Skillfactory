import { Config } from '../config.js';

export class Bird {
   constructor(canvas, drawEngine, game) {
      this._config = new Config();

      this._canvas = canvas;
      this._drawEngine = drawEngine;
      this.animationSpeed = this._config.bird.property.animationSpeed;
      this._frameCounter = 0;
      this._frames = this._config.birdFrames;
      this._currentFrameIndex = 0;
      this._game = game;
      this._startPosition = {
         x:
            this._config.bird.startPosition.x !== null
               ? this._config.bird.startPosition.x
               : this._canvas.width / 4,
         y:
            this._config.bird.startPosition.y !== null
               ? this._config.bird.startPosition.y
               : this._canvas.height / 3,
      };
      this._rotation = 0;
      this._rotationUp = Math.max(this._rotation - 0.3, -Math.PI / 6);
      this._rotationDown = Math.min(this._rotation + 0.3, Math.PI / 2);
      this._onClick();
   }

   _onClick() {
      window.addEventListener('keydown', (e) => {
         if (e.code === 'Space') {
            this.flap();
            console.log('ok');
         }
      });
      window.addEventListener('click', () => {
         this.flap();
      });
   }

   update() {
      this._frameCounter++;
      if (this._frameCounter >= this.animationSpeed) {
         this._currentFrameIndex =
            (this._currentFrameIndex + 1) % this._frames.length;
         this._frameCounter = 0;
      }
      this._game.update();
      this._startPosition.y = this._game.positionY;
      if (this._game.speedY < 0) {
         this._rotation = this._rotationUp;
      } else {
         this._rotation = this._rotationDown;
      }
   }

   draw() {
      const currentFrame = this._frames[this._currentFrameIndex];
      //Центра вращения: центра текущего фрейма
      const rotationCenter = {
         x: this._startPosition.x + currentFrame.w / 2,
         y: this._startPosition.y + currentFrame.h / 2,
         offsetX: currentFrame.w / 2,
         offsetY: currentFrame.h / 2,
      };
      this._drawEngine.drawRotatedElement(
         currentFrame,
         {
            x: this._startPosition.x,
            y: this._startPosition.y,
            w: currentFrame.w,
            h: currentFrame.h,
         },
         this._rotation,
         rotationCenter
      );
   }

   get positionX() {
      return this._startPosition.x;
   }

   get positionY() {
      return this._startPosition.y;
   }

   get width() {
      return this._frames[0].w;
   }

   get height() {
      return this._frames[0].h;
   }

   flap() {
      this._game.flap();
      this._rotation = -Math.PI / 6;
   }

   reset() {
      this._game.reset();
      this._rotation = 0;
   }
}
