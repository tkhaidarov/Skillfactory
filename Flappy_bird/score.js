export class Score {
   constructor() {
      this._currentScore = 0;
      this._bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
      this._currentScoreElem = document.getElementById('current-score');
      this._bestScoreElem = document.getElementById('best-score');
   }

   increment() {
      this._currentScore++;
      if (this._currentScore > this._bestScore) {
         this._bestScore = this._currentScore;
         localStorage.setItem('bestScore', this._bestScore);
      }
   }

   reset() {
      this._currentScore = 0;
      this._updateScoreDisplay();
   }

   _updateScoreDisplay() {
      if (this._currentScoreElem) {
         this._currentScoreElem.textContent = this._currentScore;
      }
      if (this._bestScoreElem) {
         this._bestScoreElem.textContent = this._bestScore;
      }
   }
}
