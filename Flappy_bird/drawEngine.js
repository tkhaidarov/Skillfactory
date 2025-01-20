export class DrawEngine {
   constructor(spriteSheet, ctx) {
      this._ctx = ctx;
      this._spriteSheet = spriteSheet;
   }

   drawElement(sprite, destination) {
      this._ctx.drawImage(
         this._spriteSheet,
         sprite.x,
         sprite.y,
         sprite.w,
         sprite.h,
         destination.x,
         destination.y,
         destination.w,
         destination.h
      );
   }

   drawRotatedElement(sprite, destination, rotation, rotationCenter) {
      this._ctx.save();
      this._ctx.translate(rotationCenter.x, rotationCenter.y);
      this._ctx.rotate(rotation);
      this._ctx.drawImage(
         this._spriteSheet,
         sprite.x,
         sprite.y,
         sprite.w,
         sprite.h,
         -rotationCenter.offsetX,
         -rotationCenter.offsetY,
         destination.w,
         destination.h
      );
      this._ctx.restore();
   }
}
