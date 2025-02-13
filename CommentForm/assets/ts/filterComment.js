export class FilterComment {
    constructor(commentListSelector) {
        const commentList = document.querySelector(commentListSelector);
        if (!commentList) {
            throw new Error(`Не удается найти элемент по селектору: ${commentListSelector}`);
        }
        this.commentList = commentList;
    }
    sort(criteria) {
        const comments = Array.from(this.commentList.children);
        comments.sort((a, b) => {
            var _a, _b, _c, _d;
            switch (criteria) {
                case 'date': {
                    const tA = new Date(a.dataset.timestamp).getTime();
                    const tB = new Date(b.dataset.timestamp).getTime();
                    return tB - tA;
                }
                case 'ratings': {
                    const rA = parseInt(((_a = a.querySelector('.rating-score')) === null || _a === void 0 ? void 0 : _a.textContent) || '0', 10);
                    const rB = parseInt(((_b = b.querySelector('.rating-score')) === null || _b === void 0 ? void 0 : _b.textContent) || '0', 10);
                    return rB - rA;
                }
                case 'replies': {
                    const repliesA = a.querySelector('.repliesContainer')
                        ? a.querySelector('.repliesContainer').children.length
                        : 0;
                    const repliesB = b.querySelector('.repliesContainer')
                        ? b.querySelector('.repliesContainer').children.length
                        : 0;
                    return repliesB - repliesA;
                }
                case 'relevance': {
                    const ratingA = parseInt(((_c = a.querySelector('.rating-score')) === null || _c === void 0 ? void 0 : _c.textContent) || '0', 10);
                    const ratingB = parseInt(((_d = b.querySelector('.rating-score')) === null || _d === void 0 ? void 0 : _d.textContent) || '0', 10);
                    const repliesA = a.querySelector('.repliesContainer')
                        ? a.querySelector('.repliesContainer').children.length
                        : 0;
                    const repliesB = b.querySelector('.repliesContainer')
                        ? b.querySelector('.repliesContainer').children.length
                        : 0;
                    return ratingB + repliesB - (ratingA + repliesA);
                }
                default:
                    return 0;
            }
        });
        this.commentList.innerHTML = '';
        comments.forEach((comment) => {
            this.commentList.appendChild(comment);
        });
    }
}
