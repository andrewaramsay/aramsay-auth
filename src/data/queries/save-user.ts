import { DbUpdate } from 'aramsay-framework';

import { User } from '../models/user';

export class SaveUser implements DbUpdate {
    constructor(private user: User) {
        this.user.username = this.user.username.toLowerCase();
    }

    get collection() {
        return 'users';
    }

    get filter() {
        return {
            username: this.user.username 
        };
    }

    get options() {
        return { upsert: true };
    }

    get documents() {
        return [this.user];
    }
}
