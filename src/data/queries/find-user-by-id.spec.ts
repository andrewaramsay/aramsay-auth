/// <reference path="../../../typings/index.d.ts" />
import { User, UserModel } from '../models/user';
import { FindUserById } from './find-user-by-id';

describe('FindUserByUsername', () => {
    let target: FindUserById;

    beforeEach(() => {
        target = new FindUserById('id');
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

    describe('id', () => {
        it('equals the specified id', () => {
            expect(target.id).toBe('id');
        });
    });
});
