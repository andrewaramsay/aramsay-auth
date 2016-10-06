/// <reference path="../../../typings/index.d.ts" />
import { User, UserModel } from '../models/user';
import { SaveUser } from './save-user';

describe('SaveUser', () => {
    let target: SaveUser;
    let user: User;

    beforeEach(() => {
        user = <User>{username: 'name'};

        target = new SaveUser(user);
    });
    
    describe('model', () => {
        it('returns UserModel', () => {
            expect(target.model).toBe(UserModel);
        });
    });

    describe('data', () => {
        it('returns the user', () => {
            expect(target.data).toBe(user);
        });
    });
});
