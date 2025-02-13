export class FilterComment {
   private commentList: HTMLDivElement;

   constructor(commentListSelector: string) {
      const commentList = document.querySelector(commentListSelector) as HTMLDivElement;
      if (!commentList) {
         throw new Error(`Не удается найти элемент по селектору: ${commentListSelector}`);
      }
      this.commentList = commentList;
   }

   public sort(criteria: string): void {
      const comments = Array.from(this.commentList.children) as HTMLElement[];
      comments.sort((a, b) => {
         switch (criteria) {
            case 'date': {
               const tA = new Date(a.dataset.timestamp!).getTime();
               const tB = new Date(b.dataset.timestamp!).getTime();
               return tB - tA;
            }
            case 'ratings': {
               const rA = parseInt(a.querySelector('.rating-score')?.textContent || '0', 10);
               const rB = parseInt(b.querySelector('.rating-score')?.textContent || '0', 10);
               return rB - rA;
            }
            case 'replies': {
               const repliesA = a.querySelector('.repliesContainer')
                  ? a.querySelector('.repliesContainer')!.children.length
                  : 0;
               const repliesB = b.querySelector('.repliesContainer')
                  ? b.querySelector('.repliesContainer')!.children.length
                  : 0;
               return repliesB - repliesA;
            }
            case 'relevance': {
               const ratingA = parseInt(a.querySelector('.rating-score')?.textContent || '0', 10);
               const ratingB = parseInt(b.querySelector('.rating-score')?.textContent || '0', 10);
               const repliesA = a.querySelector('.repliesContainer')
                  ? a.querySelector('.repliesContainer')!.children.length
                  : 0;
               const repliesB = b.querySelector('.repliesContainer')
                  ? b.querySelector('.repliesContainer')!.children.length
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
