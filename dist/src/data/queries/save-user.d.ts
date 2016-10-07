import { DbUpdate } from 'aramsay-framework';
import { User } from '../models/user';
export declare class SaveUser implements DbUpdate {
    private user;
    constructor(user: User);
    readonly collection: string;
    readonly filter: {
        username: string;
    };
    readonly options: {
        upsert: boolean;
    };
    readonly documents: User[];
}
