export class CommentActions {
   private commentId: string;
   private ratingScore: HTMLSpanElement;
   private dislikeButton: HTMLButtonElement;
   private likeButton: HTMLButtonElement;
   private favoriteButton: HTMLButtonElement;
   private favoriteText: HTMLSpanElement;
   private favoriteIcon: HTMLImageElement;
   private rating: number = 0;
   private currentUserId: string;

   constructor(comment: HTMLDivElement, currentUserId: string) {
      this.currentUserId = currentUserId;
      this.commentId = comment.dataset.commentId || `${Date.now()}`;
      this.ratingScore = comment.querySelector('.rating-score') as HTMLSpanElement;
      this.dislikeButton = comment.querySelector('.dislike-btn') as HTMLButtonElement;
      this.likeButton = comment.querySelector('.like-btn') as HTMLButtonElement;
      this.favoriteButton = comment.querySelector('.favorite-btn') as HTMLButtonElement;
      this.favoriteText = comment.querySelector('.favorite-text') as HTMLSpanElement;
      this.favoriteIcon = comment.querySelector('.favorite-icon') as HTMLImageElement;
      this.init();
   }

   private init() {
      this.loadRating();
      this.setupRating();
      this.setupFavorite();
   }

   private loadRating() {
      const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}');
      const commentRatings: { [userId: string]: number } = savedRatings[this.commentId] || {};
      this.rating = Object.values(commentRatings).reduce((sum, vote) => sum + vote, 0);
      this.ratingScore.textContent = this.rating.toString();
      if (commentRatings[this.currentUserId] !== undefined) {
         this.likeButton.disabled = true;
         this.dislikeButton.disabled = true;
         if (commentRatings[this.currentUserId] === 1) {
            this.likeButton.classList.add('liked');
         } else if (commentRatings[this.currentUserId] === -1) {
            this.dislikeButton.classList.add('disliked');
         }
      }
   }

   private saveRating(newRatings: { [userId: string]: number }) {
      const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}');
      savedRatings[this.commentId] = newRatings;
      localStorage.setItem('ratings', JSON.stringify(savedRatings));
   }

   private setupRating() {
      this.likeButton.addEventListener('click', () => {
         const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}');
         const commentRatings: { [userId: string]: number } = savedRatings[this.commentId] || {};
         if (commentRatings[this.currentUserId] !== undefined) return;
         commentRatings[this.currentUserId] = 1;
         this.rating = Object.values(commentRatings).reduce((sum, vote) => sum + vote, 0);
         this.ratingScore.textContent = this.rating.toString();
         this.likeButton.disabled = true;
         this.dislikeButton.disabled = true;
         this.likeButton.classList.add('liked');
         this.saveRating(commentRatings);
      });
      this.dislikeButton.addEventListener('click', () => {
         const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}');
         const commentRatings: { [userId: string]: number } = savedRatings[this.commentId] || {};
         if (commentRatings[this.currentUserId] !== undefined) return;
         commentRatings[this.currentUserId] = -1;
         this.rating = Object.values(commentRatings).reduce((sum, vote) => sum + vote, 0);
         this.ratingScore.textContent = this.rating.toString();
         this.likeButton.disabled = true;
         this.dislikeButton.disabled = true;
         this.dislikeButton.classList.add('disliked');
         this.saveRating(commentRatings);
      });
   }

   private updateRating() {
      this.ratingScore.textContent = this.rating.toString();
   }

   private setupFavorite() {
      if (this.isFavorite()) {
         this.favoriteText.textContent = 'В избранном';
         this.favoriteIcon.src = './assets/img/svg/favorite-filled.svg';
      } else {
         this.favoriteText.textContent = 'В избранное';
         this.favoriteIcon.src = './assets/img/svg/favorite.svg';
      }
      this.favoriteButton.addEventListener('click', () => {
         if (this.isFavorite()) {
            this.removeFromFavorites();
            this.favoriteText.textContent = 'В избранное';
            this.favoriteIcon.src = './assets/img/svg/favorite.svg';
         } else {
            this.addToFavorites();
            this.favoriteText.textContent = 'В избранном';
            this.favoriteIcon.src = './assets/img/svg/favorite-filled.svg';
         }
      });
   }

   private addToFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (!favorites.includes(this.commentId)) {
         favorites.push(this.commentId);
         localStorage.setItem('favorites', JSON.stringify(favorites));
      }
   }

   private isFavorite(): boolean {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      return favorites.includes(this.commentId);
   }

   private removeFromFavorites() {
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      favorites = favorites.filter((id: string) => id !== this.commentId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
   }
}
