import { QueryById } from 'aramsay-framework';

import { User, UserModel } from '../models/user';

export class FindUserById implements QueryById<User> {
    constructor(private userId: string) {
    }

    get model() {
        return UserModel;
    }
    
    get populate() {
        return ['roles'];
    }

    get id() {
        return this.userId;
    }
}
