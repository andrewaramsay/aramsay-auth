import { Handler } from 'express';
import { Strategy } from 'passport';
export interface Passport {
    use(strategy: Strategy): Passport;
    use(name: string, strategy: Strategy): Passport;
    initialize(options?: {
        userProperty: string;
    }): Handler;
    serializeUser(fn: (user: any, done: (err: any, id: any) => void) => void): void;
    deserializeUser(fn: (id: any, done: (err: any, user: any) => void) => void): void;
}
