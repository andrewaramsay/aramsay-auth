import { FindUserBase } from './find-user-base';

export class FindUserByUsername extends FindUserBase {
    constructor(private username: string) {
        super();
    }

    get filter() {
        return { 
            username: this.username.toLowerCase()
        };
    }
}