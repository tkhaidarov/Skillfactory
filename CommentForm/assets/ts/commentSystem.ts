import { RandomUserService, User } from './getRandomUser';
import { CommentCounter } from './commentCounter';
import { AddComment } from './addComment';
import { AddReply } from './addReply';
import { ShowReplyInput } from './showReplyInput';
import { CommentElement } from './commentElement';
import { CharacterCounter } from './characterCounter';
import { FilterComment } from './filterComment';

export class CommentSystem {
   private userService: RandomUserService;
   private addComment: AddComment;
   private addReply: AddReply;
   characterCounter: CharacterCounter;
   commentCounter: CommentCounter;
   private showReplyInput: ShowReplyInput;
   private commentElement: CommentElement;
   private userAvatar: HTMLImageElement;
   private userName: HTMLSpanElement;
   private commentInput: HTMLTextAreaElement;
   private submitButton: HTMLButtonElement;
   private commentList: HTMLDivElement;
   private filterComment: FilterComment;
   private currentUser: User | null = null;

   constructor() {
      this.userService = new RandomUserService();
      this.commentCounter = new CommentCounter();
      this.showReplyInput = new ShowReplyInput();
      this.commentElement = new CommentElement(this.showReplyInput);
      this.addReply = new AddReply(this.commentCounter, this.commentElement);
      this.addComment = new AddComment(this.commentCounter, this.commentElement);
      this.showReplyInput.setAddReply(this.addReply);
      this.filterComment = new FilterComment('#comment-list');
      this.characterCounter = new CharacterCounter(
         'comment-input',
         'count-symbol',
         'warning-message',
         'submit-button',
         1000
      );

      this.userAvatar = document.getElementById('user-avatar') as HTMLImageElement;
      this.userName = document.getElementById('user-name') as HTMLSpanElement;
      this.commentInput = document.getElementById('comment-input') as HTMLTextAreaElement;
      this.submitButton = document.getElementById('submit-button') as HTMLButtonElement;
      this.commentList = document.getElementById('comment-list') as HTMLDivElement;
      this.init();
   }

   private async init() {
      //localStorage.clear();
      await this.loadRandomUser();
      this.commentList.innerHTML = '';
      if (!this.currentUser) {
         console.log('Текущий пользователь не загружен');
         return;
      }
      const savedComments = CommentElement.loadComments(this.showReplyInput, this.currentUser.login.uuid);
      savedComments.forEach((comment) => {
         this.commentList.appendChild(comment);
      });
      this.commentCounter.loadCount();
      this.submitButton.addEventListener('click', () => {
         this.addComment.addElem(this.commentInput, this.commentList, this.currentUser, () => this.loadRandomUser());
         this.characterCounter.resetCounter();
      });
      const dropdownEl = document.getElementById('main__comments-dropdown');
      if (dropdownEl) {
         dropdownEl.addEventListener('sortOptionSelected', (event: Event) => {
            const customEvent = event as CustomEvent;
            const criteria = customEvent.detail.criteria;
            this.filterComment.sort(criteria);
         });
      }
   }

   private async loadRandomUser() {
      try {
         this.currentUser = await this.userService.getUser();
         this.userAvatar.src = this.currentUser.picture.medium;
         this.userName.textContent = `${this.currentUser.name.first} ${this.currentUser.name.last}`;
         this.showReplyInput.setCurrentUser(this.currentUser);
      } catch (error) {
         this.userName.textContent = 'Ошибка загрузки пользователя';
      }
   }
}
