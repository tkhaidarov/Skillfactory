export interface User {
   login: {
      uuid: string;
   };
   name: {
      first: string;
      last: string;
   };
   picture: {
      medium: string;
   };
}

export class RandomUserService {
   private readonly apiUrl: string;

   constructor() {
      this.apiUrl = 'https://randomuser.me/api/';
   }

   // @ts-ignore
   async getUser(): Promise<User> {
      try {
         const response = await fetch(this.apiUrl);
         if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
         }
         const data = await response.json();
         return data.results[0] as User;
      } catch (error) {
         console.log('Ошибка при получении пользователя:', error);
      }
   }
}

const userService = new RandomUserService();

userService.getUser().then((user) => {
   console.log(`Имя: ${user.name.first} ${user.name.last}`);
});
