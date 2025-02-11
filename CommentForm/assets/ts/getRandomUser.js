var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class RandomUserService {
    constructor() {
        this.apiUrl = 'https://randomuser.me/api/';
    }
    // @ts-ignore
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.apiUrl);
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }
                const data = yield response.json();
                return data.results[0];
            }
            catch (error) {
                console.log('Ошибка при получении пользователя:', error);
            }
        });
    }
}
const userService = new RandomUserService();
userService.getUser().then((user) => {
    console.log(`Имя: ${user.name.first} ${user.name.last}`);
});
