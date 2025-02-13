import { User } from './getRandomUser';
import { ShowReplyInput } from './showReplyInput';
import { CommentActions } from './commentActions';

export interface CommentData {
   id: string;
   text: string;
   user: User | null;
   parentId?: string;
   parentUserName?: string;
   timestamp: string;
}

export class CommentElement {
   private showReplyInput: ShowReplyInput;

   constructor(showReplyInput: ShowReplyInput) {
      this.showReplyInput = showReplyInput;
   }

   createComment(
      text: string,
      user: User | null,
      parentUserName?: string,
      save: boolean = true,
      id?: string,
      parentId?: string,
      currentUserId?: string
   ): HTMLDivElement {
      const comment = document.createElement('div');
      const commentId = id || `${user?.name.first}-${Date.now()}`;
      const now = new Date();
      const date = now.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }); // Формат: ДД.ММ
      const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }); // Формат: ЧЧ:ММ
      const displayTime = `${date} ${time}`;
      const timestamp = now.toISOString();
      comment.dataset.timestamp = timestamp;
      comment.dataset.rating = '0';
      comment.classList.add('main__comment');
      comment.dataset.commentId = commentId;
      if (parentId) {
         comment.dataset.parentId = parentId;
      }
      comment.innerHTML = ` 
         <div class="all-comments">
            <img src="${user?.picture.medium}" class="comment-avatar main__user-avatar" alt="user-avatar"/>
          
                <div class="name-container">
                  <span class="user-name parent-name">${user?.name.first} ${user?.name.last}</span>
                  ${parentUserName ? `<div class="reply-wrap"><img src="./assets/img/svg/reply.svg" alt="reply svg"><span class="parent-user-name">${parentUserName}</span></div>` : ''}
                  <span class="comment-time">${displayTime}</span>
                </div>
               <p class="comment-text">${text}</p> 
               <div class="main__btn-group">
                  <button class="reply-button">
                  <img src="./assets/img/svg/reply.svg" alt="reply svg">
                  <span>Ответить</span>
                  </button>
                   <div class="favorite-container">
                      <button class="favorite-btn">
                          <img src="./assets/img/svg/favorite.svg" alt="" class="favorite-icon">
                     </button>
                     <span class="favorite-text">В избранное</span>
                  </div>
                  <div class="rating-container">
                  <button class="dislike-btn">&#8722</button>
                  <span class="rating-score">0</span>
                  <button class="like-btn">+</button>
               </div>
               </div>
            
         </div>
         `;
      new CommentActions(comment, currentUserId!);
      const replyButton = comment.querySelector('.reply-button') as HTMLButtonElement;
      if (parentId) {
         replyButton.remove();
      } else {
         replyButton.addEventListener('click', () => this.showReplyInput.showElement(comment));
      }
      if (save) {
         this.saveCommentData({ id: commentId, text, user, parentId, parentUserName, timestamp });
      }
      return comment;
   }

   private saveCommentData(data: CommentData): void {
      const comments: CommentData[] = JSON.parse(localStorage.getItem('comments') || '[]');
      comments.push(data);
      localStorage.setItem('comments', JSON.stringify(comments));
   }

   static loadComments(showRelyInput: ShowReplyInput, currentUserId: string): HTMLDivElement[] {
      const commentsData: CommentData[] = JSON.parse(localStorage.getItem('comments') || '[]');
      const elementsMap = new Map<string, HTMLDivElement>();
      commentsData.forEach((data) => {
         const element = new CommentElement(showRelyInput).createComment(
            data.text,
            data.user,
            data.parentUserName,
            false,
            data.id,
            data.parentId,
            currentUserId
         );
         elementsMap.set(data.id, element);
      });
      const topLevelElem: HTMLDivElement[] = [];
      elementsMap.forEach((element) => {
         const parentId = element.dataset.parentId;
         if (parentId && elementsMap.has(parentId)) {
            const parentElem = elementsMap.get(parentId)!;
            let repliesContainer = parentElem.querySelector('.repliesContainer') as HTMLDivElement;
            if (!repliesContainer) {
               repliesContainer = document.createElement('div');
               repliesContainer.classList.add('repliesContainer');
               parentElem.appendChild(repliesContainer);
            }
            repliesContainer.appendChild(element);
         } else {
            topLevelElem.push(element);
         }
      });
      return topLevelElem;
   }
}
