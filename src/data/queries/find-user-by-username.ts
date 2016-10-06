import { Query } from 'aramsay-framework';
import { Model } from 'mongoose';

import { User, UserModel } from '../models/user';

export class FindUserByUsername implements Query<User> {
    constructor(private username: string) {
    }

    get model() {
        return UserModel;
    }

    get populate() {
        return ['roles'];
    }

    get condition() {
        return { 
            username: this.username.toLowerCase()
        };
    }
}