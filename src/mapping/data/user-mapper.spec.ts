/// <reference path="../../../typings/index.d.ts" />
import Spy = jasmine.Spy;

import { UserMapper } from './user-mapper';
import { User } from '../../business/models/user';
import { User as DbUser } from '../../data/models/user';

describe('UserMapper', () => {
    let target: UserMapper;
    let callback: Spy;

    beforeEach(() => {
        target = new UserMapper();
        callback = jasmine.createSpy('callback');
    });
    
    it('is injectable', () => {
        expect(Reflect.getMetadata('design:paramtypes', UserMapper)).toBeTruthy('no metadata');
    });
    
    describe('toBusinessModel', () => {
        it('maps properties to business model', () => {
            let dbUser = <DbUser>{
                loginAttempts: 4,
                password: 'hash'
            };
            
            target.toBusinessModel(dbUser, callback);

            expect(callback).toHaveBeenCalledWith(null, jasmine.objectContaining({
                loginAttempts: 4,
                passwordHash: 'hash'
            }));
        });
    });

    describe('fromBusinessModel', () => {
        it('maps properties from business model', () => {
            let user = <User>{
                loginAttempts: 4,
                passwordHash: 'hash'
            };
            
            target.fromBusinessModel(user, callback);

            expect(callback).toHaveBeenCalledWith(null, jasmine.objectContaining({
                loginAttempts: 4,
                password: 'hash'
            }));
        });
    });
});
