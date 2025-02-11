var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AddReply {
    constructor(commentCounter, commentElement) {
        this.commentCounter = commentCounter;
        this.commentElement = commentElement;
        console.log('AddReply создан, commentCounter:', this.commentCounter);
    }
    replyComment(parentComment, replyText, parentUserName, currentUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!replyText.trim()) {
                alert('Ответ не может быть пустым!');
                return;
            }
            const parentId = parentComment.dataset.commentId;
            const reply = this.commentElement.createComment(replyText, currentUser, parentUserName, true, undefined, parentId);
            let repliesContainer = parentComment.querySelector('.repliesContainer');
            if (!repliesContainer) {
                repliesContainer = document.createElement('div');
                repliesContainer.classList.add('repliesContainer');
                parentComment.appendChild(repliesContainer);
            }
            repliesContainer.appendChild(reply);
            console.log('Перед увеличением счетчика:', this.commentCounter);
            this.commentCounter.increment();
        });
    }
}
