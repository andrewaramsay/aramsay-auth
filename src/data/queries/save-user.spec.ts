/// <reference path="../../../typings/index.d.ts" />
import { User } from '../models/user';
import { SaveUser } from './save-user';

describe('SaveUser', () => {
    let target: SaveUser;
    let user: User;

    beforeEach(() => {
        user = <User>{ username: 'username' };

        target = new SaveUser(user);
    });
    
    describe('collection', () => {
        it('returns "users"', () => {
            expect(target.collection).toBe('users');
        });
    });

    describe('filter', () => {
        it('filters the id equals the specified id', () => {
            expect(target.filter.username).toBe('username');
            expect(Object.keys(target.filter).length).toBe(1);
        });

        it('converts the username into lowercase', () => {
            let newTarget = new SaveUser(<User>{ username: 'CAPITAL' });
            
            expect(newTarget.filter.username).toBe('capital');
            expect(Object.keys(target.filter).length).toBe(1);
        });
    });

    describe('documents', () => {
        it('returns the user', () => {
            expect(target.documents.length).toBe(1);
            expect(target.documents[0]).toBe(user);
        });
    });
});
