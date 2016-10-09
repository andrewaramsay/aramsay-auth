import { NodeCallback } from 'aramsay-framework';

export class UsersService {
    getUserById(id: string, callback: NodeCallback<any>): void {
        callback(new Error('not implemented'));
    }
}