import { AddReply } from './addReply.js';
import { User } from './getRandomUser';

export class ShowReplyInput {
   private addReply!: AddReply;
   private currentUser!: User;

   constructor() {}

   // Метод для передачи AddReply после создания
   public setAddReply(addReply: AddReply) {
      this.addReply = addReply;
   }

   public setCurrentUser(user: User) {
      this.currentUser = user;
   }

   showElement(parentComment: HTMLDivElement) {
      let replyContainer = parentComment.querySelector('.reply-container') as HTMLDivElement;
      if (!replyContainer) {
         replyContainer = document.createElement('div');
         replyContainer.classList.add('reply-container');
         let replyInput = document.createElement('textarea');
         replyInput.classList.add('main__input-area', 'reply-input');
         replyInput.placeholder = 'Введите ваш ответ...';
         let replyButton = document.createElement('button');
         replyButton.classList.add('send-reply-button');
         replyButton.textContent = '';
         const parentUserName = parentComment.querySelector('.parent-name')?.textContent || 'Anonymous';
         replyButton.addEventListener('click', async () => {
            console.log('⏳ Перед вызовом replyComment');
            console.log('ℹ️ Проверяем this.addReply:', this.addReply); // Проверяем, определен ли объект
            if (!this.addReply) {
               console.error('❌ Ошибка: this.addReply не определен!');
               return;
            }
            await this.addReply.replyComment(parentComment, replyInput.value, parentUserName, this.currentUser);
            console.log('Ответ добавлен');
            replyContainer.remove();
         });
         replyContainer.appendChild(replyInput);
         replyContainer.appendChild(replyButton);
         parentComment.appendChild(replyContainer);
         const handleClickOutside = (event: MouseEvent) => {
            if (!replyContainer.contains(event.target as Node)) {
               replyContainer.remove();
               document.removeEventListener('click', handleClickOutside);
            }
         };
         setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
         }, 1000);
      }
   }
}
