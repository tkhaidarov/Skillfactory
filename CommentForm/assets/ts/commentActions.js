export class CommentActions {
    constructor(comment, currentUserId) {
        this.rating = 0;
        this.currentUserId = currentUserId;
        this.commentId = comment.dataset.commentId || `${Date.now()}`;
        this.ratingScore = comment.querySelector('.rating-score');
        this.dislikeButton = comment.querySelector('.dislike-btn');
        this.likeButton = comment.querySelector('.like-btn');
        this.favoriteButton = comment.querySelector('.favorite-btn');
        this.favoriteText = comment.querySelector('.favorite-text');
        this.favoriteIcon = comment.querySelector('.favorite-icon');
        this.init();
    }
    init() {
        this.loadRating();
        this.setupRating();
        this.setupFavorite();
    }
    loadRating() {
        const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}');
        const commentRatings = savedRatings[this.commentId] || {};
        this.rating = Object.values(commentRatings).reduce((sum, vote) => sum + vote, 0);
        this.ratingScore.textContent = this.rating.toString();
        if (commentRatings[this.currentUserId] !== undefined) {
            this.likeButton.disabled = true;
            this.dislikeButton.disabled = true;
            if (commentRatings[this.currentUserId] === 1) {
                this.likeButton.classList.add('liked');
            }
            else if (commentRatings[this.currentUserId] === -1) {
                this.dislikeButton.classList.add('disliked');
            }
        }
    }
    saveRating(newRatings) {
        const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}');
        savedRatings[this.commentId] = newRatings;
        localStorage.setItem('ratings', JSON.stringify(savedRatings));
    }
    setupRating() {
        this.likeButton.addEventListener('click', () => {
            const savedRatings = JSON.parse(localStorage.getItem('ratings') || '{}');
            const commentRatings = savedRatings[this.commentId] || {};
            if (commentRatings[this.currentUserId] !== undefined)
                return;
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
            const commentRatings = savedRatings[this.commentId] || {};
            if (commentRatings[this.currentUserId] !== undefined)
                return;
            commentRatings[this.currentUserId] = -1;
            this.rating = Object.values(commentRatings).reduce((sum, vote) => sum + vote, 0);
            this.ratingScore.textContent = this.rating.toString();
            this.likeButton.disabled = true;
            this.dislikeButton.disabled = true;
            this.dislikeButton.classList.add('disliked');
            this.saveRating(commentRatings);
        });
    }
    updateRating() {
        this.ratingScore.textContent = this.rating.toString();
    }
    setupFavorite() {
        if (this.isFavorite()) {
            this.favoriteText.textContent = 'В избранном';
            this.favoriteIcon.src = './assets/img/svg/favorite-filled.svg';
        }
        else {
            this.favoriteText.textContent = 'В избранное';
            this.favoriteIcon.src = './assets/img/svg/favorite.svg';
        }
        this.favoriteButton.addEventListener('click', () => {
            if (this.isFavorite()) {
                this.removeFromFavorites();
                this.favoriteText.textContent = 'В избранное';
                this.favoriteIcon.src = './assets/img/svg/favorite.svg';
            }
            else {
                this.addToFavorites();
                this.favoriteText.textContent = 'В избранном';
                this.favoriteIcon.src = './assets/img/svg/favorite-filled.svg';
            }
        });
    }
    addToFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.includes(this.commentId)) {
            favorites.push(this.commentId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }
    isFavorite() {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return favorites.includes(this.commentId);
    }
    removeFromFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites = favorites.filter((id) => id !== this.commentId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
