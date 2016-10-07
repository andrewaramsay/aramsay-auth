/// <reference path="../../../typings/index.d.ts" />
import { DatabaseExecutor, spy, callCallback } from 'aramsay-framework';
import { ObjectID } from 'mongodb';
import Spy = jasmine.Spy;

import { UsersRepository } from './users.repository';
import { UserMapper } from '../../mapping/data';
import { FindUserByUsername } from '../queries/find-user-by-username';
import { FindUserById } from '../queries/find-user-by-id';
import { SaveUser } from '../queries/save-user';
import { User } from '../../business/models/user';
import { User as DbUser } from '../../data/models/user';

describe('UsersRepository', () => {
    let target: UsersRepository;
    let database: DatabaseExecutor;
    let userMapper: UserMapper;
    let callback: Spy;

    beforeEach(() => {
        callback = jasmine.createSpy('callback');
        
        database = jasmine.createSpyObj<DatabaseExecutor>('database', ['findOne', 'update']);
        userMapper = jasmine.createSpyObj<UserMapper>('userMapper', ['mapCallback', 'fromBusinessModel']);
        
        target = new UsersRepository(
            database,
            userMapper);
    });

    it('is injectable', () => {
        expect(Reflect.getMetadata('design:paramtypes', UsersRepository)).toBeTruthy('no metadata');
    });

    describe('findUserByUsername', () => {
        it('calls findOne with a FindUserByUsername query', () => {
            target.findUserByUsername('user', callback);

            expect(database.findOne).toHaveBeenCalledTimes(1);
            let call = spy(database.findOne).calls.first();
            expect(call.args[0] instanceof FindUserByUsername);
            expect(call.args[0].username).toBe('user');
        });
        
        it('calls userMapper.mapCallback with the callback', () => {
            target.findUserByUsername('user', callback);

            expect(userMapper.mapCallback).toHaveBeenCalledWith(callback);
        });
        
        it('passes the mapped callback to the database query', () => {
            let mappedCallback = jasmine.createSpy('mappedCallback');
            spy(userMapper.mapCallback).and.returnValue(mappedCallback);

            target.findUserByUsername('user', callback);

            expect(database.findOne).toHaveBeenCalledWith(jasmine.anything(), mappedCallback);
        });
    });

    describe('saveUser', () => {
        let user: User;

        beforeEach(() => {
            user = <User>{};
        });
        
        it('calls fromBusinessModel to get the data model', () => {
            target.saveUser(user, callback);
            
            expect(userMapper.fromBusinessModel).toHaveBeenCalledWith(user, jasmine.anything());
        });

        it('skips calling update if an error is returned from fromBusinessModel', () => {
            let err = new Error('broken');
            spy(userMapper.fromBusinessModel).and.callFake(callCallback(1, err));
            
            target.saveUser(user, callback);

            expect(database.update).not.toHaveBeenCalled();
            expect(callback).toHaveBeenCalledWith(err);
        });

        it('calls update with a SaveUser query', () => {
            let dbUser = <DbUser>{ username: 'name' };
            spy(userMapper.fromBusinessModel).and.callFake(callCallback(1, null, dbUser));

            target.saveUser(user, callback);

            expect(database.update).toHaveBeenCalledTimes(1);
            let call = spy(database.update).calls.first();
            expect(call.args[0] instanceof SaveUser).toBeTruthy();
            expect(call.args[0].user).toBe(dbUser);
            expect(call.args[1]).toBe(callback);
        });
    });

    describe('findUserById', () => {
        let id: ObjectID;

        beforeEach(() => {
            id = new ObjectID();
        });
        
        it('calls findOne with a FindUserById query', () => {
            target.findUserById(id, callback);

            expect(database.findOne).toHaveBeenCalledTimes(1);
            let call = spy(database.findOne).calls.first();
            expect(call.args[0] instanceof FindUserById);
            expect(call.args[0].userId).toBe(id);
        });
        
        it('calls userMapper.mapCallback with the callback', () => {
            target.findUserById(id, callback);

            expect(userMapper.mapCallback).toHaveBeenCalledWith(callback);
        });
        
        it('passes the mapped callback to the database query', () => {
            let mappedCallback = jasmine.createSpy('mappedCallback');
            spy(userMapper.mapCallback).and.returnValue(mappedCallback);

            target.findUserById(id, callback);

            expect(database.findOne).toHaveBeenCalledWith(jasmine.anything(), mappedCallback);
        });
    });
});
