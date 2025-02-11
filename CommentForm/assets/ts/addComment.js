var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AddComment {
    constructor(commentCounter, commentElement) {
        this.commentCounter = commentCounter;
        this.commentElement = commentElement;
    }
    addElem(commentInput, commentList, currentUser, loadRandomUser) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!commentInput.value.trim()) {
                alert('Комментарий не может быть пустым!');
                return;
            }
            const comment = this.commentElement.createComment(commentInput.value, currentUser);
            commentList.appendChild(comment);
            commentInput.value = '';
            this.commentCounter.increment();
            yield loadRandomUser();
        });
    }
}
