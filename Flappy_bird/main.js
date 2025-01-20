import { Config } from './config.js';
import { ResourceLoader } from './objects/resourceLoader.js';
import { Bird } from './objects/bird.js';
import { Background } from './objects/background.js';
import { DrawEngine } from './drawEngine.js';
import { Pipe } from './objects/pipe.js';
import { Collision } from './objects/collision.js';
import { Score } from './score.js';
import { Game } from './game.js';

class Main {
   constructor() {
      this.config = new Config();
      this.resourceLoader = new ResourceLoader();

      this.canvas = document.getElementById(this.config.resources.canvas.id);
      this.ctx = this.canvas.getContext('2d');
      this.spriteSheet = null;
      this.drawEngine = null;
      this.background = null;
      this.bird = null;
      this.collision = null;
      this.isGameRunning = false;
      this.startButton = document.getElementById('start-btn');
      this.restartButton = document.getElementById('restart-btn');
      this.btnContainer = document.getElementById('btn-container');
   }

   async init() {
      try {
         console.log('Загрузка спрайтшита...');
         this.spriteSheet = await this.resourceLoader.loadSpriteSheet(
            this.config.resources.spriteSheet.src
         );
         console.log('Спрайтшит успешно загружен!');
         if (
            !this.spriteSheet.complete ||
            this.spriteSheet.naturalWidth === 0
         ) {
            throw new Error('Спрайтшит не загружен или повреждён.');
         }
         this.drawEngine = new DrawEngine(this.spriteSheet, this.ctx);
         this.background = new Background(this.canvas, this.drawEngine);
         this.game = new Game(this.canvas, this.config);
         this.bird = new Bird(this.canvas, this.drawEngine, this.game);
         this.pipe = new Pipe(this.canvas, this.drawEngine);
         this.collision = new Collision(this.bird, this.pipe, this.canvas);
         this.score = new Score(this.canvas, this.drawEngine);
         this.startButton.addEventListener('click', () => this.startGame());
         this.restartButton.addEventListener('click', () => {
            this.restartGame();
         });
      } catch (error) {
         console.error('Ошибка при запуске приложения:', error.message);
      }
   }

   clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
   }

   startGame() {
      this.startButton.style.display = 'none';
      this.restartButton.style.display = 'none';
      this.btnContainer.style.display = 'none';
      this.isGameRunning = true;
      this.clear();
      const gameLoop = () => {
         if (!this.isGameRunning) return;
         this.clear();
         if (this.spriteSheet) {
            this.background.drawUp();
            this.pipe.update();
            this.pipe.draw();
            this.background.drawBottom();
            this.bird.update();
            this.bird.draw();
            if (this.collision.checkCollision()) {
               console.log('Столкновение!');
               this.resetGame();
               this.btnContainer.style.display = 'block';
               this.restartButton.style.display = 'block';
               return;
            }
            if (this.game.checkPass(this.bird, this.pipe)) {
               this.score.increment();
            }
            this.score._updateScoreDisplay();
         }
         requestAnimationFrame(gameLoop);
      };
      gameLoop();
   }

   resetGame() {
      console.log('Сбрасываем игру...');
      this.bird.reset();
      this.pipe.reset();
      this.score.reset();
      this.isGameRunning = false;
   }

   restartGame() {
      console.log('Перезапуск игры...');
      this.resetGame();
      this.startGame();
   }
}

const app = new Main();
app.init();
