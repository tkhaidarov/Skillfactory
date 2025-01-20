export class Config {
   background = [
      {
         x: 0,
         y: 0,
         w: 274,
         h: 228,
      },
      {
         x: 276,
         y: 0,
         w: 220,
         h: 112,
      },
   ];
   backgroundParams = {
      speed: 3,
      index: 0.2,
   };

   bird = {
      property: {
         animationSpeed: 7,
         gravity: 0.085,
         gravityIncrement: 0.002,
         flapSpeed: 3.6,
      },
      startPosition: {
         x: null,
         y: null,
      },
   };

   birdFrames = [
      {
         x: 276,
         y: 112,
         w: 34,
         h: 26,
      },
      {
         x: 276,
         y: 139,
         w: 34,
         h: 26,
      },
      {
         x: 276,
         y: 164,
         w: 34,
         h: 26,
      },
      {
         x: 276,
         y: 139,
         w: 34,
         h: 26,
      },
   ];

   pipeFrames = [
      {
         x: 553,
         y: 0,
         w: 53,
         h: 395,
      },
      {
         x: 502,
         y: 0,
         w: 53,
         h: 395,
      },
   ];
   pipe = {
      minTopHeight: 50,
      gap: 150,
      speed: 1.4,
      space: 180,
      count: 3,
   };
   resources = {
      canvas: {
         id: 'canvas',
      },

      spriteSheet: {
         src: 'img/sprite.png',
      },
   };
}
