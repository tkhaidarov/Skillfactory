var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class ShowReplyInput {
    constructor() { }
    // Метод для передачи AddReply после создания
    setAddReply(addReply) {
        this.addReply = addReply;
    }
    setCurrentUser(user) {
        this.currentUser = user;
    }
    showElement(parentComment) {
        var _a;
        let replyContainer = parentComment.querySelector('.reply-container');
        if (!replyContainer) {
            replyContainer = document.createElement('div');
            replyContainer.classList.add('reply-container');
            let replyInput = document.createElement('textarea');
            replyInput.classList.add('main__input-area', 'reply-input');
            replyInput.placeholder = 'Введите ваш ответ...';
            let replyButton = document.createElement('button');
            replyButton.classList.add('send-reply-button');
            replyButton.textContent = '';
            const parentUserName = ((_a = parentComment.querySelector('.parent-name')) === null || _a === void 0 ? void 0 : _a.textContent) || 'Anonymous';
            replyButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                console.log('⏳ Перед вызовом replyComment');
                console.log('ℹ️ Проверяем this.addReply:', this.addReply); // Проверяем, определен ли объект
                if (!this.addReply) {
                    console.error('❌ Ошибка: this.addReply не определен!');
                    return;
                }
                yield this.addReply.replyComment(parentComment, replyInput.value, parentUserName, this.currentUser);
                console.log('Ответ добавлен');
                replyContainer.remove();
            }));
            replyContainer.appendChild(replyInput);
            replyContainer.appendChild(replyButton);
            parentComment.appendChild(replyContainer);
            const handleClickOutside = (event) => {
                if (!replyContainer.contains(event.target)) {
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
