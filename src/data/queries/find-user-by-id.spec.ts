/// <reference path="../../../typings/index.d.ts" />
import { spy } from 'aramsay-framework';
import { ObjectID } from 'mongodb';
import Spy = jasmine.Spy;

import { User } from '../models/user';
import { FindUserById } from './find-user-by-id';

describe('FindUserById', () => {
    let target: FindUserById;
    let id: ObjectID;

    beforeEach(() => {
        id = new ObjectID();
        
        target = new FindUserById(id);
    });
    
    describe('collection', () => {
        it('returns "users"', () => {
            expect(target.collection).toBe('users');
        });
    });

    describe('filter', () => {
        it('filters the id equals the specified id', () => {
            expect(target.filter._id).toBe(id);
            expect(Object.keys(target.filter).length).toBe(1);
        });
    });

    describe('mapResults', () => {
        let callback: Spy;
        let record: any;

        beforeEach(() => {
            callback = jasmine.createSpy('callback');
            record = {
                _id: id,
                displayName: 'display',
                loginAttempts: 4,
                password: 'pass',
                roles: ['role id'],
                username: 'username'
            };
        });
        
        it('calls callback with the mapped record', () => {
            target.mapResults(record, callback);

            expect(callback).toHaveBeenCalledWith(null, record);
        });

        it('ignores unexpected properties on the record', () => {
            record.somethingUnexpected = 'is right here';
            
            target.mapResults(record, callback);

            expect(callback).toHaveBeenCalledTimes(1);
            let call = spy(callback).calls.first();
            expect(call.args[0]).toBeNull();
            expect(call.args[1].somethingUnexpected).toBeFalsy();
        });
    });
});
