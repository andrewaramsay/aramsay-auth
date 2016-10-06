/// <reference path="../../../typings/index.d.ts" />
import { User, UserModel } from '../models/user';
import { FindUserByUsername } from './find-user-by-username';

describe('FindUserByUsername', () => {
    let target: FindUserByUsername;

    beforeEach(() => {
        target = new FindUserByUsername('user');
    });
    
    describe('model', () => {
        it('returns UserModel', () => {
            expect(target.model).toBe(UserModel);
        });
    });

    describe('populate', () => {
        it('returns an array specifying roles', () => {
            let populate = target.populate;
            expect(populate instanceof Array).toBeTruthy();
            expect(populate.length).toBe(1);
            expect(populate[0]).toBe('roles');
        });
    });

    describe('condition', () => {
        it('contains the username field', () => {
            let condition = target.condition;
            expect(condition.username).toBe('user');
            expect(Object.keys(condition).length).toBe(1);
        });

        it('converts the username to lower case', () => {
            let query = new FindUserByUsername('CAPITAL');
            let condition = query.condition;
            expect(condition.username).toBe('capital');
            expect(Object.keys(condition).length).toBe(1);
        });
    });
});
