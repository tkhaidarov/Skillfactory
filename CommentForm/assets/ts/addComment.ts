import { CommentElement } from './commentElement';
import { User } from './getRandomUser';
import { CommentCounter } from './commentCounter';

export class AddComment {
   private commentCounter: CommentCounter;
   private commentElement: CommentElement;

   constructor(commentCounter: CommentCounter, commentElement: CommentElement) {
      this.commentCounter = commentCounter;
      this.commentElement = commentElement;
   }

   async addElem(
      commentInput: HTMLTextAreaElement,
      commentList: HTMLDivElement,
      currentUser: User | null,
      loadRandomUser: () => Promise<void>
   ) {
      if (!commentInput.value.trim()) {
         alert('Комментарий не может быть пустым!');
         return;
      }

      const comment = this.commentElement.createComment(commentInput.value, currentUser);
      commentList.appendChild(comment);
      commentInput.value = '';
      this.commentCounter.increment();
      await loadRandomUser();
   }
}
