import { DbWrite } from 'aramsay-framework';
import { Model } from 'mongoose';

import { User, UserModel } from '../models/user';

export class SaveUser implements DbWrite<User> {
    constructor(private user: User) {
        this.user.username = this.user.username.toLowerCase();
    }

    get model() {
        return UserModel;
    }

    get data() {
        return this.user;
    }
}
