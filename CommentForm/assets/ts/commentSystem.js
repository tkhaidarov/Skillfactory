var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RandomUserService } from './getRandomUser.js';
import { CommentCounter } from './commentCounter.js';
import { AddComment } from './addComment.js';
import { AddReply } from './addReply.js';
import { ShowReplyInput } from './showReplyInput.js';
import { CommentElement } from './commentElement.js';
import { CharacterCounter } from './characterCounter.js';
import { FilterComment } from './filterComment.js';
export class CommentSystem {
    constructor() {
        this.currentUser = null;
        this.userService = new RandomUserService();
        this.commentCounter = new CommentCounter();
        this.showReplyInput = new ShowReplyInput();
        this.commentElement = new CommentElement(this.showReplyInput);
        this.addReply = new AddReply(this.commentCounter, this.commentElement);
        this.addComment = new AddComment(this.commentCounter, this.commentElement);
        this.showReplyInput.setAddReply(this.addReply);
        this.filterComment = new FilterComment('#comment-list');
        this.characterCounter = new CharacterCounter('comment-input', 'count-symbol', 'warning-message', 'submit-button', 1000);
        this.userAvatar = document.getElementById('user-avatar');
        this.userName = document.getElementById('user-name');
        this.commentInput = document.getElementById('comment-input');
        this.submitButton = document.getElementById('submit-button');
        this.commentList = document.getElementById('comment-list');
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            //localStorage.clear();
            yield this.loadRandomUser();
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
                dropdownEl.addEventListener('sortOptionSelected', (event) => {
                    const customEvent = event;
                    const criteria = customEvent.detail.criteria;
                    this.filterComment.sort(criteria);
                });
            }
        });
    }
    loadRandomUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.currentUser = yield this.userService.getUser();
                this.userAvatar.src = this.currentUser.picture.medium;
                this.userName.textContent = `${this.currentUser.name.first} ${this.currentUser.name.last}`;
                this.showReplyInput.setCurrentUser(this.currentUser);
            }
            catch (error) {
                this.userName.textContent = 'Ошибка загрузки пользователя';
            }
        });
    }
}
