import { User } from './getRandomUser.js';
import { CommentElement } from './commentElement.js';
import { CommentCounter } from './commentCounter';

export class AddReply {
   private commentElement: CommentElement;
   commentCounter: CommentCounter;

   constructor(commentCounter: CommentCounter, commentElement: CommentElement) {
      this.commentCounter = commentCounter;
      this.commentElement = commentElement;
      console.log('AddReply создан, commentCounter:', this.commentCounter);
   }

   async replyComment(parentComment: HTMLDivElement, replyText: string, parentUserName: string, currentUser: User) {
      if (!replyText.trim()) {
         alert('Ответ не может быть пустым!');
         return;
      }

      const parentId = parentComment.dataset.commentId;
      const reply = this.commentElement.createComment(
         replyText,
         currentUser,
         parentUserName,
         true,
         undefined,
         parentId
      );
      let repliesContainer = parentComment.querySelector('.repliesContainer') as HTMLDivElement;
      if (!repliesContainer) {
         repliesContainer = document.createElement('div');
         repliesContainer.classList.add('repliesContainer');
         parentComment.appendChild(repliesContainer);
      }
      repliesContainer.appendChild(reply);
      console.log('Перед увеличением счетчика:', this.commentCounter);
      this.commentCounter.increment();
   }
}
